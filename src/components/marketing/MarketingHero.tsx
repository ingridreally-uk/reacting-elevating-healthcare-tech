import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { APP_SIGNUP, SCREENS } from "./content";
import { btn, cnJoin } from "./design-utils";

const trialPoints = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
];

export function MarketingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[linear-gradient(180deg,#F7FBF9_0%,#EEF6F3_45%,#FFFFFF_100%)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-5 px-6 pb-7 pt-8 md:grid-cols-[0.9fr_1.1fr] md:gap-6 md:pb-9 md:pt-10 lg:gap-8 lg:px-10 lg:pb-10 lg:pt-11">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="max-w-[22ch] text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-[46px] sm:leading-[1.02] lg:text-[54px]">
            Purchasing shouldn&apos;t feel like paperwork.
          </h1>
          <p className="mt-3.5 max-w-[36ch] text-[15px] leading-[1.65] text-muted-foreground sm:mt-4 sm:max-w-[40ch] sm:text-[16.5px] sm:leading-[1.68]">
            Manage stock, suppliers, purchase orders and reporting from one
            beautifully simple workspace built for dental practices.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center">
            <a href={APP_SIGNUP} className={cnJoin(btn.base, btn.primary, "w-full sm:w-auto")}>
              Start Free Trial
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href="#product-gallery"
              className={cnJoin(btn.base, btn.secondary, "w-full sm:w-auto")}
            >
              Watch Demo
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

        <motion.div
          className="relative min-w-0 md:translate-y-0.5"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
        >
          <ProductFrame label="app.reacting.io / dashboard" emphasis="hero">
            <MediaViewer
              imageSrc={SCREENS.dashboard}
              alt="Dental Assist dashboard with spend, stock risk and purchasing queue"
              priority
              objectPosition="left top"
              aspectRatio="16 / 9"
            />
          </ProductFrame>
        </motion.div>
      </div>
    </section>
  );
}
