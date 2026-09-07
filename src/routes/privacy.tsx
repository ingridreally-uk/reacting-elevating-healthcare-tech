import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageMeta({
      title: "Privacy Policy | Reacting",
      description: "Privacy policy for Reacting and Dental Assist.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[720px] px-6 py-12 lg:px-10 lg:py-14">
        <h1 className="text-[32px] font-semibold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-muted-foreground">
          This page summarises how Reacting handles personal data for website visitors and Dental
          Assist account holders. For account-specific privacy questions, please{" "}
          <Link to="/contact" className="underline underline-offset-2">
            contact us
          </Link>
          .
        </p>
        <div className="mt-8 space-y-5 text-[14.5px] leading-[1.7] text-foreground/90">
          <p>
            We collect information you provide (such as contact details and account information) to
            operate Dental Assist, respond to enquiries and improve our services.
          </p>
          <p>
            When you submit the Contact or Book a Demo form, Reacting processes the information you
            provide to respond to your enquiry, arrange or follow up on a requested demonstration,
            and communicate with you about that request where relevant.
          </p>
          <p>
            We use Resend as an email delivery provider to send website enquiry and demo-form
            submissions to Reacting so we can reply.
          </p>
          <p>
            These forms also use Cloudflare Turnstile to help protect against spam and automated
            abuse. Cloudflare may process technical information needed to complete that verification.
          </p>
          <p>
            We do not sell personal data. Access to practice operational data is restricted to
            authorised account users and trusted processors required to deliver the service.
          </p>
          <p>
            You may request access, correction or deletion of personal data where applicable under
            UK data protection law.
          </p>
          <p>
            If you choose to contact us via WhatsApp, your phone number and message content are
            processed through WhatsApp and Meta as an optional sales and support channel. Reacting
            receives and uses that information only to respond to your enquiry. WhatsApp is not used
            for clinical or patient communication.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
