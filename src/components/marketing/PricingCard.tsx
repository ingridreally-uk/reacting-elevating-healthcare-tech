import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_SIGNUP } from "./content";
import { btn, elev, iconStroke, layout, radius } from "./design";
import { cn } from "@/lib/utils";

const included = [
  "Inventory visibility",
  "Supplier management",
  "RFQ comparison",
  "Purchase orders",
  "Expiry tracking",
  "Low stock alerts",
  "Spend & usage reporting",
  "Unlimited products",
  "Email support",
];

export function PricingCard() {
  return (
    <motion.div
      className="mx-auto max-w-[920px]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-xl text-center">
        <div className={layout.eyebrow}>Pricing</div>
        <h2 id="pricing-heading" className={cn(layout.h2, "mt-2.5")}>
          Simple pricing for the whole practice.
        </h2>
        <p className={cn(layout.lead, "mx-auto mt-3 max-w-[40ch]")}>
          One clear plan for dental practices — stock, suppliers, purchasing, expiry tracking and
          reporting in one workspace.
        </p>
      </div>

      <div
        className={cn(
          "mt-10 overflow-hidden border border-border/60 bg-card",
          radius.card,
          elev.card,
        )}
      >
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col justify-between border-b border-border/55 bg-[#F7FBF9] p-7 sm:p-8 lg:border-b-0 lg:border-r lg:p-8 xl:p-9">
            <div>
              <div className="text-[13px] font-semibold tracking-tight text-foreground">
                Practice plan
              </div>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-[60px] font-semibold leading-none tracking-[-0.05em] text-foreground sm:text-[64px]">
                  £59
                </span>
                <span className="mb-2.5 text-[14.5px] text-muted-foreground">/practice/month</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-[13.5px] text-foreground/85">
                {["14-day free trial", "No credit card required", "Unlimited team members"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <Check
                        className="h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
                        strokeWidth={iconStroke}
                      />
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="mt-7">
              <a href={APP_SIGNUP} className={cn(btn.base, btn.primary, "w-full")}>
                Start Free Trial
                <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
              </a>
              <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
                No setup fees. Cancel anytime.
              </p>
            </div>
          </div>

          <div className="flex flex-col p-7 sm:p-8 lg:p-8 xl:p-9">
            <div className="text-[13px] font-semibold tracking-tight text-foreground">
              Everything included
            </div>
            <ul className="mt-5 grid content-start gap-x-6 gap-y-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-foreground">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
                    strokeWidth={iconStroke}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
