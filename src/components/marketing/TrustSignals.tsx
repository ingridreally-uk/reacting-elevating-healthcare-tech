import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { layout } from "./design";

const signals = [
  "Made for private dental practices",
  "Works alongside your practice-management system",
  "Guided product import",
  "£59 / practice / month",
] as const;

/** Quiet confidence strip — no fabricated social proof. */
export function TrustSignals({ className }: { className?: string }) {
  return (
    <section
      aria-label="Why practices can trust Dental Assist"
      className={cn("border-b border-border/40 bg-background", className)}
    >
      <div className={cn(layout.shell, "py-5 lg:py-6")}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {signals.map((s) => (
            <li
              key={s}
              className="inline-flex items-center justify-center gap-2 text-center text-[12px] text-foreground/65 sm:text-[12.5px]"
            >
              <Check
                className="h-3.5 w-3.5 shrink-0 text-accent"
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
