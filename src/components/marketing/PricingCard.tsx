import { ArrowRight } from "lucide-react";
import { APP_SIGNUP } from "./content";
import { btn, elev, iconStroke, layout, radius } from "./design";
import { cn } from "@/lib/utils";

const included = [
  {
    title: "Stock & expiry",
    body: "Live stock quantities, low-stock alerts and expiry tracking.",
  },
  {
    title: "Suppliers & purchasing",
    body: "Supplier directory, quote comparison and orders.",
  },
  {
    title: "Spend & savings",
    body: "Spend visibility, purchasing history and savings.",
  },
  {
    title: "Team access",
    body: "Multiple team members within the practice plan.",
  },
  {
    title: "Setup & support",
    body: "Guided product import and email support.",
  },
] as const;

export function PricingCard() {
  return (
    <div className="mx-auto max-w-[920px]">
      <div className="mx-auto max-w-xl text-center">
        <div className={layout.eyebrow}>Pricing</div>
        <h2 id="pricing-heading" className={cn(layout.h2, "mt-2.5")}>
          One practice. One clear monthly cost.
        </h2>
        <p className={cn(layout.lead, "mx-auto mt-3 max-w-[36ch]")}>
          One monthly practice plan. No per-seat pricing.
        </p>
      </div>

      <div
        className={cn(
          "mt-8 overflow-hidden border border-border/60 bg-card",
          radius.card,
          elev.card,
        )}
      >
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col justify-between border-b border-border/55 bg-[#F1F5F9] p-6 sm:p-8 lg:justify-start lg:border-b-0 lg:border-r">
            <div>
              <div className="text-[13px] font-semibold tracking-tight text-foreground">
                Practice plan
              </div>
              <div className="mt-4 flex flex-wrap items-end gap-x-2.5 gap-y-1">
                <span className="text-[56px] font-semibold leading-none tracking-[-0.05em] text-foreground sm:text-[60px]">
                  £59
                </span>
                <span className="mb-1.5 text-[14px] leading-snug text-muted-foreground">
                  per practice
                  <br />
                  per month
                </span>
              </div>
              <div className="mt-5 space-y-1 text-[14px] leading-[1.45] font-medium text-foreground/90">
                <p>14-day free trial</p>
                <p>No credit card required</p>
                <p>Cancel anytime</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-8">
              <a
                href={APP_SIGNUP}
                rel="noopener noreferrer"
                className={cn(btn.base, btn.primary, "w-full")}
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
              </a>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="text-[13px] font-semibold tracking-tight text-foreground">
              Everything included
            </div>
            <ul className="mt-4 space-y-3.5">
              {included.map((entry) => (
                <li key={entry.title}>
                  <p className="text-[14px] font-semibold leading-snug text-foreground">
                    {entry.title}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-[1.5] text-muted-foreground">
                    {entry.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
