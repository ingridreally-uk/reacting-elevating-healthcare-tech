import { DoorOpen, EyeOff, Clock, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { layout } from "./design";
import { BenefitGrid } from "./Cards";

const problems = [
  {
    icon: DoorOpen,
    title: "The handover gap",
    body: "A nurse opens a surgery without knowing if the last person restocked it. The gap is usually discovered once the patient is already in the chair.",
  },
  {
    icon: EyeOff,
    title: "Invisible consumption",
    body: "The practice knows what it bought. It rarely knows what was actually used, by whom, or where it went — so reordering runs on memory.",
  },
  {
    icon: Clock,
    title: "Information that arrives too late",
    body: "Shortage is found at the shelf. Expiry is found at a check. Overspend is found at month end — always after the moment to act has passed.",
  },
  {
    icon: Receipt,
    title: "The invoice isn't the real cost",
    body: "Counting time, emergency orders, write-offs and interruptions rarely get attributed to the same problem as the supplier bill.",
  },
];

/**
 * Root-cause framing between Trust and the Journey — earns the product story
 * that follows by naming the problem in the practice's own terms first.
 */
export function PracticeProblems() {
  return (
    <section
      aria-labelledby="problems-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className={cn(layout.shell, "py-14 lg:py-16")}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>Why practices struggle</div>
          <h2
            id="problems-heading"
            className="mt-3 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px]"
          >
            It looks like a stock problem. It isn&apos;t.
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-muted-foreground">
            Shortages, expiry write-offs, duplicate orders and unclear spend usually trace back to
            one thing: the practice finds out too late to act.
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <BenefitGrid items={problems} />
        </div>

        <p className="mx-auto mt-8 max-w-[52ch] text-center text-[14px] leading-[1.6] text-foreground/65">
          Dental Assist exists to move that information earlier — before the shelf, before the
          chair, before the invoice.
        </p>
      </div>
    </section>
  );
}
