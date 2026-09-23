import { useState } from "react";
import { cn } from "@/lib/utils";
import { layout } from "./design";

type RoleProof = {
  id: string;
  label: string;
  line: string;
  desktop: string;
  mobile: string;
  alt: string;
  width: number;
  height: number;
  /** Natural footprint. Widths differ; visual weight stays close. */
  shot: string;
};

const roles: RoleProof[] = [
  {
    id: "owner",
    label: "Owner",
    line: "See what the practice is spending, saving and using over time.",
    desktop: "/product-screens/proof-role-owner.png",
    mobile: "/product-screens/proof-role-owner.png",
    alt: "Dental Assist saved this month — quote savings £123.33, historical savings £85.96, and the note that the two are not added together",
    width: 680,
    height: 670,
    shot: "max-w-[28.375rem]",
  },
  {
    id: "manager",
    label: "Practice Manager",
    line: "See which orders are waiting, what needs chasing and what's already moving.",
    desktop: "/product-screens/art-manager-order.png",
    mobile: "/product-screens/art-manager-order-m.png",
    alt: "Dental Assist order 543 — Waiting, Reacting Dental Supplies, both items, Process Order and the order total",
    width: 1640,
    height: 712,
    shot: "max-w-[55rem]",
  },
  {
    id: "nurse",
    label: "Nurse / Stock Lead",
    line: "See what is running low, what's already being handled and what still needs action.",
    desktop: "/product-screens/art-nurse-low-stock.png",
    mobile: "/product-screens/art-nurse-low-stock.png",
    alt: "Dental Assist Attention — Low stock 109, two Venus Diamond syringes marked low, and Add to request",
    width: 790,
    height: 668,
    shot: "max-w-[33rem]",
  },
];

/**
 * Same Dental Assist workspace, different operational responsibility.
 */
export function Outcomes() {
  const [active, setActive] = useState(0);
  const role = roles[active] ?? roles[0];

  return (
    <section
      aria-labelledby="outcomes-heading"
      data-home-section="roles"
      className="scroll-mt-20 border-b border-border/40 bg-background"
    >
      <div className="mx-auto max-w-[1200px] px-3.5 pb-8 pt-7 sm:px-6 sm:pb-10 sm:pt-8 lg:px-10 lg:pb-12 lg:pt-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>In the practice</div>
          <h2
            id="outcomes-heading"
            className="mt-2.5 text-[26px] font-semibold tracking-[-0.032em] text-foreground sm:mt-3 sm:text-[34px] lg:text-[36px]"
          >
            One operational view. Different responsibilities.
          </h2>
        </div>

        <div className="mx-auto mt-5 w-full sm:mt-6 lg:mt-7">
          <div
            role="tablist"
            aria-label="Practice roles"
            className="mx-auto flex max-w-[52rem] flex-nowrap items-center justify-center gap-1.5 sm:gap-2"
          >
            {roles.map((entry, index) => {
              const selected = index === active;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  id={`role-tab-${entry.id}`}
                  aria-selected={selected}
                  aria-controls="role-proof"
                  onClick={() => setActive(index)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3.5 sm:py-2 sm:text-[12.5px]",
                    selected
                      ? "bg-[#0B1730] text-white"
                      : "bg-[#F8FAFC] text-foreground/80 ring-1 ring-border/70 hover:bg-white hover:text-foreground",
                  )}
                >
                  {entry.label}
                </button>
              );
            })}
          </div>

          <p
            id="role-proof-line"
            className="mx-auto mt-3 max-w-[36ch] text-center text-[14px] leading-[1.5] text-muted-foreground sm:mt-3.5 sm:text-[15px]"
          >
            {role.line}
          </p>

          <div
            id="role-proof"
            role="tabpanel"
            aria-labelledby={`role-tab-${role.id}`}
            data-role-proof-stage
            className="relative mx-auto mt-5 grid w-full items-center sm:mt-6 lg:mt-7 lg:min-h-[28rem]"
          >
            {roles.map((entry, index) => {
              const visible = index === active;

              return (
                <div
                  key={entry.id}
                  hidden={!visible}
                  aria-hidden={!visible}
                  data-role-proof-img={entry.id}
                  className={cn(
                    "col-start-1 row-start-1 flex items-center justify-center",
                    !visible && "hidden",
                  )}
                >
                  <picture className={cn("mx-auto block w-full", entry.shot)}>
                    <source media="(max-width: 767px)" srcSet={entry.mobile} />
                    <img
                      src={entry.desktop}
                      alt={visible ? entry.alt : ""}
                      width={entry.width}
                      height={entry.height}
                      draggable={false}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="pointer-events-none h-auto w-full select-none rounded-2xl border border-black/[0.06] shadow-[0_18px_40px_-28px_rgba(11,23,48,0.4)]"
                    />
                  </picture>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
