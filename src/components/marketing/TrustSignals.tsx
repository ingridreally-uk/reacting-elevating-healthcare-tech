import { Check } from "lucide-react";
import { layout } from "./design";
import { cn } from "@/lib/utils";

const signals = [
  "Built for dental practices",
  "No credit card required",
  "Unlimited products",
  "Unlimited team members",
  "Guided product import",
  "Email support included",
  "Cancel anytime",
] as const;

/** Compact trust strip — only supportable claims. */
export function TrustSignals({ className }: { className?: string }) {
  return (
    <section
      aria-label="Why practices choose Dental Assist"
      className={cn("border-b border-border/60 bg-background", className)}
    >
      <div className={cn(layout.shell, "py-7 lg:py-8")}>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-x-7">
          {signals.map((s) => (
            <li
              key={s}
              className="inline-flex items-center gap-2 text-[12.5px] text-foreground/80 sm:text-[13px]"
            >
              <Check
                className="h-3.5 w-3.5 shrink-0 text-[oklch(0.52_0.12_165)]"
                strokeWidth={2.5}
                aria-hidden
              />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
