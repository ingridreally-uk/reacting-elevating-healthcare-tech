import { Heart, Users, ShieldCheck, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { layout } from "./design";
import { BenefitGrid } from "./Cards";

const outcomes = [
  {
    icon: Heart,
    title: "Calm before the first patient",
    body: "The room is ready and the shelf is known — not discovered mid-treatment, and not carried home the night before.",
  },
  {
    icon: Users,
    title: "One version of what happened",
    body: "Requests, orders and receipts live in the same place, so accountability doesn't fall on memory or one person's vigilance.",
  },
  {
    icon: ShieldCheck,
    title: "Decisions before the invoice",
    body: "Compare suppliers and see the budget impact before committing to an order — not after it lands on the desk.",
  },
  {
    icon: Flame,
    title: "Less firefighting, more running the practice",
    body: "Less time spent reconstructing what happened last month, more time acting on what's happening this week.",
  },
];

/**
 * What changes, in the practice's terms — bridges the product story to the
 * onboarding beat without repeating feature language.
 */
export function Outcomes() {
  return (
    <section aria-labelledby="outcomes-heading" className="border-b border-border/40 bg-[#F1F5F9]">
      <div className={cn(layout.shell, "py-14 lg:py-16")}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>What changes</div>
          <h2
            id="outcomes-heading"
            className="mt-3 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px]"
          >
            One shared view. Fewer surprises.
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-[1.65] text-muted-foreground">
            We won&apos;t quote a fixed savings percentage — no one can honestly back one yet.
            What changes is when the practice finds out.
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <BenefitGrid items={outcomes} />
        </div>
      </div>
    </section>
  );
}
