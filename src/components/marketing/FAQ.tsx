import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { iconStroke, layout } from "./design";
import { faqs } from "./faq-data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-[820px]">
      <div className="mx-auto max-w-md text-center">
        <div className={layout.eyebrow}>FAQ</div>
        <h2 id="faq-heading" className={cn(layout.h2, "mt-2.5")}>
          Questions, answered.
        </h2>
        <p className={cn(layout.lead, "mx-auto mt-3 max-w-[36ch]")}>
          Clear answers for practice owners and managers evaluating Dental Assist.
        </p>
      </div>

      <div className="mt-11 space-y-0">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${baseId}-panel-${i}`;
          const buttonId = `${baseId}-button-${i}`;
          return (
            <div
              key={item.q}
              className={cn(
                "border-b border-border/55 transition-colors duration-200",
                isOpen && "border-border/80",
              )}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start justify-between gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span
                    className={cn(
                      "max-w-[34ch] text-[15.5px] font-medium leading-snug tracking-tight text-foreground transition-colors",
                      isOpen && "text-[oklch(0.32_0.06_175)]",
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors",
                      isOpen
                        ? "bg-[oklch(0.94_0.02_165)] text-[oklch(0.38_0.08_175)]"
                        : "bg-transparent group-hover:bg-secondary/60",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" strokeWidth={iconStroke} />
                    ) : (
                      <Plus className="h-3.5 w-3.5" strokeWidth={iconStroke} />
                    )}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[42ch] pb-6 text-[14.5px] leading-[1.75] text-muted-foreground">
                      {item.a}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
