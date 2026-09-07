import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { pageMeta } from "@/lib/seo";
import { FIELD_MAX, PUBLIC_ENQUIRY_EMAIL, whatsAppChatUrl } from "@/lib/leads/constants";
import { TurnstileField } from "@/components/leads/TurnstileField";
import {
  FieldError,
  HoneypotInput,
  LeadError,
  LeadPrivacyNote,
  LeadSuccess,
  looksLikeEmail,
} from "@/components/leads/LeadStatus";
import { turnstileSiteKey, useLeadSubmit } from "@/components/leads/useLeadSubmit";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta({
      title: "Contact Reacting — Dental Assist Support & Sales",
      description:
        "Get in touch with the Reacting team about Dental Assist — questions, partnerships or a demo.",
      path: "/contact",
    }),
  component: ContactPage,
});

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function ContactPage() {
  const { status, errorCode, setTurnstileToken, submit, submitting } = useLeadSubmit();
  const siteKey = turnstileSiteKey();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const whatsAppUrl = whatsAppChatUrl();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to the team."
        body="Questions about Dental Assist, partnerships or a demo — send us a note and we'll get back to you."
      />

      <section>
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-14 lg:px-10 lg:py-12">
          <div className="lg:sticky lg:top-24">
            <Mail className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            <h2 className="mt-4 text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px]">
              General enquiries
            </h2>
            <a
              href={`mailto:${PUBLIC_ENQUIRY_EMAIL}`}
              className="mt-3 inline-flex min-h-11 items-center text-[18px] font-semibold tracking-tight text-foreground underline-offset-4 hover:underline sm:text-[20px]"
            >
              {PUBLIC_ENQUIRY_EMAIL}
            </a>
            <p className="mt-2 max-w-[34ch] text-[14.5px] leading-[1.65] text-muted-foreground">
              For questions, partnerships and existing customers. Send a note and we'll
              reply within one working day.
            </p>

            <div className="mt-8 border-t border-border/70 pt-7">
              <h2 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px]">
                Want to see Dental Assist?
              </h2>
              <p className="mt-2 max-w-[34ch] text-[14.5px] leading-[1.65] text-muted-foreground">
                Looking for a product walkthrough? Book a 30-minute demo with the team.
              </p>
              <Link
                to="/book-demo"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>

            {whatsAppUrl ? (
              <div className="mt-8 border-t border-border/70 pt-7">
                <h2 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px]">
                  Quick question?
                </h2>
                <p className="mt-2 max-w-[34ch] text-[14.5px] leading-[1.65] text-muted-foreground">
                  Message us on WhatsApp and we'll reply during working hours.
                </p>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp (opens WhatsApp)"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Chat on WhatsApp
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </a>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_40px_80px_-40px_rgb(15_23_42/0.18)] sm:p-7">
            {status === "success" ? (
              <LeadSuccess title="Message received">
                Thanks for getting in touch. A member of our team will respond
                within one working day.
              </LeadSuccess>
            ) : (
              <form
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (submitting) return;
                  const values = new FormData(e.currentTarget);
                  const name = String(values.get("name") ?? "");
                  const email = String(values.get("email") ?? "");
                  const message = String(values.get("message") ?? "");
                  const next: FieldErrors = {};
                  if (!name.trim()) next.name = "Please enter your name.";
                  if (!email.trim()) next.email = "Please enter your work email.";
                  else if (!looksLikeEmail(email)) next.email = "Please enter a valid work email.";
                  if (!message.trim()) next.message = "Please enter a message.";
                  setFieldErrors(next);
                  if (Object.keys(next).length) return;
                  await submit({
                    source: "contact",
                    name,
                    email,
                    company: String(values.get("company") ?? ""),
                    message,
                    honeypot: String(values.get("faxNumber") ?? ""),
                  });
                }}
                className="relative space-y-5"
              >
                <HoneypotInput />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={FIELD_MAX.name}
                    error={fieldErrors.name}
                    onChange={() => setFieldErrors((e) => ({ ...e, name: undefined }))}
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={FIELD_MAX.email}
                    error={fieldErrors.email}
                    onChange={() => setFieldErrors((e) => ({ ...e, email: undefined }))}
                  />
                </div>
                <Field
                  label="Practice / company"
                  name="company"
                  autoComplete="organization"
                  maxLength={FIELD_MAX.practice}
                />
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-[12.5px] font-medium text-foreground"
                  >
                    Message <span className="text-muted-foreground">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    autoComplete="off"
                    maxLength={FIELD_MAX.message}
                    aria-invalid={fieldErrors.message ? true : undefined}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    onChange={() => setFieldErrors((e) => ({ ...e, message: undefined }))}
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
                  />
                  <FieldError id="message-error" message={fieldErrors.message} />
                </div>

                <TurnstileField siteKey={siteKey} onToken={setTurnstileToken} />

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="mt-2 h-11 w-full rounded-full text-[13.5px] font-medium"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>

                {status === "error" && errorCode ? <LeadError code={errorCode} /> : null}

                <LeadPrivacyNote />
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  maxLength,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  error?: string;
  onChange?: () => void;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[12.5px] font-medium text-foreground">
        {label} {required && <span className="text-muted-foreground">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
