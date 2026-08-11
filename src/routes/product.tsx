import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import { TrustBar } from "@/components/site/ProductMock";
import { ProductFrame } from "@/components/marketing/ProductFrame";
import { MediaViewer } from "@/components/marketing/MediaViewer";
import { SCREENS, SCREEN_FOCUS, type ScreenFocus } from "@/components/marketing/content";
import { pageMeta } from "@/lib/seo";

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

/** Non-sequential anatomy — parts of one Dental Assist product. */
const insideCapabilities = [
  {
    label: "Inventory",
    body: "Quantities, locations and the live stock record.",
  },
  {
    label: "Low stock & expiry",
    body: "Items that need attention before they interrupt the day.",
  },
  {
    label: "Suppliers",
    body: "Vendor contacts, accounts and purchase history.",
  },
  {
    label: "RFQs",
    body: "Request and compare supplier responses in one place.",
  },
  {
    label: "Purchase orders",
    body: "Raise, approve and track orders from the same workspace.",
  },
  {
    label: "Deliveries",
    body: "Receive against the order and flag what still needs follow-up.",
  },
  {
    label: "Reporting",
    body: "Spend, usage and savings signals without rebuilding spreadsheets.",
  },
  {
    label: "Budget visibility",
    body: "Budget impact and spend oversight where purchasing decisions are made.",
  },
] as const;

const roles = [
  {
    id: "owner",
    title: "Owner",
    body: "See what the practice holds, what needs attention and what is being spent — without reconstructing the day from messages and memory.",
    points: [
      "Spend and inventory value on the overview",
      "Stock risk and purchasing activity in view",
      "Savings and usage for calmer oversight",
    ],
  },
  {
    id: "manager",
    title: "Practice Manager",
    body: "Keep suppliers, purchasing and follow-up in one workspace so operational control does not depend on chasing emails.",
    points: [
      "Supplier directory and purchase history",
      "Purchase orders and outstanding follow-up",
      "Budget visibility beside buying decisions",
    ],
  },
  {
    id: "stock-lead",
    title: "Nurse / Stock Lead",
    body: "Work from clear quantities and locations, act on expiry and replenishment, and receive deliveries against the order.",
    points: [
      "Stock counts and where items live",
      "Expiry and replenishment that need action",
      "Receiving that closes the loop on arrivals",
    ],
  },
] as const;

/** Compact depth evidence — different from Home’s journey screens. */
const depthEvidence: {
  id: string;
  label: string;
  title: string;
  body: string;
  caption: string;
  src: string;
  alt: string;
  url: string;
  focus: ScreenFocus;
}[] = [
  {
    id: "suppliers",
    label: "Suppliers",
    title: "Vendor relationships in one record",
    body: "Contacts, account details and purchase history stay with the supplier — not scattered across inboxes.",
    caption: "Supplier directory from the live product.",
    src: SCREENS.suppliers,
    alt: "Dental Assist supplier directory",
    url: "app.reacting.io / vendors",
    focus: SCREEN_FOCUS.suppliers,
  },
  {
    id: "expiring",
    label: "Expiry",
    title: "Expiry control before write-off",
    body: "Near-expiry and expired materials surface while there is still time to act — not after they sit unnoticed.",
    caption: "Expiring stock from the live product.",
    src: SCREENS.expiring,
    alt: "Dental Assist expiring stock follow-up",
    url: "app.reacting.io / expiring-stock",
    focus: SCREEN_FOCUS.expiring,
  },
  {
    id: "stock",
    label: "Inventory",
    title: "The inventory record the practice works from",
    body: "Item status, counts and location detail form the live record purchasing and receiving depend on.",
    caption: "Inventory record from the live product.",
    src: SCREENS.stockPage,
    alt: "Dental Assist inventory item detail with stock status and locations",
    url: "app.reacting.io / stock",
    focus: SCREEN_FOCUS.stockPage,
  },
];

