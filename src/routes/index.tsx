import { createFileRoute } from "@tanstack/react-router";
import {
  Leaf,
  PiggyBank,
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
import { BenefitCard, StatisticCard } from "@/components/marketing/Cards";
import { PricingCard } from "@/components/marketing/PricingCard";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";
import {
  APP_SIGNUP,
  SCREENS,
  type MediaItem,
} from "@/components/marketing/content";
import { SITE_ORIGIN } from "@/lib/site-url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Dental Purchasing & Inventory Software | Dental Assist by Reacting",
      },
      {
        name: "description",
        content:
          "Start a free trial of Dental Assist — purchasing, inventory, suppliers and reporting for dental practices. No credit card required.",
      },
      {
        property: "og:title",
        content: "Dental Assist by Reacting",
      },
      {
        property: "og:description",
        content:
          "Manage stock, suppliers, purchase orders and reporting from one simple workspace built for dental practices.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/` }],
  }),
  component: MarketingHome,
});

const gallery: MediaItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Practice overview at a glance",
    imageSrc: SCREENS.dashboard,
    alt: "Dental Assist dashboard with spend, stock risk and purchasing queue",
  },
  {
    id: "stock",
    title: "Stock",
    description: "Folders and inventory organised for the practice",
    imageSrc: SCREENS.stockPage,
    alt: "Dental Assist Stock page with sidebar, search and labelled stock folders",
  },
  {
    id: "low-stock",
    title: "Low Stock",
    description: "Items that need action before they run short",
    imageSrc: SCREENS.lowStockPage,
    alt: "Dental Assist Low Stock page with items that need action and product cards",
  },
  {
    id: "expiring",
    title: "Expiring Stock",
    description: "Expired and expiring products to rotate first",
    imageSrc: SCREENS.expiring,
    alt: "Dental Assist Expiring Stock page showing expired and expiring item cards with status labels and dates",
  },
  {
    id: "suppliers",
    title: "Suppliers",
    description: "Vendor directory with contacts and status",
    imageSrc: SCREENS.suppliers,
    alt: "Dental Assist Vendors page showing the supplier directory with contact details and Active status",
  },
  {
    id: "rfq",
    title: "RFQ comparison",
    description: "Compare supplier quotes before you buy",
    imageSrc: SCREENS.rfqCompare,
    alt: "Dental Assist RFQ comparison view with selected quotes and order summary",
  },
  {
    id: "orders",
    title: "Purchase Orders",
    description: "Raise and track orders in one place",
    imageSrc: SCREENS.purchasing,
    alt: "Dental Assist Purchase Orders list with status and supplier details",
  },
  {
    id: "reporting",
    title: "Savings & Usage",
    description: "Spend, stock usage and RFQ savings over time",
    imageSrc: SCREENS.reporting,
    alt: "Dental Assist Savings and Usage report showing order value, stock usage and RFQ savings",
  },
];

const steps = [
  {
    n: "01",
    title: "Start your free trial",
    body: "No credit card. Explore Dental Assist with your practice in mind.",
  },
  {
    n: "02",
    title: "Import your products",
    body: "Bring in existing stock lists so setup stays quick and practical.",
  },
  {
    n: "03",
    title: "Begin managing inventory",
    body: "Get clearer visibility across stock, purchasing and suppliers.",
  },
];

