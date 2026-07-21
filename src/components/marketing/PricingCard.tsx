import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_SIGNUP } from "./content";

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
      className="mx-auto w-full max-w-lg rounded-[28px] border border-border/70 bg-card p-8 shadow-[0_30px_70px_-36px_rgb(15_23_42/0.22)] sm:p-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <p className="text-[15px] font-medium leading-[1.55] text-foreground">
          14-day free trial · No credit card required
        </p>
        <div className="mt-5 flex items-end justify-center gap-1">
          <span className="text-[56px] font-semibold leading-none tracking-[-0.04em] text-foreground">
            £59
          </span>
          <span className="mb-2 text-[16px] text-muted-foreground">/month</span>
        </div>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Per practice — not per user. Unlimited team members.
        </p>
      </div>

      <ul className="mt-8 space-y-3 border-t border-border/70 pt-8">
        {included.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-foreground">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.52_0.12_165)]"
              strokeWidth={2.25}
            />
            {item}
          </li>
        ))}
      </ul>

      <a
        href={APP_SIGNUP}
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[14px] font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Start Free Trial
        <ArrowRight className="h-4 w-4" />
      </a>

      <p className="mt-4 text-center text-[12.5px] text-muted-foreground">
        No setup fees. Cancel anytime.
      </p>
    </motion.div>
  );
}
