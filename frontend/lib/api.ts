const DEV = process.env.NODE_ENV !== "production";

// In production the API URL must be configured; localhost is a dev-only fallback.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || (DEV ? "http://localhost:4000" : "");

export async function postJson(path: string, body: unknown): Promise<void> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
}
