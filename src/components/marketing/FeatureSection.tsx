import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { cn } from "@/lib/utils";
import { btn, layout } from "./design";
import type { MediaFit } from "./content";

export const FEATURE_ASPECT = "16 / 10";

type Highlight =
  | { kind: "bullets"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "pair"; items: [string, string] };

export function FeatureSection({
  id,
  eyebrow,
  title,
  problem,
  description,
  result,
  highlight,
  ctaLabel = "Start Free Trial",
  ctaHref,
  showCta = false,
  imageSrc,
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
  problem: string;
  description: string;
  result: string;
  highlight: Highlight;
  ctaLabel?: string;
  ctaHref: string;
  showCta?: boolean;
  imageSrc?: string;
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
      className={cn("scroll-mt-24 border-b border-border/50", className)}
    >
      <div
        className={cn(
          layout.shell,
          "grid items-center py-12 md:grid-cols-12 lg:py-16",
          layout.featureGap,
        )}
      >
        <motion.div
          className={cn(
            "flex min-h-0 flex-col md:col-span-5",
            imageFirst ? "md:order-2 md:col-start-8" : "md:col-start-1",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={layout.eyebrow}>{eyebrow}</div>
          <h2
            id={headingId}
            className={cn(
              "mt-3 text-[28px] font-semibold leading-[1.1] tracking-[-0.032em] text-foreground sm:text-[34px]",
              "max-w-[16ch]",
            )}
          >
            {title}
          </h2>

          <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.55] text-foreground/65">
            {problem}
          </p>
          <p className={cn(layout.lead, "mt-3 max-w-[38ch]")}>{description}</p>
          <p className="mt-4 max-w-[34ch] text-[14px] font-medium leading-[1.5] text-[oklch(0.36_0.09_260)]">
            {result}
          </p>

          <div className="mt-6">
            {highlight.kind === "bullets" ? (
              <ul className="space-y-2.5">
                {highlight.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13.5px] text-foreground/88"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {highlight.kind === "steps" ? (
              <ol className="space-y-3">
                {highlight.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[13.5px] text-foreground/88"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.02_260)] text-[10px] font-semibold tabular-nums text-[oklch(0.4_0.08_260)]">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            ) : null}

            {highlight.kind === "pair" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {highlight.items.map((item) => (
                  <p
                    key={item}
                    className="rounded-xl border border-border/55 bg-card/80 px-3.5 py-3 text-[13px] leading-[1.5] text-foreground/85"
                  >
                    {item}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          {showCta ? (
            <a
              href={ctaHref}
              rel="noopener noreferrer"
              className={cn(btn.base, btn.primary, "mt-8 w-fit px-6")}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          ) : null}
        </motion.div>

        <motion.div
          className={cn(
            "min-w-0 md:col-span-7",
            imageFirst ? "md:order-1 md:col-start-1" : "md:col-start-6",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductFrame label={frameLabel}>
            <MediaViewer
              imageSrc={imageSrc}
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
