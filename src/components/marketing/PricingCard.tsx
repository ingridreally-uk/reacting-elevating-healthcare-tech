import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_SIGNUP } from "./content";
import { btn, elev, iconStroke, radius } from "./design";
import { cn } from "@/lib/utils";

const included = [
  "Inventory Management",
  "Supplier Management",
  "Purchase Orders",
  "Reporting",
  "Expiry Tracking",
  "Low Stock Alerts",
  "Unlimited Products",
  "Unlimited Users",
  "Email Support",
];

export function PricingCard() {
  return (
    <motion.div
      className={cn(
        "mx-auto w-full max-w-md border border-border/70 bg-card p-6 sm:p-7",
        radius.card,
        elev.product,
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <div className="flex items-end justify-center gap-1">
          <span className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-foreground">
            £59
          </span>
          <span className="mb-1.5 text-[14.5px] text-muted-foreground">/month</span>
        </div>
        <p className="mt-2 text-[13.5px] text-muted-foreground">
          Per practice — unlimited team members
        </p>
        <p className="mt-1 text-[12px] text-muted-foreground">
          14-day free trial · No credit card required
        </p>
      </div>

      <ul className="mt-5 grid gap-x-4 gap-y-2 border-t border-border/70 pt-5 sm:grid-cols-2">
        {included.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[13px] text-foreground"
          >
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
              strokeWidth={iconStroke}
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-center">
        <a href={APP_SIGNUP} className={cn(btn.base, btn.primary)}>
          Start Free Trial
          <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
        </a>
      </div>

      <p className="mt-2.5 text-center text-[12px] text-muted-foreground">
        No setup fees. Cancel anytime.
      </p>
    </motion.div>
  );
}
