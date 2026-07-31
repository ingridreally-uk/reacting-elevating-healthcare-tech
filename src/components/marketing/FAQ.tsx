import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { elev, iconStroke, layout, radius } from "./design";
import { faqs } from "./faq-data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-[820px]">
      <div className="mx-auto max-w-lg text-center">
        <div className={layout.eyebrow}>FAQ</div>
        <h2 id="faq-heading" className={cn(layout.h2, "mt-2.5")}>
          Still deciding for the practice?
        </h2>
        <p className={cn(layout.lead, "mx-auto mt-3 max-w-[40ch]")}>
          Straight answers for owners and managers evaluating Dental Assist.
        </p>
      </div>

      <div
        className={cn(
          "mt-10 overflow-hidden border border-border/55 bg-card",
          radius.card,
          elev.card,
        )}
      >
        {faqs.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${baseId}-panel-${i}`;
          const buttonId = `${baseId}-button-${i}`;
          const isLast = i === faqs.length - 1;
          return (
            <div key={item.q} className={cn(!isLast && "border-b border-border/50")}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex min-h-12 w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F1F5F9]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-6"
                >
                  <span className="text-[15px] font-medium leading-snug tracking-tight text-foreground">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors",
                      isOpen
                        ? "bg-[oklch(0.94_0.02_260)] text-[oklch(0.4_0.08_260)]"
                        : "bg-transparent group-hover:bg-secondary/60",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" strokeWidth={iconStroke} aria-hidden />
                    ) : (
                      <Plus className="h-3.5 w-3.5" strokeWidth={iconStroke} aria-hidden />
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
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[14px] leading-[1.7] text-muted-foreground sm:px-6">
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
