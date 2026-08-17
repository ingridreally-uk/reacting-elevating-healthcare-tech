import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import { DIP_DESKTOP_ASPECT, DIP_SCREENS } from "./content";
import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

type DipMedia = (typeof DIP_SCREENS)[keyof typeof DIP_SCREENS];

type Step = {
  id: string;
  short: string;
  title: string;
  body: string;
  outcome: string;
  media: DipMedia;
  alt: string;
  path: string;
};

/**
 * Connected operational states — Stock → Risk → Decision → Order → Control.
 * Not a chronological morning. Same interactive component and authentic screens.
 */
const steps: Step[] = [
  {
    id: "stock",
    short: "Stock",
    title: "“Do we actually have it?”",
    body: "Instead of checking three cupboards or asking on WhatsApp, the team sees the live quantity and exactly where the item belongs.",
    outcome: "Quantity and location are visible without another search.",
    media: DIP_SCREENS.stock,
    alt: "Dental Assist inventory with live quantities and selected product detail",
    path: "stock",
  },
  {
    id: "risk",
    short: "Risk",
    title: "What needs attention before it becomes a problem.",
    body: "Low stock and expiry risk surface while there is still time to act — with existing supplier quotes and orders visible beside each item.",
    outcome: "The practice replenishes early — not chairside.",
    media: DIP_SCREENS.risk,
    alt: "Dental Assist low-stock cards showing items that need action, with linked supplier quotes",
    path: "low stock",
  },
  {
    id: "decision",
    short: "Decision",
    title: "Two suppliers replied. One decision remains.",
    body: "Prices sit side by side by product, with the saving and budget impact visible before the practice commits.",
    outcome: "Compare price, saving and budget impact before the practice commits.",
    media: DIP_SCREENS.decision,
    alt: "Dental Assist supplier-quote comparison with selected prices and savings",
    path: "rfq",
  },
  {
    id: "order",
    short: "Order",
    title: "Was it ordered? Is it still waiting?",
    body: "Every supplier order and follow-up status stays visible in the same place — before anyone orders twice.",
    outcome: "See what is waiting — and what still needs follow-up.",
    media: DIP_SCREENS.order,
    alt: "Dental Assist orders with suppliers and status",
    path: "purchase orders",
  },
  {
    id: "control",
    short: "Control",
    title: "What is the practice spending and using?",
    body: "Order value, stock usage and savings from supplier quotes stay visible — without rebuilding the picture at month-end.",
    outcome: "Spend, usage and savings stay visible as the practice works.",
    media: DIP_SCREENS.control,
    alt: "Dental Assist reporting with spend, usage and savings over six months",
    path: "savings & usage",
  },
];

export function DayInPractice() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const listId = useId();
  const step = steps[active] ?? steps[0];
  const railRef = useRef<HTMLOListElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const go = (next: number) => setActive((next + steps.length) % steps.length);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateFade = () => {
      setCanScrollRight(rail.scrollWidth - rail.clientWidth - rail.scrollLeft > 1);
    };

    updateFade();
    rail.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);
    return () => {
      rail.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const tab = rail.querySelector<HTMLElement>(`#journey-tab-${steps[active]?.id}`);
    if (!tab) return;
    tab.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }, [active, reduceMotion]);

  return (
    <section
      id="day-in-practice"
      aria-labelledby="journey-heading"
      className="scroll-mt-24 border-b border-border/40 bg-[#F1F5F9]"
    >
      <div className={cn(layout.shell, "py-6 lg:pb-6 lg:pt-8")}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={layout.eyebrow}>Connected operations</p>
          <h2
            id="journey-heading"
            className="mt-1.5 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px] lg:mt-2"
          >
            See what needs attention.
            <span className="block">Know what's already handled.</span>
          </h2>
          <p className="mx-auto mt-1.5 max-w-[48ch] text-[15px] leading-[1.65] text-muted-foreground lg:mt-2">
            Stock, risk, supplier decisions, orders and follow-up stay connected instead of becoming
            separate jobs.
          </p>
        </div>

        <div
          className={cn(
            "mt-4 overflow-hidden lg:mt-6",
            radius.card,
            "border border-border/65 bg-card",
            elev.card,
          )}
        >
          <div className="grid lg:grid-cols-12">
            <div className="relative min-w-0 border-b border-border/55 lg:col-span-4 lg:border-b-0 lg:border-r lg:border-border/60">
              <p id={listId} className="sr-only">
                Connected operational states
              </p>
              <ol
                ref={railRef}
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
                          "relative flex w-full items-center gap-3 px-4 py-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset lg:py-4",
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
                        <span
                          className={cn(
                            "block text-[13.5px] tracking-tight",
                            selected ? "font-semibold text-foreground" : "font-medium text-foreground/75",
                          )}
                        >
                          {s.short}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {canScrollRight ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-card to-transparent lg:hidden"
                />
              ) : null}
            </div>

            <div className="min-w-0 p-3.5 sm:p-6 lg:col-span-8 lg:p-7">
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
                  <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-foreground sm:text-[21px]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[56ch] text-[14.5px] leading-[1.55] text-muted-foreground lg:mt-2 lg:leading-[1.6]">
                    {step.body}
                  </p>
                  <p className="mt-2.5 max-w-[52ch] border-l-2 border-[oklch(0.6_0.11_210)] pl-3.5 text-[13.5px] font-medium leading-[1.45] text-foreground/82 lg:mt-3 lg:leading-[1.5]">
                    {step.outcome}
                  </p>

                  <div className="mt-3.5 lg:mt-5">
                    <ProductFrame label={`app.reacting.io / ${step.path}`}>
                      <div className="lg:hidden">
                        <MediaViewer
                          imageSrc={step.media.mobile}
                          alt={step.alt}
                          objectFit="contain"
                          aspectRatio={step.media.mobileAspect}
                          priority={active === 0}
                        />
                      </div>
                      <div className="hidden lg:block">
                        <MediaViewer
                          imageSrc={step.media.desktop}
                          alt={step.alt}
                          objectFit="contain"
                          objectPosition={step.media.objectPosition}
                          aspectRatio={DIP_DESKTOP_ASPECT}
                          className="bg-[#F0F7F4]"
                          priority={active === 0}
                        />
                      </div>
                    </ProductFrame>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 lg:mt-4">
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
      </div>
    </section>
  );
}
