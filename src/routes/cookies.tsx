import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Reacting" },
      { name: "description", content: "How Reacting uses cookies on the website." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/cookies` }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[720px] px-6 py-12 lg:px-10 lg:py-14">
        <h1 className="text-[32px] font-semibold tracking-tight text-foreground">Cookie Policy</h1>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-muted-foreground">
          This page explains how cookies may be used on reacting.io. For privacy details, see our{" "}
          <Link to="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-8 space-y-5 text-[14.5px] leading-[1.7] text-foreground/90">
          <p>
            Essential cookies may be used to keep the site secure and functioning correctly.
            Analytics cookies, if enabled, help us understand how the website is used so we can
            improve it.
          </p>
          <p>
            You can control cookies through your browser settings. Disabling some cookies may affect
            site behaviour.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
