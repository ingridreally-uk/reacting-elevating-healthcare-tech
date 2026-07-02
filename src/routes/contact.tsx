import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";

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
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
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
              body="hello@reacting.co"
              caption="For general enquiries and demo requests."
            />
            <ContactCard
              icon={MessageSquare}
              title="Support"
              body="support@reacting.co"
              caption="For existing customers needing help."
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_40px_80px_-40px_rgb(15_23_42/0.18)] sm:p-7">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <h2 className="mt-5 text-[22px] font-semibold tracking-tight">
                  Message sent.
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-[1.6] text-muted-foreground">
                  Thanks for getting in touch — we&apos;ll reply within one
                  working day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Work email" name="email" type="email" required />
                </div>
                <Field label="Practice / company" name="company" />
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-medium text-foreground">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 h-11 w-full rounded-full text-[13.5px] font-medium"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function ContactCard({
  icon: Icon,
  title,
  body,
  caption,
}: {
  icon: typeof Mail;
  title: string;
  body: string;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7">
      <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
      <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </div>
      <div className="mt-2 text-[20px] font-semibold tracking-tight text-foreground">
        {body}
      </div>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">{caption}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
      />
    </div>
  );
}
