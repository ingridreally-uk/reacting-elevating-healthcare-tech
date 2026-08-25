import { useState } from "react";
import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

/**
 * Source crop in natural image pixels (16:10 = stage aspect).
 * Scale is DERIVED: stageWidth / crop.w — never authored.
 */
type Crop = {
  x: number;
  y: number;
  w: number;
  h: number;
};

/**
 * Nurse — explicit scale/x/y close-up (not a 16:10 source crop).
 * Full stage overflow clips the frame; optional thin mint tip masks
 * hide neighbouring-row fragments only (not a letterbox band).
 */
type NurseFrame = {
  scale: number;
  x: number;
  y: number;
  /** Desktop tip-mask depth in CSS px (stage space). */
  maskTop?: number;
  maskBottom?: number;
};

type RoleProof = {
  id: string;
  label: string;
  line: string;
  src: string;
  alt: string;
  srcW: number;
  srcH: number;
  desktop: Crop | NurseFrame;
  mobile: Crop | NurseFrame;
};

function isNurseFrame(v: Crop | NurseFrame): v is NurseFrame {
  return "scale" in v && "x" in v && "y" in v && !("w" in v);
}

/** Locked — 560×350 at desktop (82% width, max 560, 16/10). */
const PROOF_STAGE =
  "relative mx-auto w-[82%] max-w-[560px] aspect-[16/10] overflow-hidden";

const STAGE_W = 560;
const STAGE_H = 350;
/** Mobile positions authored for typical 390-viewport stage width. */
const MOBILE_REF = 280;

const roles: RoleProof[] = [
  {
    id: "owner",
    label: "Owner",
    line: "See what the practice is spending, saving and using over time.",
    src: "/product-screens/role-owner-savings-usage.jpg",
    alt: "Dental Assist Savings & Usage — saved this month, order value, stock usage and trend",
    srcW: 1663,
    srcH: 871,
    desktop: { x: 0, y: 145, w: 1160, h: 725 },
    mobile: { x: 0, y: 145, w: 1000, h: 625 },
  },
  {
    id: "manager",
    label: "Practice Manager",
    line: "See which orders are waiting, what needs chasing and what's already moving.",
    src: "/product-screens/role-manager-purchase-orders.jpg",
    alt: "Dental Assist Purchase Orders — active order value, waiting orders, suppliers and status",
    srcW: 1920,
    srcH: 1080,
    // LOCKED — approved. Do not change.
    desktop: { x: 300, y: 205, w: 1400, h: 875 },
    mobile: { x: 400, y: 280, w: 1280, h: 800 },
  },
  {
    id: "nurse",
    label: "Nurse / Stock Lead",
    line: "See what is running low, what's already being handled and what still needs action.",
    src: "/product-screens/role-nurse-low-stock-cards.png",
    alt: "Dental Assist Low Stock cards — linked RFQs, linked orders, and items still needing action",
    srcW: 1920,
    srcH: 1080,
    // LOCKED — visually approved. Do not change source, scale, x/y, or masks.
    // Desktop: scale 0.80, x 670, y 568, maskTop 10, maskBottom 28
    // Mobile:  scale 0.40, x 630, y 552, maskTop 8, maskBottom 12
    desktop: { scale: 0.8, x: 670, y: 568, maskTop: 10, maskBottom: 28 },
    mobile: { scale: 0.4, x: 630, y: 552, maskTop: 8, maskBottom: 12 },
  },
];

/**
 * Owner / Manager — scale = stageWidth / crop.w
 */
function cropStyle(srcW: number, srcH: number, desktop: Crop, mobile: Crop) {
  const dScale = STAGE_W / desktop.w;

  return {
    "--pm-w": `${((srcW / mobile.w) * 100).toFixed(4)}cqi`,
    "--pm-h": `${((srcH / mobile.w) * 100).toFixed(4)}cqi`,
    "--pm-l": `${(((-mobile.x) / mobile.w) * 100).toFixed(4)}cqi`,
    "--pm-t": `${(((-mobile.y) / mobile.w) * 100).toFixed(4)}cqi`,
    "--pd-w": `${Math.round(srcW * dScale)}px`,
    "--pd-h": `${Math.round(srcH * dScale)}px`,
    "--pd-l": `${Math.round(-(desktop.x * dScale))}px`,
    "--pd-t": `${Math.round(-(desktop.y * dScale))}px`,
  } as Record<string, string>;
}

