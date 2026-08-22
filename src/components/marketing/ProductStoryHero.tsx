import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Product hero story — four authentic Dental Assist screens in one stable frame.
 *
 * Each scene declares a complete content rectangle in source pixels (1920×1080).
 * That rectangle is clipped and contain-fitted into a small-gutter stage so the
 * product UI occupies the media frame. Images are never stretched.
 */
const SRC_W = 1920;
const SRC_H = 1080;

const SCENE_MS = 3600;
const FADE_MS = 700;

type Rect = { x: number; y: number; w: number; h: number };

type Scene = {
  id: string;
  src: string;
  alt: string;
  desktop: Rect;
  mobile: Rect;
  /** Presentation only. `weight` uses a tighter well so a wide plate sits larger. */
  well?: "default" | "weight";
};

export const PRODUCT_STORY_SCENES: Scene[] = [
  {
    id: "overview",
    src: "/product-story/01-dashboard.png",
    alt: "Dental Assist overview — inventory value, stock risk, needs action and actions required",
    // Inventory / Stock risk / Needs action + complete Actions required.
    // Ends in the gap before Low stock / About to expire. Budget stays out.
    desktop: { x: 939, y: 108, w: 949, h: 586 },
    mobile: { x: 939, y: 108, w: 949, h: 586 },
  },
  {
    id: "stock-risk",
    src: "/product-story/02-low-stock-detail.png",
    alt: "DEHP Gloves stock item — critically low, current stock 0, min level 1 and RFQ 700",
    // Inside the drawer. Name through Stock Status and complete RFQ #700.
    // #437 stays below this rectangle.
    desktop: { x: 704, y: 12, w: 1216, h: 778 },
    // Name + Critically Low + Current Stock 0 + Min Level 1 + complete #700.
    mobile: { x: 704, y: 12, w: 980, h: 770 },
  },
  {
    id: "decision",
    src: "/product-story/03-supplier-comparison.png",
    alt: "Supplier comparison — selected quotes, savings badges, order selection and order summary",
    // Table from the main panel edge. RFQ title stays above.
    // Order selection complete. Summary through Saved vs last purchase;
    // source itself clips Order total, so that row is excluded.
    desktop: { x: 291, y: 268, w: 1597, h: 768 },
    // Three comparison rows, both suppliers, savings. Ends in the gap before Order cards.
    mobile: { x: 291, y: 268, w: 1020, h: 468 },
    well: "weight",
  },
  {
    id: "receive",
    src: "/product-story/04-order-523.png",
    alt: "Receive order 523 — arriving quantities, closed stock locations and delivery confirmation",
    // Closed-dropdown modal. Thin dim only — white receive UI fills the frame.
    desktop: { x: 206, y: 148, w: 1506, h: 764 },
    // Heading, arriving-row badges, receiving fields, complete checkbox.
    mobile: { x: 210, y: 150, w: 1280, h: 780 },
    well: "weight",
  },
];

const WELL_DEFAULT =
  "@container absolute inset-x-3 top-3 bottom-5 overflow-hidden lg:inset-x-3.5 lg:top-3.5 lg:bottom-6";
const WELL_WEIGHT =
  "@container absolute inset-x-1.5 top-2 bottom-4 overflow-hidden lg:inset-x-2 lg:top-2.5 lg:bottom-5";

function plateVars(rect: Rect, prefix: "d" | "m"): Record<string, string> {
  return {
    [`--story-${prefix}-ar`]: `${rect.w} / ${rect.h}`,
    [`--story-${prefix}-fitw`]: `min(100%, calc(${rect.w / rect.h} * 100cqh))`,
    [`--story-${prefix}-iw`]: `${(SRC_W / rect.w) * 100}%`,
    [`--story-${prefix}-il`]: `${(-rect.x / rect.w) * 100}%`,
    [`--story-${prefix}-it`]: `${(-rect.y / rect.h) * 100}%`,
  };
}

export function ProductStoryHero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const animate = !reduceMotion;
  const sceneCount = PRODUCT_STORY_SCENES.length;

  useEffect(() => {
    if (!animate) {
      setActive(0);
      return;
    }

    let timer = 0;
    const tick = () => {
      setActive((current) => (current + 1) % sceneCount);
    };
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(tick, SCENE_MS);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [animate, sceneCount]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#F3F7F5] aspect-[4/3] lg:aspect-[16/10]"
      data-product-story
      data-story-index={active}
    >
      <p className="sr-only">
        Dental Assist operational story: overview, stock risk, supplier decision,
        then receive delivery into stock.
      </p>
      {PRODUCT_STORY_SCENES.map((scene, index) => {
        const visible = animate ? index === active : index === 0;
        return (
          <div
            key={scene.id}
            className={scene.well === "weight" ? WELL_WEIGHT : WELL_DEFAULT}
            style={{ zIndex: visible ? 2 : 1 }}
            aria-hidden={!visible}
          >
            <div
              className={cn(
                "absolute left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2",
                "h-auto max-h-full",
                "w-[var(--story-m-fitw)] [aspect-ratio:var(--story-m-ar)]",
                "lg:w-[var(--story-d-fitw)] lg:[aspect-ratio:var(--story-d-ar)]",
                animate && "motion-safe:transition-opacity motion-reduce:transition-none",
              )}
              style={{
                ...plateVars(scene.desktop, "d"),
                ...plateVars(scene.mobile, "m"),
                opacity: visible ? 1 : 0,
                transitionDuration: animate ? `${FADE_MS}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                src={scene.src}
                alt={visible ? scene.alt : ""}
                width={SRC_W}
                height={SRC_H}
                draggable={false}
                loading="eager"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                className={cn(
                  "pointer-events-none absolute max-w-none select-none",
                  "top-[var(--story-m-it)] left-[var(--story-m-il)] h-auto w-[var(--story-m-iw)]",
                  "lg:top-[var(--story-d-it)] lg:left-[var(--story-d-il)] lg:w-[var(--story-d-iw)]",
                )}
              />
            </div>
          </div>
        );
      })}
      {animate ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-2.5 z-[3] flex justify-center gap-1.5"
          aria-hidden
        >
          {PRODUCT_STORY_SCENES.map((scene, index) => (
            <span
              key={scene.id}
              className={cn(
                "h-1 w-1 rounded-full",
                index === active ? "bg-[#0B1730]/70" : "bg-[#0B1730]/20",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
