import { DoorOpen, EyeOff, Clock, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { layout } from "./design";
import { BenefitGrid } from "./Cards";

const problems = [
  {
    icon: DoorOpen,
    title: "Handover gaps",
    body: "Something was checked, requested or ordered — but the next person still has to find out what happened.",
  },
  {
    icon: EyeOff,
    title: "Information in too many places",
    body: "The answer may be in a spreadsheet, message, email or supplier portal — finding the current one becomes another job.",
  },
  {
    icon: Clock,
    title: "Problems discovered too late",
    body: "Low stock, expiry or an outstanding order becomes urgent because nobody had one current view of what needed attention.",
  },
  {
    icon: Receipt,
    title: "Time spent reconstructing the picture",
    body: "Managers lose time checking, searching and asking before they can make the next decision.",
  },
];

/**
 * Recognition of operational fragmentation — not a manufactured stock problem.
 */
export function PracticeProblems() {
  return (
    <section
      aria-labelledby="problems-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className={cn(layout.shell, "pb-12 pt-10 lg:pb-12 lg:pt-7")}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>Why practices struggle</div>
          <h2
            id="problems-heading"
            className="mt-3 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px]"
          >
            The work of running the practice is scattered.
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-muted-foreground">
            The answers exist. The problem is finding the current one — across people, messages,
            spreadsheets and separate systems.
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <BenefitGrid items={problems} />
        </div>
      </div>
    </section>
  );
}