/**
 * Nurse — explicit scale/x/y; full stage overflow (same plate as Owner/Manager).
 * Tip masks (--nm-*) are thin mint overlays, not letterbox bands.
 */
function nurseStyle(srcW: number, srcH: number, desktop: NurseFrame, mobile: NurseFrame) {
  const mTop = mobile.maskTop ?? 0;
  const mBot = mobile.maskBottom ?? 0;
  return {
    "--pm-w": `${(((srcW * mobile.scale) / MOBILE_REF) * 100).toFixed(4)}cqi`,
    "--pm-h": `${(((srcH * mobile.scale) / MOBILE_REF) * 100).toFixed(4)}cqi`,
    "--pm-l": `${(((-mobile.x * mobile.scale) / MOBILE_REF) * 100).toFixed(4)}cqi`,
    "--pm-t": `${(((-mobile.y * mobile.scale) / MOBILE_REF) * 100).toFixed(4)}cqi`,
    "--pd-w": `${Math.round(srcW * desktop.scale)}px`,
    "--pd-h": `${Math.round(srcH * desktop.scale)}px`,
    "--pd-l": `${Math.round(-(desktop.x * desktop.scale))}px`,
    "--pd-t": `${Math.round(-(desktop.y * desktop.scale))}px`,
    "--nm-t": `${desktop.maskTop ?? 0}px`,
    "--nm-b": `${desktop.maskBottom ?? 0}px`,
    "--nm-tm": `${((mTop / MOBILE_REF) * 100).toFixed(4)}cqi`,
    "--nm-bm": `${((mBot / MOBILE_REF) * 100).toFixed(4)}cqi`,
  } as Record<string, string>;
}

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
            className="mx-auto mt-3.5 max-w-[36ch] text-center text-[15px] leading-[1.5] text-muted-foreground"
          >
            {role.line}
          </p>

          <div
            id="role-proof"
            role="tabpanel"
            aria-labelledby={`role-tab-${role.id}`}
            data-role-proof-stage
            className={cn(
              PROOF_STAGE,
              "mt-7 border border-border/50 bg-[#F3F7F5] lg:mt-8 @container [container-type:inline-size]",
              radius.panel,
              elev.card,
            )}
          >
            {roles.map((entry, index) => {
              const visible = index === active;
              const nurse = isNurseFrame(entry.desktop) && isNurseFrame(entry.mobile);
              const style = nurse
                ? nurseStyle(
                    entry.srcW,
                    entry.srcH,
                    entry.desktop as NurseFrame,
                    entry.mobile as NurseFrame,
                  )
                : cropStyle(
                    entry.srcW,
                    entry.srcH,
                    entry.desktop as Crop,
                    entry.mobile as Crop,
                  );

              return (
                <div
                  key={entry.id}
                  className="absolute inset-0 overflow-hidden"
                  hidden={!visible}
                  aria-hidden={!visible}
                  style={style}
                >
                  <img
                    src={entry.src}
                    alt={visible ? entry.alt : ""}
                    width={entry.srcW}
                    height={entry.srcH}
                    draggable={false}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    data-role-proof-img={entry.id}
                    className="pointer-events-none absolute max-w-none select-none w-[var(--pm-w)] h-[var(--pm-h)] left-[var(--pm-l)] top-[var(--pm-t)] lg:h-[var(--pd-h)] lg:w-[var(--pd-w)] lg:left-[var(--pd-l)] lg:top-[var(--pd-t)]"
                  />
                  {nurse ? (
                    <>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 z-[1] bg-[#F3F7F5] h-[var(--nm-tm)] lg:h-[var(--nm-t)]"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[#F3F7F5] h-[var(--nm-bm)] lg:h-[var(--nm-b)]"
                      />
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
