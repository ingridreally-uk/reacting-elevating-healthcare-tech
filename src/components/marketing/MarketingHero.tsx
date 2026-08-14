import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { APP_SIGNUP, HERO_DASHBOARD } from "./content";
import { btn } from "./design";
import { cn } from "@/lib/utils";

/**
 * Split hero — category contrast then product claim. The authentic dashboard
 * is proof, secondary to the proposition: not a screenshot dump, not a
 * fabricated multi-card stage.
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

      <div className="relative mx-auto max-w-[1240px] px-6 pb-8 pt-10 md:px-10 md:pb-11 md:pt-14 lg:pb-10 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-10">
          <motion.div className="mx-auto max-w-[38rem] text-center lg:mx-0 lg:max-w-none lg:text-left" initial={false}>
            <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[oklch(0.4_0.08_260)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Operational software for modern dental practices
            </span>

            <h1
              id="hero-heading"
              className="mt-4 text-[28px] font-semibold leading-[1.12] tracking-[-0.038em] text-foreground sm:mt-5 sm:text-[40px] lg:text-[44px]"
            >
              <span className="block text-foreground/76">Clinical software manages the patient journey.</span>
              <span className="mt-1.5 block text-foreground sm:mt-2">
                Dental Assist brings practice operations together.
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16px] leading-[1.68] text-muted-foreground sm:mt-5 sm:text-[17px] lg:mx-0">
              Stock, purchasing, suppliers, spend and what needs attention — one shared operational
              view instead of answers scattered across spreadsheets, messages and memory.
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
                See how it works
              </a>
            </div>

            <p className="mt-5 text-[12.5px] text-foreground/55">
              14 days free · No card required · Guided setup
            </p>
          </motion.div>

          <motion.div className="relative mx-auto w-full min-w-0 max-w-[640px] lg:mx-0 lg:max-w-none" initial={false}>
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
                <div className="lg:hidden">
                  <MediaViewer
                    imageSrc={HERO_DASHBOARD.mobile}
                    alt="Dental Assist actions required — stockouts, audits and RFQs needing attention"
                    priority
                    objectFit="contain"
                    aspectRatio={HERO_DASHBOARD.mobileAspect}
                  />
                </div>
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
