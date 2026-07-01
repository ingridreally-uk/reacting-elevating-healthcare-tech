import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Package,
  ShoppingCart,
  Users,
  FileText,
  Truck,
  BarChart3,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageHero } from "@/components/site/SiteChrome";
import { BrowserFrame, ProductMock, TrustBar } from "@/components/site/ProductMock";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Dental Assist by Reacting" },
      {
        name: "description",
        content:
          "Inventory, purchasing, supplier management, RFQ comparison, deliveries, reporting and dashboards — every feature built for real dental practices.",
      },
      { property: "og:title", content: "Features — Dental Assist" },
      {
        property: "og:description",
        content:
          "Every feature Dental Assist provides for modern dental practices.",
      },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  {
    id: "inventory",
    icon: Package,
    title: "Inventory",
    body: "Track every material across every surgery and store room in real time. Set par levels, batch expiry and low-stock alerts so nothing runs out mid-procedure.",
    bullets: [
      "Real-time stock levels",
      "Par levels & auto reorder points",
      "Batch and expiry tracking",
    ],
  },
  {
    id: "purchasing",
    icon: ShoppingCart,
    title: "Purchasing",
    body: "Raise, approve and issue purchase orders in a clear workflow. Team members request, managers approve, orders go out — with a full audit trail.",
    bullets: [
      "Request → approve → order",
      "Multi-line POs with any supplier",
      "Full approval history",
    ],
  },
  {
    id: "suppliers",
    icon: Users,
    title: "Supplier Management",
    body: "Every supplier, contact, price list and account number in one tidy directory. See who you spend with, how much and how often.",
    bullets: ["Supplier directory", "Price lists & catalogues", "Contact & account details"],
  },
  {
    id: "rfq",
    icon: FileText,
    title: "RFQ Comparison",
    body: "Send the same request to multiple suppliers and compare responses line by line. Pick the best price per item, save on every order.",
    bullets: [
      "Side-by-side comparison",
      "Best-price highlighting",
      "One click to purchase order",
    ],
  },
  {
    id: "deliveries",
    icon: Truck,
    title: "Deliveries",
    body: "Log goods-in in seconds. Match against POs, flag shortages and update stock automatically as items arrive.",
    bullets: ["Goods-in receipting", "Shortage & damage flags", "Auto stock updates"],
  },
  {
    id: "reporting",
    icon: BarChart3,
    title: "Reporting",
    body: "Understand what your practice spends and where. Category, supplier, surgery and clinician-level breakdowns, exported when needed.",
    bullets: ["Spend by category & supplier", "Usage & waste analysis", "CSV & PDF export"],
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    body: "One calm home screen showing low stock, open orders, pending approvals and spend trend — so the team starts each day aligned.",
    bullets: [
      "Practice-wide overview",
      "Actionable alerts",
      "Configurable per role",
    ],
  },
];

function FeaturesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Features"
        title="Every feature, built around real dental workflows."
        body="Dental Assist covers the daily operational work of running a practice — from raising a PO to receiving deliveries and reporting on spend."
        primaryCta={{ label: "Book Your Demo", to: "/book-demo" }}
      />

      <div className="mx-auto max-w-7xl divide-y divide-border border-b border-border/60 px-6 lg:px-10">
        {features.map((f, i) => (
          <section
            key={f.id}
            id={f.id}
            className="grid gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <f.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <div className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                0{i + 1} · Feature
              </div>
              <h2 className="mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[38px]">
                {f.title}
              </h2>
              <p className="mt-5 max-w-lg text-[16.5px] leading-[1.65] text-muted-foreground">
                {f.body}
              </p>
              <ul className="mt-8 space-y-3">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[14.5px] text-foreground">
                    <span className="mt-2 inline-block h-1 w-1 rounded-full bg-foreground/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <BrowserFrame>
                <ProductMock variant={f.id} />
              </BrowserFrame>
            </div>
          </section>
        ))}
      </div>

      <TrustBar />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <h2 className="mx-auto max-w-2xl text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px]">
            Ready to see it in your practice?
          </h2>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
              <Link to="/book-demo">
                Book Your Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
