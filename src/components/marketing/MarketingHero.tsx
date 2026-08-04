import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, TrendingDown } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { APP_SIGNUP, SCREENS } from "./content";
import { btn } from "./design";
import { cn } from "@/lib/utils";

const reassurance = ["14 days free", "No credit card", "Guided product import"];

/**
 * Split hero — copy commands the left column, the product is staged as a
 * photographed object on the right with a floating proof chip, not a
 * full-width screenshot competing with the headline.
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
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10">
          <motion.div className="mx-auto max-w-[36rem] text-center lg:mx-0 lg:max-w-none lg:text-left" initial={false}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[oklch(0.4_0.08_260)] shadow-[0_1px_2px_rgba(11,23,48,0.04)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Dental Assist for private dental practices
            </span>

            <h1
              id="hero-heading"
              className="mt-5 text-[36px] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-[48px] lg:text-[52px]"
            >
              The surgery gets restocked.
              <span className="block text-foreground/76">Whether it happened is a guess.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[48ch] text-[16px] leading-[1.68] text-muted-foreground sm:text-[17px] lg:mx-0">
              Restocking is assumed, not checked. Dental Assist gives whoever walks in
              next a real answer — what&apos;s on the shelf, what&apos;s running low, what&apos;s
              already ordered — so gaps surface before the first patient, not mid-treatment.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center lg:justify-start">
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

          {/* Product stage — photographed object with a floating proof chip */}
          <motion.div className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:max-w-none" initial={false}>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -top-10 -bottom-10 rounded-[40px] bg-[radial-gradient(65%_65%_at_50%_35%,oklch(0.66_0.11_210/0.14)_0%,transparent_70%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[10%] -bottom-4 h-14 rounded-[50%] bg-[#0B1730]/18 blur-2xl"
            />

            <div style={{ perspective: "1800px", transformOrigin: "center bottom" }}>
              <motion.div
                className="relative"
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={
                  reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }
                style={{ rotateX: 1, rotateY: -1.5, transformOrigin: "center bottom" }}
              >
                <ProductFrame emphasis="hero" label="app.reacting.io / dashboard">
                  <MediaViewer
                    imageSrc={SCREENS.dashboard}
                    alt="Dental Assist morning dashboard showing budget, required actions, stock risk, low-stock alerts and expiring materials"
                    priority
                    objectFit="contain"
                    objectPosition="center top"
                    aspectRatio="16 / 10"
                  />
                </ProductFrame>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -left-4 -top-5 hidden items-center gap-2 rounded-xl border border-border/70 bg-white px-3 py-2 shadow-[0_12px_30px_-14px_rgba(11,23,48,0.28)] sm:flex"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.02_260)] text-[oklch(0.4_0.08_260)]">
                    <TrendingDown className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      Saved this month
                    </span>
                    <span className="block text-[13px] font-semibold leading-tight text-foreground">
                      £450.00
                    </span>
                  </span>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="absolute -bottom-5 -right-4 hidden items-center gap-1.5 rounded-full border border-border/70 bg-white px-3.5 py-2 text-[12px] font-medium text-foreground shadow-[0_12px_30px_-14px_rgba(11,23,48,0.28)] sm:flex"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  Live product screenshot
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
