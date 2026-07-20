import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import {
  BrowserFrame,
  ShowcaseScreenshot,
  TrustBar,
} from "@/components/site/ProductMock";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Dental Practice Management Software | Dental Assist" },
      {
        name: "description",
        content:
          "Dental Assist helps dental practices manage purchasing, inventory, suppliers and day-to-day operations with software developed and refined inside a real dental practice.",
      },
      {
        property: "og:title",
        content: "Dental Practice Management Software | Dental Assist",
      },
      {
        property: "og:description",
        content:
          "Dental Assist helps dental practices manage purchasing, inventory, suppliers and day-to-day operations with software developed and refined inside a real dental practice.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/product` }],
  }),
  component: ProductPage,
});

const SCREEN = {
  dashboard: "/product-screens/screen-10.png",
  inventory: "/product-screens/screen-22.png",
  purchasing: "/product-screens/screen-05.png",
};

const showcases = [
  {
    id: "inventory",
    eyebrow: "Inventory management",
    title: "Know what is in stock before it runs low.",
    body: "Track materials across surgeries and store rooms with clear counts and alerts. Reduce the risk of missing materials disrupting the working day.",
    caption: "Inventory view from the live product.",
    src: SCREEN.inventory,
    alt: "Dental Assist inventory management",
    url: "app.reacting.io / stock",
    imageFirst: true,
    tone: "muted" as const,
  },
  {
    id: "purchasing",
    eyebrow: "Purchasing workflow",
    title: "Raise and track orders without the paper chase.",
    body: "Approve and follow purchase orders from one workspace. Keep the team aligned on what was ordered, what is waiting and what has arrived.",
    caption: "Purchase orders from the live product.",
    src: SCREEN.purchasing,
    alt: "Dental Assist purchasing workflow",
    url: "app.reacting.io / purchasing",
    imageFirst: false,
    tone: "white" as const,
  },
];

const included = [
  "Inventory management",
  "Purchase order workflow",
  "Supplier directory & price lists",
  "RFQ side-by-side comparison",
  "Delivery tracking & goods-in",
  "Spend and usage reporting",
  "Team access for owners and managers",
  "Cloud workspace",
];

const HERO_FRAME =
  "shadow-[0_24px_50px_-30px_rgb(15_23_42/0.2),0_1px_3px_-1px_rgb(15_23_42/0.08)]";

/**
 * Media slot for the product hero. Pass `videoSrc` later to swap the
 * dashboard poster for a looping product video without changing layout.
 */
function HeroProductMedia({
  posterSrc,
  posterAlt,
  videoSrc,
  caption,
}: {
  posterSrc: string;
  posterAlt: string;
  videoSrc?: string;
  caption: string;
}) {
  return (
    <div className="w-full min-w-0">
      <BrowserFrame url="app.reacting.io / dashboard" className={HERO_FRAME}>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background sm:aspect-[1920/890]">
          {videoSrc ? (
            <video
              className="absolute inset-0 h-full w-full object-cover object-top"
              poster={posterSrc}
              src={videoSrc}
              muted
              playsInline
              autoPlay
              loop
            />
          ) : (
            <img
              src={posterSrc}
              alt={posterAlt}
              loading="eager"
              fetchPriority="high"
              draggable={false}
              className="absolute left-0 top-0 h-auto w-full max-w-none origin-top-left scale-[1.45] select-none sm:inset-0 sm:h-full sm:w-full sm:origin-center sm:scale-100 sm:object-cover sm:object-top"
            />
          )}
        </div>
      </BrowserFrame>
      <p className="mt-3 text-[12px] text-muted-foreground">{caption}</p>
    </div>
  );
}

function ProductPage() {
  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-10 lg:px-10 lg:pb-12 lg:pt-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.46fr_0.54fr] lg:gap-10">
            <div className="min-w-0">
              <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
                Dental Assist · A Reacting product
              </div>
              <h1 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[44px] lg:text-[48px]">
                Spend less time chasing stock and orders. Keep the practice
                running.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-muted-foreground sm:text-[17px]">
                Dental Assist helps dental practices manage purchasing,
                inventory and suppliers in one calm workspace. Developed and
                refined inside a real dental practice, and now opening to a
                small number of additional practices.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-11 w-full rounded-full px-6 text-[13.5px] font-medium sm:w-auto"
                >
                  <Link to="/book-demo">
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-11 w-full rounded-full px-5 text-[13.5px] font-medium text-foreground hover:bg-secondary sm:w-auto"
                >
                  <Link to="/features">See Features</Link>
                </Button>
              </div>
            </div>

            <HeroProductMedia
              posterSrc={SCREEN.dashboard}
              posterAlt="Dental Assist dashboard — real product screen"
              caption="Live inventory, purchasing queue, supplier activity and spend — all in one workspace."
            />
          </div>
        </div>
      </section>

      <TrustBar />

      {showcases.map((s) => (
        <section
          key={s.id}
          className={`border-b border-border/60 ${
            s.tone === "muted" ? "bg-[#F8FAFC]" : "bg-background"
          }`}
        >
          <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              {s.imageFirst ? (
                <>
                  <div className="w-full min-w-0 max-w-[42rem]">
                    <BrowserFrame url={s.url} className={HERO_FRAME}>
                      <ShowcaseScreenshot src={s.src} alt={s.alt} />
                    </BrowserFrame>
                    <p className="mt-3 text-[12px] text-muted-foreground">
                      {s.caption}
                    </p>
                  </div>
                  <div>
                    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {s.eyebrow}
                    </div>
                    <h2 className="max-w-md text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[34px]">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.65] text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {s.eyebrow}
                    </div>
                    <h2 className="max-w-md text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[34px]">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.65] text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                  <div className="w-full min-w-0 max-w-[42rem] lg:justify-self-end">
                    <BrowserFrame url={s.url} className={HERO_FRAME}>
                      <ShowcaseScreenshot src={s.src} alt={s.alt} />
                    </BrowserFrame>
                    <p className="mt-3 text-[12px] text-muted-foreground">
                      {s.caption}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-border/60 bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1280px] px-6 py-9 lg:px-10 lg:py-12">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            What&apos;s included
          </div>
          <h2 className="max-w-lg text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[34px]">
            Core capabilities for day-to-day practice operations.
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2">
            {included.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                  strokeWidth={2.25}
                />
                <span className="text-[14px] leading-[1.45] text-foreground">
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-9 text-center lg:px-10 lg:py-12">
          <h2 className="mx-auto max-w-2xl text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[36px]">
            See Dental Assist in your practice.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-muted-foreground">
            See how Dental Assist can support purchasing, stock and supplier
            workflows in your practice.
          </p>
          <div className="mt-5 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-11 w-full rounded-full px-6 text-[13.5px] font-medium sm:w-auto"
            >
              <Link to="/book-demo">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
