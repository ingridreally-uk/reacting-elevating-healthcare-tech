import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import { SiteShell } from "@/components/site/SiteChrome";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import {
  ARTICLE_H1,
  ARTICLE_PATH,
  OG_IMAGE,
  WORKBOOK_FILENAME,
  WORKBOOK_HREF,
} from "@/components/resources/stocktake";
import { btn, iconStroke, layout, type as mktType } from "@/components/marketing/design";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const HUB_TITLE = "Practical Resources for Dental Practice Operations | Reacting";
const HUB_DESCRIPTION =
  "Free operational resources for dental practices. Start with a dental stocktake checklist and Excel inventory template. No sign-up.";

export const Route = createFileRoute("/resources/")({
  head: () =>
    pageMeta({
      title: HUB_TITLE,
      description: HUB_DESCRIPTION,
      path: "/resources",
      image: OG_IMAGE,
      imageAlt: "Reacting dental stocktake Excel template",
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
          <p className={layout.eyebrow}>Featured</p>
          <h2 className={cn("mt-3", mktType.sectionH2)}>{ARTICLE_H1}</h2>
          <p className={cn("mt-4", mktType.body)}>
            A structured workbook for counting materials room by room, recording quantities,
            minimum levels, expiry and whether replenishment is already on order.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border/55 bg-white">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/resource-screens/stock-register-mobile.webp"
              />
              <img
                src="/resource-screens/stock-register.webp"
                alt="Stock register from the Reacting dental stocktake Excel template, showing REORDER and ORDER PENDING"
                className="h-auto w-full"
              />
            </picture>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to={ARTICLE_PATH}
              className={cn(btn.base, btn.primary, "min-h-11 w-full sm:w-auto")}
            >
              Read resource
              <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
            </Link>
            <a
              href={WORKBOOK_HREF}
              download={WORKBOOK_FILENAME}
              className={cn(btn.base, btn.secondary, "min-h-11 w-full sm:w-auto")}
            >
              Download Excel template
              <Download className="h-4 w-4" strokeWidth={iconStroke} />
            </a>
          </div>
          <p className="mt-8 text-[14.5px] leading-[1.65] text-muted-foreground">
            More practical resources are being prepared.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
