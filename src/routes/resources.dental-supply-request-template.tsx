import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { FAQ } from "@/components/marketing/FAQ";
import { DownloadTemplate } from "@/components/resources/DownloadTemplate";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { WorkbookFrame, WorkbookImage } from "@/components/resources/WorkbookFrame";
import { supplyRequestFaqs } from "@/components/resources/supply-request-faq";
import {
  ARTICLE_DESCRIPTION,
  ARTICLE_H1,
  ARTICLE_PATH,
  ARTICLE_TITLE,
  HOW_TO_STEPS,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PUBLISHED_ISO,
  PUBLISHED_LABEL,
  WORKBOOK_FILENAME,
  WORKBOOK_HREF,
} from "@/components/resources/supply-request";
import { layout, type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources/dental-supply-request-template")({
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
                description: ARTICLE_DESCRIPTION,
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: supplyRequestFaqs.map((item) => ({
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
                    name: "Dental supply request template",
                    item: url,
                  },
                ],
              },
              {
                "@type": "HowTo",
                "@id": `${url}#howto`,
                name: "How to track a dental supply request",
                description:
                  "Record a supply request, review it, record what was actually ordered, and keep ordered or not-required rows in the master history.",
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
  component: SupplyRequestResourcePage,
});

function SupplyRequestResourcePage() {
  return (
    <SiteShell>
      <article>
        <header className="border-b border-border/60 bg-background">
          <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-10 lg:px-10 lg:pb-12 lg:pt-12">
            <ResourceBreadcrumb current="Dental supply request template" />
            <div className="mt-8 grid items-start gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-12">
              <div className="min-w-0">
                <p className={layout.eyebrow}>Free practice resource</p>
                <h1 className={cn("mt-3", mktType.pageH1)}>{ARTICLE_H1}</h1>
                <p className={cn("mt-4 max-w-[46ch]", mktType.bodyLg)}>
                  A practical Excel workbook for the internal request: what somebody has asked
                  the practice to buy, whether anyone has reviewed it, and whether it was
                  ordered or not required. It is not a form you send to a supplier, and it is
                  not a stocktake.
                </p>
                <DownloadTemplate
                  className="mt-6"
                  href={WORKBOOK_HREF}
                  filename={WORKBOOK_FILENAME}
                />
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
                label="Supply requests"
                caption="A request is not an order. Follow-up (AUTO) shows whether the row still needs attention."
              >
                <WorkbookImage
                  src="/resource-screens/supply-requests.webp"
                  mobileSrc="/resource-screens/supply-requests-mobile.webp"
                  alt="Dental supply request spreadsheet showing item, priority, status, automatic Follow-up, quantity requested and quantity ordered"
                />
              </WorkbookFrame>
            </div>
          </div>
        </header>

        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-14">
            <h2 className={mktType.sectionH2}>Why supply requests get lost</h2>
            <p className={cn("mt-4", mktType.body)}>
              A need is mentioned in conversation, in a message, or on a note. Later, the team
              cannot easily tell whether somebody reviewed it, somebody ordered it, or it was
              deliberately not required.
            </p>
            <p className={cn("mt-4", mktType.body)}>
              The tracker makes that history visible. It does not, by itself, stop a duplicate
              order.
            </p>
          </div>
        </section>

        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-14">
            <h2 className={mktType.sectionH2}>What the tracker helps organise</h2>
            <p className={cn("mt-4", mktType.body)}>
              Use it to keep the internal ask in one place, without turning it into a stock
              count or a supplier order form.
            </p>
            <ul className={cn("mt-5 list-disc space-y-2 pl-5", mktType.body)}>
              <li>Who requested something</li>
              <li>What they need</li>
              <li>How quickly it needs reviewing</li>
              <li>Whether it is still open, being reviewed, ordered or not required</li>
              <li>What quantity was actually ordered</li>
            </ul>
            <p className={cn("mt-6", mktType.body)}>
              If you are counting what is physically on the shelf, use the{" "}
              <Link
                to="/resources/dental-stocktake-checklist"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                dental stocktake checklist
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-16">
            <h2 className={mktType.sectionH2}>A request is not an order</h2>
            <p className={cn("mt-4", mktType.body)}>
              REQUESTED does not mean ORDERED. Recording the ask is a different fact from
              recording that a purchase was placed.
            </p>
            <div className="mt-6 grid max-w-[22rem] grid-cols-2 border-y border-border/50">
              <div className="py-4 pr-5">
                <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Qty requested
                </p>
                <p className="mt-1.5 text-[34px] font-semibold leading-none tabular-nums tracking-tight text-foreground">
                  3
                </p>
              </div>
              <div className="border-l border-border/50 py-4 pl-5">
                <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Qty ordered
                </p>
                <p className="mt-1.5 text-[34px] font-semibold leading-none tabular-nums tracking-tight text-foreground">
                  5
                </p>
              </div>
            </div>
            <p className={cn("mt-5", mktType.body)}>
              The ordering person may buy a supplier pack quantity, or make a different
              purchasing decision. Both numbers should remain in the history.
            </p>
            <p className={cn("mt-6", mktType.body)}>
              Preferred supplier is optional — the requester does not need to know where the
              item is bought. Use Brand / Specification when the exact product, size, shade or
              other specification matters.
            </p>
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
                Four sheets: Start here, Supply requests, Open requests, and Lists. Supply
                requests is the master table. Open requests shows rows that still need
                attention.
              </p>
            </div>
            <WorkbookFrame
              className="mt-8"
              label="Supply requests"
              caption="White columns are inputs. Follow-up (AUTO) is calculated from Status, Priority, and whether the order details are complete."
            >
              <WorkbookImage
                src="/resource-screens/supply-requests.webp"
                mobileSrc="/resource-screens/supply-requests-mobile.webp"
                alt="Supply requests table with example rows for gloves, bonding agent and composite, including TO REVIEW, URGENT — REVIEW, IN REVIEW and COMPLETE ORDER DETAILS"
              />
            </WorkbookFrame>
            <div className="mt-8 max-w-[720px]">
              <WorkbookFrame
                compact
                label="Open requests"
                caption="Open requests shows only the rows that still need attention."
              >
                <WorkbookImage
                  src="/resource-screens/open-requests.webp"
                  mobileSrc="/resource-screens/open-requests-mobile.webp"
                  alt="Open requests sheet showing only supply requests that still need attention"
                />
              </WorkbookFrame>
            </div>
            <DownloadTemplate
              className="mt-8"
              href={WORKBOOK_HREF}
              filename={WORKBOOK_FILENAME}
            />
          </div>
        </section>

        <section
          id="how-to"
          aria-labelledby="howto-heading"
          className="scroll-mt-24 border-b border-border/50 bg-[#F1F5F9]"
        >
          <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-16">
            <h2 id="howto-heading" className={mktType.sectionH2}>
              Request, review, order, close
            </h2>
            <p className={cn("mt-4", mktType.body)}>
              The workbook follows a simple sequence. Ordered and not-required requests stay in
              the master table.
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
            <h2 className={mktType.sectionH2}>Status and Follow-up</h2>
            <p className={cn("mt-4", mktType.body)}>
              Status is chosen by a person. Follow-up is calculated, so the team can see what
              still needs attention.
            </p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-12">
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  Status
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.5] text-muted-foreground">
                  Chosen by the team
                </p>
                <dl className="mt-4 divide-y divide-border/50 border-y border-border/50">
                  <StatusTerm name="REQUESTED">
                    Recorded; nobody has picked it up yet.
                  </StatusTerm>
                  <StatusTerm name="REVIEWING">
                    The responsible person is dealing with it.
                  </StatusTerm>
                  <StatusTerm name="ORDERED">A purchase has been placed.</StatusTerm>
                  <StatusTerm name="NOT REQUIRED">
                    Will not be ordered; remains in history.
                  </StatusTerm>
                </dl>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  Follow-up
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.5] text-muted-foreground">
                  Calculated automatically
                </p>
                <ul className="mt-4 divide-y divide-border/50 border-y border-border/50">
                  {[
                    "TO REVIEW",
                    "URGENT — REVIEW",
                    "IN REVIEW",
                    "COMPLETE ORDER DETAILS",
                    "ORDERED",
                    "CLOSED",
                  ].map((name) => (
                    <li
                      key={name}
                      className="py-3 text-[14px] font-semibold tracking-tight text-foreground first:pt-4 last:pb-4"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className={cn("mt-10", mktType.subH2)}>Priority</h3>
            <p className={cn("mt-3", mktType.body)}>
              Priority describes how quickly the request needs reviewing. Routine is the
              normal ordering cycle. Soon should be reviewed sooner than the normal ordering
              cycle. Urgent needs prompt review.
            </p>
            <p className={cn("mt-4", mktType.body)}>
              Priority does not approve the purchase and is not a clinical-emergency
              classification.
            </p>
          </div>
        </section>

        <section
          id="spreadsheet-limit"
          className="scroll-mt-24 border-b border-border/50 bg-background"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10 lg:py-16">
            <p className={layout.eyebrow}>Spreadsheet limits</p>
            <h2 className={cn("mt-3 max-w-[20ch]", mktType.sectionH2)}>
              When a tracker is not enough
            </h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <div className="max-w-[38rem]">
                <p className={mktType.body}>
                  The workbook is a manual request tracker. It does not compare suppliers,
                  prices or quotes. It does not manage purchase orders or receiving.
                </p>
                <p className={cn("mt-4", mktType.body)}>
                  Once the practice needs to compare suppliers or prices, or turn requests into
                  an ongoing purchasing workflow, that is a different job.
                </p>
              </div>
              <div className="max-w-[38rem] border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <h3 className="text-[18px] font-semibold tracking-tight text-foreground">
                  Ongoing purchasing
                </h3>
                <p className={cn("mt-3", mktType.body)}>
                  Dental Assist is designed to connect purchasing requests with supplier
                  comparison, ordering and receiving.
                </p>
                <p className="mt-5">
                  <Link
                    to="/dental-procurement-software"
                    className="inline-flex min-h-11 items-center text-[14.5px] font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Dental procurement software →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#F1F5F9]">
          <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10 lg:py-12">
            <FAQ
              items={supplyRequestFaqs}
              heading="Questions about the supply request template"
              lead="Straight answers for practices tracking internal supply requests."
            />
            <div className="mx-auto mt-10 max-w-[720px] border-t border-border/50 pt-8">
              <DownloadTemplate href={WORKBOOK_HREF} filename={WORKBOOK_FILENAME} />
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
