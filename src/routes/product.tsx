import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";
import { ProductFrame } from "@/components/marketing/ProductFrame";
import { MediaViewer } from "@/components/marketing/MediaViewer";
import { SCREENS } from "@/components/marketing/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/product")({
  head: () =>
    pageMeta({
      title: "Dental Stock, Purchasing & RFQ Software | Dental Assist",
      description:
        "Dental Assist helps dental practices manage purchasing, inventory, suppliers and day-to-day operations with software developed and refined inside a real dental practice.",
      path: "/product",
      imageAlt: "Dental Assist dashboard — real product screen",
    }),
  component: ProductPage,
});

/**
 * Operational journey, not a feature catalogue:
 * Hold → Risk → Decide → Order → Receive → Understand.
 * Supplier Management is consolidated into Supplier Comparison.
 */
const showcases = [
  {
    id: "inventory",
    eyebrow: "Inventory & procurement",
    title: "Know what is in stock before it runs low.",
    body: "Track materials across surgeries and store rooms with clear counts and alerts. Reduce the risk of missing materials disrupting the working day.",
    caption: "Inventory view from the live product.",
    src: SCREENS.stockPage,
    alt: "Dental Assist inventory management",
    url: "app.reacting.io / stock",
    imageFirst: true,
    tone: "muted" as const,
  },
  {
    id: "low-stock",
    eyebrow: "Low stock & expiry",
    title: "See risk early — before it hits the surgery day.",
    body: "Surface items that need attention while there is still time to act. Helps teams reduce shortages and expired materials sitting unnoticed in store rooms.",
    caption: "Low-stock and expiry follow-up from the live product.",
    src: SCREENS.lowStockPage,
    alt: "Dental Assist low-stock cards ready for RFQ action",
    url: "app.reacting.io / low-stock",
    imageFirst: false,
    tone: "white" as const,
  },
  {
    id: "rfq",
    eyebrow: "Supplier comparison",
    title: "Compare supplier responses before you commit.",
    body: "Send the same request to multiple suppliers and review replies side by side. Keep contacts, account details and purchase history together so the team can decide without digging through emails.",
    caption: "RFQ comparison from the live product.",
    src: SCREENS.rfqCompare,
    alt: "Dental Assist RFQ comparison with itemised quotes and budget impact",
    url: "app.reacting.io / rfqs",
    imageFirst: true,
    tone: "muted" as const,
  },
  {
    id: "purchasing",
    eyebrow: "Purchase orders",
    title: "Raise and track orders without the paper chase.",
    body: "Approve and follow purchase orders from one workspace. Keep the team aligned on what was ordered, what is waiting and what has arrived.",
    caption: "Purchase orders from the live product.",
    src: SCREENS.purchasing,
    alt: "Dental Assist purchasing workflow",
    url: "app.reacting.io / purchasing",
    imageFirst: false,
    tone: "white" as const,
  },
  {
    id: "deliveries",
    eyebrow: "Deliveries & goods-in",
    title: "Confirm arrivals and close the loop on follow-up.",
    body: "Record what arrived, where it goes and what still needs attention. Supports day-to-day receiving without relying on paper notes or scattered messages.",
    caption: "Receive-order workflow from the live product.",
    src: SCREENS.deliveries,
    alt: "Dental Assist receive-order workflow",
    url: "app.reacting.io / purchasing / receive",
    imageFirst: true,
    tone: "muted" as const,
  },
  {
    id: "reporting",
    eyebrow: "Reports",
    title: "Understand spend and usage without rebuilding spreadsheets.",
    body: "Review spend, usage and RFQ-related savings signals in one place. Helps owners and managers see patterns and make calmer purchasing decisions.",
    caption: "Spend and usage reporting from the live product.",
    src: SCREENS.reporting,
    alt: "Dental Assist reporting with spend, usage and savings over six months",
    url: "app.reacting.io / savings-and-usage",
    imageFirst: false,
    tone: "white" as const,
  },
];

/**
 * Media slot for the product hero. Dashboard is the shared-view proof —
 * same frame, crop and responsive behaviour as showcase ProductFrames.
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
      <ProductFrame emphasis="hero" label="app.reacting.io / dashboard">
        <MediaViewer
          imageSrc={posterSrc}
          videoSrc={videoSrc}
          alt={posterAlt}
          priority
          objectFit="contain"
          aspectRatio="16 / 10"
        />
      </ProductFrame>
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
              </div>
            </div>

            <HeroProductMedia
              posterSrc={SCREENS.dashboard}
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
                  <div className="w-full min-w-0">
                    <ProductFrame label={s.url}>
                      <MediaViewer
                        imageSrc={s.src}
                        alt={s.alt}
                        objectFit="contain"
                        aspectRatio="16 / 10"
                      />
                    </ProductFrame>
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
                  <div className="w-full min-w-0 lg:justify-self-end">
                    <ProductFrame label={s.url}>
                      <MediaViewer
                        imageSrc={s.src}
                        alt={s.alt}
                        objectFit="contain"
                        aspectRatio="16 / 10"
                      />
                    </ProductFrame>
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
