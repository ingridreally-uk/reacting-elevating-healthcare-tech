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
    alt: "Dental Assist dashboard",
  },
  {
    id: "stock",
    title: "Stock",
    description: "Live inventory across locations",
    imageSrc: SCREENS.stock,
    alt: "Dental Assist stock screen",
  },
  {
    id: "low-stock",
    title: "Low Stock",
    description: "Items that need attention",
    imageSrc: SCREENS.lowStock,
    alt: "Dental Assist low stock screen",
  },
  {
    id: "expiring",
    title: "Expiring Stock",
    description: "Prioritise rotation and reduce waste",
    imageSrc: SCREENS.expiring,
    alt: "Dental Assist Expiring Stock page showing expired and expiring item cards with status labels and earliest expiry dates",
  },
  {
    id: "suppliers",
    title: "Suppliers",
    description: "Contacts and purchase history",
    imageSrc: SCREENS.suppliers,
    alt: "Dental Assist supplier list",
  },
  {
    id: "rfq",
    title: "RFQs",
    description: "Compare quotes before you buy",
    imageSrc: SCREENS.rfq,
    alt: "Dental Assist RFQ screen",
  },
  {
    id: "orders",
    title: "Purchase Orders",
    description: "Raise and track orders in one place",
    imageSrc: SCREENS.purchasing,
    alt: "Dental Assist purchase orders",
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Spend, usage and savings signals",
    imageSrc: SCREENS.reporting,
    alt: "Dental Assist reporting",
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
          eyebrow="Inventory management"
          title="Know what’s on the shelf — without the spreadsheet chase."
          description="Track inventory across surgeries and store rooms with live quantities and fast search, so the team spends less time hunting for stock."
          bullets={[
            "Complete stock visibility",
            "Live quantities by location",
            "Instant product search",
            "Clear counts for everyday use",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.stock}
          alt="Dental Assist inventory management"
          className="bg-background"
        />

        <FeatureSection
          eyebrow="Low stock alerts"
          title="Spot shortages early and act before they become urgent."
          description="Automatic low-stock visibility helps the team raise RFQs and keep purchasing moving — reducing the risk of missing materials on a busy day."
          bullets={[
            "Automatic low-stock detection",
            "One-click paths into RFQs",
            "Clear lists ready for action",
            "Fits the purchasing workflow",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.lowStock}
          alt="Dental Assist low stock alerts"
          imageFirst
          className="bg-[#F7FBF9]"
        />

        <FeatureSection
          eyebrow="Expiry tracking"
          title="Rotate stock with confidence and cut unnecessary waste."
          description="Monitor products nearing expiry so the practice can prioritise what should be used next and reduce write-offs."
          bullets={[
            "Monitor expiring products",
            "Prioritise stock rotation",
            "Reduce avoidable waste",
            "Support day-to-day compliance habits",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.expiring}
          alt="Dental Assist Expiring Stock page showing expired and expiring item cards with status labels and earliest expiry dates"
          className="bg-background"
        />

        <FeatureSection
          eyebrow="Supplier management"
          title="Keep suppliers, history and ordering in one calm place."
          description="A central supplier directory with purchase history helps the team follow up faster and keep RFQs and orders organised."
          bullets={[
            "Central supplier database",
            "Purchase history by vendor",
            "Clearer supplier follow-up",
            "RFQ and ordering in the same workspace",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.suppliers}
          alt="Dental Assist supplier list"
          imageFirst
          className="bg-[#F7FBF9]"
        />

        <FeatureSection
          eyebrow="Reporting"
          title="See spend, usage and savings without rebuilding reports."
          description="Interactive dashboards help owners and managers understand purchasing trends, stock value and usage signals."
          bullets={[
            "Purchasing trends",
            "Stock value and usage views",
            "Savings signals from smarter buying",
            "Supplier analytics in one place",
          ]}
          ctaHref={APP_SIGNUP}
          imageSrc={SCREENS.reporting}
          alt="Dental Assist reporting"
          className="bg-background"
        />
      </div>

      <section
        id="product-gallery"
        className="scroll-mt-20 border-b border-border/60 bg-[#F7FBF9]"
      >
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
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
            <p className="mt-4 text-[16px] leading-[1.65] text-muted-foreground">
              Browse real product screens. A walkthrough video will replace
              individual shots here as it becomes available.
            </p>
          </motion.div>
          <div className="mt-10">
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
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] sm:text-[42px]">
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
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] sm:text-[42px]">
              Up and running in three simple steps.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
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
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] sm:text-[42px]">
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
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] sm:text-[42px]">
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
