import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Users,
  AlertTriangle,
  Truck,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import {
  BrowserFrame,
  ShowcaseScreenshot,
  TrustBar,
} from "@/components/site/ProductMock";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      {
        title: "Dental Inventory, Purchasing & RFQ Features | Dental Assist",
      },
      {
        name: "description",
        content:
          "Explore Dental Assist features for dental inventory, purchasing, supplier management, RFQ comparison and reporting, developed inside a real dental practice.",
      },
      {
        property: "og:title",
        content: "Dental Inventory, Purchasing & RFQ Features | Dental Assist",
      },
      {
        property: "og:description",
        content:
          "Explore Dental Assist features for dental inventory, purchasing, supplier management, RFQ comparison and reporting, developed inside a real dental practice.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/features` }],
  }),
  component: FeaturesPage,
});

const FRAME =
  "shadow-[0_24px_50px_-30px_rgb(15_23_42/0.2),0_1px_3px_-1px_rgb(15_23_42/0.08)]";

type ShotSection = {
  kind: "shot";
  id: string;
  aliasIds?: string[];
  icon: typeof FileText;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  src: string;
  alt: string;
  url: string;
  imageFirst: boolean;
};

type TextSection = {
  kind: "text";
  id: string;
  aliasIds?: string[];
  icon: typeof FileText;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  tone: "white" | "muted";
};

const shotSections: ShotSection[] = [
  {
    kind: "shot",
    id: "rfq",
    icon: FileText,
    eyebrow: "RFQ comparison",
    title: "Compare supplier responses before you commit.",
    body: "Send the same request to multiple suppliers and review replies side by side. Designed to help teams spot lower-cost options before an order is placed.",
    bullets: [
      "Side-by-side supplier responses",
      "Clear comparison of quoted items",
      "Move selected quotes into purchasing",
    ],
    src: "/product-screens/screen-15.png",
    alt: "Dental Assist RFQ list and workflow",
    url: "app.reacting.io / rfqs",
    imageFirst: false,
  },
  {
    kind: "shot",
    id: "deliveries",
    aliasIds: ["purchasing"],
    icon: Truck,
    eyebrow: "Deliveries and goods-in",
    title: "Confirm arrivals and close the loop on follow-up.",
    body: "Record what arrived, where it goes and what still needs attention. Supports day-to-day receiving without relying on paper notes.",
    bullets: [
      "Match arrivals to purchase orders",
      "Record locations on receipt",
      "Flag shortages for follow-up",
    ],
    src: "/product-screens/screen-12.png",
    alt: "Dental Assist receive-order workflow",
    url: "app.reacting.io / purchasing / receive",
    imageFirst: true,
  },
];

const textSections: TextSection[] = [
  {
    kind: "text",
    id: "suppliers",
    icon: Users,
    eyebrow: "Supplier management",
    title: "Keep every vendor relationship in one place.",
    body: "Store contacts, account details and purchase history together so the team can follow up without digging through emails. Supports practices that work with several suppliers week to week.",
    bullets: [
      "Supplier directory and contacts",
      "Purchase history by vendor",
      "Account details in one workspace",
    ],
    tone: "muted",
  },
  {
    kind: "text",
    id: "low-stock",
    aliasIds: ["inventory"],
    icon: AlertTriangle,
    eyebrow: "Low stock and expiry",
    title: "See risk early — before it hits the surgery day.",
    body: "Surface items that need attention while there is still time to act. Helps teams reduce the risk of shortages and expired materials sitting unnoticed in store rooms.",
    bullets: [
      "Low-stock lists ready for action",
      "Expiry-focused follow-up",
      "Clear next steps for the team",
    ],
    tone: "white",
  },
  {
    kind: "text",
    id: "reporting",
    aliasIds: ["dashboard"],
    icon: BarChart3,
    eyebrow: "Reporting",
    title: "Understand spend and usage without rebuilding spreadsheets.",
    body: "Review spend, usage and RFQ-related savings signals in one place. Helps owners and managers see patterns and make calmer purchasing decisions.",
    bullets: [
      "Spend and usage trends",
      "Supplier and category views",
      "Export when you need a record",
    ],
    tone: "muted",
  },
];

function FeaturesPage() {
  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 pb-9 pt-10 lg:px-10 lg:pb-12 lg:pt-12">
          <div className="max-w-3xl">
            <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              Features
            </div>
            <h1 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[48px] lg:text-[52px]">
              Deeper capabilities for stock, suppliers and purchasing decisions.
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-muted-foreground sm:text-[17px]">
              A closer look at the workflows Dental Assist supports day to day —
              developed and refined inside a real dental practice. For the
              product overview, see the Product page.
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
                <Link to="/product">View Product</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {shotSections.map((f) => (
        <section
          key={f.id}
          id={f.id}
          className="relative border-b border-border/60 bg-background"
        >
          {f.aliasIds?.map((alias) => (
            <span key={alias} id={alias} className="absolute top-0" />
          ))}
          <div className="mx-auto max-w-[1280px] px-6 py-9 lg:px-10 lg:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              {f.imageFirst ? (
                <>
                  <div className="w-full min-w-0 max-w-[42rem]">
                    <BrowserFrame url={f.url} className={FRAME}>
                      <ShowcaseScreenshot src={f.src} alt={f.alt} />
                    </BrowserFrame>
                  </div>
                  <div>
                    <f.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {f.eyebrow}
                    </div>
                    <h2 className="mt-3 max-w-md text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px]">
                      {f.title}
                    </h2>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.65] text-muted-foreground">
                      {f.body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {f.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14px] text-foreground"
                        >
                          <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <f.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {f.eyebrow}
                    </div>
                    <h2 className="mt-3 max-w-md text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px]">
                      {f.title}
                    </h2>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.65] text-muted-foreground">
                      {f.body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {f.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14px] text-foreground"
                        >
                          <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full min-w-0 max-w-[42rem] lg:justify-self-end">
                    <BrowserFrame url={f.url} className={FRAME}>
                      <ShowcaseScreenshot src={f.src} alt={f.alt} />
                    </BrowserFrame>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      {textSections.map((f) => (
        <section
          key={f.id}
          id={f.id}
          className={`relative border-b border-border/60 ${
            f.tone === "muted" ? "bg-[#F8FAFC]" : "bg-background"
          }`}
        >
          {f.aliasIds?.map((alias) => (
            <span key={alias} id={alias} className="absolute top-0" />
          ))}
          <div className="mx-auto max-w-[1280px] px-6 py-9 lg:px-10 lg:py-12">
            <div className="max-w-2xl">
              <f.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {f.eyebrow}
              </div>
              <h2 className="mt-3 text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px]">
                {f.title}
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.65] text-muted-foreground">
                {f.body}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-x-10">
                {f.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14px] text-foreground"
                  >
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <TrustBar />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-9 text-center lg:px-10 lg:py-12">
          <h2 className="mx-auto max-w-2xl text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] sm:text-[36px]">
            Ready to see it in your practice?
          </h2>
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
