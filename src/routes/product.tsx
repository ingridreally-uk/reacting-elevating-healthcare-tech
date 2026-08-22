import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";
import { ProductFrame } from "@/components/marketing/ProductFrame";
import { ProductStoryHero } from "@/components/marketing/ProductStoryHero";
import { MediaViewer } from "@/components/marketing/MediaViewer";
import type { MediaFit } from "@/components/marketing/content";
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

/** Local copies of the currently rendered Product type classes — not shared tokens. */
const PAGE_H1 =
  "text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[36px] lg:text-[40px]";
const SECTION_H2 =
  "text-[22px] font-semibold leading-[1.15] tracking-[-0.028em] text-foreground sm:text-[28px] lg:text-[30px]";
const SUB_H2 =
  "text-[20px] font-semibold leading-[1.2] tracking-[-0.022em] text-foreground sm:text-[24px]";
const BODY = "text-[15.5px] leading-[1.65] text-muted-foreground sm:text-[16px]";

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

/** Shared proof window ~610 × 381. Crops differ per source. */
const EXPLORER_PROOF_AR = "16 / 10";
const HERO_MEDIA = "w-full max-w-[620px]";
const PROOF_MEDIA = "w-full max-w-[610px]";

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
      objectFit: "cover",
      objectPosition: "40% 22%",
      aspectRatio: EXPLORER_PROOF_AR,
      scale: 1,
      desktopObjectFit: "cover",
      desktopObjectPosition: "40% 22%",
      desktopAspectRatio: EXPLORER_PROOF_AR,
    },
  },
  {
    id: "suppliers",
    tab: "Suppliers",
    label: "Suppliers",
    title: "Supplier details and purchase history, together.",
    body: "Contacts, account details and order history in one supplier record.",
    src: "/product-screens/mkt-explorer-suppliers.webp",
    alt: "Dental Assist supplier record for Blackthorn — contacts and purchase history with orders 646 Waiting and 636 Completed",
    url: "app.reacting.io / vendors",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: EXPLORER_PROOF_AR,
      scale: 1,
      desktopObjectFit: "contain",
      desktopObjectPosition: "center",
      desktopAspectRatio: EXPLORER_PROOF_AR,
    },
  },
  {
    id: "expiry",
    tab: "Expiry",
    label: "Expiry",
    title: "Risk you can still act on.",
    body: "Near-expiry and expired materials surface before write-off.",
    src: "/product-screens/mkt-explorer-expiry.webp",
    alt: "Dental Assist Expiring Stock — three expired items needing review, with Details and RFQ actions",
    url: "app.reacting.io / expiring-stock",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: EXPLORER_PROOF_AR,
      scale: 1,
      desktopObjectFit: "contain",
      desktopObjectPosition: "center",
      desktopAspectRatio: EXPLORER_PROOF_AR,
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
      objectFit: "cover",
      objectPosition: "center top",
      aspectRatio: EXPLORER_PROOF_AR,
      scale: 1,
      desktopObjectFit: "cover",
      desktopObjectPosition: "center top",
      desktopAspectRatio: EXPLORER_PROOF_AR,
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

  const didMountExplorer = useRef(false);
  useEffect(() => {
    if (!didMountExplorer.current) {
      didMountExplorer.current = true;
      return;
    }
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-20 lg:px-10 lg:pb-10 lg:pt-20">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-10">
            <div className="min-w-0 text-left">
              <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
                Dental Assist
              </div>
              <h1 className={cn("mt-3", PAGE_H1)}>
                The operational workspace for running the practice beyond the
                surgery.
              </h1>
              <p className={cn("mt-4 max-w-xl", BODY)}>
                Inventory, suppliers and purchasing in one Dental Assist product —
                developed inside a real dental practice.
              </p>
              <div className="mt-5">
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

            <div className={cn(HERO_MEDIA, "min-w-0 overflow-hidden lg:justify-self-start")}>
              <ProductFrame
                label="app.reacting.io / dental assist"
                className="w-full"
              >
                <ProductStoryHero />
              </ProductFrame>
            </div>
          </div>

          <div
            id="inside-dental-assist"
            className="mt-8 border-t border-border/60 pt-5"
          >
            <p className="text-[13px] leading-[1.55] text-muted-foreground">
              Parts of Dental Assist — not separate tools.
            </p>
            <p className="mt-2 max-w-4xl text-[13px] leading-[1.65] text-foreground/80">
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
        </div>
      </section>

      <section
        aria-labelledby="explorer-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-0 lg:px-10">
          <div className="mx-auto w-full max-w-[962px]">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Product explorer
            </div>
            <h2
              id="explorer-heading"
              className={cn("mt-3", SECTION_H2)}
            >
              See Dental Assist in action.
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
            className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[20rem_minmax(0,38.125rem)] lg:gap-8"
          >
            <div className="min-w-0 lg:max-w-[20rem]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {item.label}
              </div>
              <h3 className={cn("mt-2", SUB_H2)}>
                {item.title}
              </h3>
              <p className={cn("mt-2.5", BODY)}>
                {item.body}
              </p>
              {item.evidence ? (
                <p className="mt-2.5 text-[12px] text-muted-foreground/90">
                  {item.evidence}
                </p>
              ) : null}
            </div>

            <div className={cn(PROOF_MEDIA, "min-w-0 overflow-hidden")}>
              <ProductFrame label={item.url} className="w-full">
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
        </div>
      </section>

      <section
        aria-labelledby="roles-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-0 lg:px-10">
          <h2
            id="roles-heading"
            className={SECTION_H2}
          >
            Built for the people running the practice.
          </h2>
          <dl className="mt-6 divide-y divide-border/60 border-y border-border/60">
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
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-10">
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
        <div className="mx-auto max-w-[1280px] px-6 py-12 text-center lg:px-10 lg:py-12">
          <h2 className={cn("mx-auto max-w-2xl", SECTION_H2)}>
            See Dental Assist in your practice.
          </h2>
          <p className={cn("mx-auto mt-3 max-w-xl", BODY)}>
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
