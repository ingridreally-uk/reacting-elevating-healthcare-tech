import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";
import { ProductFrame } from "@/components/marketing/ProductFrame";
import { MediaViewer } from "@/components/marketing/MediaViewer";
import { SCREENS, type MediaFit } from "@/components/marketing/content";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product")({
  head: () =>
    pageMeta({
      title: "Dental Stock, Purchasing & RFQ Software | Dental Assist",
      description:
        "Dental Assist is Reacting's operational workspace for dental inventory, suppliers and purchasing — developed and refined inside a real dental practice.",
      path: "/product",
      imageAlt: "Dental Assist dashboard — real product screen",
    }),
  component: ProductPage,
});

/** Breadth — not interactive explorer controls. */
const architecture = [
  "Inventory",
  "Stock risk",
  "Expiry",
  "Suppliers",
  "RFQs",
  "Purchase orders",
  "Deliveries",
  "Reporting",
] as const;

const roles = [
  {
    title: "Owner",
    line: "Spend, inventory value, stock risk and purchasing visibility.",
  },
  {
    title: "Practice Manager",
    line: "Suppliers, purchasing, follow-up and operational control.",
  },
  {
    title: "Nurse / Stock Lead",
    line: "Quantities, locations, expiry, replenishment and receiving.",
  },
] as const;

type Stage = {
  objectFit: MediaFit;
  objectPosition: string;
  aspectRatio: string;
  scale: number;
  /**
   * Expiry-only: CSS transform on the media (translateX + optional zoom)
   * inside an overflow stage — keeps complete left cards, clips right mint.
   */
  frameTransform?: string;
};

/**
 * Contained product preview — composed, not a masked raw crop.
 * Wide stage + light scale keeps KPI / Budget / Actions coherent without
 * enlarging the window or slicing cards at the left edge.
 */
const HERO_STAGE: Stage = {
  objectFit: "cover",
  objectPosition: "48% 12%",
  aspectRatio: "21 / 10",
  scale: 1.06,
};

type ExplorerItem = {
  id: string;
  tab: string;
  label: string;
  title: string;
  body: string;
  evidence?: string;
  src: string;
  alt: string;
  url: string;
  stage: Stage;
};

/**
 * Architectural Product Explorer — inspect areas inside Dental Assist.
 * Not Home's chronological DayInPractice journey.
 */
const explorerItems: ExplorerItem[] = [
  {
    id: "inventory",
    tab: "Inventory",
    label: "Inventory",
    title: "The live stock record.",
    body: "Counts, locations and item status the practice works from.",
    src: SCREENS.stockPage,
    alt: "Dental Assist inventory item detail with stock status and locations",
    url: "app.reacting.io / stock",
    stage: {
      objectFit: "cover",
      objectPosition: "60% 28%",
      aspectRatio: "16 / 10",
      scale: 1.2,
    },
  },
  {
    id: "suppliers",
    tab: "Suppliers",
    label: "Suppliers",
    title: "Every vendor in one place.",
    body: "Contacts, accounts and purchase history with the supplier record.",
    src: SCREENS.suppliers,
    alt: "Dental Assist supplier directory",
    url: "app.reacting.io / vendors",
    stage: {
      objectFit: "cover",
      objectPosition: "22% 6%",
      // Shallow stage — table does not need Inventory height.
      aspectRatio: "12 / 5",
      scale: 1.4,
    },
  },
  {
    id: "expiry",
    tab: "Expiry",
    label: "Expiry",
    title: "Risk you can still act on.",
    body: "Near-expiry and expired materials surface before write-off.",
    src: SCREENS.expiring,
    alt: "Dental Assist expiring stock follow-up",
    url: "app.reacting.io / expiring-stock",
    stage: {
      objectFit: "cover",
      objectPosition: "0% 40%",
      aspectRatio: "12 / 5",
      scale: 1,
      // Left-origin zoom + nudge: full first card, less right mint.
      frameTransform: "translateX(5%) scale(1.18)",
    },
  },
  {
    id: "insights",
    tab: "Insights",
    label: "Insights",
    title: "Spend, usage and savings in view.",
    body: "Order value, stock usage and RFQ savings without rebuilding spreadsheets.",
    evidence: "Savings & Usage from the live product.",
    src: SCREENS.reporting,
    alt: "Dental Assist Savings and Usage reporting with order value, stock usage and RFQ savings",
    url: "app.reacting.io / savings-and-usage",
    stage: {
      objectFit: "cover",
      objectPosition: "48% 12%",
      aspectRatio: "16 / 10",
      scale: 1.18,
    },
  },
];