function ProductPage() {
  const dashboardFocus = SCREEN_FOCUS.dashboard;

  return (
    <SiteShell>
      {/* 1. Product definition — not a second Home belief hero */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 pb-9 pt-10 lg:px-10 lg:pb-10 lg:pt-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10">
            <div className="min-w-0">
              <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
                Dental Assist · A Reacting product
              </div>
              <h1 className="text-[34px] font-semibold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-[42px] lg:text-[46px]">
                Dental Assist is the operational workspace for non-clinical
                practice operations.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-muted-foreground sm:text-[17px]">
                One product inside Reacting. Today’s demonstrated capability
                centres on inventory, suppliers and purchasing — so the practice
                can see what it holds, who supplies it and what is being bought,
                without rebuilding that picture across spreadsheets and messages.
                Developed and refined inside a real dental practice.
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

            <div className="w-full min-w-0">
              <ProductFrame label="app.reacting.io / dashboard">
                <MediaViewer
                  imageSrc={SCREENS.dashboard}
                  alt="Dental Assist dashboard — control-centre overview"
                  priority
                  objectFit={dashboardFocus.objectFit}
                  objectPosition={dashboardFocus.objectPosition}
                  aspectRatio={dashboardFocus.aspectRatio}
                  scale={dashboardFocus.scale}
                />
              </ProductFrame>
              <p className="mt-3 text-[12px] text-muted-foreground">
                Control centre — spend, inventory value, stock risk and
                purchasing activity in one overview.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What lives inside — compact non-sequential anatomy */}
      <section
        id="inside-dental-assist"
        aria-labelledby="inside-dental-assist-heading"
        className="scroll-mt-24 border-b border-border/60 bg-[#F8FAFC]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Inside Dental Assist
            </div>
            <h2
              id="inside-dental-assist-heading"
              className="mt-2.5 text-[26px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[32px]"
            >
              What lives inside the product.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
              These are capabilities inside Dental Assist — not separate
              products. Orientation only; the deeper day-to-day journey lives on
              Home.
            </p>
          </div>

          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {insideCapabilities.map((item) => (
              <li key={item.label} className="min-w-0">
                <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
                  {item.label}
                </div>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Value by role */}
      <section
        aria-labelledby="roles-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Built around the practice
            </div>
            <h2
              id="roles-heading"
              className="mt-2.5 text-[26px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[32px]"
            >
              Built around the people running the practice.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
              Each role works from the same Dental Assist record — with the
              visibility and actions that matter to them.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-10">
            {roles.map((role) => (
              <div key={role.id} className="min-w-0">
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">
                  {role.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
                  {role.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-foreground/85"
                    >
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Product depth — compact; not Home’s journey screens */}
      <section
        aria-labelledby="depth-heading"
        className="border-b border-border/60 bg-[#F8FAFC]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Product depth
            </div>
            <h2
              id="depth-heading"
              className="mt-2.5 text-[26px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[32px]"
            >
              Real control surfaces beyond the overview.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
              Supplier management, expiry control and the inventory record —
              authentic product screens that show how deep Dental Assist goes
              day to day.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-6">
            {depthEvidence.map((item) => (
              <div key={item.id} className="min-w-0">
                <ProductFrame label={item.url}>
                  <MediaViewer
                    imageSrc={item.src}
                    alt={item.alt}
                    objectFit={item.focus.objectFit}
                    objectPosition={item.focus.objectPosition}
                    aspectRatio={item.focus.aspectRatio ?? "16 / 10"}
                    scale={item.focus.scale}
                  />
                </ProductFrame>
                <div className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {item.label}
                </div>
                <h3 className="mt-1.5 text-[16px] font-semibold leading-[1.25] tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-muted-foreground">
                  {item.body}
                </p>
                <p className="mt-2 text-[12px] text-muted-foreground/90">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. One operational record */}
      <section
        aria-labelledby="record-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              One operational record
            </div>
            <h2
              id="record-heading"
              className="mt-2.5 text-[26px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[32px]"
            >
              Inventory, suppliers and purchasing stay connected.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
              Dental Assist keeps the practice’s operational information in one
              shared record — so stock, supplier and purchasing detail is not
              reconstructed across spreadsheets, messages and memory every time
              someone asks what is happening.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Product boundary */}
      <section
        aria-labelledby="boundary-heading"
        className="border-b border-border/60 bg-[#F8FAFC]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Clear boundary
            </div>
            <h2
              id="boundary-heading"
              className="mt-2.5 text-[26px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[32px]"
            >
              What Dental Assist is today — and what it is not.
            </h2>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                Today
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
                Dental Assist is Reacting’s first product: an operational
                workspace for inventory, suppliers and purchasing. Those are
                capabilities inside one product — not sibling tools. Future
                operational capabilities (such as scheduling) are expected to
                arrive as modules within Dental Assist as they become available,
                under the Reacting platform.
              </p>
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                Not today
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
                Dental Assist is not a practice management system. It does not
                replace clinical records or appointment management. It is built
                to sit alongside the systems the practice already uses for care
                and booking — focused on the non-clinical operational work that
                usually lives in spreadsheets and conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Trust + close */}
      <TrustBar />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-9 text-center lg:px-10 lg:py-12">
          <h2 className="mx-auto max-w-2xl text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[34px]">
            See Dental Assist in your practice.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-muted-foreground">
            Walk through the operational workspace with your own stock,
            suppliers and purchasing in mind.
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
