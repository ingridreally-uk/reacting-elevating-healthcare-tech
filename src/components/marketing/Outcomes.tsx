import { useState } from "react";
import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

type RoleProof = {
  id: string;
  label: string;
  line: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const roles: RoleProof[] = [
  {
    id: "owner",
    label: "Owner",
    line: "See what the practice is spending, saving and using over time.",
    src: "/product-screens/role-owner-final.png",
    alt: "Dental Assist Savings & Usage — monthly savings, order value, stock usage and trend",
    width: 1600,
    height: 1000,
  },
  {
    id: "manager",
    label: "Practice Manager",
    line: "See which orders are waiting, what needs chasing and what's already moving.",
    src: "/product-screens/role-manager-final.png",
    alt: "Dental Assist Purchase Orders — waiting orders, Kent Express, items, total and status",
    width: 1600,
    height: 1000,
  },
  {
    id: "nurse",
    label: "Nurse / Stock Lead",
    line: "See what is running low, what's already being handled and what still needs action.",
    src: "/product-screens/role-nurse-final.png",
    alt: "Dental Assist Low Stock — DEHP vinyl gloves, sterile safeskin and pana spray needing action",
    width: 1600,
    height: 640,
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

        <div className="mx-auto mt-5 max-w-[920px] sm:mt-6 lg:mt-7">
          <div
            role="tablist"
            aria-label="Practice roles"
            className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2"
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
            className={cn(
              "relative mx-auto mt-5 w-full max-w-[560px] overflow-hidden border border-border/50 bg-[#F3F7F5] sm:mt-6 lg:mt-7",
              radius.panel,
              elev.card,
            )}
          >
            {roles.map((entry, index) => {
              const visible = index === active;

              return (
                <img
                  key={entry.id}
                  src={entry.src}
                  alt={visible ? entry.alt : ""}
                  width={entry.width}
                  height={entry.height}
                  draggable={false}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  data-role-proof-img={entry.id}
                  hidden={!visible}
                  aria-hidden={!visible}
                  className={cn(
                    "pointer-events-none block w-full h-auto select-none",
                    !visible && "hidden",
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
