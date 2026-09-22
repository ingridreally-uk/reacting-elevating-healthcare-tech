import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Product hero story — four current Dental Assist screens in one stable frame.
 *
 * Each scene image is already the prepared crop. Desktop shows that full crop.
 * The comparison scene uses a tighter mobile rectangle so the price rows stay readable.
 * Images are never stretched.
 */
const SCENE_MS = 3600;
const FADE_MS = 700;

type Rect = { x: number; y: number; w: number; h: number };

type Scene = {
  id: string;
  src: string;
  alt: string;
  srcW: number;
  srcH: number;
  desktop: Rect;
  mobile: Rect;
  /** Presentation only. `weight` uses a tighter well so a wide plate sits larger. */
  well?: "default" | "weight";
};

function full(w: number, h: number): Rect {
  return { x: 0, y: 0, w, h };
}

export const PRODUCT_STORY_SCENES: Scene[] = [
  {
    id: "overview",
    src: "/product-story/01-dashboard.png",
    alt: "Dental Assist dashboard — saved this month, spend, inventory value, stock attention, budget and spend trend",
    srcW: 1610,
    srcH: 548,
    desktop: full(1610, 548),
    mobile: full(1610, 548),
  },
  {
    id: "attention",
    src: "/product-story/02-attention.png",
    alt: "Dental Assist Attention — Expiring materials with Add to request",
    srcW: 1632,
    srcH: 900,
    desktop: full(1632, 900),
    mobile: full(1632, 900),
  },
  {
    id: "decision",
    src: "/product-story/03-purchasing-compare.png",
    alt: "Purchasing comparison — selected supplier quotes, money saved, order summary and budget impact",
    srcW: 1648,
    srcH: 1408,
    // Story frame is 16/10. This rectangle keeps the price rows, selected quotes,
    // money saved and order total inside that frame. Budget impact is shown in full
    // on the procurement comparison.
    desktop: { x: 0, y: 0, w: 1648, h: 860 },
    mobile: { x: 0, y: 0, w: 1648, h: 520 },
    well: "weight",
  },
  {
    id: "receive",
    src: "/product-story/04-receive-order.png",
    alt: "Receive order 543 — arriving quantity, follow-up quantity, stock location and expiry",
    srcW: 1490,
    srcH: 655,
    desktop: full(1490, 655),
    mobile: full(1490, 655),
    well: "weight",
  },
];

const WELL_DEFAULT =
  "@container absolute inset-x-3 top-3 bottom-5 overflow-hidden lg:inset-x-3.5 lg:top-3.5 lg:bottom-6";
const WELL_WEIGHT =
  "@container absolute inset-x-1.5 top-2 bottom-4 overflow-hidden lg:inset-x-2 lg:top-2.5 lg:bottom-5";

function plateVars(rect: Rect, prefix: "d" | "m", srcW: number, srcH: number): Record<string, string> {
  return {
    [`--story-${prefix}-ar`]: `${rect.w} / ${rect.h}`,
    [`--story-${prefix}-fitw`]: `min(100%, calc(${rect.w / rect.h} * 100cqh))`,
    [`--story-${prefix}-iw`]: `${(srcW / rect.w) * 100}%`,
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
                ...plateVars(scene.desktop, "d", scene.srcW, scene.srcH),
                ...plateVars(scene.mobile, "m", scene.srcW, scene.srcH),
                opacity: visible ? 1 : 0,
                transitionDuration: animate ? `${FADE_MS}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                src={scene.src}
                alt={visible ? scene.alt : ""}
                width={scene.srcW}
                height={scene.srcH}
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
