import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_SIGNUP } from "./content";
import { btn, elev, iconStroke, layout, radius } from "./design";
import { cn } from "@/lib/utils";

const included = [
  "Inventory visibility",
  "Low-stock alerts",
  "Expiry tracking",
  "Supplier management",
  "RFQ comparison",
  "Purchase orders",
  "Spend and usage reporting",
  "Unlimited products",
  "Unlimited team members",
  "Email support",
  "Guided product import",
];

export function PricingCard() {
  return (
    <motion.div
      className="mx-auto max-w-[920px]"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-xl text-center">
        <div className={layout.eyebrow}>Pricing</div>
        <h2 id="pricing-heading" className={cn(layout.h2, "mt-2.5")}>
          Simple pricing for the whole practice.
        </h2>
        <p className={cn(layout.lead, "mx-auto mt-3 max-w-[42ch]")}>
          One clear plan for dental practices — stock, suppliers, purchasing, expiry tracking and
          reporting in one workspace.
        </p>
      </div>

      <div
        className={cn(
          "mt-9 overflow-hidden border border-border/60 bg-card",
          radius.card,
          elev.card,
        )}
      >
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col justify-between border-b border-border/55 bg-[#F7FBF9] p-7 sm:p-8 lg:border-b-0 lg:border-r">
            <div>
              <div className="text-[13px] font-semibold tracking-tight text-foreground">
                Practice plan
              </div>
              <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
                <span className="text-[56px] font-semibold leading-none tracking-[-0.05em] text-foreground sm:text-[60px]">
                  £59
                </span>
                <span className="mb-2 text-[14px] leading-snug text-muted-foreground">
                  per practice
                  <br />
                  per month
                </span>
              </div>
              <ul className="mt-5 space-y-2.5 text-[13.5px] text-foreground/85">
                {[
                  "14-day free trial",
                  "No credit card required",
                  "No setup fees",
                  "Cancel anytime",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
                      strokeWidth={iconStroke}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-7">
              <a
                href={APP_SIGNUP}
                rel="noopener noreferrer"
                className={cn(btn.base, btn.primary, "w-full")}
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
              </a>
              <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
                Everything included in one practice plan.
              </p>
            </div>
          </div>

          <div className="flex flex-col p-7 sm:p-8">
            <div className="text-[13px] font-semibold tracking-tight text-foreground">
              Everything included
            </div>
            <ul className="mt-4 grid content-start gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {included.map((entry) => (
                <li key={entry} className="flex items-start gap-2.5 text-[13.5px] text-foreground">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
                    strokeWidth={iconStroke}
                  />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