function ProductPage() {
  const [active, setActive] = useState(0);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const item = explorerItems[active] ?? explorerItems[0];

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <SiteShell>
      {/* 1. Product-first hero — contained product window */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 pb-7 pt-10 lg:px-10 lg:pb-8 lg:pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              Dental Assist
            </div>
            <h1 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[40px] lg:text-[44px]">
              The operational workspace for running the practice beyond the
              surgery.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-muted-foreground sm:text-[16px]">
              Inventory, suppliers and purchasing in one Dental Assist product —
              developed inside a real dental practice.
            </p>
            <div className="mt-6 flex justify-center">
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

          <div className="mx-auto mt-6 w-full max-w-[820px] lg:mt-7">
            <ProductFrame
              label="app.reacting.io / dashboard"
              emphasis="hero"
              className="w-full"
            >
              <MediaViewer
                imageSrc={SCREENS.dashboard}
                alt="Dental Assist dashboard — spend, stock risk and purchasing overview"
                priority
                objectFit={HERO_STAGE.objectFit}
                objectPosition={HERO_STAGE.objectPosition}
                aspectRatio={HERO_STAGE.aspectRatio}
                scale={HERO_STAGE.scale}
              />
            </ProductFrame>
          </div>
        </div>
      </section>

      {/* 2. Architecture breadth — distinct from explorer tabs */}
      <section
        id="inside-dental-assist"
        aria-labelledby="inside-dental-assist-heading"
        className="scroll-mt-24 border-b border-border/60 bg-[#F8FAFC]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-5 lg:px-10 lg:py-6">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Inside Dental Assist
            </div>
            <h2
              id="inside-dental-assist-heading"
              className="mt-1.5 text-[20px] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[24px]"
            >
              One product. Connected capabilities.
            </h2>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
              Parts of Dental Assist — not separate tools.
            </p>
          </div>

          <p className="mt-3 max-w-4xl text-[13px] leading-[1.65] text-foreground/80">
            {architecture.map((label, index) => (
              <span key={label}>
                {index > 0 ? (
                  <span className="mx-2 text-border" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span className="font-medium text-foreground/85">{label}</span>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* 3. Product Explorer — one stage, architectural inspection */}
      <section
        aria-labelledby="explorer-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-7 lg:px-10 lg:py-8">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Product explorer
            </div>
            <h2
              id="explorer-heading"
              className="mt-1.5 text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[26px]"
            >
              Inspect what lives inside Dental Assist.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Dental Assist areas"
            className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {explorerItems.map((entry, index) => {
              const selected = index === active;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  ref={selected ? activeTabRef : undefined}
                  aria-selected={selected}
                  aria-controls="product-explorer-panel"
                  id={`explorer-tab-${entry.id}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "bg-[#0B1730] text-white"
                      : "bg-[#F8FAFC] text-foreground/80 ring-1 ring-border/70 hover:bg-white hover:text-foreground",
                  )}
                >
                  {entry.tab}
                </button>
              );
            })}
          </div>

          <div
            id="product-explorer-panel"
            role="tabpanel"
            aria-labelledby={`explorer-tab-${item.id}`}
            className="mt-5 grid items-center gap-5 rounded-2xl border border-border/60 bg-[#F8FAFC] p-4 sm:p-5 lg:mt-5 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-6 lg:p-5"
          >
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {item.label}
              </div>
              <h3 className="mt-2.5 text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[26px]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                {item.body}
              </p>
              {item.evidence ? (
                <p className="mt-3 text-[12px] text-muted-foreground/90">
                  {item.evidence}
                </p>
              ) : null}
            </div>

            <div className="w-full min-w-0">
              <ProductFrame label={item.url} emphasis="hero">
                {item.stage.frameTransform ? (
                  <div
                    className="relative w-full overflow-hidden bg-[#F1F5F9]"
                    style={{ aspectRatio: item.stage.aspectRatio }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        objectPosition: item.stage.objectPosition,
                        transform: item.stage.frameTransform,
                        transformOrigin: "left center",
                      }}
                    />
                  </div>
                ) : (
                  <MediaViewer
                    imageSrc={item.src}
                    alt={item.alt}
                    objectFit={item.stage.objectFit}
                    objectPosition={item.stage.objectPosition}
                    aspectRatio={item.stage.aspectRatio}
                    scale={item.stage.scale}
                  />
                )}
              </ProductFrame>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Role value */}
      <section
        aria-labelledby="roles-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10 lg:py-9">
          <h2
            id="roles-heading"
            className="text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[26px]"
          >
            Built for the people running the practice.
          </h2>
          <dl className="mt-5 divide-y divide-border/60 border-y border-border/60">
            {roles.map((role) => (
              <div
                key={role.title}
                className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:items-baseline sm:gap-8"
              >
                <dt className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">
                  {role.title}
                </dt>
                <dd className="text-[14.5px] leading-[1.5] text-muted-foreground">
                  {role.line}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 5. Boundary */}
      <section
        aria-labelledby="boundary-heading"
        className="border-b border-border/60 bg-[#F8FAFC]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-7 lg:px-10 lg:py-8">
          <p
            id="boundary-heading"
            className="max-w-3xl text-[14.5px] leading-[1.65] text-muted-foreground"
          >
            <span className="font-semibold text-foreground">
              Complements your clinical and booking systems.
            </span>{" "}
            Dental Assist is not a PMS and does not replace clinical records or
            appointment management — it focuses on non-clinical operational
            work: inventory, suppliers and purchasing.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-9 text-center lg:px-10 lg:py-11">
          <h2 className="mx-auto max-w-2xl text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[34px]">
            See Dental Assist in your practice.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-muted-foreground">
            Walk through the workspace with your own stock, suppliers and
            purchasing in mind.
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
