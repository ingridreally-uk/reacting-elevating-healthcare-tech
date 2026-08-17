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
        "Dental Assist is Reacting's operational workspace for dental inventory and procurement, suppliers and purchasing — developed and refined inside a real dental practice.",
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
  "Supplier quotes",
  "Orders",
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
  desktopScale?: number;
  desktopObjectPosition?: string;
  desktopObjectFit?: MediaFit;
  /** Desktop crop window. Mobile keeps the source aspect. */
  desktopAspectRatio?: string;
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
    src: "/product-screens/mkt-inventory-prophy.webp",
    alt: "Dental Assist stock record for DEHP Prophy Brush — quantity 4, minimum 1, Decon Room location",
    url: "app.reacting.io / stock",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: "1653 / 1057",
      scale: 1,
    },
  },
  {
    id: "suppliers",
    tab: "Suppliers",
    label: "Suppliers",
    title: "Supplier details and purchase history, together.",
    body: "Contacts, account details and order history in one supplier record.",
    src: "/product-screens/mkt-vendor-detail.webp",
    alt: "Dental Assist supplier record for Blackthorn — contacts, internal note and purchase history with 105 orders",
    url: "app.reacting.io / vendors",
    stage: {
      objectFit: "contain",
      objectPosition: "center top",
      aspectRatio: "1324 / 969",
      scale: 1,
      desktopObjectFit: "cover",
      desktopObjectPosition: "center top",
      desktopAspectRatio: "1324 / 800",
    },
  },
  {
    id: "expiry",
    tab: "Expiry",
    label: "Expiry",
    title: "Risk you can still act on.",
    body: "Near-expiry and expired materials surface before write-off.",
    src: "/product-screens/mkt-expiring-review.webp",
    alt: "Dental Assist expiring stock — four items need review, including expired materials and one item expiring in 27 days",
    url: "app.reacting.io / expiring-stock",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: "1296 / 536",
      scale: 1,
      desktopObjectPosition: "left center",
      desktopAspectRatio: "1400 / 536",
    },
  },
  {
    id: "insights",
    tab: "Insights",
    label: "Insights",
    title: "Stock value, usage and cover at a glance.",
    body: "See stock value, usage trends and estimated cover without rebuilding spreadsheets.",
    evidence: "Stock Reports from the live product.",
    src: "/product-screens/mkt-stock-reports.webp",
    alt: "Dental Assist Stock Reports — current stock value, usage trend, highest-value items and unused stock",
    url: "app.reacting.io / stock-reports",
    stage: {
      objectFit: "contain",
      objectPosition: "center top",
      aspectRatio: "1301 / 1016",
      scale: 1,
      desktopObjectFit: "cover",
      desktopObjectPosition: "center top",
      desktopAspectRatio: "1301 / 868",
    },
  },
];

function ProductPage() {
  const [active, setActive] = useState(0);
  const [isDesktopFrame, setIsDesktopFrame] = useState(false);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const item = explorerItems[active] ?? explorerItems[0];
  const frameScale =
    isDesktopFrame && item.stage.desktopScale != null
      ? item.stage.desktopScale
      : item.stage.scale;
  const framePosition = isDesktopFrame
    ? (item.stage.desktopObjectPosition ?? item.stage.objectPosition)
    : item.stage.objectPosition;
  const frameFit = isDesktopFrame
    ? (item.stage.desktopObjectFit ?? item.stage.objectFit)
    : item.stage.objectFit;
  const frameAspect = isDesktopFrame
    ? (item.stage.desktopAspectRatio ?? item.stage.aspectRatio)
    : item.stage.aspectRatio;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktopFrame(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

          <div className="mx-auto mt-6 w-full max-w-[720px] lg:mt-6">
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
        <div className="mx-auto max-w-[1280px] px-6 py-6 lg:px-10 lg:py-5">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Product explorer
            </div>
            <h2
              id="explorer-heading"
              className="mt-1.5 text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[26px]"
            >
              See Dental Assist in action.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Dental Assist areas"
            className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:mt-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            className="mt-4 grid items-start gap-5 lg:mt-3 lg:max-w-[960px] lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-6"
          >
            <div className="min-w-0 lg:pt-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {item.label}
              </div>
              <h3 className="mt-2 text-[20px] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[22px]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                {item.body}
              </p>
              {item.evidence ? (
                <p className="mt-2.5 text-[12px] text-muted-foreground/90">
                  {item.evidence}
                </p>
              ) : null}
            </div>

            <div className="w-full min-w-0">
              <ProductFrame label={item.url} emphasis="hero" className="w-full">
                <MediaViewer
                  imageSrc={item.src}
                  alt={item.alt}
                  objectFit={frameFit}
                  objectPosition={framePosition}
                  aspectRatio={frameAspect}
                  scale={frameScale}
                />
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
        <div className="mx-auto max-w-[1280px] px-6 py-7 lg:px-10 lg:py-7">
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
