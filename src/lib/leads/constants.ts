/** Public enquiry address shown on Book Demo / Contact. Not a secret. */
export const PUBLIC_ENQUIRY_EMAIL = "info@reacting.io";

/** Prefilled opener for Contact-page WhatsApp click-to-chat. */
export const WHATSAPP_CONTACT_PREFILL =
  "Hi Reacting — I have a question about Dental Assist.";

/**
 * wa.me click-to-chat URL when VITE_WHATSAPP_NUMBER is set (E.164, e.g. +447…).
 * Returns null when unset so the Contact sidebar block stays hidden.
 */
export function whatsAppChatUrl(): string | null {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER;
  if (typeof raw !== "string" || !raw.trim()) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_CONTACT_PREFILL)}`;
}

export const MIN_SUBMIT_MS = 800;
export const MAX_SUBMIT_AGE_MS = 1000 * 60 * 60 * 2;

export const FIELD_MAX = {
  name: 80,
  email: 254,
  practice: 120,
  role: 80,
  surgeries: 20,
  notes: 2000,
  message: 4000,
  honeypot: 200,
  turnstile: 4096,
} as const;
