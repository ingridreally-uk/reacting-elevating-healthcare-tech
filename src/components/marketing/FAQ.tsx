import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. You can start a 14-day free trial and explore Dental Assist with your practice workflows before deciding.",
  },
  {
    q: "Do I need a credit card?",
    a: "No. You can start the free trial without entering card details.",
  },
  {
    q: "How many users are included?",
    a: "Unlimited team members are included with every practice plan. You are not charged per seat.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel whenever you like. There are no long-term contracts and no setup fees.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices can get started quickly. Import your products and begin managing inventory with clear visibility from day one.",
  },
  {
    q: "Is my data secure?",
    a: "We take practice data seriously. You can ask us during onboarding how Dental Assist is hosted and how access is handled for your team.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-secondary/40"
            >
              <span className="text-[16px] font-medium tracking-tight text-foreground sm:text-[17px]">
                {item.q}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                {isOpen ? (
                  <Minus className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-12 text-[15px] leading-[1.7] text-muted-foreground">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
