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

const HOME_TITLE = "Dental Practice Operations, Stock & Purchasing Software | Dental Assist";
const HOME_DESCRIPTION =
  "Dental Assist brings dental stock, materials, suppliers, RFQs, purchase orders, expiry tracking and spend visibility into one connected operational workspace.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:url", content: `${SITE_ORIGIN}/` },
      {
        property: "og:image",
        content: `${SITE_ORIGIN}/og-reacting-dental-assist.png`,
      },
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
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/` }],
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

/** Product Tour — editorial 3 + 3 + 2 layout (order matters). */
const gallery: MediaItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Actions, stock risk and purchasing at a glance",
    imageSrc: SCREENS.tourDashboard,
    lightboxSrc: SCREENS.dashboard,
    alt: "Dental Assist dashboard for dental practice operations showing actions required, low-stock risk and purchasing activity",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "stock",
    title: "Inventory",
    description: "Materials, quantities and stock detail",
    imageSrc: SCREENS.tourStock,
    lightboxSrc: SCREENS.stockPage,
    alt: "Dental Assist inventory management showing dental materials, quantities, minimum levels and stock details",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "low-stock",
    title: "Low Stock",
    description: "Products that need replenishment",
    imageSrc: SCREENS.tourLowStock,
    lightboxSrc: SCREENS.lowStockPage,
    alt: "Dental Assist low-stock alerts showing dental materials that need action with RFQ options",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "expiring",
    title: "Expiry Tracking",
    description: "Expired and expiring stock to rotate",
    imageSrc: SCREENS.tourExpiring,
    lightboxSrc: SCREENS.expiring,
    alt: "Dental Assist expiry tracking showing expired dental materials with dates for stock rotation and waste reduction",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "suppliers",
    title: "Suppliers",
    description: "Directory with selected supplier detail",
    imageSrc: SCREENS.tourSuppliers,
    lightboxSrc: SCREENS.suppliers,
    alt: "Dental Assist supplier management showing vendor directory and selected supplier account details",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "orders",
    title: "Purchase Orders",
    description: "Raise, track and follow up orders",
    imageSrc: SCREENS.tourOrders,
    lightboxSrc: SCREENS.purchasing,
    alt: "Dental Assist purchase orders screen showing order metrics, status and supplier order rows",
    aspectRatio: "16 / 10",
    objectFit: "contain",
  },
  {
    id: "reporting",
    title: "Savings & Usage",
    description: "Order value, stock usage and RFQ savings",
    imageSrc: SCREENS.tourReporting,
    lightboxSrc: SCREENS.reporting,
    alt: "Dental Assist reporting for dental practice cost control showing spend, usage and RFQ savings",
    aspectRatio: "16 / 10",
    objectFit: "contain",
    wide: true,
  },
  {
    id: "rfq",
    title: "RFQ Comparison",
    description: "Compare supplier responses, select prices and see savings before ordering",
    imageSrc: SCREENS.tourRfq,
    lightboxSrc: SCREENS.rfqCompareFull,
    alt: "Dental Assist RFQ software comparing supplier quotations with selected prices, savings and budget impact",
    aspectRatio: "16 / 10",
    objectFit: "contain",
    wide: true,
  },
];

function MarketingHome() {
  return (
    <SiteShell>
      <MarketingHero />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-7 lg:px-10 lg:py-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticCard
              icon={Package}
              label="Stock, suppliers and purchasing in one workspace"
            />
            <StatisticCard
              icon={RefreshCw}
              label="Clearer buying decisions with side-by-side quotes"
            />
            <StatisticCard icon={Activity} label="Live material visibility for the practice team" />
            <StatisticCard icon={Building2} label="Built specifically for dental practices" />
          </div>
        </div>
      </section>

      <div id="features" className="scroll-mt-24">
        <FeatureSection
          id="inventory"
          eyebrow="Inventory Visibility"
          title="Know what’s on the shelf — without the spreadsheet chase."
          description="Track dental materials across surgeries and store rooms with live quantities, locations and status, so the team spends less time hunting for stock."
          bullets={[
            "See materials, quantities and stock status",
            "Organise by category and location",
            "Instant product search",
            "Clear counts for everyday use",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.stockPage}
          alt="Dental Assist inventory management showing dental materials list, quantities, stock status and item detail"
          frameLabel="app.reacting.io / stock"
          objectPosition="center"
          objectFit="contain"
          className="bg-background"
        />

        <FeatureSection
          id="low-stock"
          eyebrow="Low Stock Alerts"
          title="Spot shortages early and act before they become urgent."
          description="Automatic low-stock visibility helps the team raise RFQs and keep materials moving — reducing the risk of shortages on a busy clinical day."
          bullets={[
            "Automatic low-stock detection",
            "One-click paths into RFQs",
            "Clear lists ready for action",
            "Supports day-to-day stock control",
          ]}
          ctaHref={APP_SIGNUP}
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
          title="Rotate stock with confidence and cut unnecessary waste."
          description="Monitor products nearing expiry so the practice can prioritise what should be used next and reduce write-offs."
          bullets={[
            "See expired and expiring products in one place",
            "Prioritise stock rotation before write-offs",
            "Reduce avoidable material waste",
            "Keep expiry dates visible for day-to-day checks",
          ]}
          ctaHref={APP_SIGNUP}
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
          title="Keep supplier accounts clear and ready for ordering."
          description="A central supplier directory with useful account detail helps the team find the right vendor quickly and keep RFQs and purchase orders organised."
          bullets={[
            "Central dental supplier directory",
            "Contacts, status and account details together",
            "Linked RFQ and order activity",
            "Clearer follow-up for the whole team",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.suppliers}
          alt="Dental Assist supplier management showing vendor directory with selected supplier contacts, account reference and linked RFQ activity"
          frameLabel="app.reacting.io / vendors"
          objectPosition="center"
          objectFit="contain"
          imageFirst
          className="bg-[#F7FBF9]"
        />

        <FeatureSection
          id="rfq"
          eyebrow="RFQ and Purchasing"
          title="Compare suppliers before the practice commits to an order."
          description="Create a request for quotation, review supplier responses side by side and understand the order total, savings and budget impact before purchasing."
          bullets={[
            "Compare supplier quotes in one workspace",
            "Select the best price for each product",
            "Review savings and total order value",
            "Keep purchasing decisions clear and traceable",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.rfqCompare}
          alt="Dental Assist RFQ comparison showing Henry Schein and Kent Express quotations with order total, savings and budget impact"
          frameLabel="app.reacting.io / rfq"
          objectPosition="center"
          objectFit="contain"
          className="bg-background"
        />

        <FeatureSection
          id="reporting"
          eyebrow="Reporting"
          title="See what the practice spends, uses and saves."
          description="Owners and managers get a clear view of order value, stock usage and RFQ savings over time — without rebuilding spreadsheets each month."
          bullets={[
            "Order value, stock usage and RFQ savings on one timeline",
            "Six-month totals that are easy to compare",
            "Strongest months for spend, usage and savings",
            "Clearer signals for practice cost control",
          ]}
          ctaHref={APP_SIGNUP}
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
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-14 lg:px-10">
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
              See Dental Assist in action.
            </h2>
            <p className="mx-auto mt-2.5 max-w-[44ch] text-[14.5px] leading-[1.6] text-muted-foreground">
              A concise walkthrough of the operational workspace — from stock visibility to RFQ
              comparison and reporting.
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
        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              Built for the way dental practices work
            </div>
            <h2
              id="benefits-heading"
              className="mt-2.5 text-[26px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]"
            >
              Clearer operations today. A stronger foundation for the practice.
            </h2>
            <p className="mx-auto mt-2.5 max-w-[48ch] text-[14.5px] leading-[1.6] text-muted-foreground">
              Replace fragmented spreadsheets, WhatsApp chasing and unclear stock checks with one
              connected view of what the practice has, needs, uses and spends.
            </p>
          </div>
          <div className="mt-9">
            <BenefitGrid
              items={[
                {
                  icon: CircleAlert,
                  title: "Cut material waste",
                  body: "Flag expiry early and rotate stock before usable materials become write-offs.",
                },
                {
                  icon: PoundSterling,
                  title: "Buy with clearer prices",
                  body: "Compare supplier quotes side by side and choose clearer prices for the practice.",
                },
                {
                  icon: PackageCheck,
                  title: "Avoid stockouts",
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
        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-14">
          <PricingCard />
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#F7FBF9]">
        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-14">
          <FAQ />
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
