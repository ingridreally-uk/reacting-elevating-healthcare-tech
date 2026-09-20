import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import { SiteShell } from "@/components/site/SiteChrome";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import {
  ARTICLE_H1 as STOCKTAKE_H1,
  ARTICLE_PATH as STOCKTAKE_PATH,
  OG_IMAGE as STOCKTAKE_OG,
  WORKBOOK_FILENAME as STOCKTAKE_FILENAME,
  WORKBOOK_HREF as STOCKTAKE_HREF,
} from "@/components/resources/stocktake";
import {
  ARTICLE_H1 as REQUEST_H1,
  ARTICLE_PATH as REQUEST_PATH,
  WORKBOOK_FILENAME as REQUEST_FILENAME,
  WORKBOOK_HREF as REQUEST_HREF,
} from "@/components/resources/supply-request";
import { btn, iconStroke, layout, type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const HUB_TITLE = "Practical Resources for Dental Practice Operations | Reacting";
const HUB_DESCRIPTION =
  "Free operational resources for dental practices, including Excel templates for stocktake and supply requests. No sign-up.";

const resources = [
  {
    title: STOCKTAKE_H1,
    path: STOCKTAKE_PATH,
    body: "A structured workbook for counting materials room by room, recording quantities, minimum levels, expiry and whether replenishment is already on order.",
    href: STOCKTAKE_HREF,
    filename: STOCKTAKE_FILENAME,
    src: "/resource-screens/stock-register.webp",
    mobileSrc: "/resource-screens/stock-register-mobile.webp",
    alt: "Stock register from the Reacting dental stocktake Excel template, showing REORDER and ORDER PENDING",
  },
  {
    title: REQUEST_H1,
    path: REQUEST_PATH,
    body: "A workbook for recording what somebody has asked the practice to buy, and whether it has been reviewed, ordered or not required.",
    href: REQUEST_HREF,
    filename: REQUEST_FILENAME,
    src: "/resource-screens/supply-requests.webp",
    mobileSrc: "/resource-screens/supply-requests-mobile.webp",
    alt: "Supply requests from the Reacting dental supply request Excel template, showing Priority, Status and Follow-up",
  },
] as const;

export const Route = createFileRoute("/resources/")({
  head: () =>
    pageMeta({
      title: HUB_TITLE,
      description: HUB_DESCRIPTION,
      path: "/resources",
      image: STOCKTAKE_OG,
      imageAlt: "Reacting dental practice resource templates",
    }),
  component: ResourcesHubPage,
});

function ResourcesHubPage() {
  return (
    <SiteShell>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-10 lg:px-10 lg:pb-16 lg:pt-12">
          <ResourceBreadcrumb />
          <p className={cn(layout.eyebrow, "mt-8")}>Resources</p>
          <h1 className={cn("mt-3 max-w-[18ch]", mktType.pageH1)}>
            Practical resources for dental practice operations
          </h1>
          <p className={cn("mt-4 max-w-[46ch]", mktType.bodyLg)}>
            Free practical tools and guides for the everyday operational work of a dental
            practice.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[720px] px-6 py-12 lg:py-16">
          <div className="space-y-16">
            {resources.map((resource) => (
              <article key={resource.path}>
                <h2 className={mktType.sectionH2}>{resource.title}</h2>
                <p className={cn("mt-4", mktType.body)}>{resource.body}</p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-border/55 bg-white">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={resource.mobileSrc} />
                    <img src={resource.src} alt={resource.alt} className="h-auto w-full" />
                  </picture>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to={resource.path}
                    className={cn(btn.base, btn.primary, "min-h-11 w-full sm:w-auto")}
                  >
                    Read resource
                    <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
                  </Link>
                  <a
                    href={resource.href}
                    download={resource.filename}
                    className={cn(btn.base, btn.secondary, "min-h-11 w-full sm:w-auto")}
                  >
                    Download Excel template
                    <Download className="h-4 w-4" strokeWidth={iconStroke} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
