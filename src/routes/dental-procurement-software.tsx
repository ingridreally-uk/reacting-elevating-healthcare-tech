import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteChrome";
import { ProductFrame } from "@/components/marketing/ProductFrame";
import { MediaViewer } from "@/components/marketing/MediaViewer";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";
import { APP_SIGNUP } from "@/components/marketing/content";
import { procurementFaqs } from "@/components/marketing/procurement-faq";
import { btn, iconStroke, layout, type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const PAGE_TITLE = "Dental Procurement Software for Dental Practices | Dental Assist";
const PAGE_DESCRIPTION =
  "Compare dental supplier quotes, see previous price context and manage purchasing, orders and receiving in one workflow. Dental Assist works alongside your practice-management system.";

const REQUEST_PROOF = {
  desktop: "/product-screens/mkt-purchasing-request.webp",
  mobile: "/product-screens/mkt-purchasing-request.webp",
  desktopAspect: "1648 / 744",
  mobileAspect: "1648 / 744",
} as const;

const COMPARE_PROOF = {
  desktop: "/product-screens/mkt-purchasing-compare.webp",
  mobile: "/product-screens/mkt-purchasing-compare.webp",
  desktopAspect: "1648 / 1408",
  mobileAspect: "1648 / 1408",
} as const;

const ORDER_PROOF = {
  desktop: "/product-screens/mkt-order-543.webp",
  mobile: "/product-screens/mkt-order-543.webp",
  desktopAspect: "1640 / 744",
  mobileAspect: "1640 / 744",
} as const;

const RECEIVE_PROOF = {
  desktop: "/product-screens/mkt-receive-543.webp",
  mobile: "/product-screens/mkt-receive-543.webp",
  desktopAspect: "1490 / 655",
  mobileAspect: "1490 / 655",
} as const;

const SHELL = "mx-auto max-w-[1200px] px-6 lg:px-10";

type Stage = {
  id: string;
  name: string;
  line: string;
};

const requestStages: Stage[] = [
  { id: "need", name: "Need", line: "Know what the practice needs." },
  { id: "request", name: "Request", line: "Create the purchasing request." },
  { id: "responses", name: "Responses", line: "Bring supplier responses back to the same workflow." },
];

const decisionStages: Stage[] = [
  { id: "compare", name: "Compare", line: "Compare suitable options with price context." },
  { id: "order", name: "Order", line: "Turn the purchasing decision into an order." },
  { id: "receive", name: "Receive", line: "Record what arrived and what still needs attention." },
];

const savings = [
  {
    n: "01",
    title: "Supplier comparison",
    body: "Compare suitable supplier responses rather than purchasing without competitive price context.",
  },
  {
    n: "02",
    title: "Previous-price context",
    body: "See what was paid previously and recognise when current pricing has changed.",
  },
  {
    n: "03",
    title: "Less purchasing administration",
    body: "Reduce staff time spent contacting suppliers separately, rebuilding lists and manually comparing responses.",
  },
] as const;

export const Route = createFileRoute("/dental-procurement-software")({
  head: () => {
    const base = pageMeta({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      path: "/dental-procurement-software",
      imageAlt:
        "Dental Assist supplier comparison showing quotes side by side, selected supplier lines, order summary and budget impact",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${SITE_ORIGIN}/dental-procurement-software#faq`,
            mainEntity: procurementFaqs.map((item) => ({
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
  component: DentalProcurementSoftwarePage,
});

function DentalProcurementSoftwarePage() {
  return (
    <SiteShell>
      <section className="bg-background">
        <div className={cn(SHELL, "pb-0 pt-10 lg:pt-12")}>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.41fr)_minmax(0,0.59fr)] lg:gap-6 xl:gap-8">
            <div className="min-w-0 lg:py-2">
              <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
                Dental procurement software
              </div>
              <h1 className={cn("mt-3 max-w-[14ch]", mktType.pageH1)}>
                Compare suppliers before you buy.
              </h1>
              <p className={cn("mt-4 max-w-[44ch]", mktType.bodyLg)}>
                Send one purchasing request, compare supplier responses with previous-price context,
                and make the purchasing decision with the information in front of you — without
                rebuilding the same process across emails, spreadsheets and supplier websites.
              </p>
              <p className="mt-3 max-w-[40ch] text-[15px] font-medium leading-[1.5] tracking-tight text-foreground">
                Spend less time ordering. See what you paid before. Make better-informed purchasing
                decisions.
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
              <p className="mt-4 text-[12.5px] text-foreground/55">
                14 days free · No card required · Works alongside your existing practice-management
                system
              </p>
            </div>

            <div className="min-w-0 xl:w-[calc(100%+1.25rem)]">
              <ProductFrame label="Purchasing" emphasis="hero" className="w-full">
                <div className="lg:hidden">
                  <MediaViewer
                    imageSrc={REQUEST_PROOF.mobile}
                    alt="Dental Assist purchasing request 748 — items being requested, previous prices and Send for quote"
                    objectFit="contain"
                    aspectRatio={REQUEST_PROOF.mobileAspect}
                    priority
                  />
                </div>
                <div className="hidden lg:block">
                  <MediaViewer
                    imageSrc={REQUEST_PROOF.desktop}
                    alt="Dental Assist purchasing request 748 — items being requested, previous prices and Send for quote"
                    objectFit="contain"
                    aspectRatio={REQUEST_PROOF.desktopAspect}
                    priority
                  />
                </div>
              </ProductFrame>
            </div>
          </div>

          <div className="mt-6 border-t border-border/50 pb-5 pt-4 lg:mt-7 lg:pb-6 lg:pt-5">
            <ProcurementJourney />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="compare-heading"
        className="border-t border-border/40 bg-[#F4F7FA]"
      >
        <div
          className={cn(
            SHELL,
            "grid items-start gap-6 py-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:items-center lg:gap-10 lg:py-9 xl:gap-12",
          )}
        >
          <div className="min-w-0">
            <p className={layout.eyebrow}>Compare before you commit</p>
            <h2 id="compare-heading" className={cn("mt-2.5 max-w-[16ch]", layout.h2)}>
              See the difference before you place the order.
            </h2>
            <p className={cn("mt-3.5 max-w-[42ch]", mktType.body)}>
              Supplier prices are easier to judge when they're shown in context. Dental Assist
              brings responses together so you can compare suitable options and make the purchasing
              decision before turning it into an order.
            </p>
            <div className="mt-5 border-l-2 border-accent pl-4">
              <h3 className="text-[17px] font-semibold tracking-tight text-foreground sm:text-[18px]">
                Know what you paid before.
              </h3>
              <p className={cn("mt-2 max-w-[40ch]", mktType.body)}>
                Previous purchase-price context makes price changes visible. Instead of relying on
                memory or searching through old invoices and orders, the practice has another
                reference point when deciding what to buy.
              </p>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden">
            <ProductFrame label="Purchasing" className="w-full">
              <div className="md:hidden">
                <MediaViewer
                  imageSrc={COMPARE_PROOF.mobile}
                  alt="Dental Assist purchasing comparison — selected supplier quotes, money saved, order summary and budget impact"
                  objectFit="contain"
                  aspectRatio={COMPARE_PROOF.mobileAspect}
                />
              </div>
              <div className="hidden md:block">
                <MediaViewer
                  imageSrc={COMPARE_PROOF.desktop}
                  alt="Dental Assist purchasing comparison — selected supplier quotes, money saved, order summary and budget impact"
                  objectFit="contain"
                  aspectRatio={COMPARE_PROOF.desktopAspect}
                />
              </div>
            </ProductFrame>
          </div>
        </div>
      </section>

      <section aria-labelledby="savings-heading" className="bg-background">
        <div className={cn(SHELL, "pt-8 pb-6 lg:pt-9 lg:pb-6")}>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14">
            <div className="min-w-0">
              <p className={layout.eyebrow}>Purchasing value</p>
              <h2 id="savings-heading" className={cn("mt-2.5 max-w-[12ch]", layout.h2)}>
                Savings start before the order is placed.
              </h2>
              <p className="mt-4 max-w-[38ch] text-[15px] font-medium leading-[1.55] text-foreground sm:text-[16px]">
                Better price information and less repetitive purchasing administration both affect
                what it costs the practice to buy and manage supplies.
              </p>
            </div>
            <ol className="min-w-0 divide-y divide-[#0B1730]/12">
              {savings.map((item) => (
                <li key={item.n} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 py-3.5 first:pt-0 last:pb-0">
                  <p className="pt-0.5 text-[11px] font-semibold tabular-nums tracking-[0.16em] text-accent">
                    {item.n}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-[15.5px] font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[14.5px] leading-[1.55] text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 border-t border-border/50 pt-4 lg:mt-6 lg:flex lg:items-baseline lg:gap-8 lg:pt-5">
            <div className="min-w-0 lg:max-w-[20rem] lg:shrink-0">
              <p className={layout.eyebrow}>For the team</p>
              <h2
                id="team-heading"
                className="mt-1.5 max-w-[20ch] text-[20px] font-semibold leading-[1.18] tracking-[-0.026em] text-foreground sm:text-[22px]"
              >
                One request instead of rebuilding the same job several times.
              </h2>
            </div>
            <div className="mt-3 min-w-0 lg:mt-0 lg:max-w-[54ch]">
              <p className="text-[14.5px] leading-[1.55] text-muted-foreground sm:text-[15px]">
                Purchasing often means more than choosing a product. Someone has to prepare the
                list, contact suppliers, compare replies, work out what has changed, place the order
                and follow what arrives.
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted-foreground sm:text-[15px]">
                Bringing those steps into one workflow reduces the amount of information the team
                has to reconstruct manually and gives practice managers and nurses a clearer
                purchasing process to follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="orders-heading"
        className="border-t border-border/40 bg-[#F4F7FA]"
      >
        <div
          className={cn(
            SHELL,
            "grid items-center gap-6 py-6 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] lg:gap-8 lg:py-7",
          )}
        >
          <div className="min-w-0">
            <p className={layout.eyebrow}>After the decision</p>
            <h2 id="orders-heading" className={cn("mt-2.5 max-w-[16ch]", layout.h2)}>
              A quote isn't the end of the purchasing job.
            </h2>
            <p className={cn("mt-3.5 max-w-[42ch]", mktType.body)}>
              Once the decision is made, the practice still needs to know what was ordered, what is
              waiting and what requires follow-up. Dental Assist keeps that purchasing activity
              connected instead of losing the next stage in another spreadsheet, inbox or supplier
              portal.
            </p>
          </div>
          <div className="min-w-0 overflow-hidden">
            <ProductFrame label="Orders" className="w-full">
              <div className="md:hidden">
                <MediaViewer
                  imageSrc={ORDER_PROOF.mobile}
                  alt="Dental Assist order 543 — Waiting, Reacting Dental Supplies, items and total"
                  objectFit="contain"
                  aspectRatio={ORDER_PROOF.mobileAspect}
                />
              </div>
              <div className="hidden md:block">
                <MediaViewer
                  imageSrc={ORDER_PROOF.desktop}
                  alt="Dental Assist order 543 — Waiting, Reacting Dental Supplies, items and total"
                  objectFit="contain"
                  aspectRatio={ORDER_PROOF.desktopAspect}
                />
              </div>
            </ProductFrame>
          </div>
        </div>
      </section>

      <section aria-labelledby="control-heading" className="bg-background">
        <div className={cn(SHELL, "grid items-center gap-6 py-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 lg:py-7")}>
          <div className="min-w-0 max-w-[40rem]">
            <p className={layout.eyebrow}>Control after the order</p>
            <h2 id="control-heading" className={cn("mt-2.5 max-w-[22ch]", layout.h2)}>
              Know what arrived — and what still needs attention.
            </h2>
            <p className={cn("mt-3.5 max-w-[46ch]", mktType.body)}>
              Receiving closes the purchasing loop. Record what arrived, update the relevant stock
              information and keep visibility of quantities that still need follow-up.
            </p>
          </div>
          <div className="min-w-0">
            <ProductFrame label="Orders" className="w-full">
              <MediaViewer
                imageSrc={RECEIVE_PROOF.desktop}
                alt="Receive order 543 — arriving quantity, follow-up quantity, stock location and expiry"
                objectFit="contain"
                aspectRatio={RECEIVE_PROOF.desktopAspect}
              />
            </ProductFrame>
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="scroll-mt-24 border-t border-border/40 bg-[#F4F7FA]"
      >
        <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-5 lg:px-10 lg:pb-9 lg:pt-6">
          <FAQ
            items={procurementFaqs}
            heading="Still deciding how purchasing should work in the practice?"
            lead="Straight answers for owners, managers and stock leads."
          />
          <p className="mx-auto mt-8 max-w-[820px] text-center text-[14px] leading-[1.65] text-muted-foreground">
            Need a simple manual way to record what staff have asked the practice to buy and
            whether it has been dealt with? Use the{" "}
            <Link
              to="/resources/dental-supply-request-template"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              free dental supply request template
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection
        heading="See what a clearer purchasing process looks like in your practice."
        body="Start a 14-day trial, or book a short demo to see how Dental Assist connects supplier requests, comparison, purchasing and orders with the operational information your team already manages."
        headingClassName="mx-auto mt-3 max-w-[22ch] text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[40px]"
        bodyClassName="mx-auto mt-4 max-w-[48ch] text-[15px] leading-[1.65] text-white/68"
      />
    </SiteShell>
  );
}

function StageRow({
  items,
  accentId,
}: {
  items: readonly Stage[];
  accentId?: string;
}) {
  return (
    <ol className="grid grid-cols-3 gap-x-3 sm:gap-x-5">
      {items.map((stage, i) => (
        <li key={stage.id} className="relative min-w-0 pr-3 sm:pr-4">
          {i < items.length - 1 ? (
            <span
              className="pointer-events-none absolute right-0 top-[7px] text-[11px] leading-none text-accent/55"
              aria-hidden
            >
              →
            </span>
          ) : null}
          <h3
            className={cn(
              "text-[13px] font-semibold tracking-tight sm:text-[14px]",
              stage.id === accentId ? "text-accent" : "text-foreground",
            )}
          >
            {stage.name}
          </h3>
          <p className="mt-0.5 max-w-[22ch] text-[12px] leading-[1.4] text-muted-foreground sm:text-[12.5px]">
            {stage.line}
          </p>
        </li>
      ))}
    </ol>
  );
}

function ProcurementJourney() {
  return (
    <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] lg:gap-6 xl:gap-8">
      <div className="min-w-0">
        <p className={layout.eyebrow}>One connected purchasing process</p>
        <h2
          id="journey-heading"
          className="mt-2 max-w-[16ch] text-[22px] font-semibold leading-[1.15] tracking-[-0.028em] text-foreground sm:text-[26px]"
        >
          From “we need this” to an order you can follow.
        </h2>
      </div>

      <div className="min-w-0" aria-label="Need, Request, Responses, Compare, Order, Receive">
        <div className="hidden sm:block">
          <StageRow items={requestStages} />
          <div className="flex justify-center py-1.5" aria-hidden>
            <span className="text-[13px] leading-none text-accent/55">↓</span>
          </div>
          <StageRow items={decisionStages} accentId="compare" />
        </div>

        <ol className="space-y-3.5 sm:hidden">
          {[...requestStages, ...decisionStages].map((stage, i) => (
            <li key={stage.id}>
              {i === 3 ? (
                <div className="mb-3 mt-1 h-px w-8 bg-accent/40" aria-hidden />
              ) : null}
              <h3
                className={cn(
                  "text-[14px] font-semibold tracking-tight",
                  stage.id === "compare" ? "text-accent" : "text-foreground",
                )}
              >
                {stage.name}
              </h3>
              <p className="mt-0.5 text-[13px] leading-[1.4] text-muted-foreground">{stage.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
