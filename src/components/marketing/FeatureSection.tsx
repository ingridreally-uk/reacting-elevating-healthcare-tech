import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { cn } from "@/lib/utils";
import { btn, layout } from "./design";
import type { MediaFit } from "./content";

export const FEATURE_ASPECT = "16 / 10";

export function FeatureSection({
  id,
  eyebrow,
  title,
  description,
  bullets,
  ctaLabel = "Start Free Trial",
  ctaHref,
  imageSrc,
  videoSrc,
  posterSrc,
  alt,
  imageFirst = false,
  className,
  objectPosition = "center",
  objectFit = "contain",
  aspectRatio = FEATURE_ASPECT,
  frameLabel,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel?: string;
  ctaHref: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  alt: string;
  imageFirst?: boolean;
  className?: string;
  objectPosition?: string;
  objectFit?: MediaFit;
  aspectRatio?: string;
  frameLabel?: string;
}) {
  const reduceMotion = useReducedMotion();
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 border-b border-border/60", className)}
    >
      <div
        className={cn(
          layout.shell,
          "grid items-center py-12 md:grid-cols-12 lg:py-14",
          layout.featureGap,
        )}
      >
        <motion.div
          className={cn(
            "flex min-h-0 flex-col md:col-span-5",
            imageFirst ? "md:order-2 md:col-start-8" : "md:col-start-1",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className={layout.eyebrow}>{eyebrow}</div>
          <h2
            id={headingId}
            className={cn(
              "mt-2.5 text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[32px] lg:text-[34px]",
              layout.titleMax,
            )}
          >
            {title}
          </h2>
          <p className={cn(layout.lead, "mt-3", layout.copyMax)}>{description}</p>
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-foreground/90">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.55_0.12_165)]" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            className={cn(btn.base, btn.primary, "mt-7 w-fit min-w-[170px] max-w-[200px] px-6")}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </motion.div>

        <motion.div
          className={cn(
            "min-w-0 md:col-span-7",
            imageFirst ? "md:order-1 md:col-start-1" : "md:col-start-6",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.04, ease: "easeOut" }}
        >
          <ProductFrame label={frameLabel}>
            <MediaViewer
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              posterSrc={posterSrc}
              alt={alt}
              objectPosition={objectPosition}
              objectFit={objectFit}
              aspectRatio={aspectRatio}
            />
          </ProductFrame>
        </motion.div>
      </div>
    </section>
  );
}
