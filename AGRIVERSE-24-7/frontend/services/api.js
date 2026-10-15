const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    throw new Error(
      `Cannot reach the AGRIVERSE backend at ${API_BASE_URL}. Start FastAPI on port 8000 and check NEXT_PUBLIC_API_BASE_URL.`
    );
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail =
      typeof payload.detail === "string"
        ? payload.detail
        : `Request failed with HTTP ${response.status}`;
    throw new Error(detail);
  }
  return payload;
}

export const api = {
  async submitQuery(query, language) {
    const text = String(query || "").trim();
    if (!text) throw new Error("Please enter a question.");
    return request("/api/v1/query/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text, language: language || null }),
    });
  },

  async uploadImage(file, language) {
    if (!(file instanceof File)) throw new Error("Choose an image file first.");
    if (!file.type.startsWith("image/")) {
      throw new Error("Please upload an image file.");
    }
    const form = new FormData();
    form.append("file", file);
    const result = await request("/api/v1/image/analyze", {
      method: "POST",
      body: form,
    });
    return {
      ...result,
      analysis:
        typeof result.analysis === "string"
          ? result.analysis
          : JSON.stringify(result.analysis, null, 2),
      detected_language: language || "en",
    };
  },
};

export default api;
