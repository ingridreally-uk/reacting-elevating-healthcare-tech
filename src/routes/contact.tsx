import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dental Assist by Reacting" },
      {
        name: "description",
        content:
          "Get in touch with the Reacting team about Dental Assist — questions, partnerships or early access.",
      },
      { property: "og:title", content: "Contact — Dental Assist" },
      {
        property: "og:description",
        content: "Get in touch with the Reacting team about Dental Assist.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [showEndpointNotice, setShowEndpointNotice] = useState(false);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to the team."
        body="Questions about Dental Assist, early access or partnerships — send us a note and we&apos;ll reply within one working day."
      />

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:px-10 lg:py-20">
          <div className="space-y-6">
            <ContactCard
              icon={Mail}
              title="Email"
              email="hello@reacting.io"
              caption="For general questions, partnerships and early access."
            />
            <ContactCard
              icon={MessageSquare}
              title="Support"
              email="support@reacting.io"
              caption="For existing customers needing help."
            />
          </div>

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
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  autoComplete="name"
                  required
                />
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <Field
                label="Practice / company"
                name="company"
                autoComplete="organization"
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[12.5px] font-medium text-foreground"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
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
                {submitting ? "Sending..." : "Send Message"}
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
                Looking for a product walkthrough?{" "}
                <Link
                  to="/book-demo"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  Book a Demo
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function ContactCard({
  icon: Icon,
  title,
  email,
  caption,
}: {
  icon: typeof Mail;
  title: string;
  email: string;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7">
      <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
      <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </div>
      <a
        href={`mailto:${email}`}
        className="mt-2 block text-[20px] font-semibold tracking-tight text-foreground"
      >
        {email}
      </a>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">{caption}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
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
        autoComplete={autoComplete}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
      />
    </div>
  );
}
