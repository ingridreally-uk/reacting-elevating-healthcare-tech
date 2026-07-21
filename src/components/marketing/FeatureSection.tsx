import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BrowserMock } from "./BrowserMock";
import { MediaViewer } from "./MediaViewer";
import { cn } from "@/lib/utils";

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
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={cn("border-b border-border/60", className)}
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-12 lg:gap-14 lg:px-10 lg:py-20">
        <motion.div
          className={imageFirst ? "md:order-2" : undefined}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]">
            {eyebrow}
          </div>
          <h2 className="mt-3 max-w-md text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[40px]">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-[1.7] text-muted-foreground">
            {description}
          </p>
          <ul className="mt-6 space-y-2.5">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[14.5px] text-foreground/90"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.55_0.12_165)]" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[13.5px] font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          className={cn(
            "w-full min-w-0",
            imageFirst ? "md:order-1" : "md:justify-self-end",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.08 }}
        >
          <BrowserMock>
            <MediaViewer
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              posterSrc={posterSrc}
              alt={alt}
              objectPosition="top left"
            />
          </BrowserMock>
        </motion.div>
      </div>
    </section>
  );
}
