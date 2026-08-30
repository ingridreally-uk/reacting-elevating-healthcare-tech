import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Building2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";
import { type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About Reacting — The Team Behind Dental Assist",
      description:
        "Reacting builds cloud software for healthcare businesses. Dental Assist, our first product, was built inside a real dental practice.",
      path: "/about",
    }),
  component: AboutPage,
});

const principles = [
  {
    title: "Built where it's used",
    body: "Dental Assist is developed inside a working practice. Every feature is tested against real daily operations before it ships.",
  },
  {
    title: "Calm by design",
    body: "Healthcare teams have enough on. Our software is quiet, uncluttered and predictable — never in the way.",
  },
  {
    title: "Serious about the boring parts",
    body: "Reliability, accuracy and clear workflows come first. Delight comes from software that just works.",
  },
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Reacting"
        title="Cloud software for healthcare, built where it's used."
        body="Reacting is a small, focused team building cloud tools for healthcare businesses. Dental Assist is our first product — developed and refined inside a real dental practice."
      />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-8 lg:px-10 lg:pb-14 lg:pt-8">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,28.75rem)_minmax(0,1fr)] lg:gap-12">
            <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-border/70 shadow-[0_20px_50px_-30px_oklch(0.17_0.05_265/0.28)] lg:mx-0">
              <img
                src="/practice/practice-team.webp"
                alt="The founding team behind Reacting and Dental Assist."
                className="aspect-[6/5] h-auto w-full object-cover object-[center_28%] lg:aspect-auto lg:h-[388px]"
                loading="lazy"
              />
            </div>
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Our story
              </div>
              <h2 className={mktType.sectionH2}>
                A tool we needed ourselves.
              </h2>
              <div className="mt-4 space-y-4 text-[16px] leading-[1.65] text-foreground/85 sm:text-[17px]">
                <p>
                  Reacting started inside a dental practice that was drowning in
                  spreadsheets, order books and email threads. We built the tool
                  we wished existed — a single, calm workspace for the
                  operational side of running a practice.
                </p>
                <p>
                  Development began in 2021, and the product has been shaped ever
                  since by the day-to-day operational needs of the founding
                  practice. It is now available to dental practices with a 14-day
                  free trial. Every feature still has to earn its place in daily
                  use.
                </p>
              </div>

              <dl className="mt-5 grid grid-cols-1 gap-5 border-t border-border/70 pt-5 sm:grid-cols-3">
                {[
                  { icon: MapPin, k: "Based", v: "United Kingdom" },
                  { icon: Building2, k: "Development began", v: "2021" },
                  { icon: Stethoscope, k: "Built inside", v: "A real practice" },
                ].map((s) => (
                  <div key={s.k}>
                    <s.icon
                      className="h-4 w-4 text-[oklch(0.36_0.09_260)]"
                      strokeWidth={1.75}
                    />
                    <dt className="mt-3 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {s.k}
                    </dt>
                    <dd className="mt-1 text-[14px] font-semibold text-foreground">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="border-b border-border/60 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14">
          <div className="mb-6 max-w-2xl">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Principles
            </div>
            <h2 className={mktType.sectionH2}>
              How we build.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div key={i}>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="mt-3 text-[20px] font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-10 lg:py-14">
          <h2 className={cn("mx-auto max-w-2xl", mktType.sectionH2)}>
            Interested in Dental Assist?
          </h2>
          <p className={cn("mx-auto mt-3.5 max-w-lg", mktType.body)}>
            Start a 14-day free trial, or get in touch to see if it is the right
            fit for your practice.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
              <a href="https://app.reacting.io/signup" rel="noopener noreferrer">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-11 rounded-full px-5 text-[13.5px] font-medium text-foreground hover:bg-secondary"
            >
              <Link to="/book-demo">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
