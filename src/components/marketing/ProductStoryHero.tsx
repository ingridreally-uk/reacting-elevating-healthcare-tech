import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Product hero story. Four proofs, each cropped to the claim.
 * The frame hugs the image. Scenes do not share an aspect box.
 * Mobile uses a narrower crop where the desktop UI would become unreadably small.
 */
const SCENE_MS = 3600;

type Scene = {
  id: string;
  desktop: string;
  mobile: string;
  alt: string;
  width: number;
  height: number;
};

const SCENES: Scene[] = [
  {
    id: "overview",
    desktop: "/product-story/01-dashboard.png",
    mobile: "/product-story/art-dashboard-kpis.png",
    alt: "Dental Assist dashboard — saved this month £123.33, spend £490, inventory value, 111 stock attention, budget and spend trend",
    width: 1610,
    height: 548,
  },
  {
    id: "attention",
    desktop: "/product-story/proof-attention.png",
    mobile: "/product-story/art-attention-cards.png",
    alt: "Dental Assist Attention — Expiring materials with expiry dates and Add to request",
    width: 1320,
    height: 668,
  },
  {
    id: "decision",
    desktop: "/product-story/art-compare-rows.png",
    mobile: "/product-story/art-compare-prices.png",
    alt: "Purchasing comparison — Sof-Lex, Finishing Strip and Fuji Plus with Reacting Dental Supplies and Kent Express prices, selected quotes and savings",
    width: 1248,
    height: 384,
  },
  {
    id: "receive",
    desktop: "/product-story/04-receive-order.png",
    mobile: "/product-story/art-receive-focus.png",
    alt: "Receive order 543 — arriving quantity, follow-up quantity, stock location and expiry",
    width: 1490,
    height: 655,
  },
];

export function ProductStoryHero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const animate = !reduceMotion;

  useEffect(() => {
    if (!animate) {
      setActive(0);
      return;
    }

    let timer = 0;
    const tick = () => {
      setActive((current) => (current + 1) % SCENES.length);
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
  }, [animate]);

  return (
    <div className="relative w-full" data-product-story data-story-index={active}>
      <p className="sr-only">
        Dental Assist operational story: overview, stock risk, supplier decision,
        then receive delivery into stock.
      </p>
      <div className="grid">
      {SCENES.map((scene, index) => {
        const visible = animate ? index === active : index === 0;
        return (
          <div
            key={scene.id}
            data-story-scene={scene.id}
            data-story-visible={visible ? "true" : "false"}
            className={cn("col-start-1 row-start-1", visible ? "relative z-[2]" : "z-[1]")}
            style={visible ? undefined : { position: "absolute", inset: 0, pointerEvents: "none" }}
            aria-hidden={!visible}
          >
            <picture
              className="block w-full"
              style={{
                opacity: visible ? 1 : 0,
                visibility: visible ? "visible" : "hidden",
              }}
            >
              <source media="(max-width: 767px)" srcSet={scene.mobile} />
              <img
                src={scene.desktop}
                alt={visible ? scene.alt : ""}
                width={scene.width}
                height={scene.height}
                draggable={false}
                loading="eager"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                className="pointer-events-none block h-auto w-full select-none"
              />
            </picture>
          </div>
        );
      })}
      </div>
      {animate ? (
        <div
          className="pointer-events-none mt-3 flex justify-center gap-1.5"
          aria-hidden
        >
          {SCENES.map((scene, index) => (
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
