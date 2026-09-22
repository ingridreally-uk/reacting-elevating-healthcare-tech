import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteChrome";
import { ProductFrame } from "@/components/marketing/ProductFrame";
import { MediaViewer } from "@/components/marketing/MediaViewer";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";
import { APP_SIGNUP } from "@/components/marketing/content";
import { stockManagementFaqs } from "@/components/marketing/stock-management-faq";
import { btn, iconStroke, layout, type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const PAGE_TITLE = "Dental Stock Management for Dental Practices | Dental Assist";
const PAGE_DESCRIPTION =
  "Keep dental stock, expiry and low-stock risk in one shared operational view. Spend less time managing stock, make better purchasing decisions and see what needs attention across the practice.";

const STOCK_MATCHES = {
  desktop: "/product-screens/mkt-stock-matches.webp",
  mobile: "/product-screens/mkt-stock-matches-mobile.webp",
  desktopAspect: "892 / 860",
  mobileAspect: "860 / 448",
} as const;

const OWNER_OVERVIEW = {
  desktop: "/product-screens/mkt-dash-current.webp",
  mobile: "/product-screens/mkt-dash-current-mobile.webp",
  desktopAspect: "1588 / 562",
  mobileAspect: "1588 / 562",
} as const;

const PURCHASING_RESPONSES = {
  desktop: "/product-screens/mkt-purchasing-responses.webp",
  mobile: "/product-screens/mkt-purchasing-responses.webp",
  desktopAspect: "1636 / 790",
  mobileAspect: "1636 / 790",
} as const;

type Stage = {
  id: string;
  name: string;
  line: string;
};

const stages: Stage[] = [
  { id: "stock", name: "Stock", line: "What do we have, and where is it?" },
  { id: "risk", name: "Risk", line: "What is low or approaching expiry?" },
  { id: "decision", name: "Decision", line: "What actually needs attention now?" },
  { id: "order", name: "Order", line: "Connect that decision to suppliers and purchasing." },
  { id: "control", name: "Control", line: "What has been ordered, received and already handled?" },
];

const staffStages: Stage[] = [
  {
    id: "admin",
    name: "Stock administration",
    line: "Checking · reconciling · updating lists · finding what is already ordered",
  },
  {
    id: "practice",
    name: "Practice work",
    line: "Patients · supporting clinicians · team · other operational work",
  },
];

export const Route = createFileRoute("/dental-stock-management")({
  head: () => {
    const base = pageMeta({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      path: "/dental-stock-management",
      imageAlt: "Dental Assist stock record showing quantity, location and item status",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${SITE_ORIGIN}/dental-stock-management#faq`,
            mainEntity: stockManagementFaqs.map((item) => ({
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
    };
  },
  component: DentalStockManagementPage,
});

function DentalStockManagementPage() {
  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-16 lg:px-10 lg:pb-8 lg:pt-20">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-10">
            <div className="min-w-0 text-left lg:pt-8">
              <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
                Dental stock management
              </div>
              <h1 className={cn("mt-3", mktType.pageH1)}>
                Dental stock management without the spreadsheets and guesswork.
              </h1>
              <p className={cn("mt-4 max-w-xl", mktType.bodyLg)}>
                Know what you have, what is running low, what is approaching expiry and what
                needs attention — without piecing the picture together from cupboards, lists,
                messages and memory.
              </p>
              <p className={cn("mt-3 max-w-xl", mktType.body)}>
                Make everyday stock management quicker and clearer, so the team spends less time
                working out what needs attention and the owner has a clearer view without having
                to ask.
              </p>
              <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                <a
                  href={APP_SIGNUP}
                  rel="noopener noreferrer"
                  className={cn(btn.base, btn.primary, "w-full sm:w-auto")}
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
                </a>
                <Link to="/book-demo" className={cn(btn.base, btn.secondary, "w-full sm:w-auto")}>
                  Book a Demo
                </Link>
              </div>
              <p className="mt-5 text-[12.5px] text-foreground/55">
                14 days free · No card required · Works alongside your existing
                practice-management system
              </p>
            </div>

            <div className="min-w-0 w-full max-w-[620px] overflow-hidden lg:justify-self-start">
              <ProductFrame label="app.reacting.io / stock" className="w-full">
                <div className="lg:hidden">
                  <MediaViewer
                    imageSrc={STOCK_MATCHES.mobile}
                    alt="Dental Assist stock matches for gloves, showing items already in orders, stock above minimum and low stock"
                    objectFit="contain"
                    aspectRatio={STOCK_MATCHES.mobileAspect}
                    priority
                  />
                </div>
                <div className="hidden lg:block">
                  <MediaViewer
                    imageSrc={STOCK_MATCHES.desktop}
                    alt="Dental Assist Add items panel showing stock matches for gloves, with quantities, order status and similar variants"
                    objectFit="contain"
                    aspectRatio={STOCK_MATCHES.desktopAspect}
                    priority
                  />
                </div>
              </ProductFrame>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="problem-heading"
        className="border-b border-border/40 bg-background"
      >
        <div className={cn(layout.shell, "py-8 lg:py-10")}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={layout.eyebrow}>In the practice</p>
            <h2 id="problem-heading" className={cn("mt-2.5", layout.h2)}>
              The problem isn't just counting stock.
            </h2>
            <p className={cn("mx-auto mt-4 max-w-[54ch]", mktType.body)}>
              Counting is only part of the work. Problems arise when something runs low
              unexpectedly, expiry is noticed too late, or an order goes out for material the
              practice already holds. Nurses and managers then spend the day checking cupboards,
              lists and messages because nobody has one current picture — so ordering becomes
              reactive.
            </p>
            <p className={cn("mx-auto mt-3 max-w-[46ch]", mktType.body)}>
              The problem is not the team. It is fragmented operational information.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="time-heading"
        className="border-b border-border/40 bg-[#F1F5F9]"
      >
        <div className={cn(layout.shell, "py-8")}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={layout.eyebrow}>The working day</p>
            <h2 id="time-heading" className={cn("mt-2.5", layout.h2)}>
              Less time managing stock. More time for the practice.
            </h2>
            <p className={cn("mx-auto mt-3 max-w-[50ch] font-medium text-foreground", mktType.body)}>
              Give the team one place to see what needs attention.
            </p>
          </div>

          <StaffTimeStages />

          <p className={cn("mx-auto mt-5 max-w-[54ch] text-center", mktType.body)}>
            When stock information is current and shared, nurses, stock leads and practice
            managers spend less time checking cupboards, updating separate lists, reconciling
            information, checking whether something is already ordered, or rebuilding the same
            operational picture.
          </p>
          <p className={cn("mx-auto mt-2.5 max-w-[52ch] text-center", mktType.body)}>
            That leaves more time for patients, supporting clinicians, the team and the other
            work that keeps the practice running. Reducing repetitive stock administration also
            reduces the paid staff time those tasks consume. It does not mean reducing the team.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="owner-heading"
        className="border-b border-border/40 bg-background"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-7 lg:px-10 lg:py-8">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-center lg:gap-4">
            <div className="min-w-0 text-left">
              <p className={layout.eyebrow}>For the owner</p>
              <h2 id="owner-heading" className={cn("mt-2.5", layout.h2)}>
                Know what's happening — without having to ask.
              </h2>
              <p className={cn("mt-4", mktType.bodyLg)}>
                See the operational picture when you need it: stock that needs attention, expiry
                risk, purchasing and orders, and clearer visibility over spend. Your team can get
                on with the day while you keep sight of what is happening across the practice.
              </p>
              <p className="mt-4 text-[15px] font-medium tracking-tight text-foreground">
                Visibility without micromanagement.
              </p>
            </div>

            <div className="min-w-0 w-full overflow-hidden">
              <ProductFrame label="app.reacting.io / dashboard" className="w-full">
                <div className="lg:hidden">
                  <MediaViewer
                    imageSrc={OWNER_OVERVIEW.mobile}
                    alt="Dental Assist dashboard showing stock risk, purchasing queue, spend and actions requiring attention"
                    objectFit="contain"
                    aspectRatio={OWNER_OVERVIEW.mobileAspect}
                    priority
                  />
                </div>
                <div className="hidden lg:block">
                  <MediaViewer
                    imageSrc={OWNER_OVERVIEW.desktop}
                    alt="Dental Assist dashboard showing stock risk, purchasing queue, spend and actions requiring attention"
                    objectFit="contain"
                    aspectRatio={OWNER_OVERVIEW.desktopAspect}
                    priority
                  />
                </div>
              </ProductFrame>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="workflow-heading"
        className="border-b border-border/40 bg-[#F1F5F9]"
      >
        <div className={cn(layout.shell, "py-6 lg:py-7")}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={layout.eyebrow}>Connected operations</p>
            <h2 id="workflow-heading" className={cn("mt-2.5", layout.h2)}>
              From stock on the shelf to an order you can follow.
            </h2>
          </div>

          <WorkflowStages />

          <p className="mx-auto mt-4 max-w-[46ch] text-center text-[14px] leading-[1.6] text-muted-foreground sm:text-[15px]">
            One connected operational view — instead of a stock list in one place, supplier
            information in another and delivery notes somewhere else.
          </p>
          <div className="mt-3 flex justify-center">
            <Link
              to="/product"
              className="inline-flex min-h-10 items-center gap-1.5 text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
            >
              See Dental Assist
              <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="risk-heading"
        className="border-b border-border/40 bg-background"
      >
        <div className={cn(layout.shell, "py-5 lg:py-6")}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={layout.eyebrow}>See risk earlier</p>
            <h2 id="risk-heading" className={cn("mt-2.5", layout.h2)}>
              Know what needs attention before it becomes urgent.
            </h2>
          </div>
          <div className="mx-auto mt-4 grid max-w-5xl gap-6 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">
            <div className="border-l-2 border-accent pl-4">
              <h3 className={cn(mktType.subH2)}>Low stock</h3>
              <p className={cn("mt-2.5", mktType.body)}>
                Make shortages visible while there is still time to act and order with context —
                including whether something is already on order.
              </p>
            </div>
            <div className="border-l-2 border-warning pl-4">
              <h3 className={cn(mktType.subH2)}>Expiry</h3>
              <p className={cn("mt-2.5", mktType.body)}>
                Surface approaching expiry earlier so stock can be used, rotated, or unnecessary
                replenishment avoided where appropriate.
              </p>
            </div>
          </div>
          <p className={cn("mx-auto mt-4 max-w-[52ch] text-center", mktType.body)}>
            Earlier visibility helps reduce avoidable stock write-offs and unnecessary purchasing.
            It does not make every shortage or expiry disappear.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="purchasing-heading"
        className="border-b border-border/40 bg-[#F1F5F9]"
      >
        <div className={cn(layout.shell, "pb-7 pt-7 md:pb-5 lg:pb-6 lg:pt-8")}>
          <div className="grid grid-cols-1 gap-y-5 [grid-template-areas:'intro'_'compare'_'proof'_'rest'] lg:gap-y-5 lg:[grid-template-areas:'intro'_'proof'_'compare'_'rest']">
            <div className="[grid-area:intro] mx-auto w-full max-w-2xl text-left lg:text-center">
              <p className={layout.eyebrow}>Beyond the count</p>
              <h2 id="purchasing-heading" className={cn("mt-2.5", layout.h2)}>
                Stock management doesn't stop when something needs ordering.
              </h2>
              <p className={cn("mx-auto mt-4 max-w-[54ch]", mktType.body)}>
                Dental Assist connects stock with suppliers, supplier quotes and RFQs, previous
                purchase-price context, purchasing, orders and receiving — so the decision to order
                is not detached from the rest of the operational work.
              </p>
            </div>

            <h3
              className={cn(
                "[grid-area:compare] mx-auto w-full max-w-[720px] text-left",
                mktType.subH2,
              )}
            >
              Compare before you buy.
            </h3>

            <div className="[grid-area:proof] mx-auto w-full max-w-[1000px] overflow-hidden">
              <ProductFrame label="Purchasing" className="w-full">
                <div className="lg:hidden">
                  <MediaViewer
                    imageSrc={PURCHASING_RESPONSES.mobile}
                    alt="Dental Assist purchasing responses before selection — supplier prices and no items selected"
                    objectFit="contain"
                    aspectRatio={PURCHASING_RESPONSES.mobileAspect}
                    priority
                  />
                </div>
                <div className="hidden lg:block">
                  <MediaViewer
                    imageSrc={PURCHASING_RESPONSES.desktop}
                    alt="Dental Assist purchasing responses before selection — supplier prices and no items selected"
                    objectFit="contain"
                    aspectRatio={PURCHASING_RESPONSES.desktopAspect}
                    priority
                  />
                </div>
              </ProductFrame>
            </div>

            <div className="[grid-area:rest] mx-auto w-full max-w-[720px] text-left">
              <p className={mktType.body}>
                When valid supplier responses offer different prices, the practice can compare them
                and identify the better-priced suitable option rather than purchasing without price
                context. Seeing previous purchase-price context helps the practice recognise price
                changes and make the next purchasing decision with more information.
              </p>
              <p className="mt-4 max-w-[36ch] text-[16px] font-semibold tracking-tight text-foreground sm:text-[18px]">
                Save time. Make better purchasing decisions. Stay in control.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  to="/product"
                  className="inline-flex min-h-10 items-center gap-1.5 text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
                >
                  See the full product
                  <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex min-h-10 items-center text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="scroll-mt-24 bg-[#F1F5F9]"
      >
        <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-4 md:pt-3 lg:px-10 lg:pb-9 lg:pt-4">
          <FAQ
            items={stockManagementFaqs}
            heading="Still deciding how the practice should manage stock?"
            lead="Straight answers for owners, managers, nurses and stock leads."
          />
          <p className="mx-auto mt-8 max-w-[820px] text-center text-[14px] leading-[1.65] text-muted-foreground">
            Need a structured starting point for a one-off room-by-room count? Use our{" "}
            <Link
              to="/resources/dental-stocktake-checklist"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              free manual stocktake checklist
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection
        heading="See whether a clearer way of managing stock fits your practice."
        body="Start a 14-day trial with your own practice, or book a short demo to see how Dental Assist brings stock, expiry, ordering and receiving together alongside the system you already use."
        headingClassName="mx-auto mt-3 max-w-[20ch] text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[40px]"
        bodyClassName="mx-auto mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-white/68"
      />
    </SiteShell>
  );
}

function StaffTimeStages() {
  const admin = staffStages[0];
  const practice = staffStages[1];

  return (
    <>
      <ol
        className="mx-auto mt-5 flex max-w-[420px] flex-col items-center text-center sm:hidden"
        aria-label="Stock administration, then practice work"
      >
        {staffStages.map((stage, i) => (
          <li key={stage.id} className="flex w-full min-w-0 flex-col items-center">
            {i > 0 ? (
              <span className="my-3 text-[18px] leading-none text-[#0B1730]/40" aria-hidden>
                ↓
              </span>
            ) : null}
            <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
              {i + 1} — {stage.name}
            </h3>
            <p className="mt-1 max-w-[36ch] text-[13px] leading-[1.45] text-muted-foreground">
              {stage.line}
            </p>
          </li>
        ))}
      </ol>
      <div className="relative mx-auto mt-5 hidden w-full max-w-[800px] sm:block">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[22%] right-[22%] top-[18px] flex -translate-y-1/2 items-center"
        >
          <span className="h-[2px] min-w-0 flex-1 bg-[#0B1730]/18" />
          <span className="bg-[#F1F5F9] px-1.5 text-[13px] leading-none text-[#0B1730]/40">
            →
          </span>
          <span className="h-[2px] min-w-0 flex-1 bg-[#0B1730]/18" />
        </div>
        <ol className="grid grid-cols-2" aria-label="Stock administration, then practice work">
          <li className="relative flex min-w-0 flex-col items-center px-4 text-center">
            <span
              className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1730] text-[13px] font-semibold tabular-nums text-white ring-[5px] ring-[#F1F5F9]"
              aria-hidden
            >
              1
            </span>
            <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-foreground">
              {admin.name}
            </h3>
            <p className="mt-1 max-w-[28ch] text-[13px] leading-[1.5] text-muted-foreground">
              {admin.line}
            </p>
          </li>
          <li className="relative flex min-w-0 flex-col items-center px-4 text-center">
            <span
              className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1730] text-[13px] font-semibold tabular-nums text-white ring-[5px] ring-[#F1F5F9]"
              aria-hidden
            >
              2
            </span>
            <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-foreground">
              {practice.name}
            </h3>
            <p className="mt-1 max-w-[28ch] text-[13px] leading-[1.5] text-muted-foreground">
              {practice.line}
            </p>
          </li>
        </ol>
      </div>
    </>
  );
}

function StageNode({
  stage,
  index,
  compact,
}: {
  stage: Stage;
  index: number;
  compact?: boolean;
}) {
  return (
    <li className="relative flex min-w-0 flex-col items-center px-1.5 text-center sm:px-2">
      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-full bg-[#0B1730] font-semibold tabular-nums text-white ring-[#F1F5F9]",
          compact ? "h-7 w-7 text-[11px] ring-[4px]" : "h-9 w-9 text-[13px] ring-[5px]",
        )}
        aria-hidden
      >
        {index + 1}
      </span>
      <h3
        className={cn(
          "mt-2 font-semibold tracking-tight text-foreground",
          compact ? "text-[13px]" : "text-[15px]",
        )}
      >
        {stage.name}
      </h3>
      <p
        className={cn(
          "mt-1 max-w-[18ch] text-muted-foreground",
          compact ? "text-[12px] leading-[1.4]" : "text-[13.5px] leading-[1.5]",
        )}
      >
        {stage.line}
      </p>
    </li>
  );
}

function FlowRow({
  items,
  startIndex,
  className,
}: {
  items: readonly Stage[];
  startIndex: number;
  className?: string;
}) {
  const inset = `${50 / items.length}%`;
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute top-[14px] h-px -translate-y-1/2 bg-[#0B1730]/20"
        style={{ left: inset, right: inset }}
      />
      <ol
        className="grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((stage, i) => (
          <StageNode key={stage.id} stage={stage} index={startIndex + i} compact />
        ))}
      </ol>
    </div>
  );
}

function WorkflowStages() {
  return (
    <>
      <div className="mx-auto mt-5 max-w-[880px] sm:hidden" aria-hidden>
        <FlowRow items={stages.slice(0, 3)} startIndex={0} />
        <FlowRow items={stages.slice(3)} startIndex={3} className="mx-auto mt-4 max-w-[72%]" />
      </div>
      <ol className="sr-only sm:hidden">
        {stages.map((stage, i) => (
          <li key={stage.id}>
            {i + 1}. {stage.name}. {stage.line}
          </li>
        ))}
      </ol>
      <div className="relative mx-auto mt-5 hidden max-w-[52rem] sm:block">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[10%] right-[10%] top-[18px] h-[2px] -translate-y-1/2 bg-[#0B1730]/18"
        />
        <ol className="grid grid-cols-5" aria-label="Stock, Risk, Decision, Order, Control">
          {stages.map((stage, i) => (
            <StageNode key={stage.id} stage={stage} index={i} />
          ))}
        </ol>
      </div>
    </>
  );
}
