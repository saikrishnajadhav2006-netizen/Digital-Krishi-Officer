from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import query, image, feedback, services_api, mandis
from app.db.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Local development origins. Configure FRONTEND_ORIGINS for deployment.
origins = [
    origin.strip()
    for origin in __import__("os").getenv(
        "FRONTEND_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(query.router, prefix="/api/v1/query", tags=["Query"])
app.include_router(image.router, prefix="/api/v1/image", tags=["Image"])
app.include_router(feedback.router, prefix="/api/v1/feedback", tags=["Feedback"])
app.include_router(services_api.router, prefix="/api/v1/services", tags=["Services"])
app.include_router(mandis.router, prefix="/api/v1/mandis", tags=["Mandis"])


@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}


@app.get("/api/v1/health", tags=["Health"])
def health():
    return {"status": "ok", "service": settings.PROJECT_NAME, "version": settings.VERSION}
