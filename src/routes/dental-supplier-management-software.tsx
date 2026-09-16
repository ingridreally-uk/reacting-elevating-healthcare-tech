import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteChrome";
import { ProductFrame } from "@/components/marketing/ProductFrame";
import { MediaViewer } from "@/components/marketing/MediaViewer";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";
import { APP_SIGNUP } from "@/components/marketing/content";
import { supplierManagementFaqs } from "@/components/marketing/supplier-management-faq";
import { btn, iconStroke, layout, type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const PAGE_TITLE = "Dental Supplier Management Software | Dental Assist";
const PAGE_DESCRIPTION =
  "Keep the dental suppliers your practice already uses in one directory — contacts and purchase history together. Dental Assist works alongside your practice-management system.";

const VENDOR_RECORD = {
  src: "/product-screens/mkt-vendor-detail.webp",
  aspect: "1324 / 969",
  alt: "Dental Assist supplier record for Blackthorn — contact details, Active status, and purchase history with waiting and completed orders",
} as const;

const VENDOR_DIRECTORY = {
  src: "/product-screens/mkt-suppliers.webp",
  alt: "Dental Assist Vendors directory showing existing suppliers with contact names, email addresses and Active status",
} as const;

const SHELL = "mx-auto max-w-[1180px] px-6 lg:px-10";

const recordLayers = [
  {
    title: "Know who to contact",
    body: "Supplier name, contact name, email and website, where those details have been recorded.",
  },
  {
    title: "See the relationship status",
    body: "Whether the supplier is still active, with details that can be updated when they change.",
  },
  {
    title: "See what has happened before",
    body: "Previous orders stay attached, so the relationship includes more than a name and an email address.",
  },
] as const;

const historyFacts = [
  "Purchase history on the supplier record",
  "Order count and last activity",
  "Pending, delivered and cancelled orders",
  "Order totals, and Create Order from the same record",
] as const;

export const Route = createFileRoute("/dental-supplier-management-software")({
  head: () => {
    const base = pageMeta({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      path: "/dental-supplier-management-software",
      imageAlt: VENDOR_RECORD.alt,
    });
    return {
      ...base,
      links: [
        ...(base.links ?? []),
        {
          rel: "preload",
          as: "image",
          href: VENDOR_RECORD.src,
          type: "image/webp",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${SITE_ORIGIN}/dental-supplier-management-software#faq`,
            mainEntity: supplierManagementFaqs.map((item) => ({
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
  component: DentalSupplierManagementPage,
});

function DentalSupplierManagementPage() {
  return (
    <SiteShell>
      <section aria-labelledby="supplier-hero-heading" className="bg-background">
        <div className={cn(SHELL, "pb-8 pt-7 lg:pb-9 lg:pt-8")}>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(17.5rem,21.5rem)_minmax(0,1fr)] lg:gap-14 xl:gap-[4.5rem]">
            <div className="min-w-0">
              <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
                Dental supplier management software
              </div>
              <h1 id="supplier-hero-heading" className={cn("mt-3 max-w-[13ch]", mktType.pageH1)}>
                Work with the suppliers you already trust.
              </h1>
              <p className={cn("mt-4 max-w-[38ch]", mktType.bodyLg)}>
                Supplier knowledge often lives with one nurse, manager or owner. Dental Assist
                records who the practice works with, how to reach them and what has been ordered —
                so that information does not depend on one person’s inbox or memory.
              </p>
              <p className="mt-4 max-w-[34ch] text-[15px] font-medium leading-[1.5] tracking-tight text-foreground">
                Continue with the suppliers you already use. You do not have to change them.
              </p>
              <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
                <a
                  href={APP_SIGNUP}
                  rel="noopener noreferrer"
                  className={cn(btn.base, btn.primary, "w-full sm:w-auto lg:w-full")}
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
                </a>
                <Link
                  to="/book-demo"
                  className={cn(btn.base, btn.secondary, "w-full sm:w-auto lg:w-full")}
                >
                  Book a Demo
                </Link>
              </div>
              <p className="mt-4 text-[12.5px] text-foreground/55">
                14 days free · No card required · Works alongside your existing
                practice-management system
              </p>
            </div>

            <div className="min-w-0">
              <ProductFrame emphasis="photograph" className="w-full">
                <MediaViewer
                  imageSrc={VENDOR_RECORD.src}
                  alt={VENDOR_RECORD.alt}
                  objectFit="contain"
                  aspectRatio={VENDOR_RECORD.aspect}
                  priority
                />
              </ProductFrame>
              <p className="mt-2.5 text-[12px] leading-[1.45] text-muted-foreground">
                app.reacting.io / vendors — supplier record and purchase history
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="network-heading" className="bg-background">
        <div className={cn(SHELL, "pb-7 pt-1 lg:pb-8")}>
          <div className="max-w-[36rem]">
            <p className={layout.eyebrow}>Your supplier network</p>
            <h2 id="network-heading" className={cn("mt-2.5 max-w-[16ch]", layout.h2)}>
              Find the supplier without asking around.
            </h2>
            <p className={cn("mt-3 max-w-[44ch]", mktType.body)}>
              Staff should not have to search old emails, ask another team member, or rely on
              memory to find a contact that is already recorded.
            </p>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F7FAF8] shadow-[0_18px_48px_-24px_rgba(11,43,40,0.2),0_2px_8px_-4px_rgba(11,43,40,0.08)]">
            <div className="lg:hidden">
              <MediaViewer
                imageSrc={VENDOR_DIRECTORY.src}
                alt={VENDOR_DIRECTORY.alt}
                objectFit="cover"
                objectPosition="14% 7%"
                aspectRatio="1.38 / 1"
                scale={1.3}
              />
            </div>
            <div className="hidden lg:block">
              <MediaViewer
                imageSrc={VENDOR_DIRECTORY.src}
                alt={VENDOR_DIRECTORY.alt}
                objectFit="cover"
                objectPosition="36% 4%"
                aspectRatio="2.9 / 1"
                scale={1.16}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="record-heading"
        className="border-y border-border/45 bg-background"
      >
        <div
          className={cn(
            SHELL,
            "grid gap-8 py-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start lg:gap-12 lg:py-9",
          )}
        >
          <div className="min-w-0 lg:sticky lg:top-24">
            <p className={layout.eyebrow}>The supplier record</p>
            <h2 id="record-heading" className={cn("mt-2.5 max-w-[22ch]", layout.h2)}>
              Understand the relationship without reconstructing it.
            </h2>
            <p className={cn("mt-3.5 max-w-[40ch]", mktType.body)}>
              Contact details, status and previous orders sit on the same record, so another
              person in the practice can follow the relationship without rebuilding it by hand.
            </p>
          </div>
          <ol className="min-w-0 divide-y divide-border/55 border-y border-border/55">
            {recordLayers.map((layer, index) => (
              <li key={layer.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 py-4 first:pt-4 last:pb-4">
                <p className="pt-1 text-[11px] font-semibold tabular-nums tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0">
                  <h3 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px]">
                    {layer.title}
                  </h3>
                  <p className={cn("mt-1.5 max-w-[42ch]", mktType.body)}>{layer.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="history-heading" className="bg-background">
        <div className={cn(SHELL, "py-6 lg:py-7")}>
          <div className="rounded-2xl border border-border/55 bg-[#F8FAFC] px-5 py-5 sm:px-7 sm:py-6 lg:grid lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:items-center lg:gap-12">
            <div className="min-w-0">
              <p className={layout.eyebrow}>Purchase history</p>
              <h2 id="history-heading" className={cn("mt-2.5 max-w-[18ch]", layout.h2)}>
                See the history behind every supplier relationship.
              </h2>
              <p className={cn("mt-3.5 max-w-[42ch]", mktType.body)}>
                Previous purchasing activity stays connected to the supplier. The team can see
                earlier orders and their status without piecing that picture together from old
                emails.
              </p>
            </div>
            <ul className="mt-6 space-y-3 lg:mt-0">
              {historyFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/55" />
                  <p className="text-[14.5px] leading-[1.5] text-foreground">{fact}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="bridge-heading" className="bg-background">
        <div className={cn(SHELL, "border-t border-border/45 py-6 lg:py-7")}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="min-w-0 max-w-[40rem]">
              <p className={layout.eyebrow}>Purchasing is a different job</p>
              <h2
                id="bridge-heading"
                className={cn(
                  "mt-2 max-w-[28ch] text-[22px] font-semibold tracking-[-0.028em] sm:text-[26px]",
                )}
              >
                Supplier records organise who you work with. Comparison belongs to purchasing.
              </h2>
              <p className={cn("mt-3 max-w-[54ch]", mktType.body)}>
                The supplier record keeps contacts and order history together. Quote requests and
                supplier comparison sit in the purchasing workflow — not on this page.
              </p>
            </div>
            <Link
              to="/dental-procurement-software"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-[14px] font-medium text-foreground underline-offset-4 hover:underline lg:mt-0"
            >
              Explore dental procurement
              <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="scroll-mt-24 border-t border-border/40 bg-[#F4F7FA]"
      >
        <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-6 lg:px-10 lg:pb-10 lg:pt-8">
          <FAQ
            items={supplierManagementFaqs}
            heading="Still deciding how supplier information should live in the practice?"
            lead="Straight answers for owners, managers and stock leads."
          />
        </div>
      </section>

      <CTASection
        heading="Keep supplier knowledge with the practice."
        body="Start a 14-day trial, or book a short demo to see how Dental Assist records the suppliers you already use — contacts and purchase history included — alongside the practice-management system you already work with."
        headingClassName="mx-auto mt-3 max-w-[20ch] text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[40px]"
        bodyClassName="mx-auto mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-white/68"
      />
    </SiteShell>
  );
}
