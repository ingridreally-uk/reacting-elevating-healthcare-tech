import { createFileRoute } from "@tanstack/react-router";
import {
  CircleAlert,
  PoundSterling,
  PackageCheck,
  Timer,
  Package,
  RefreshCw,
  Building2,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteChrome";
import { MarketingHero } from "@/components/marketing/MarketingHero";
import { FeatureSection } from "@/components/marketing/FeatureSection";
import { MediaGallery } from "@/components/marketing/MediaGallery";
import { BenefitGrid, StatisticCard } from "@/components/marketing/Cards";
import { PricingCard } from "@/components/marketing/PricingCard";
import { FAQ } from "@/components/marketing/FAQ";
import { faqs } from "@/components/marketing/faq-data";
import { CTASection } from "@/components/marketing/CTASection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { APP_SIGNUP, SCREENS, type MediaItem } from "@/components/marketing/content";
import { SITE_ORIGIN } from "@/lib/site-url";

const HOME_TITLE = "Dental Inventory and Purchasing Software | Dental Assist by Reacting";
const HOME_DESCRIPTION =
  "Dental Assist helps dental practices manage stock, expiry dates, suppliers, quotations, purchase orders and spending in one connected workspace.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/` },
      { property: "og:site_name", content: "Reacting" },
      {
        property: "og:image",
        content: `${SITE_ORIGIN}/og-reacting-dental-assist.png`,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Dental Assist operational dashboard for dental practices",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESCRIPTION },
      {
        name: "twitter:image",
        content: `${SITE_ORIGIN}/og-reacting-dental-assist.png`,
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_ORIGIN}/` },
      {
        rel: "preload",
        as: "image",
        href: SCREENS.dashboard,
        type: "image/webp",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }),
      },
    ],
  }),
  component: MarketingHome,
});

/** Product tour — full feature screenshots for readability (not tiny thumbnails). */
const gallery: MediaItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Stock risk, spend and actions at a glance",
    imageSrc: SCREENS.dashboard,
    alt: "Dental Assist dashboard showing stock risk, monthly spend, purchasing actions and expiry alerts",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "stock",
    title: "Inventory",
    description: "Live quantities, locations and product detail",
    imageSrc: SCREENS.stockPage,
    alt: "Dental Assist inventory showing materials list, quantities, stock status and selected product detail",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "low-stock",
    title: "Low Stock",
    description: "Items that need replenishment",
    imageSrc: SCREENS.lowStockPage,
    alt: "Dental Assist low-stock page with actionable product cards and RFQ options",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "expiring",
    title: "Expiry Tracking",
    description: "Expired and expiring materials to rotate",
    imageSrc: SCREENS.expiring,
    alt: "Dental Assist expiry tracking showing expired materials with dates ready for review",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "suppliers",
    title: "Suppliers",
    description: "Directory and supplier account detail",
    imageSrc: SCREENS.suppliers,
    alt: "Dental Assist supplier directory with selected supplier profile and linked activity",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "rfq",
    title: "RFQ Comparison",
    description: "Compare quotes, select prices and see savings",
    imageSrc: SCREENS.rfqCompareFull,
    alt: "Dental Assist RFQ comparison with supplier columns, selected prices, savings and budget impact",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "orders",
    title: "Purchase Orders",
    description: "Raise, track and follow up orders",
    imageSrc: SCREENS.purchasing,
    alt: "Dental Assist purchase orders showing order status and supplier rows",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "reporting",
    title: "Savings & Reporting",
    description: "Order value, stock usage and RFQ savings",
    imageSrc: SCREENS.reporting,
    alt: "Dental Assist reporting chart with order value, stock usage and RFQ savings totals",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
];

function MarketingHome() {
  return (
    <SiteShell>
      <MarketingHero />

      <section className="border-b border-border/60 bg-background" aria-label="Key benefits">
        <div className="mx-auto max-w-[1200px] px-6 py-7 lg:px-10 lg:py-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticCard
              icon={Package}
              title="One connected workspace"
              body="Stock, suppliers and purchasing together."
            />
            <StatisticCard
              icon={RefreshCw}
              title="Compare before you buy"
              body="Review supplier quotations side by side."
            />
            <StatisticCard
              icon={Activity}
              title="See what needs attention"
              body="Track stock levels, expiry risk and purchasing actions."
            />
            <StatisticCard
              icon={Building2}
              title="Built around dental practice workflows"
              body="Practical tools for owners, managers and teams."
            />
          </div>
        </div>
      </section>

      <div id="features" className="scroll-mt-24">
        <FeatureSection
          id="inventory"
          eyebrow="Inventory Visibility"
          title="Know what is on the shelf — without chasing spreadsheets."
          description="Track materials across surgeries and store rooms with live quantities, locations and stock status, so the team spends less time searching and counting."
          bullets={[
            "Live quantities by category and location",
            "Stock status visible for the whole team",
            "Instant product search",
            "Selected item detail without leaving the list",
          ]}
          ctaHref={APP_SIGNUP}
          showCta
          imageSrc={SCREENS.stockPage}
          alt="Dental Assist inventory management showing dental materials list, quantities, stock status and item detail"
          frameLabel="app.reacting.io / stock"
          objectPosition="center"
          objectFit="contain"
          className="bg-background"
        />

        <FeatureSection
          id="low-stock"
          eyebrow="Low-Stock Alerts"
          title="Spot shortages early — before they interrupt treatment."
          description="See products that need attention, raise RFQs and keep essential materials moving before a busy clinical day is affected."
          bullets={[
            "Automatic low-stock detection",
            "Clear lists ready for action",
            "One-click paths into RFQs",
            "Supports day-to-day replenishment",
          ]}
          ctaHref={APP_SIGNUP}
          showCta={false}
          imageSrc={SCREENS.lowStockPage}
          alt="Dental Assist low-stock alerts with card view of materials needing action and RFQ paths"
          frameLabel="app.reacting.io / low stock"
          objectPosition="center"
          objectFit="contain"
          imageFirst
          className="bg-[#F7FBF9]"
        />

        <FeatureSection
          id="expiry"
          eyebrow="Expiry Tracking"
          title="Use stock in time and reduce avoidable waste."
          description="Keep expired and expiring products visible, prioritise stock rotation and reduce unnecessary write-offs."
          bullets={[
            "Expired and expiring products in one place",
            "Prioritise rotation before write-offs",
            "Details and RFQ actions on each card",
            "Clearer day-to-day expiry checks",
          ]}
          ctaHref={APP_SIGNUP}
          showCta={false}
          imageSrc={SCREENS.expiring}
          alt="Dental Assist expiry tracking showing three expired dental materials ready for review"
          frameLabel="app.reacting.io / expiring stock"
          objectPosition="center"
          objectFit="contain"
          className="bg-background"
        />

        <FeatureSection
          id="suppliers"
          eyebrow="Supplier Management"
          title="Keep supplier information and purchasing activity together."
          description="Store supplier contacts, account details, RFQs and purchase-order activity in one clear directory for the whole team."
          bullets={[
            "Central dental supplier directory",
            "Contacts and account details together",
            "Linked RFQ and order activity",
            "Clearer follow-up across the practice",
          ]}
          ctaHref={APP_SIGNUP}
          showCta={false}
          imageSrc={SCREENS.suppliers}
          alt="Dental Assist supplier management showing supplier directory with selected contacts, account reference and linked RFQ activity"
          frameLabel="app.reacting.io / suppliers"
          objectPosition="center"
          objectFit="contain"
          imageFirst
          className="bg-[#F7FBF9]"
        />

        <FeatureSection
          id="rfq"
          eyebrow="RFQ and Purchasing"
          title="Compare supplier quotes before committing to an order."
          description="Review responses side by side, select the best price for each product and understand the total saving and budget impact before purchasing."
          bullets={[
            "Side-by-side supplier quote columns",
            "Select the best price per product",
            "Order summary with total saving",
            "Budget impact before you commit",
          ]}
          ctaHref={APP_SIGNUP}
          showCta
          imageSrc={SCREENS.rfqCompare}
          alt="Dental Assist RFQ comparison showing supplier quotations with order total, savings and budget impact"
          frameLabel="app.reacting.io / rfq"
          objectPosition="center"
          objectFit="contain"
          className="bg-background"
        />

        <FeatureSection
          id="reporting"
          eyebrow="Reporting"
          title="See what the practice spends, uses and saves."
          description="Track order value, stock usage and RFQ savings over time without rebuilding spreadsheets every month."
          bullets={[
            "Order value, usage and savings on one timeline",
            "Six-month totals that are easy to compare",
            "Monthly highlights for spend and savings",
            "Clearer signals for practice cost control",
          ]}
          ctaHref={APP_SIGNUP}
          showCta={false}
          imageSrc={SCREENS.reporting}
          alt="Dental Assist savings and usage reporting with trend chart, order value, stock usage and RFQ savings totals"
          frameLabel="app.reacting.io / savings & usage"
          objectPosition="center"
          objectFit="contain"
          imageFirst
          className="bg-[#F7FBF9]"
        />
      </div>

      <section
        id="product-gallery"
        aria-labelledby="product-tour-heading"
        className="scroll-mt-24 border-b border-border/60 bg-[#F7FBF9]"
      >
        <div className="mx-auto max-w-[1200px] px-6 py-11 md:py-12 lg:px-10">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              Product tour
            </div>
            <h2
              id="product-tour-heading"
              className="mt-2.5 text-[26px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]"
            >
              Explore the Dental Assist workflow.
            </h2>
            <p className="mx-auto mt-2.5 max-w-[48ch] text-[14.5px] leading-[1.6] text-muted-foreground">
              Move through the core workspace — from stock visibility and expiry control to supplier
              comparison, purchase orders and reporting.
            </p>
          </motion.div>
          <div className="mt-8 md:mt-9">
            <MediaGallery items={gallery} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="benefits-heading"
        className="border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              Outcomes for the practice
            </div>
            <h2
              id="benefits-heading"
              className="mt-2.5 text-[26px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]"
            >
              Less waste. Fewer shortages. Clearer purchasing.
            </h2>
            <p className="mx-auto mt-2.5 max-w-[48ch] text-[14.5px] leading-[1.6] text-muted-foreground">
              Replace fragmented spreadsheets and message threads with one connected view of what
              the practice has, needs, uses and spends.
            </p>
          </div>
          <div className="mt-8">
            <BenefitGrid
              items={[
                {
                  icon: CircleAlert,
                  title: "Reduce material waste",
                  body: "Flag expiry early and rotate stock before usable materials become write-offs.",
                },
                {
                  icon: PoundSterling,
                  title: "Buy with clearer prices",
                  body: "Compare supplier quotes side by side and choose clearer prices for the practice.",
                },
                {
                  icon: PackageCheck,
                  title: "Prevent stock shortages",
                  body: "See low stock early — before a chairside shortage interrupts treatment.",
                },
                {
                  icon: Timer,
                  title: "Spend less time chasing",
                  body: "Keep materials, suppliers and purchase orders together for quicker workflows.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <HowItWorks />

      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="scroll-mt-24 border-b border-border/60 bg-background"
      >
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10 lg:py-12">
          <PricingCard />
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#F7FBF9]">
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10 lg:py-12">
          <FAQ />
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
