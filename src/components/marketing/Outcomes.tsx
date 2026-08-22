import { useState } from "react";
import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

const roles = [
  {
    id: "owner",
    label: "Owner",
    line: "Spend, inventory value, stock risk and purchasing activity.",
    src: "/product-story/01-dashboard.png",
    alt: "Dental Assist dashboard — spend, inventory value, stock risk and actions required",
    objectPosition: "72% 20%",
  },
  {
    id: "manager",
    label: "Practice Manager",
    line: "Supplier decisions, orders, waiting items and follow-up.",
    // Pre-launch: replace 03-supplier-comparison.png with a professionally named RFQ capture. Source still shows title "skubiai uzsakyti". Do not edit pixels until then.
    src: "/product-story/03-supplier-comparison.png",
    alt: "Dental Assist supplier comparison — selected quotes, savings and order summary",
    objectPosition: "68% 64%",
  },
  {
    id: "nurse",
    label: "Nurse / Stock Lead",
    line: "Quantities, locations, expiry, replenishment and receiving.",
    src: "/product-story/02-low-stock-detail.png",
    alt: "Dental Assist stock item — critically low quantity, minimum level and related RFQs",
    objectPosition: "80% 36%",
  },
] as const;

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
      className="border-b border-border/40 bg-background"
    >
      <div className={cn(layout.shell, "pb-10 pt-8 lg:pb-12 lg:pt-8")}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>In the practice</div>
          <h2
            id="outcomes-heading"
            className="mt-3 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px]"
          >
            One operational view. Different responsibilities.
          </h2>
        </div>

        <div className="mx-auto mt-6 max-w-[920px] lg:mt-8">
          <div
            role="tablist"
            aria-label="Practice roles"
            className="flex flex-wrap justify-center gap-2"
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
                    "shrink-0 rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
            className="mx-auto mt-3 max-w-[42ch] text-center text-[14.5px] leading-[1.55] text-muted-foreground"
          >
            {role.line}
          </p>

          <div
            id="role-proof"
            role="tabpanel"
            aria-labelledby={`role-tab-${role.id}`}
            className={cn(
              "relative mt-5 overflow-hidden border border-border/55 bg-[#F3F7F5]",
              radius.panel,
              elev.product,
            )}
          >
            <div className="relative aspect-[4/3] w-full lg:aspect-[16/10]">
              {roles.map((entry, index) => {
                const visible = index === active;
                return (
                  <img
                    key={entry.id}
                    src={entry.src}
                    alt={visible ? entry.alt : ""}
                    width={1920}
                    height={1080}
                    draggable={false}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover",
                      visible ? "opacity-100" : "opacity-0",
                    )}
                    style={{ objectPosition: entry.objectPosition }}
                    aria-hidden={!visible}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
