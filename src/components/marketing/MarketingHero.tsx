import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { APP_SIGNUP, SCREENS } from "./content";
import { btn, layout } from "./design";
import { cn } from "@/lib/utils";

const trialPoints = ["14-day free trial", "No credit card required", "Built for dental practices"];

const insightChips = [
  { label: "£450 saved this month", position: "left-[1%] top-[16%] lg:left-[-2%] lg:top-[14%]" },
  { label: "23 stock risks", position: "right-[1%] top-[20%] lg:right-[-2%] lg:top-[18%]" },
  { label: "3 actions ready", position: "bottom-[8%] right-[3%] lg:bottom-[6%] lg:right-[1%]" },
] as const;

function InsightChip({
  label,
  className,
  delay,
  reduceMotion,
}: {
  label: string;
  className?: string;
  delay: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-[2] hidden rounded-lg border border-black/[0.06] bg-white/95 px-3 py-2 text-[12px] font-semibold tracking-tight text-foreground shadow-[0_1px_2px_rgba(11,43,40,0.04),0_8px_18px_-10px_rgba(11,43,40,0.14)] backdrop-blur-sm md:block",
        className,
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: [0.55, 1, 1, 0.55],
              y: 0,
              scale: [0.98, 1, 1, 0.98],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.35, delay }
          : {
              duration: 5.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
              times: [0, 0.18, 0.55, 1],
            }
      }
    >
      {label}
    </motion.div>
  );
}

export function MarketingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-clip border-b border-border/50 bg-[linear-gradient(180deg,#F8FBFA_0%,#FFFFFF_58%,#FFFFFF_100%)]"
    >
      <div
        className={cn(
          layout.shell,
          "relative grid items-center gap-7 py-8 md:grid-cols-12 md:gap-6 md:py-9 lg:gap-8 lg:py-10",
        )}
      >
        <motion.div
          className="relative z-10 flex flex-col justify-center md:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={layout.eyebrow}>Dental practice stock &amp; purchasing, made clear</div>
          <h1
            id="hero-heading"
            className="mt-3 max-w-[17ch] text-[30px] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-[40px] sm:leading-[1.02] lg:text-[46px]"
          >
            Stop losing time and money to scattered stock control.
          </h1>
          <p className="mt-3 max-w-[42ch] text-[14.5px] leading-[1.65] text-muted-foreground sm:text-[15.5px] sm:leading-[1.68]">
            Dental Assist gives your team one live view of stock, expiry risk, suppliers,
            quotations, purchase orders and spend — helping you prevent shortages, reduce waste and
            buy with confidence.
          </p>

          <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:items-center">
            <a
              href={APP_SIGNUP}
              rel="noopener noreferrer"
              className={cn(btn.base, btn.primary, "w-full sm:w-auto")}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a href="#product-gallery" className={cn(btn.base, btn.secondary, "w-full sm:w-auto")}>
              Explore Dental Assist
            </a>
          </div>

          <ul className="mt-3.5 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1.5">
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

        <motion.div
          className="relative min-w-0 md:col-span-7"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-3 left-[14%] right-[14%] z-0 h-7 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(11,43,40,0.11)_0%,transparent_72%)] blur-md"
          />
          {insightChips.map((chip, i) => (
            <InsightChip
              key={chip.label}
              label={chip.label}
              className={chip.position}
              delay={0.4 + i * 1.8}
              reduceMotion={reduceMotion}
            />
          ))}
          <ProductFrame label="app.reacting.io / dashboard" emphasis="hero">
            <MediaViewer
              imageSrc={SCREENS.dashboard}
              alt="Dental Assist dashboard showing stock risk, monthly spend, purchasing actions and expiry alerts"
              priority
              objectFit="cover"
              objectPosition="center top"
              aspectRatio="16 / 10"
            />
          </ProductFrame>
        </motion.div>
      </div>
    </section>
  );
}
