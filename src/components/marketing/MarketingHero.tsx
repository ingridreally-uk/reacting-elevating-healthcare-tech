import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Package, ShoppingCart, TrendingUp, Truck } from "lucide-react";
import { BrowserMock } from "./BrowserMock";
import { MediaViewer } from "./MediaViewer";
import { APP_SIGNUP, SCREENS } from "./content";

const trialPoints = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
];

const floating = [
  {
    label: "Low Stock",
    value: "Needs attention",
    icon: Package,
    position: "left-0 top-0 -translate-x-[18%] -translate-y-[22%]",
  },
  {
    label: "Orders",
    value: "In progress",
    icon: ShoppingCart,
    position: "right-0 top-0 translate-x-[18%] -translate-y-[22%]",
  },
  {
    label: "Savings",
    value: "Smarter buying",
    icon: TrendingUp,
    position: "bottom-0 left-0 -translate-x-[18%] translate-y-[22%]",
  },
  {
    label: "Suppliers",
    value: "In one place",
    icon: Truck,
    position: "bottom-0 right-0 translate-x-[18%] translate-y-[22%]",
  },
];

export function MarketingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[linear-gradient(180deg,#F7FBF9_0%,#EEF6F3_48%,#FFFFFF_100%)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 pb-12 pt-10 md:grid-cols-[0.95fr_1.05fr] md:gap-10 md:pb-16 md:pt-12 lg:gap-10 lg:px-10 lg:pb-20 lg:pt-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h1 className="max-w-xl text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-[52px] sm:leading-[1.02] lg:text-[60px]">
            Purchasing shouldn&apos;t feel like paperwork.
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-muted-foreground sm:mt-6 sm:max-w-lg sm:text-[18px] sm:leading-[1.7]">
            Manage stock, suppliers, purchase orders and reporting from one
            beautifully simple workspace built for dental practices.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <a
              href={APP_SIGNUP}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[14px] font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#product-gallery"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-white/70 px-6 text-[14px] font-medium text-foreground transition hover:bg-white sm:w-auto"
            >
              Watch Demo
            </a>
          </div>

          <ul className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            {trialPoints.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 text-[13.5px] text-foreground/85"
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
                  strokeWidth={3}
                />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative min-w-0 md:px-3 lg:px-5"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {floating.map((card, i) => (
            <motion.div
              key={card.label}
              className={`pointer-events-none absolute z-10 hidden rounded-2xl border border-border/70 bg-white/95 px-3 py-2.5 shadow-[0_14px_32px_-22px_rgb(15_23_42/0.3)] backdrop-blur md:block ${card.position}`}
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, i % 2 === 0 ? -3 : 3, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 9 + i * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[oklch(0.96_0.02_165)] text-[oklch(0.38_0.08_175)]">
                  <card.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-foreground">
                    {card.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {card.value}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <BrowserMock url="app.reacting.io / dashboard" className="relative z-[1]">
            <MediaViewer
              imageSrc={SCREENS.dashboard}
              alt="Dental Assist dashboard"
              priority
              objectPosition="top left"
            />
          </BrowserMock>
        </motion.div>
      </div>
    </section>
  );
}
