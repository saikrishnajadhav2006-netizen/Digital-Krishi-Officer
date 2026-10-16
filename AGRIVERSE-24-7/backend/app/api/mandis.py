"""Mandi discovery and market-price endpoints.

Market locations come from OpenStreetMap Overpass. Commodity prices are queried
from a configured data.gov.in resource; the API deliberately returns an
unavailable state rather than inventing prices when no source is configured.
"""
import os
from datetime import date
from typing import Optional

import httpx
from fastapi import APIRouter, HTTPException, Query

router = APIRouter()
OVERPASS_URL = os.getenv("OVERPASS_URL", "https://overpass-api.de/api/interpreter")
DATA_GOV_IN_API_KEY = os.getenv("DATA_GOV_IN_API_KEY", "")
AGMARKNET_RESOURCE_ID = os.getenv("AGMARKNET_RESOURCE_ID", "")


@router.get("/nearby")
async def nearby_mandis(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    radius_km: float = Query(50, ge=1, le=200),
):
    """Find mapped wholesale/produce markets around a coordinate."""
    radius_m = int(radius_km * 1000)
    query = f"""[out:json][timeout:20];
    (
      node(around:{radius_m},{lat},{lon})[shop=wholesale][produce];
      node(around:{radius_m},{lat},{lon})[amenity=marketplace];
      way(around:{radius_m},{lat},{lon})[amenity=marketplace];
      relation(around:{radius_m},{lat},{lon})[amenity=marketplace];
      node(around:{radius_m},{lat},{lon})[name~"mandi|market|bazaar",i];
      way(around:{radius_m},{lat},{lon})[name~"mandi|market|bazaar",i];
    );
    out center tags;"""
    try:
        async with httpx.AsyncClient(timeout=25, headers={"User-Agent": "AGRIVERSE/1.0 contact: agriverse-project"}) as client:
            response = await client.post(OVERPASS_URL, data={"data": query})
            response.raise_for_status()
            payload = response.json()
    except (httpx.HTTPError, ValueError):
        raise HTTPException(status_code=502, detail="Market map data is temporarily unavailable. Try again later.")

    results = []
    for item in payload.get("elements", []):
        tags = item.get("tags", {})
        name = tags.get("name")
        if not name:
            continue
        center = item.get("center", {})
        item_lat = item.get("lat", center.get("lat"))
        item_lon = item.get("lon", center.get("lon"))
        if item_lat is None or item_lon is None:
            continue
        results.append({
            "id": f"osm-{item.get('type')}-{item.get('id')}",
            "name": name,
            "lat": item_lat,
            "lon": item_lon,
            "address": ", ".join(filter(None, [
                tags.get("addr:suburb"), tags.get("addr:city"),
                tags.get("addr:district"), tags.get("addr:state")
            ])) or tags.get("addr:full") or "Address not listed in OpenStreetMap",
            "source": "OpenStreetMap",
            "source_url": f"https://www.openstreetmap.org/{item.get('type')}/{item.get('id')}",
            "type": tags.get("amenity") or tags.get("shop") or "market",
        })
    return {"items": results, "count": len(results), "source": "OpenStreetMap", "radius_km": radius_km}


@router.get("/search")
async def search_mandis(
    query: str = Query(..., min_length=2, max_length=100),
    state: Optional[str] = None,
    district: Optional[str] = None,
):
    """Search mapped markets by place/name using the public Nominatim service."""
    search_text = ", ".join(filter(None, [query, district, state, "India"]))
    try:
        async with httpx.AsyncClient(timeout=15, headers={"User-Agent": "AGRIVERSE/1.0 educational-project"}) as client:
            response = await client.get(
                "https://nominatim.openstreetmap.org/search",
                params={"q": search_text, "format": "jsonv2", "limit": 8, "addressdetails": 1},
            )
            response.raise_for_status()
            rows = response.json()
    except (httpx.HTTPError, ValueError):
        raise HTTPException(status_code=502, detail="Location search is temporarily unavailable.")
    items = []
    for row in rows:
        address = row.get("address", {})
        items.append({
            "id": f"place-{row.get('place_id')}",
            "name": row.get("name") or row.get("display_name", "Market area"),
            "lat": float(row["lat"]),
            "lon": float(row["lon"]),
            "address": row.get("display_name", ""),
            "source": "OpenStreetMap / Nominatim",
            "source_url": row.get("osm_url"),
            "type": row.get("type", "place"),
        })
    return {"items": items, "count": len(items), "source": "OpenStreetMap / Nominatim"}


@router.get("/{mandi_id}/prices")
async def mandi_prices(
    mandi_id: str,
    commodity: Optional[str] = Query(None, max_length=80),
    market: Optional[str] = Query(None, max_length=100),
    state: Optional[str] = Query(None, max_length=80),
    limit: int = Query(30, ge=1, le=100),
):
    """Fetch official commodity-price records when a data.gov.in resource is configured."""
    if not DATA_GOV_IN_API_KEY or not AGMARKNET_RESOURCE_ID:
        return {
            "status": "unconfigured",
            "message": "Live commodity prices are not configured yet. Set DATA_GOV_IN_API_KEY and AGMARKNET_RESOURCE_ID in the backend environment.",
            "items": [],
            "source": None,
            "retrieved_at": None,
        }
    params = {
        "api-key": DATA_GOV_IN_API_KEY,
        "format": "json",
        "limit": limit,
    }
    if commodity:
        params["filters[commodity]"] = commodity
    if market:
        params["filters[market]"] = market
    if state:
        params["filters[state]"] = state
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(
                f"https://api.data.gov.in/resource/{AGMARKNET_RESOURCE_ID}",
                params=params,
            )
            response.raise_for_status()
            payload = response.json()
    except (httpx.HTTPError, ValueError):
        raise HTTPException(status_code=502, detail="Official commodity-price data is temporarily unavailable.")
    records = payload.get("records", [])
    items = []
    for row in records:
        items.append({
            "state": row.get("state"),
            "district": row.get("district"),
            "market": row.get("market"),
            "commodity": row.get("commodity"),
            "variety": row.get("variety"),
            "arrival_date": row.get("arrival_date"),
            "min_price": row.get("min_price"),
            "max_price": row.get("max_price"),
            "modal_price": row.get("modal_price"),
            "unit": "₹/quintal",
        })
    return {
        "status": "ok" if items else "empty",
        "items": items,
        "count": len(items),
        "source": "data.gov.in (AGMARKNET resource)",
        "retrieved_at": date.today().isoformat(),
    }


@router.get("/health")
def mandi_health():
    return {
        "status": "ok",
        "market_locations": "OpenStreetMap",
        "commodity_prices": "configured" if DATA_GOV_IN_API_KEY and AGMARKNET_RESOURCE_ID else "not_configured",
        "forecasting": "not_implemented",
    }
