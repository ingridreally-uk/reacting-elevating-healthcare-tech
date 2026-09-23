import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
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
  mobileSrc: string;
  alt: string;
  url: string;
  stage: Stage;
  /** Proof width follows the crop. Portrait drawers stay narrow. */
  mediaClass: string;
};

const HERO_MEDIA = "mx-auto w-full max-w-[62.5rem]";

const explorerItems: ExplorerItem[] = [
  {
    id: "inventory",
    tab: "Inventory",
    label: "Inventory",
    title: "Know what needs attention.",
    body: "See low stock, expiry and purchasing status in one operational view.",
    src: "/product-screens/proof-explorer-inventory.png",
    mobileSrc: "/product-screens/proof-explorer-inventory.png",
    alt: "Dental Assist stock attention — 111 items, out of stock, below reorder, expiry and purchasing status",
    url: "Attention",
    mediaClass: "mx-auto w-full max-w-[23.625rem] lg:ml-0",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: "680 / 800",
      scale: 1,
      desktopObjectFit: "contain",
      desktopObjectPosition: "center",
      desktopAspectRatio: "680 / 800",
    },
  },
  {
    id: "suppliers",
    tab: "Suppliers",
    label: "Suppliers",
    title: "Supplier details and purchase history, together.",
    body: "Contacts, account details and order history in one supplier record.",
    src: "/product-screens/proof-explorer-suppliers.png",
    mobileSrc: "/product-screens/proof-explorer-suppliers.png",
    alt: "Dental Assist supplier record for Ashcombe Dental Supply Co. — contact details, Active status and purchase history",
    url: "Suppliers",
    mediaClass: "mx-auto w-full max-w-[44rem] lg:ml-0",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: "1600 / 956",
      scale: 1,
      desktopObjectFit: "contain",
      desktopObjectPosition: "center",
      desktopAspectRatio: "1600 / 956",
    },
  },
  {
    id: "expiry",
    tab: "Expiry",
    label: "Expiry",
    title: "Risk you can still act on.",
    body: "See near-expiry and expired materials clearly, so the team can act sooner and manage write-offs.",
    src: "/product-story/proof-attention.png",
    mobileSrc: "/product-story/proof-attention-m.png",
    alt: "Dental Assist Attention — Expiring materials with Add to request",
    url: "Attention",
    mediaClass: "mx-auto w-full max-w-[24.375rem] lg:ml-0 lg:max-w-[41.25rem]",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: "780 / 668",
      scale: 1,
      desktopObjectFit: "contain",
      desktopObjectPosition: "center",
      desktopAspectRatio: "1320 / 668",
    },
  },
  {
    id: "insights",
    tab: "Insights",
    label: "Insights",
    title: "Stock value, usage and cover at a glance.",
    body: "See stock value, usage trends and estimated cover without rebuilding spreadsheets.",
    evidence: "Stock Reports from the live product.",
    src: "/product-screens/proof-explorer-insights.png",
    mobileSrc: "/product-screens/proof-explorer-insights.png",
    alt: "Dental Assist Stock Reports — current stock value, recent usage, average usage, estimated cover and usage trend",
    url: "app.reacting.io / stock-reports",
    mediaClass: "mx-auto w-full max-w-[39.5rem] lg:ml-0",
    stage: {
      objectFit: "contain",
      objectPosition: "center",
      aspectRatio: "1301 / 820",
      scale: 1,
      desktopObjectFit: "contain",
      desktopObjectPosition: "center",
      desktopAspectRatio: "1301 / 820",
    },
  },
];

function ProductPage() {
  const [active, setActive] = useState(0);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const item = explorerItems[active] ?? explorerItems[0];

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
          <div className="max-w-xl">
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

          </div>

          <div className={cn(HERO_MEDIA, "mt-8 min-w-0")}>
            <ProductFrame
              label="app.reacting.io / dental assist"
              className="w-full"
            >
              <ProductStoryHero />
            </ProductFrame>
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
            <p className="mt-3 max-w-3xl text-[13px] leading-[1.65] text-muted-foreground">
              <Link
                to="/dental-stock-management"
                className="text-foreground/85 underline underline-offset-2 hover:text-foreground"
              >
                Explore dental stock management
              </Link>
              {". "}
              <Link
                to="/dental-procurement-software"
                className="text-foreground/85 underline underline-offset-2 hover:text-foreground"
              >
                Explore dental procurement
              </Link>
              {". "}
              Request supplier quotes, compare responses and purchase with clearer price context.
              Then follow orders through to receiving, so the practice can see what has been
              ordered, what has arrived and what still needs attention.
              {" "}
              <Link
                to="/dental-supplier-management-software"
                className="text-foreground/85 underline underline-offset-2 hover:text-foreground"
              >
                Explore dental supplier management
              </Link>
              {". "}
              Keep the suppliers the practice already uses — records, contacts and purchase
              history — in one directory.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="explorer-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1200px] px-3.5 pb-10 pt-0 sm:px-6 lg:px-10">
          <div className="mx-auto w-full">
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
            className="mt-7 grid w-full items-start gap-8 lg:min-h-[30rem] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-10"
          >
            <div className="min-w-0 max-w-xl lg:max-w-none">
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

            <div className={cn(item.mediaClass, "min-w-0")}>
              <ProductFrame label={item.url} className="w-full">
                <div className="lg:hidden">
                  <MediaViewer
                    imageSrc={item.mobileSrc}
                    alt={item.alt}
                    objectFit={item.stage.objectFit}
                    objectPosition={item.stage.objectPosition}
                    aspectRatio={item.stage.aspectRatio}
                    scale={item.stage.scale}
                  />
                </div>
                <div className="hidden lg:block">
                  <MediaViewer
                    imageSrc={item.src}
                    alt={item.alt}
                    objectFit={item.stage.desktopObjectFit ?? item.stage.objectFit}
                    objectPosition={item.stage.desktopObjectPosition ?? item.stage.objectPosition}
                    aspectRatio={item.stage.desktopAspectRatio ?? item.stage.aspectRatio}
                    scale={item.stage.desktopScale ?? item.stage.scale}
                  />
                </div>
              </ProductFrame>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="product-close-heading"
        className="bg-background"
      >
        <div className="mx-auto max-w-[962px] px-3.5 pb-11 pt-8 text-center sm:px-6 sm:pb-12 sm:pt-9 lg:px-10 lg:pb-14">
          <p className="mx-auto max-w-[46ch] text-[13.5px] leading-[1.6] text-muted-foreground">
            Dental Assist works alongside your clinical and booking system — it
            focuses on inventory, suppliers, quote comparison, purchasing and
            deliveries.
          </p>
          <h2
            id="product-close-heading"
            className={cn("mx-auto mt-7 max-w-2xl sm:mt-8", SECTION_H2)}
          >
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