function MarketingHome() {
  return (
    <SiteShell>
      <MarketingHero />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticCard
              icon={Package}
              label="Stock, suppliers and orders in one workspace"
            />
            <StatisticCard
              icon={RefreshCw}
              label="Clearer purchasing decisions with side-by-side quotes"
            />
            <StatisticCard
              icon={Activity}
              label="Live inventory visibility for the practice team"
            />
            <StatisticCard
              icon={Building2}
              label="Built specifically for dental practices"
            />
          </div>
        </div>
      </section>

      <div id="features" className="scroll-mt-20">
        <FeatureSection
          eyebrow="Inventory Management"
          title="Know what’s on the shelf — without the spreadsheet chase."
          description="Track inventory across surgeries and store rooms with live quantities and fast search, so the team spends less time hunting for stock."
          bullets={[
            "Complete stock visibility",
            "Live quantities by location",
            "Instant product search",
            "Clear counts for everyday use",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.stockPage}
          alt="Dental Assist Stock page with sidebar, search, folder toolbar and labelled stock folders"
          className="bg-background"
        />

        <FeatureSection
          eyebrow="Low Stock Alerts"
          title="Spot shortages early and act before they become urgent."
          description="Automatic low-stock visibility helps the team raise RFQs and keep purchasing moving — reducing the risk of missing materials on a busy day."
          bullets={[
            "Automatic low-stock detection",
            "One-click paths into RFQs",
            "Clear lists ready for action",
            "Fits the purchasing workflow",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.lowStockPage}
          alt="Dental Assist Low Stock page showing items that need action and the first row of low-stock product cards"
          imageFirst
          className="bg-[#F7FBF9]"
        />

        <FeatureSection
          eyebrow="Expiry Tracking"
          title="Rotate stock with confidence and cut unnecessary waste."
          description="Monitor products nearing expiry so the practice can prioritise what should be used next and reduce write-offs."
          bullets={[
            "See expired and expiring products in one place",
            "Prioritise stock rotation before write-offs",
            "Reduce avoidable waste",
            "Keep expiry dates visible for day-to-day checks",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.expiring}
          alt="Dental Assist Expiring Stock page showing expired and expiring item cards with status labels and earliest expiry dates"
          className="bg-background"
        />

        <FeatureSection
          eyebrow="Supplier Management"
          title="Keep every supplier contact in one calm place."
          description="A central supplier directory helps the team find the right vendor quickly, follow up with clear contact details, and keep purchasing organised."
          bullets={[
            "Central supplier directory",
            "Contacts and account details together",
            "Clear Active supplier status",
            "Works alongside RFQs and ordering",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.suppliers}
          alt="Dental Assist Vendors page showing the supplier directory with contact details and Active status"
          imageFirst
          className="bg-[#F7FBF9]"
        />

        <FeatureSection
          eyebrow="Reporting"
          title="See what the practice spends, uses and saves."
          description="Owners and managers get a clear view of order value, stock usage and RFQ savings over time — without rebuilding spreadsheets each month."
          bullets={[
            "Order value, stock usage and RFQ savings on one timeline",
            "Six-month totals that are easy to compare",
            "Strongest months for spend, usage and savings",
            "Clear signals when smarter buying is offsetting spend",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.reporting}
          alt="Dental Assist Savings and Usage report showing order value, stock usage and RFQ savings trends"
          className="bg-background"
        />
      </div>

      <section
        id="product-gallery"
        className="scroll-mt-20 border-b border-border/60 bg-[#F7FBF9]"
      >
        <div className="mx-auto max-w-[1200px] px-6 py-12 pb-10 md:py-16 lg:px-10 lg:py-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              Product tour
            </div>
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] text-foreground sm:text-[42px]">
              See Dental Assist in action.
            </h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted-foreground md:mt-4">
              Browse real product screens from the Dental Assist workspace.
            </p>
          </motion.div>
          <div className="mt-6 md:mt-10">
            <MediaGallery items={gallery} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              Benefits
            </div>
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] text-foreground sm:text-[42px]">
              Less stress. Clearer stock. Calmer ordering.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <BenefitCard
              icon={Leaf}
              title="Reduce waste"
              body="Spot expiry risk earlier and rotate stock before it becomes a write-off."
            />
            <BenefitCard
              icon={PiggyBank}
              title="Save money"
              body="Compare supplier responses and make clearer purchasing decisions."
            />
            <BenefitCard
              icon={PackageCheck}
              title="Spot shortages earlier"
              body="Low-stock visibility helps the team act before materials run critically low."
            />
            <BenefitCard
              icon={Timer}
              title="Spend less time ordering"
              body="Keep stock, suppliers and purchase orders together so admin takes less of the day."
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-[#F7FBF9]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              How it works
            </div>
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] text-foreground sm:text-[42px]">
              Up and running in three simple steps.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                className="h-full rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="text-[12px] font-semibold tabular-nums tracking-[0.16em] text-muted-foreground">
                  {s.n}
                </div>
                <h3 className="mt-4 text-[20px] font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-muted-foreground">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              Pricing
            </div>
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] text-foreground sm:text-[42px]">
              Simple pricing.
            </h2>
            <p className="mt-4 text-[16px] text-muted-foreground">
              14-day free trial · No credit card required · £59 per practice/month
            </p>
          </div>
          <PricingCard />
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-b border-border/60 bg-[#F7FBF9]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
              FAQ
            </div>
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] text-foreground sm:text-[42px]">
              Questions, answered.
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
