import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { FAQ } from "@/components/marketing/FAQ";
import { DownloadTemplate } from "@/components/resources/DownloadTemplate";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { WorkbookFrame, WorkbookImage } from "@/components/resources/WorkbookFrame";
import { stocktakeFaqs } from "@/components/resources/stocktake-faq";
import {
  ARTICLE_DESCRIPTION,
  ARTICLE_H1,
  ARTICLE_PATH,
  ARTICLE_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PUBLISHED_ISO,
  PUBLISHED_LABEL,
  WORKBOOK_FILENAME,
  WORKBOOK_HREF,
} from "@/components/resources/stocktake";
import { layout, type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const HOW_TO_STEPS = [
  {
    name: "Set up your locations and categories",
    text: "On Lists, review the rooms and categories. Add or rename them so they match how your practice actually stores materials — surgeries, decontamination, stock room, reception, and any other area you use.",
  },
  {
    name: "Print the Count sheets for the first stocktake",
    text: "Print Count sheets and take them with you. The first count is a walk, not a screen task.",
  },
  {
    name: "Walk the practice room by room",
    text: "In each room, write what you find: the item, the quantity on the shelf, and any expiry date on the pack. Count what is physically there, not what someone remembers ordering.",
  },
  {
    name: "Enter materials into Stock register",
    text: "Type the walk into Stock register — one row per item in one location. White columns are for you to complete. Delete the example rows when you are ready.",
  },
  {
    name: "Review Stock / Expiry / Action",
    text: "The AUTO columns classify each row: whether it is below minimum, already on order, missing a count, expired, or approaching expiry. Open Action list for the rows that need attention.",
  },
  {
    name: "Deal with actions and use the populated register for future counts",
    text: "Reorder, follow up pending orders, remove expired stock, or finish incomplete counts. Later stocktakes: filter Stock register by Location and print that list instead of handwriting item names again.",
  },
] as const;

export const Route = createFileRoute("/resources/dental-stocktake-checklist")({
  head: () => {
    const url = `${SITE_ORIGIN}${ARTICLE_PATH}`;
    const workbookUrl = `${SITE_ORIGIN}${WORKBOOK_HREF}`;
    const base = pageMeta({
      title: ARTICLE_TITLE,
      description: ARTICLE_DESCRIPTION,
      path: ARTICLE_PATH,
      image: OG_IMAGE,
      imageAlt: OG_IMAGE_ALT,
      type: "article",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: ARTICLE_H1,
                name: ARTICLE_TITLE,
                description: ARTICLE_DESCRIPTION,
                datePublished: PUBLISHED_ISO,
                dateModified: PUBLISHED_ISO,
                inLanguage: "en-GB",
                mainEntityOfPage: url,
                image: `${SITE_ORIGIN}${OG_IMAGE}`,
                author: { "@id": `${SITE_ORIGIN}/#organization` },
                publisher: { "@id": `${SITE_ORIGIN}/#organization` },
                about: { "@id": `${url}#workbook` },
              },
              {
                "@type": "DigitalDocument",
                "@id": `${url}#workbook`,
                name: WORKBOOK_FILENAME,
                encodingFormat:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                url: workbookUrl,
                inLanguage: "en-GB",
                description:
                  "Free Excel stocktake template for dental practices. Record location, quantity, minimum level, expiry and items already ordered.",
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: stocktakeFaqs.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${SITE_ORIGIN}/`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Resources",
                    item: `${SITE_ORIGIN}/resources`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Dental stocktake checklist",
                    item: url,
                  },
                ],
              },
              {
                "@type": "HowTo",
                "@id": `${url}#howto`,
                name: "How to carry out a dental stocktake",
                description:
                  "A practical method for a structured dental-practice stocktake using a printable count and an Excel stock register.",
                step: HOW_TO_STEPS.map((step, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: step.name,
                  text: step.text,
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: StocktakeResourcePage,
});

function StocktakeResourcePage() {
  return (
    <SiteShell>
      <article>
        <header className="border-b border-border/60 bg-background">
          <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-10 lg:px-10 lg:pb-12 lg:pt-12">
            <ResourceBreadcrumb current="Dental stocktake checklist" />
            <div className="mt-8 grid items-start gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-12">
              <div className="min-w-0">
                <p className={layout.eyebrow}>Free practice resource</p>
                <h1 className={cn("mt-3", mktType.pageH1)}>{ARTICLE_H1}</h1>
                <p className={cn("mt-4 max-w-[46ch]", mktType.bodyLg)}>
                  A practical Excel workbook for a structured dental-practice stocktake — the
                  inventory count by room. Record location, current quantity, minimum level,
                  expiry, and whether replenishment is already ordered.
                </p>
                <DownloadTemplate className="mt-6" />
                <a
                  href="#workbook-preview"
                  className="mt-4 inline-flex min-h-11 items-center text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
                >
                  See what’s inside
                </a>
                <p className="mt-6 text-[12.5px] text-foreground/50">
                  Published {PUBLISHED_LABEL} · Last updated {PUBLISHED_LABEL} · Author: Reacting
                </p>
              </div>
              <WorkbookFrame
                className="min-w-0"
                label="Stock register"
                caption="REORDER when quantity is at or below minimum. ORDER PENDING when that replenishment is already marked as ordered."
              >
                <WorkbookImage
                  src="/resource-screens/stock-register.webp"
                  mobileSrc="/resource-screens/stock-register-mobile.webp"
                  alt="Dental stock register spreadsheet showing location, item, current quantity, minimum level, already ordered, and automatic Stock, Expiry and Action columns including REORDER and ORDER PENDING"
                />
              </WorkbookFrame>
            </div>
          </div>
        </header>

        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-14">
            <h2 className={mktType.sectionH2}>What this template helps you do</h2>
            <p className={cn("mt-4", mktType.body)}>
              Use it to carry out a manual stocktake and leave with a clear list of what needs
              attention.
            </p>
            <ul className={cn("mt-5 list-disc space-y-2 pl-5", mktType.body)}>
              <li>Count materials room by room</li>
              <li>Organise items by location and category</li>
              <li>Compare current quantity with a chosen minimum level</li>
              <li>Distinguish REORDER from stock already marked ORDER PENDING</li>
              <li>Review missing counts and expiry or action attention</li>
            </ul>
          </div>
        </section>

        <section
          id="workbook-preview"
          className="scroll-mt-24 border-b border-border/50 bg-background"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-14">
            <div className="max-w-[720px]">
              <h2 className={mktType.sectionH2}>Inside the workbook</h2>
              <p className={cn("mt-4", mktType.body)}>
                Five sheets: Start here, Stock register, Action list, Count sheets, and Lists.
                Stock register is where the count is typed. The others support the walk, the
                review, and the dropdowns.
              </p>
            </div>
            <WorkbookFrame
              className="mt-8"
              label="Stock register"
              caption="White columns are inputs. Stock, Expiry and Action calculate themselves."
            >
              <WorkbookImage
                src="/resource-screens/stock-register.webp"
                mobileSrc="/resource-screens/stock-register-mobile.webp"
                alt="Stock register with example rows for gloves, composite, local anaesthetic and masks, including REORDER, ORDER PENDING, EXPIRED, EXPIRING SOON and COUNT NEEDED"
              />
            </WorkbookFrame>
            <div className="mt-5 grid gap-5 md:grid-cols-2 md:gap-6">
              <WorkbookFrame
                compact
                label="Count sheets"
                caption="Print and walk. Later counts can use the populated register."
              >
                <WorkbookImage
                  src="/resource-screens/count-sheets-mobile.webp"
                  mobileSrc="/resource-screens/count-sheets-mobile.webp"
                  alt="Printable dental stocktake count sheets grouped by room, including Surgery 1, with columns for location, item, current count and earliest expiry"
                />
              </WorkbookFrame>
              <WorkbookFrame
                compact
                label="Action list"
                caption="Rows that need attention, drawn from Stock register."
              >
                <WorkbookImage
                  src="/resource-screens/action-list-mobile.webp"
                  mobileSrc="/resource-screens/action-list-mobile.webp"
                  alt="Action list showing items classified as REORDER, ORDER PENDING, EXPIRED, EXPIRING SOON and COUNT NEEDED"
                />
              </WorkbookFrame>
            </div>
            <DownloadTemplate className="mt-8" />
          </div>
        </section>

        <section
          id="how-to"
          aria-labelledby="howto-heading"
          className="scroll-mt-24 border-b border-border/50 bg-[#F1F5F9]"
        >
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-16">
            <h2 id="howto-heading" className={mktType.sectionH2}>
              How to carry out a dental stocktake
            </h2>
            <p className={cn("mt-4", mktType.body)}>
              The workbook follows a simple sequence. The first stocktake builds the register.
              Later counts reuse it.
            </p>
            <ol className="mt-8">
              {HOW_TO_STEPS.map((step, i) => (
                <li key={step.name} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < HOW_TO_STEPS.length - 1 ? (
                    <span
                      className="absolute left-[13px] top-8 bottom-0 w-px bg-border/70"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B1730] text-[12px] font-semibold tabular-nums text-white"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[16px] font-semibold tracking-tight text-foreground">
                      {step.name}
                    </h3>
                    <p className={cn("mt-1.5", mktType.body)}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-16">
            <h2 className={mktType.sectionH2}>What to record</h2>
            <p className={cn("mt-4", mktType.body)}>
              Each Stock register row is one item in one location. Record Location, Category,
              Item / Material, Pack / Unit, Current Qty, Minimum Level, Earliest Expiry,
              Already Ordered?, Qty Ordered, and Notes. Brand / Manufacturer and Supplier are
              there when you need to tell similar packs apart.
            </p>

            <h3 className={cn("mt-10", mktType.subH2)}>Minimum levels</h3>
            <p className={cn("mt-3", mktType.body)}>
              Minimum Level is the practice’s chosen reorder threshold. The workbook does not
              calculate it for you, and there is no universal number that fits every material.
              A useful starting point is typical use plus supplier lead time, then adjust after
              a few counts. If you have not set a minimum, leave it blank so the row is not
              marked REORDER by mistake.
            </p>

            <h3 className={cn("mt-10", mktType.subH2)}>Already ordered</h3>
            <p className={cn("mt-3", mktType.body)}>
              An item can sit below minimum while replenishment is already on the way. If
              Already Ordered? is Yes, Stock shows ORDER PENDING instead of REORDER. That helps
              the next person not place a second order. It only works if someone marks the
              order — it does not guarantee duplicates cannot occur.
            </p>
            <aside className="mt-5 border-l-2 border-[#0B1730]/15 pl-4">
              <p className="text-[14.5px] leading-[1.6] text-foreground/80">
                REORDER means the shelf is at or below minimum. ORDER PENDING means that
                replenishment is already marked as ordered.
              </p>
            </aside>

            <h3 className={cn("mt-10", mktType.subH2)}>Expiry dates</h3>
            <p className={cn("mt-3", mktType.body)}>
              Record the expiry shown on the pack or item where it is relevant. If the same
              material has different expiry dates, use separate rows. That is a counting
              convention so the earliest date is visible. It is not batch traceability. The
              warning period on Start here is editable; EXPIRING SOON follows the number of
              days the practice chooses, not a regulatory rule.
            </p>
          </div>
        </section>

        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-16">
            <h2 className={mktType.sectionH2}>Counting room by room</h2>
            <p className={cn("mt-4", mktType.body)}>
              Materials live where they are used. Counting by location — rather than one mixed
              list — matches how the practice is walked, and makes it obvious when the same item
              is held in more than one room.
            </p>
            <p className={cn("mt-4", mktType.body)}>
              On the first stocktake, print Count sheets and walk the rooms you actually have:
              surgeries, decontamination, the stock room, reception or admin, storage, and any
              other area that holds materials. Not every practice has the same rooms; edit Lists
              so the names match yours.
            </p>
            <p className={cn("mt-4", mktType.body)}>
              After the register is populated, later stocktakes can filter Stock register by
              Location and print that list. You do not need to recreate the inventory from
              scratch each time.
            </p>
          </div>
        </section>

        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-16">
            <h2 className={mktType.sectionH2}>After the count: the Action list</h2>
            <p className={cn("mt-4", mktType.body)}>
              Action picks the most immediate issue on that row. It is an operational prompt,
              not a clinical or regulatory judgement.
            </p>
            <dl className="mt-8 divide-y divide-border/50 border-y border-border/50">
              <StatusTerm name="OK">No immediate action identified by the workbook.</StatusTerm>
              <StatusTerm name="COUNT NEEDED">
                The item exists on the register but Current Qty has not been entered.
              </StatusTerm>
              <StatusTerm name="REORDER">
                Current Qty is at or below Minimum Level, and the item is not marked as already
                ordered.
              </StatusTerm>
              <StatusTerm name="ORDER PENDING">
                Current Qty is at or below Minimum Level, and replenishment is already marked as
                ordered.
              </StatusTerm>
              <StatusTerm name="EXPIRING SOON">
                The entered expiry falls inside the workbook’s chosen warning period.
              </StatusTerm>
              <StatusTerm name="EXPIRED">The entered expiry date has passed.</StatusTerm>
            </dl>
          </div>
        </section>

        <section
          id="between-stocktakes"
          className="scroll-mt-24 border-b border-border/50 bg-background"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-16">
            <p className={layout.eyebrow}>Between stocktakes</p>
            <h2 className={cn("mt-3 max-w-[20ch]", mktType.sectionH2)}>
              When the count is out of date
            </h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <div className="max-w-[38rem]">
                <p className={mktType.body}>
                  A spreadsheet is a point-in-time record. Materials are used. Deliveries
                  arrive. Orders are placed. Information changes. The workbook reflects what has
                  been entered.
                </p>
                <p className={cn("mt-4", mktType.body)}>
                  This resource is for general dental materials and consumables. It is not a
                  controlled-drug register, a medicines-management compliance system, a batch or
                  recall traceability system, or a guarantee of CQC, GDC, HTM or MHRA
                  compliance.
                </p>
              </div>
              <div className="max-w-[38rem] border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <h3 className="text-[18px] font-semibold tracking-tight text-foreground">
                  Keeping the stock picture current
                </h3>
                <p className={cn("mt-3", mktType.body)}>
                  Dental Assist is designed for the ongoing operational stock work between
                  manual counts.
                </p>
                <p className="mt-5">
                  <Link
                    to="/dental-stock-management"
                    className="inline-flex min-h-11 items-center text-[14.5px] font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Dental stock management →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="scroll-mt-24 bg-[#F1F5F9]"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10 lg:py-12">
            <FAQ
              items={stocktakeFaqs}
              heading="Questions about the stocktake template"
              lead="Straight answers for practices running a manual count."
            />
            <div className="mx-auto mt-10 max-w-[720px] border-t border-border/50 pt-8">
              <DownloadTemplate />
              <p className="mt-4 text-[14px] text-muted-foreground">
                <Link
                  to="/resources"
                  className="inline-flex min-h-11 items-center font-medium text-foreground underline-offset-4 hover:underline"
                >
                  All resources
                </Link>
              </p>
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}

function StatusTerm({ name, children }: { name: string; children: string }) {
  return (
    <div className="py-4 first:pt-5 last:pb-5">
      <dt className="text-[14px] font-semibold tracking-tight text-foreground">{name}</dt>
      <dd className={cn("mt-1", mktType.body)}>{children}</dd>
    </div>
  );
}
