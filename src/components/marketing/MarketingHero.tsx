import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { APP_SIGNUP, SCREENS } from "./content";
import { btn, elev, layout, radius } from "./design";
import { cn } from "@/lib/utils";

const trialPoints = ["14-day free trial", "No credit card required", "Built for dental practices"];

/** Compact product highlight — extracted from the matching dashboard region. */
function FocusPanel({
  src,
  className,
  drift = false,
  reduceMotion,
}: {
  src: string;
  className?: string;
  drift?: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none overflow-hidden border border-border/45 bg-card",
        radius.card,
        elev.focus,
        className,
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.985 }}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : drift
            ? { opacity: 1, y: [0, -4, 0], scale: 1 }
            : { opacity: 1, y: 0, scale: 1 }
      }
      transition={
        drift && !reduceMotion
          ? {
              opacity: { duration: 0.5, delay: 0.35 },
              y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.5, delay: 0.35 },
            }
          : { duration: 0.5, delay: 0.28, ease: "easeOut" }
      }
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover object-left-top"
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  );
}

export function MarketingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-clip border-b border-border/60 bg-[linear-gradient(165deg,#F7FBF9_0%,#EEF6F3_42%,#FFFFFF_100%)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(ellipse_at_78%_18%,oklch(0.93_0.03_165)_0%,transparent_56%)]"
      />
      <div
        className={cn(
          layout.shell,
          "relative grid items-center gap-8 pb-12 pt-10 md:grid-cols-12 md:gap-8 md:pb-14 md:pt-11 lg:gap-10 lg:pb-16 lg:pt-12",
        )}
      >
        <motion.div
          className="relative z-10 flex flex-col justify-center md:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className={layout.eyebrow}>Dental practice operations, made clearer</div>
          <h1
            id="hero-heading"
            className="mt-3 max-w-[18ch] text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-[46px] sm:leading-[1.02] lg:text-[52px]"
          >
            Know what your practice has, needs and spends.
          </h1>
          <p className="mt-3.5 max-w-[38ch] text-[15px] leading-[1.65] text-muted-foreground sm:mt-4 sm:max-w-[40ch] sm:text-[16.5px] sm:leading-[1.68]">
            Dental Assist connects stock, suppliers, purchasing, expiry tracking and reporting,
            helping dental teams reduce waste, prevent shortages and make clearer day-to-day
            decisions.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center">
            <a href={APP_SIGNUP} className={cn(btn.base, btn.primary, "w-full sm:w-auto")}>
              Start Free Trial
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a href="#product-gallery" className={cn(btn.base, btn.secondary, "w-full sm:w-auto")}>
              See Dental Assist in action
            </a>
          </div>

          <ul className="mt-4 flex flex-col gap-1.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1.5">
            {trialPoints.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 text-[12.5px] text-foreground/80"
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
                  strokeWidth={2.5}
                />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="relative min-w-0 md:col-span-7">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[8%] -z-10 translate-x-4 translate-y-5 overflow-hidden rounded-[1.35rem] border border-border/25 opacity-[0.36] blur-[0.5px] md:translate-x-5 md:translate-y-6"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 0.36 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <img
              src={SCREENS.heroDepth}
              alt=""
              className="h-full w-full scale-[1.06] object-cover"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="relative z-[1]"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.988 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
          >
            <ProductFrame label="app.reacting.io / dashboard" emphasis="hero">
              <MediaViewer
                imageSrc={SCREENS.dashboard}
                alt="Dental Assist operational dashboard showing KPI cards, budget, actions required, low-stock alerts and expiry warnings"
                priority
                objectFit="contain"
                objectPosition="center"
                aspectRatio="16 / 10"
              />
            </ProductFrame>
          </motion.div>

          {/* Max two compact highlights — never cover central KPI row */}
          <div className="pointer-events-none absolute inset-0 z-[3] hidden md:block">
            <FocusPanel
              src={SCREENS.heroStockRisk}
              reduceMotion={reduceMotion}
              className="absolute left-[-1.5%] top-[18%] h-[72px] w-[104px] lg:left-[-2%] lg:h-[80px] lg:w-[116px]"
            />
            <FocusPanel
              src={SCREENS.heroActions}
              reduceMotion={reduceMotion}
              drift
              className="absolute bottom-[10%] right-[-2.5%] hidden h-[96px] w-[188px] lg:block lg:h-[108px] lg:w-[210px]"
            />
          </div>

          {/* Tablet: one highlight only */}
          <div className="pointer-events-none absolute inset-0 z-[3] hidden sm:block md:hidden">
            <FocusPanel
              src={SCREENS.heroStockRisk}
              reduceMotion={reduceMotion}
              className="absolute left-[-1%] top-[16%] h-[64px] w-[92px]"
            />
          </div>

          {/* Mobile: compact highlight below the frame, not over it */}
          <div className="mt-3 sm:hidden">
            <FocusPanel
              src={SCREENS.heroActions}
              reduceMotion={reduceMotion}
              className="relative mx-auto h-[88px] w-[min(100%,280px)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
