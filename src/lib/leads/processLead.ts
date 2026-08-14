import { MAX_SUBMIT_AGE_MS, MIN_SUBMIT_MS } from "./constants.ts";
import { composeLeadEmail, sanitizeHeader } from "./compose.ts";
import { leadInputSchema, type LeadInput } from "./schema.ts";

export type LeadResultCode =
  | "validation"
  | "spam"
  | "turnstile"
  | "config"
  | "delivery"
  | "unavailable";

export type LeadResult = { ok: true } | { ok: false; code: LeadResultCode };

export type LeadDeps = {
  now: () => number;
  readConfig: () =>
    | { ok: true; config: { resendApiKey: string; leadFrom: string; leadTo: string; turnstileSecret: string } }
    | { ok: false; missing: string[] };
  verifyTurnstile: (token: string, secret: string) => Promise<boolean>;
  sendEmail: (args: {
    apiKey: string;
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    text: string;
    html: string;
  }) => Promise<{ ok: true } | { ok: false }>;
};

export function isHoneypotFilled(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

export function isImplausibleSubmitTime(startedAt: number, now: number): boolean {
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;
  const elapsed = now - startedAt;
  return elapsed < MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_AGE_MS;
}

export async function processLead(raw: unknown, deps: LeadDeps): Promise<LeadResult> {
  const parsed = leadInputSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, code: "validation" };

  const input = parsed.data;
  if (isHoneypotFilled(input.honeypot) || isImplausibleSubmitTime(input.startedAt, deps.now())) {
    return { ok: false, code: "spam" };
  }

  const config = deps.readConfig();
  if (!config.ok) return { ok: false, code: "config" };

  const turnstileOk = await deps.verifyTurnstile(input.turnstileToken, config.config.turnstileSecret);
  if (!turnstileOk) return { ok: false, code: "turnstile" };

  const email = composeLeadEmail(input, new Date(deps.now()));
  const from = sanitizeHeader(config.config.leadFrom);
  const to = sanitizeHeader(config.config.leadTo);
  if (!from || !to || !email.replyTo) return { ok: false, code: "config" };

  const sent = await deps.sendEmail({
    apiKey: config.config.resendApiKey,
    from,
    to,
    replyTo: email.replyTo,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
  if (!sent.ok) return { ok: false, code: "delivery" };
  return { ok: true };
}

export type { LeadInput };
