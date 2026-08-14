type NitroEnv = Record<string, unknown>;

function asTrimmedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function fromProcess(name: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  return asTrimmedString(process.env[name]);
}

/** Nitro cloudflare-module already sets this on the Worker isolate. */
function fromNitroEnv(name: string): string | undefined {
  const nitro = (globalThis as { __env__?: NitroEnv }).__env__;
  return asTrimmedString(nitro?.[name]);
}

/**
 * Server-only. Never import from client components.
 * Call from a request handler — not at module scope.
 */
export function readServerSecret(name: string): string | undefined {
  return fromProcess(name) ?? fromNitroEnv(name);
}

export type LeadServerConfig = {
  resendApiKey: string;
  leadFrom: string;
  leadTo: string;
  turnstileSecret: string;
};

export function readLeadConfig():
  | { ok: true; config: LeadServerConfig }
  | { ok: false; missing: string[] } {
  const resendApiKey = readServerSecret("RESEND_API_KEY");
  const leadFrom = readServerSecret("LEAD_FROM");
  const leadTo = readServerSecret("LEAD_TO");
  const turnstileSecret = readServerSecret("TURNSTILE_SECRET_KEY");
  const missing = [
    !resendApiKey && "RESEND_API_KEY",
    !leadFrom && "LEAD_FROM",
    !leadTo && "LEAD_TO",
    !turnstileSecret && "TURNSTILE_SECRET_KEY",
  ].filter(Boolean) as string[];
  if (missing.length || !resendApiKey || !leadFrom || !leadTo || !turnstileSecret) {
    return { ok: false, missing };
  }
  return { ok: true, config: { resendApiKey, leadFrom, leadTo, turnstileSecret } };
}
