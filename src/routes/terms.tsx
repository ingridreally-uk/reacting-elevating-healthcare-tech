import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Reacting" },
      { name: "description", content: "Terms of use for the Reacting website and Dental Assist." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[720px] px-6 py-12 lg:px-10 lg:py-14">
        <h1 className="text-[32px] font-semibold tracking-tight text-foreground">Terms of Use</h1>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-muted-foreground">
          These terms summarise use of the Reacting website and Dental Assist. Account agreements
          may include additional commercial terms. Questions:{" "}
          <Link to="/contact" className="underline underline-offset-2">
            contact us
          </Link>
          .
        </p>
        <div className="mt-8 space-y-5 text-[14.5px] leading-[1.7] text-foreground/90">
          <p>
            Dental Assist is provided as a web application for authorised practice users. You are
            responsible for safeguarding account credentials and for the accuracy of information
            entered into the system.
          </p>
          <p>
            Subscriptions may be cancelled at any time. Trial access does not require a credit card.
            Pricing is shown on the website and confirmed at signup.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
