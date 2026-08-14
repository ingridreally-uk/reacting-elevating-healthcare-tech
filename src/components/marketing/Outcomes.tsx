import { BarChart3, ClipboardList, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { layout } from "./design";
import { BenefitGrid } from "./Cards";

const roles = [
  {
    icon: BarChart3,
    title: "Owner",
    body: "See spend, inventory value, slow-moving stock, purchasing activity and what needs attention — without waiting for someone to assemble the picture.",
  },
  {
    icon: ClipboardList,
    title: "Practice Manager",
    body: "See supplier decisions, orders, waiting items and follow-up without reconstructing the story across messages and spreadsheets.",
  },
  {
    icon: Package,
    title: "Nurse / Stock Lead",
    body: "See quantities, locations, low stock, expiry and what is already underway before starting the same checks again.",
  },
];

/**
 * Role value — same Outcomes section, retargeted. No new Home section.
 */
export function Outcomes() {
  return (
    <section aria-labelledby="outcomes-heading" className="border-b border-border/40 bg-background">
      <div className={cn(layout.shell, "pb-10 pt-8 lg:pb-10 lg:pt-8")}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>In the practice</div>
          <h2
            id="outcomes-heading"
            className="mt-3 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px]"
          >
            One operational view. Different responsibilities.
          </h2>
        </div>

        <div className="mt-8 lg:mt-9">
          <BenefitGrid items={roles} />
        </div>
      </div>
    </section>
  );
}
