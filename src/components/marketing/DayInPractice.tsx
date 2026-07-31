import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { SCREENS } from "./content";
import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

type Step = {
  id: string;
  time: string;
  short: string;
  title: string;
  body: string;
  outcome: string;
  imageSrc: string;
  alt: string;
  path: string;
};

/**
 * One continuous morning story, housed in a single unified panel (one card,
 * one border, one background) so the step rail and the product view read as
 * one designed surface instead of two independently-sized blocks. Every step
 * shares the same layout, aspect ratio and image treatment so nothing shifts
 * as you move through it.
 */
const steps: Step[] = [
  {
    id: "shelf",
    time: "07:45",
    short: "Shelf",
    title: "“Do we actually have it?”",
    body: "Instead of checking three cupboards or asking the group chat, the team sees the live quantity and exactly where the item belongs.",
    outcome: "The first patient arrives. Nobody is searching.",
    imageSrc: SCREENS.stockPage,
    alt: "Dental Assist inventory with live quantities and selected product detail",
    path: "stock",
  },
  {
    id: "shortage",
    time: "08:10",
    short: "Shortage",
    title: "The gloves will not last the week.",
    body: "Dental Assist brings the shortage forward while there is still time to act, with existing RFQs and orders visible beside it.",
    outcome: "The practice replenishes early — not chairside.",
    imageSrc: SCREENS.lowStockPage,
    alt: "Dental Assist low-stock cards ready for RFQ action",
    path: "low stock",
  },
  {
    id: "expiry",
    time: "08:35",
    short: "Expiry",
    title: "A box is quietly losing its value.",
    body: "Expired and near-expiry materials surface by date, so the team can rotate, use or replace them before they become waste.",
    outcome: "Less write-off. No last-minute discovery.",
    imageSrc: SCREENS.expiring,
    alt: "Dental Assist expiry tracking with products ready for rotation",
    path: "expiring stock",
  },
  {
    id: "suppliers",
    time: "09:10",
    short: "Suppliers",
    title: "“Who supplied this last time?”",
    body: "The supplier, contact, account reference and linked purchasing history are already together — without another inbox search.",
    outcome: "The right person gets the right request first time.",
    imageSrc: SCREENS.suppliers,
    alt: "Dental Assist supplier directory with account detail and linked activity",
    path: "suppliers",
  },
  {
    id: "rfq",
    time: "09:40",
    short: "Quotes",
    title: "Two suppliers replied. One decision remains.",
    body: "Prices sit side by side by product, with the saving and budget impact visible before the practice commits.",
    outcome: "£50 saved here. The monthly budget stays clear.",
    imageSrc: SCREENS.rfqCompare,
    alt: "Dental Assist RFQ comparison with selected prices and savings",
    path: "rfq",
  },
  {
    id: "orders",
    time: "10:15",
    short: "Orders",
    title: "Did somebody already place the order?",
    body: "Every purchase order, supplier and follow-up status stays visible in the same place — before anyone orders twice.",
    outcome: "One shared answer for the whole team.",
    imageSrc: SCREENS.purchasing,
    alt: "Dental Assist purchase orders with suppliers and status",
    path: "purchase orders",
  },
  {
    id: "reporting",
    time: "11:10",
    short: "Control",
    title: "And what has the practice spent this month?",
    body: "Order value, usage and quote savings are ready for the owner without rebuilding a spreadsheet at month-end.",
    outcome: "The morning ends with control — not another admin job.",
    imageSrc: SCREENS.reporting,
    alt: "Dental Assist reporting with spend, usage and savings over six months",
    path: "savings & usage",
  },
];

