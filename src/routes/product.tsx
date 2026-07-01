import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SiteShell,
  PageHero,
  ScreenshotPlaceholder,
} from "@/components/site/SiteChrome";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — Dental Assist by Reacting" },
      {
        name: "description",
        content:
          "Dental Assist is a complete purchasing and inventory platform built for dental practices. Manage stock, suppliers, RFQs, deliveries and reporting from one place.",
      },
      { property: "og:title", content: "Product — Dental Assist" },
      {
        property: "og:description",
        content:
          "A complete purchasing and inventory platform for dental practices.",
      },
    ],
  }),
  component: ProductPage,
});

const pillars = [
  {
    title: "Purchasing, unified",
    body: "Raise, approve and send purchase orders to any supplier from one dashboard. No paper, no email chains.",
  },
  {
    title: "Live inventory",
    body: "Every material, every location, every par level — always current. Alerts before you run out.",
  },
  {
    title: "Supplier intelligence",
    body: "Compare quotes, track price changes and negotiate with real data from your own practice.",
  },
];

const included = [
  "Inventory management",
  "Purchase order workflow",
  "Supplier directory & price lists",
  "RFQ side-by-side comparison",
  "Delivery tracking & goods-in",
  "Spend and usage reporting",
  "Multi-user roles",
  "Cloud, mobile-ready",
];

function ProductPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Product"
        title="A complete purchasing and inventory platform for dental practices."
        body="Dental Assist replaces spreadsheets, paper orders and scattered emails with one calm, connected workspace built around real dental workflows."
        primaryCta={{ label: "Book Your Demo", to: "/book-demo" }}
        secondaryCta={{ label: "See Features", to: "/features" }}
      />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <ScreenshotPlaceholder
            label="Dental Assist — Overview"
            caption="Live inventory, purchasing queue, supplier activity and spend, all in one workspace."
          />
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
            {pillars.map((p, i) => (
              <div key={p.title}>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="mt-4 text-[22px] font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.65] text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                What&apos;s included
              </div>
              <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px]">
                One platform. Every operational workflow.
              </h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-muted-foreground">
                Everything a modern dental practice needs to run purchasing and
                inventory — without stitching together tools.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-[14.5px] font-medium text-foreground">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
          <h2 className="mx-auto max-w-2xl text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px]">
            See Dental Assist in your practice.
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
