import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MessageSquare, ShieldCheck, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/book-demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo — Dental Assist by Reacting" },
      {
        name: "description",
        content:
          "Book a 30-minute online walkthrough of Dental Assist. See the platform, ask questions, no obligation.",
      },
      { property: "og:title", content: "Book a Demo — Dental Assist" },
      {
        property: "og:description",
        content:
          "30-minute online walkthrough. See the platform, ask questions, no obligation.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/book-demo` }],
  }),
  component: BookDemoPage,
});

const highlights = [
  { icon: Clock, title: "30 minutes", body: "A focused walkthrough that respects your time." },
  { icon: Monitor, title: "See the platform", body: "Live product tour tailored to your practice." },
  { icon: MessageSquare, title: "Ask questions", body: "Time set aside for real answers, not a script." },
  { icon: ShieldCheck, title: "No obligation", body: "No pressure, no commitment. Decide in your own time." },
];

function BookDemoPage() {
  const [submitting, setSubmitting] = useState(false);
  const [showEndpointNotice, setShowEndpointNotice] = useState(false);

  return (
    <SiteShell>
      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-14 pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:px-10 lg:pb-16 lg:pt-20">
          {/* Left: value */}
          <div>
            <div className="mb-5 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              Book a demo
            </div>
            <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[52px]">
              See Dental Assist in your practice.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-muted-foreground sm:text-[18px]">
              A 30-minute online walkthrough with our team. We&apos;ll show you
              the platform end-to-end, answer your questions and help you decide
              if it&apos;s the right fit for your practice.
            </p>

            <ul className="mt-6 space-y-4">
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

          {/* Right: form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_40px_80px_-40px_rgb(15_23_42/0.18)] sm:p-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (submitting) return;
                  setSubmitting(true);
                  window.setTimeout(() => {
                    setSubmitting(false);
                    setShowEndpointNotice(true);
                  }, 600);
                }}
                className="space-y-5"
              >
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Request your demo
                  </div>
                  <h2 className="mt-2 text-[22px] font-semibold tracking-tight">
                    Tell us a little about you.
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="First name"
                    name="firstName"
                    autoComplete="given-name"
                    required
                  />
                  <Field
                    label="Last name"
                    name="lastName"
                    autoComplete="family-name"
                    required
                  />
                </div>
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field
                  label="Practice name"
                  name="practice"
                  autoComplete="organization"
                  required
                />
                <Field
                  label="Role"
                  name="role"
                  autoComplete="organization-title"
                  placeholder="e.g. Practice Manager"
                />
                <Field
                  label="Number of surgeries"
                  name="surgeries"
                  autoComplete="off"
                  placeholder="e.g. 4"
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
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="mt-2 h-11 w-full rounded-full text-[13.5px] font-medium"
                >
                  {submitting ? "Submitting..." : "Request Demo"}
                </Button>

                {showEndpointNotice && (
                  <p
                    className="text-center text-[12.5px] leading-[1.55] text-muted-foreground"
                    aria-live="polite"
                  >
                    Online submission is being connected before launch. Please
                    email us directly in the meantime at{" "}
                    <a
                      href="mailto:hello@reacting.io"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      hello@reacting.io
                    </a>
                    .
                  </p>
                )}

                <p className="text-center text-[11.5px] text-muted-foreground">
                  We&apos;ll reply within one working day. No spam, ever.
                </p>
              </form>
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
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
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
      />
    </div>
  );
}
