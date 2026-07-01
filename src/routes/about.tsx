import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Building2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";

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
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* Practice photography — 2-image mosaic */}
            <div className="grid grid-cols-5 grid-rows-5 gap-3">
              <div className="col-span-3 row-span-3 overflow-hidden rounded-2xl border border-border/70 shadow-[0_20px_50px_-30px_oklch(0.17_0.05_265/0.28)]">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                  alt="Reception desk inside the partner dental practice"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="col-span-2 row-span-2 col-start-4 row-start-1 overflow-hidden rounded-2xl border border-border/70">
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80"
                  alt="Practice manager working at a laptop"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="col-span-2 row-span-3 col-start-4 row-start-3 overflow-hidden rounded-2xl border border-border/70">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
                  alt="Store room shelves with dental consumables"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="col-span-3 row-span-2 col-start-1 row-start-4 overflow-hidden rounded-2xl border border-border/70">
                <img
                  src="https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=1000&q=80"
                  alt="Clinical surgery, treatment chair and light"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
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
                  Today Dental Assist is used by the practice it was built in
                  and is being prepared for other practices ready to leave paper
                  behind. Every feature still has to earn its place in daily
                  use.
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border/70 pt-6">
                {[
                  { icon: MapPin, k: "Based", v: "United Kingdom" },
                  { icon: Building2, k: "Founded", v: "2023" },
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
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
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
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <h2 className="mx-auto max-w-2xl text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px]">
            Interested in early access?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.65] text-muted-foreground">
            We&apos;re working with a small number of beta practices. Get in
            touch to see if Dental Assist is the right fit for yours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
