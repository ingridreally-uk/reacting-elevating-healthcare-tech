import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MessageSquare, ShieldCheck, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import { pageMeta } from "@/lib/seo";
import { type as mktType } from "@/components/marketing/design";
import { cn } from "@/lib/utils";
import { FIELD_MAX, PUBLIC_ENQUIRY_EMAIL } from "@/lib/leads/constants";
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

export const Route = createFileRoute("/book-demo")({
  head: () =>
    pageMeta({
      title: "Book a Demo — Dental Assist by Reacting",
      description:
        "Book a 30-minute online walkthrough of Dental Assist. See the platform, ask questions, no obligation.",
      path: "/book-demo",
    }),
  component: BookDemoPage,
});

const highlights = [
  { icon: Clock, title: "30 minutes", body: "A focused walkthrough that respects your time." },
  { icon: Monitor, title: "See the platform", body: "Live product tour tailored to your practice." },
  { icon: MessageSquare, title: "Ask questions", body: "Time set aside for real answers, not a script." },
  { icon: ShieldCheck, title: "No obligation", body: "No pressure, no commitment. Decide in your own time." },
];

type FieldErrors = Partial<Record<"firstName" | "lastName" | "email" | "practice", string>>;

function BookDemoPage() {
  const { status, errorCode, setTurnstileToken, submit, submitting } = useLeadSubmit();
  const siteKey = turnstileSiteKey();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  return (
    <SiteShell>
      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-10 pt-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:px-10 lg:pb-11 lg:pt-10">
          <div>
            <div className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              Book a demo
            </div>
            <h1 className={mktType.pageH1}>
              See Dental Assist in your practice.
            </h1>
            <p className={cn("mt-4 max-w-xl", mktType.bodyLg)}>
              A 30-minute online walkthrough with our team. We'll show you
              the platform end-to-end, answer your questions and help you decide
              if it's the right fit for your practice.
            </p>

            <ul className="mt-5 space-y-3.5">
              {highlights.map((h) => (
                <li key={h.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <h.icon className="h-4 w-4 text-foreground" strokeWidth={1.75} />
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold tracking-tight text-foreground">
                      {h.title}
                    </div>
                    <p className="mt-1 text-[14px] leading-[1.6] text-muted-foreground">
                      {h.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_40px_80px_-40px_rgb(15_23_42/0.18)] sm:p-6">
              {status === "success" ? (
                <LeadSuccess title="Thank you.">
                  Your demo request has been sent. We'll be in touch.
                </LeadSuccess>
              ) : (
                <form
                  noValidate
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (submitting) return;
                    const values = new FormData(e.currentTarget);
                    const firstName = String(values.get("firstName") ?? "");
                    const lastName = String(values.get("lastName") ?? "");
                    const email = String(values.get("email") ?? "");
                    const practiceName = String(values.get("practice") ?? "");
                    const next: FieldErrors = {};
                    if (!firstName.trim()) next.firstName = "Please enter your first name.";
                    if (!lastName.trim()) next.lastName = "Please enter your last name.";
                    if (!email.trim()) next.email = "Please enter your work email.";
                    else if (!looksLikeEmail(email)) next.email = "Please enter a valid work email.";
                    if (!practiceName.trim()) next.practice = "Please enter your practice name.";
                    setFieldErrors(next);
                    if (Object.keys(next).length) return;
                    await submit({
                      source: "book-demo",
                      firstName,
                      lastName,
                      email,
                      practiceName,
                      role: String(values.get("role") ?? ""),
                      surgeries: String(values.get("surgeries") ?? ""),
                      notes: String(values.get("notes") ?? ""),
                      honeypot: String(values.get("faxNumber") ?? ""),
                    });
                  }}
                  className="relative space-y-4"
                >
                  <HoneypotInput />
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Request your demo
                    </div>
                    <h2 className={cn("mt-2", mktType.subH2)}>
                      Tell us a little about you.
                    </h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="First name"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      maxLength={FIELD_MAX.name}
                      error={fieldErrors.firstName}
                      onChange={() => setFieldErrors((e) => ({ ...e, firstName: undefined }))}
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      maxLength={FIELD_MAX.name}
                      error={fieldErrors.lastName}
                      onChange={() => setFieldErrors((e) => ({ ...e, lastName: undefined }))}
                    />
                  </div>
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
                  <Field
                    label="Practice name"
                    name="practice"
                    autoComplete="organization"
                    required
                    maxLength={FIELD_MAX.practice}
                    error={fieldErrors.practice}
                    onChange={() => setFieldErrors((e) => ({ ...e, practice: undefined }))}
                  />
                  <Field
                    label="Role"
                    name="role"
                    autoComplete="organization-title"
                    placeholder="e.g. Practice Manager"
                    maxLength={FIELD_MAX.role}
                  />
                  <Field
                    label="Number of surgeries"
                    name="surgeries"
                    autoComplete="off"
                    placeholder="e.g. 4"
                    maxLength={FIELD_MAX.surgeries}
                  />
                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-1.5 block text-[12.5px] font-medium text-foreground"
                    >
                      Anything we should know?
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      autoComplete="off"
                      maxLength={FIELD_MAX.notes}
                      className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
                    />
                  </div>

                  <TurnstileField siteKey={siteKey} onToken={setTurnstileToken} />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="mt-2 h-11 w-full rounded-full text-[13.5px] font-medium"
                  >
                    {submitting ? "Submitting..." : "Request Demo"}
                  </Button>

                  {status === "error" && errorCode ? <LeadError code={errorCode} /> : (
                    <p className="text-center text-[12px] leading-[1.55] text-muted-foreground">
                      We'll reply within one working day. No spam, ever. Or email{" "}
                      <a
                        href={`mailto:${PUBLIC_ENQUIRY_EMAIL}`}
                        className="text-foreground underline-offset-4 hover:underline"
                      >
                        {PUBLIC_ENQUIRY_EMAIL}
                      </a>
                      .
                    </p>
                  )}
                  <LeadPrivacyNote />
                </form>
              )}
            </div>
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
  placeholder,
  required,
  autoComplete,
  maxLength,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
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