export function DayInPractice() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const listId = useId();
  const step = steps[active] ?? steps[0];

  const go = (next: number) => setActive((next + steps.length) % steps.length);

  return (
    <section
      id="day-in-practice"
      aria-labelledby="journey-heading"
      className="scroll-mt-24 border-b border-border/40 bg-[#F1F5F9]"
    >
      <div className={cn(layout.shell, "py-14 lg:py-16")}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={layout.eyebrow}>Follow a real morning</p>
          <h2
            id="journey-heading"
            className="mt-3 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px]"
          >
            From an unverified handover to a practice under control.
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-[1.65] text-muted-foreground">
            The evening restock is assumed, not checked. By late morning, the team knows exactly
            what is on the shelf, what needs attention and what has already been done about it.
          </p>
        </div>

        {/* One unified panel — the step rail and the product view share a single
            border, background and height so nothing looks orphaned or misaligned. */}
        <div
          className={cn(
            "mt-10 overflow-hidden lg:mt-12",
            radius.card,
            "border border-border/65 bg-card",
            elev.card,
          )}
        >
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-border/55 lg:col-span-4 lg:border-b-0 lg:border-r lg:border-border/60">
              <p id={listId} className="sr-only">
                Day-in-practice steps
              </p>
              <ol
                className="flex divide-x divide-border/50 overflow-x-auto lg:flex-col lg:divide-x-0 lg:divide-y"
                role="tablist"
                aria-labelledby={listId}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    go(active + 1);
                  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    go(active - 1);
                  } else if (e.key === "Home") {
                    e.preventDefault();
                    setActive(0);
                  } else if (e.key === "End") {
                    e.preventDefault();
                    setActive(steps.length - 1);
                  }
                }}
              >
                {steps.map((s, i) => {
                  const selected = i === active;
                  return (
                    <li key={s.id} className="shrink-0 lg:w-full">
                      <button
                        type="button"
                        role="tab"
                        id={`journey-tab-${s.id}`}
                        aria-selected={selected}
                        aria-controls={`journey-panel-${s.id}`}
                        onClick={() => setActive(i)}
                        className={cn(
                          "relative flex w-full items-center gap-3 px-4 py-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                          selected ? "bg-[oklch(0.96_0.014_230)]" : "hover:bg-secondary/40",
                        )}
                      >
                        {selected ? (
                          <span
                            className="absolute inset-y-0 left-0 w-[3px] bg-[#0B1730] lg:top-1 lg:bottom-1 lg:h-auto lg:rounded-full"
                            aria-hidden
                          />
                        ) : null}
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums",
                            selected
                              ? "bg-[#0B1730] text-white"
                              : "bg-[oklch(0.94_0.02_260)] text-[oklch(0.4_0.08_260)]",
                          )}
                          aria-hidden
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block text-[13.5px] tracking-tight",
                              selected ? "font-semibold text-foreground" : "font-medium text-foreground/75",
                            )}
                          >
                            {s.short}
                          </span>
                          <span className="block text-[11px] tabular-nums text-muted-foreground">
                            {s.time}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="min-w-0 p-5 sm:p-7 lg:col-span-8">
              <div
                role="tabpanel"
                id={`journey-panel-${step.id}`}
                aria-labelledby={`journey-tab-${step.id}`}
              >
                <motion.div
                  key={step.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-foreground sm:text-[21px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[56ch] text-[14.5px] leading-[1.6] text-muted-foreground">
                    {step.body}
                  </p>
                  <p className="mt-3 max-w-[52ch] border-l-2 border-[oklch(0.6_0.11_210)] pl-3.5 text-[13.5px] font-medium leading-[1.5] text-foreground/82">
                    {step.outcome}
                  </p>

                  <div className="mt-5">
                    <ProductFrame label={`app.reacting.io / ${step.path}`}>
                      <MediaViewer
                        imageSrc={step.imageSrc}
                        alt={step.alt}
                        objectFit="contain"
                        aspectRatio="16 / 10"
                        priority={active === 0}
                      />
                    </ProductFrame>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-[12.5px] text-muted-foreground">
                      {active + 1} / {steps.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => go(active - 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white text-foreground transition hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Previous step"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(active + 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white text-foreground transition hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Next step"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[46ch] text-center text-[13.5px] leading-[1.6] text-muted-foreground">
          What used to be assumed at close is confirmed by the time the first patient sits down.
        </p>
      </div>
    </section>
  );
}
