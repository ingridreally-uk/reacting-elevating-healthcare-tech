import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Building2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Reacting" },
      {
        name: "description",
        content:
          "Reacting builds cloud software for healthcare businesses. Dental Assist, our first product, was built inside a real dental practice.",
      },
      { property: "og:title", content: "About — Reacting" },
      {
        property: "og:description",
        content:
          "Reacting builds cloud software for healthcare, starting with Dental Assist.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/about` }],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "Built where it&apos;s used",
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
        title="Cloud software for healthcare, built where it&apos;s used."
        body="Reacting is a small, focused team building cloud tools for healthcare businesses. Dental Assist is our first product — developed and refined inside a real dental practice."
      />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
            <div className="overflow-hidden rounded-2xl border border-border/70 shadow-[0_20px_50px_-30px_oklch(0.17_0.05_265/0.28)]">
              <img
                src="/practice/practice-team.webp"
                alt="The founding team behind Reacting and Dental Assist."
                className="aspect-[4/5] h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Our story
              </div>
              <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px]">
                A tool we needed ourselves.
              </h2>
              <div className="mt-6 space-y-5 text-[16.5px] leading-[1.7] text-foreground/85">
                <p>
                  Reacting started inside a dental practice that was drowning in
                  spreadsheets, order books and email threads. We built the tool
                  we wished existed — a single, calm workspace for the
                  operational side of running a practice.
                </p>
                <p>
                  Today Dental Assist has been developed and used in the founding
                  dental practice for the past 2–3 years. It is now opening to a
                  small number of additional practices. Every feature still has to
                  earn its place in daily use.
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-border/70 pt-6 sm:grid-cols-3">
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

          <div className="mt-10">
            <Button asChild size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
              <Link to="/book-demo">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="border-b border-border/60 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-14">
          <div className="mb-8 max-w-2xl">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Principles
            </div>
            <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px]">
              How we build.
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div key={i}>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3
                  className="mt-4 text-[20px] font-semibold tracking-tight"
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
                <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 text-center lg:px-10 lg:py-14">
          <h2 className="mx-auto max-w-2xl text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px]">
            Interested in early access?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.65] text-muted-foreground">
            We&apos;re opening Dental Assist to a small number of additional
            practices. Get in touch to see if it is the right fit for yours.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
              <Link to="/book-demo">
                Book Your Demo
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
