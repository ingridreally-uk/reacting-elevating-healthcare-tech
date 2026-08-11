import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { APP_SIGNUP, HERO_DASHBOARD } from "./content";
import { btn } from "./design";
import { cn } from "@/lib/utils";

/**
 * Split hero — copy leads with the objection owners and managers actually
 * hold ("I already track this"), then reframes it as a timing problem
 * before naming the product. The product shot is presented flat and
 * confident — no floating badges, no tilt — with proof anchored as a
 * caption rather than staged on top of the screenshot.
 *
 * Deliberately restrained to one supporting message, one secondary action
 * and one quiet reassurance line — every additional block competes with
 * the primary CTA for a first glance that only lasts a few seconds.
 *
 * Hero media: dedicated edge-filled dashboard crops (desktop + mobile),
 * presented with contain — no runtime scale compensation.
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

      <div className="relative mx-auto max-w-[1240px] px-6 pb-10 pt-10 md:px-10 md:pb-16 md:pt-16 lg:pb-20 lg:pt-[4.5rem]">
        <div className="grid items-center gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
          <motion.div className="mx-auto max-w-[36rem] text-center lg:mx-0 lg:max-w-none lg:text-left" initial={false}>
            <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[oklch(0.4_0.08_260)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Operational software for modern dental practices
            </span>

            <h1
              id="hero-heading"
              className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.038em] text-foreground sm:mt-5 sm:text-[46px] lg:text-[50px]"
            >
              You track it all.
              <span className="block text-foreground/76">Not before it costs you.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16px] leading-[1.68] text-muted-foreground sm:mt-5 sm:text-[17px] lg:mx-0">
              Right now, the answer lives in a spreadsheet, a WhatsApp thread, or whoever you
              ask. Dental Assist brings stock, orders and spend into one current view — so you
              see what needs attention before it becomes a problem, not just what&apos;s been
              counted.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:mt-7 sm:flex-row sm:items-center lg:justify-start">
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

            <p className="mt-5 text-[12.5px] text-foreground/55">
              14 days free · No card required · Guided setup
            </p>
          </motion.div>

          {/* Product stage — flat, confident presentation, single centred glow behind the frame */}
          <motion.div className="relative mx-auto w-full min-w-0 lg:mx-0 lg:mt-0" initial={false}>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[radial-gradient(58%_58%_at_50%_42%,oklch(0.66_0.11_210/0.12)_0%,transparent_74%)] blur-md sm:-inset-5"
            />

            <motion.div
              className="relative"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ProductFrame emphasis="hero" label="app.reacting.io / dashboard">
                {/* Mobile: Actions-led authentic crop */}
                <div className="lg:hidden">
                  <MediaViewer
                    imageSrc={HERO_DASHBOARD.mobile}
                    alt="Dental Assist actions required — stockouts, audits and RFQs needing attention"
                    priority
                    objectFit="contain"
                    aspectRatio={HERO_DASHBOARD.mobileAspect}
                  />
                </div>
                {/* Desktop / laptop: full operational overview */}
                <div className="hidden lg:block">
                  <MediaViewer
                    imageSrc={HERO_DASHBOARD.desktop}
                    alt="Dental Assist dashboard showing stock risk, purchasing queue, spend and actions required"
                    priority
                    objectFit="contain"
                    aspectRatio={HERO_DASHBOARD.desktopAspect}
                  />
                </div>
              </ProductFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
