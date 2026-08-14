export async function verifyTurnstileToken(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!response.ok) return false;
    const payload = (await response.json()) as { success?: unknown };
    return payload.success === true;
  } catch {
    return false;
  }
}
