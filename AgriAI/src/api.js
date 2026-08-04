// Base URL for the AgriAI backend.
// Set VITE_API_URL in .env (local) and in the Vercel project settings (production).
// Falls back to the local uvicorn dev server.

export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
