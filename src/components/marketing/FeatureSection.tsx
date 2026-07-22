import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { cn } from "@/lib/utils";
import { btn } from "./design";
import type { MediaFit } from "./content";

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
  objectPosition = "left top",
  objectFit = "cover",
  aspectRatio = "16 / 10",
  frameLabel,
  /** Subtle layout variation for visual rhythm */
  visualWeight = "default",
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
  visualWeight?: "default" | "wide" | "compact";
}) {
  const reduceMotion = useReducedMotion();
  const cols =
    visualWeight === "wide"
      ? "md:grid-cols-[0.88fr_1.12fr]"
      : visualWeight === "compact"
        ? "md:grid-cols-[1.05fr_0.95fr]"
        : "md:grid-cols-2";

  return (
    <section id={id} className={cn("border-b border-border/60", className)}>
      <div
        className={cn(
          "mx-auto grid max-w-[1200px] items-center gap-7 px-6 py-9 md:gap-9 md:py-10 lg:gap-11 lg:px-10 lg:py-11",
          cols,
        )}
      >
        <motion.div
          className={imageFirst ? "md:order-2" : undefined}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
            {eyebrow}
          </div>
          <h2 className="mt-2 max-w-[18ch] text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[34px]">
            {title}
          </h2>
          <p className="mt-2.5 max-w-[38ch] text-[14.5px] leading-[1.65] text-muted-foreground">
            {description}
          </p>
          <ul className="mt-4 space-y-1.5">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[13.5px] text-foreground/90"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.55_0.12_165)]" />
                {b}
              </li>
            ))}
          </ul>
          <a href={ctaHref} className={cn(btn.base, btn.primary, "mt-5")}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </motion.div>

        <motion.div
          className={cn(
            "w-full min-w-0",
            imageFirst ? "md:order-1" : "md:justify-self-end",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.05 }}
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
