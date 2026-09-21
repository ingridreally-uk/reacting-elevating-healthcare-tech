const TURNSTILE_TIMEOUT_MS = 8_000;

export async function verifyTurnstileToken(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TURNSTILE_TIMEOUT_MS);
  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      signal: controller.signal,
      body,
    });
    if (!response.ok) return false;
    const payload = (await response.json()) as { success?: unknown };
    return payload.success === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
