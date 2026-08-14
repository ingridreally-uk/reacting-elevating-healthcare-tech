import { z } from "zod";
import { FIELD_MAX } from "./constants.ts";

function trimmed(max: number) {
  return z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().min(1).max(max));
}

function optionalTrimmed(max: number) {
  return z
    .string()
    .optional()
    .transform((v) => (v ?? "").trim())
    .pipe(z.string().max(max));
}

const emailField = z
  .string()
  .transform((v) => v.trim().toLowerCase())
  .pipe(z.string().email().max(FIELD_MAX.email));

const spamFields = {
  turnstileToken: z.string().min(1).max(FIELD_MAX.turnstile),
  honeypot: z.string().max(FIELD_MAX.honeypot).optional().default(""),
  startedAt: z.number().finite(),
};

export const bookDemoFieldsSchema = z.object({
  source: z.literal("book-demo"),
  firstName: trimmed(FIELD_MAX.name),
  lastName: trimmed(FIELD_MAX.name),
  email: emailField,
  practiceName: trimmed(FIELD_MAX.practice),
  role: optionalTrimmed(FIELD_MAX.role),
  surgeries: optionalTrimmed(FIELD_MAX.surgeries),
  notes: optionalTrimmed(FIELD_MAX.notes),
});

export const contactFieldsSchema = z.object({
  source: z.literal("contact"),
  name: trimmed(FIELD_MAX.name),
  email: emailField,
  company: optionalTrimmed(FIELD_MAX.practice),
  message: trimmed(FIELD_MAX.message),
});

export const leadInputSchema = z.discriminatedUnion("source", [
  bookDemoFieldsSchema.extend(spamFields),
  contactFieldsSchema.extend(spamFields),
]);

export type LeadInput = z.infer<typeof leadInputSchema>;
export type BookDemoFields = z.infer<typeof bookDemoFieldsSchema>;
export type ContactFields = z.infer<typeof contactFieldsSchema>;
