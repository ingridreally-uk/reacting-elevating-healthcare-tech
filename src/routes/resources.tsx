import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, PlaySquare, LifeBuoy, Newspaper, ArrowRight } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Dental Assist by Reacting" },
      {
        name: "description",
        content:
          "Learn Dental Assist through the Academy, product videos, help centre articles and the Reacting blog.",
      },
      { property: "og:title", content: "Resources — Dental Assist" },
      {
        property: "og:description",
        content:
          "Academy, videos, help centre and blog for Dental Assist users.",
      },
    ],
  }),
  component: ResourcesPage,
});

const resources = [
  {
    icon: GraduationCap,
    title: "Academy",
    body: "Structured lessons that take your team from first login to confident daily use.",
    tag: "Coming soon",
  },
  {
    icon: PlaySquare,
    title: "Videos",
    body: "Short product walkthroughs covering purchasing, inventory, RFQs and reporting.",
    tag: "Coming soon",
  },
  {
    icon: LifeBuoy,
    title: "Help Centre",
    body: "Practical answers to setup, workflow and administration questions.",
    tag: "Coming soon",
  },
  {
    icon: Newspaper,
    title: "Blog",
    body: "Notes from inside a real dental practice on operations, purchasing and technology.",
    tag: "Coming soon",
  },
];

function ResourcesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Resources"
        title="Learn Dental Assist at your pace."
        body="Guides, videos and help articles designed to get your whole team confident quickly. Written by the people who use the platform every day."
      />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-5 sm:grid-cols-2">
            {resources.map((r) => (
              <div
                key={r.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.15)]"
              >
                <r.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                <div className="mt-6 flex items-center gap-3">
                  <h3 className="text-[20px] font-semibold tracking-tight">
                    {r.title}
                  </h3>
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {r.tag}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <h2 className="mx-auto max-w-2xl text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px]">
            Prefer a guided walkthrough?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.65] text-muted-foreground">
            Book a 30-minute call with our team and we&apos;ll show you Dental
            Assist for your practice.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/book-demo"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[13.5px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book Your Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
