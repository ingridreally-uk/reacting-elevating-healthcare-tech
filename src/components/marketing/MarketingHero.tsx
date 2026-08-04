import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { VideoLightbox } from "./VideoLightbox";
import {
  APP_SIGNUP,
  HERO_LOOP_POSTER,
  HERO_LOOP_VIDEO,
  PRODUCT_TOUR_POSTER,
  PRODUCT_TOUR_VIDEO,
} from "./content";
import { btn } from "./design";
import { cn } from "@/lib/utils";

const reassurance = ["14 days free", "No credit card", "Guided product import"];

const replaces = ["the spreadsheet", "WhatsApp", "\u201Cask the manager\u201D"];

/**
 * Split hero — copy leads with the objection owners and managers actually
 * hold ("I already track this"), then reframes it as a timing problem
 * before naming the product. The product shot is presented flat and
 * confident — no floating badges, no tilt — with proof anchored as a
 * caption rather than staged on top of the screenshot.
 */
export function MarketingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-clip border-b border-border/30 bg-[#FAFBFC]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[85%] bg-[radial-gradient(58%_55%_at_78%_18%,#E6F0F5_0%,#F3F6F9_45%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.66_0.11_210/0.35)] to-transparent"
      />

      <div className="relative mx-auto max-w-[1240px] px-6 pb-14 pt-12 md:px-10 md:pb-16 md:pt-16 lg:pb-20 lg:pt-[4.5rem]">
        <div className="grid items-start gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10">
          <motion.div className="mx-auto max-w-[36rem] text-center lg:mx-0 lg:max-w-none lg:text-left" initial={false}>
            <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[oklch(0.4_0.08_260)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Dental Assist for private dental practices
            </span>

            <h1
              id="hero-heading"
              className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.038em] text-foreground sm:text-[46px] lg:text-[50px]"
            >
              You track it all.
              <span className="block text-foreground/76">Not before it costs you.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[50ch] text-[16px] leading-[1.68] text-muted-foreground sm:text-[17px] lg:mx-0">
              The manager&apos;s on top of it — spreadsheets, supplier replies, what to
              reorder. But that report takes real hours to build, so you only see where
              things stand once it&apos;s finished, not while it still matters. Dental
              Assist keeps one current view of stock, orders and spend, updated as it
              happens — no report to wait on.
            </p>

            <div className="mx-auto mt-5 flex max-w-[46ch] flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] lg:mx-0 lg:justify-start">
              <span className="text-foreground/45">Instead of</span>
              {replaces.map((item, i) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="rounded-md bg-foreground/[0.05] px-2 py-1 text-foreground/55 line-through">
                    {item}
                  </span>
                  {i === replaces.length - 1 ? (
                    <span className="text-foreground/45" aria-hidden>
                      →
                    </span>
                  ) : null}
                </span>
              ))}
              <span className="font-semibold text-foreground">one shared, current view</span>
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center lg:justify-start">
              <a
                href={APP_SIGNUP}
                rel="noopener noreferrer"
                className={cn(btn.base, btn.primary, "w-full sm:w-auto")}
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a href="#day-in-practice" className={cn(btn.base, btn.secondary, "w-full sm:w-auto")}>
                Follow the morning
              </a>
            </div>

            <div className="mt-4 flex justify-center lg:justify-start">
              <VideoLightbox
                videoSrc={PRODUCT_TOUR_VIDEO}
                posterSrc={PRODUCT_TOUR_POSTER}
                title="Dental Assist product tour"
                triggerLabel="Watch a 45-second product tour"
              />
            </div>

            <ul className="mt-6 flex flex-col items-center gap-x-5 gap-y-2 text-[13px] text-foreground/72 sm:flex-row sm:flex-wrap lg:justify-start">
              {reassurance.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mx-auto mt-6 max-w-[42ch] border-t border-border/60 pt-5 text-[13px] leading-[1.6] text-foreground/55 lg:mx-0">
              Built inside a working dental practice — not a generic inventory tool adapted for
              dentistry.
            </p>
          </motion.div>

          {/* Product stage — flat, confident presentation, single centred glow behind the frame */}
          <motion.div className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:mt-[3px] lg:max-w-none" initial={false}>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(62%_62%_at_50%_42%,oklch(0.66_0.11_210/0.18)_0%,transparent_72%)] blur-lg"
            />

            <motion.div
              className="relative"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ProductFrame emphasis="hero" label="app.reacting.io">
                <MediaViewer
                  videoSrc={reduceMotion ? undefined : HERO_LOOP_VIDEO}
                  imageSrc={reduceMotion ? HERO_LOOP_POSTER : undefined}
                  posterSrc={HERO_LOOP_POSTER}
                  alt="Dental Assist walkthrough showing the dashboard, RFQ comparison, low stock and reporting"
                  priority
                  objectFit="contain"
                  aspectRatio="1640 / 876"
                />
              </ProductFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
