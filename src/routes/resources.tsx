import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources | Reacting" },
      {
        name: "description",
        content:
          "Learn about Reacting and book a personalised demo. Our Academy, Help Centre and training resources are currently in development.",
      },
      { property: "og:title", content: "Resources | Reacting" },
      {
        property: "og:description",
        content:
          "Learn about Reacting and book a personalised demo. Our Academy, Help Centre and training resources are currently in development.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/resources` }],
  }),
  component: ResourcesPage,
});

const reassurances = [
  "Personal onboarding",
  "Live Q&A",
  "Help setting up your practice",
  "No obligation demo",
];

const roadmap = ["Training Academy", "Video Tutorials", "Help Centre", "Blog & Best Practices"];

function ResourcesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Resources"
        title="Resources for smarter dental practice operations"
        body="Resources are currently being prepared. We're building practical guides, videos and documentation to help dental practices get the most from Reacting. In the meantime, we'd be happy to walk you through everything personally."
        primaryCta={{ label: "Book a Demo", to: "/book-demo" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
      />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-2 lg:px-10 lg:pb-12">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {reassurances.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[14px] text-foreground/85">
                <Check className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-6">
            <div className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Coming Soon
            </div>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {roadmap.map((item) => (
                <li
                  key={item}
                  className="text-[14.5px] font-medium tracking-tight text-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TrustBar />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 text-center lg:px-10 lg:py-14">
          <h2 className="mx-auto max-w-2xl text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px]">
            Need help today?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.65] text-muted-foreground">
            Our team is happy to answer questions and demonstrate Reacting using your own workflows.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
              <Link to="/book-demo">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-11 rounded-full px-5 text-[13.5px] font-medium text-foreground hover:bg-secondary"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
