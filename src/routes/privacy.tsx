import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Reacting" },
      { name: "description", content: "Privacy policy for Reacting and Dental Assist." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/privacy` }],
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
            We do not sell personal data. Access to practice operational data is restricted to
            authorised account users and trusted processors required to deliver the service.
          </p>
          <p>
            You may request access, correction or deletion of personal data where applicable under
            UK data protection law.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
