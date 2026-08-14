/** Public enquiry address shown on Book Demo / Contact. Not a secret. */
export const PUBLIC_ENQUIRY_EMAIL = "info@reacting.io";

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
