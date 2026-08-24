import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { layout, radius } from "./design";

/**
 * Recognition of operational fragmentation — one composition, not a feature grid.
 * Scattered sources converge into a Dental Assist current-status result.
 */
export function PracticeProblems() {
  return (
    <section
      aria-labelledby="problems-heading"
      data-home-section="problems"
      className="border-b border-border/40 bg-background"
    >
      <div className={cn(layout.shell, "pb-12 pt-10 lg:pb-12 lg:pt-7")}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>Why practices struggle</div>
          <h2
            id="problems-heading"
            className="mt-3 text-[28px] font-semibold tracking-[-0.032em] text-foreground sm:text-[36px]"
          >
            The work of running the practice is scattered.
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-muted-foreground">
            The answers exist. The problem is finding the current one — across people, messages,
            spreadsheets and separate systems.
          </p>
        </div>

        <div
          data-diagram="scattered"
          className={cn(
            "relative mx-auto mt-8 max-w-[880px] overflow-hidden border border-border/55 bg-[#F3F7F5]",
            radius.panel,
          )}
        >
          <MobileDiagram />
          <DesktopDiagram />
        </div>
      </div>
    </section>
  );
}

function MobileDiagram() {
  return (
    <div className="relative p-3 lg:hidden">
      <MobileConnectors />
      <div className="relative z-[2] grid grid-cols-2 gap-2">
        <Fragment label="Stock">
          <Row left="Gloves" right="0" />
          <Row left="Wipes" right="2" />
          <Row left="Composite" right="1" />
        </Fragment>
        <Fragment label="Dental supplier" external>
          <Row left="Gloves" right="£7.99" />
          <p className="text-[11px] text-muted-foreground">Quote received</p>
        </Fragment>
        <Fragment label="Team message">
          <p className="text-[12px] leading-[1.4] text-foreground/70">
            “Have the gloves been ordered?”
          </p>
        </Fragment>
        <Fragment label="Delivery">
          <p className="text-[12px] text-foreground/70">Order #523</p>
          <p className="text-[11.5px] text-muted-foreground">Due today</p>
        </Fragment>
      </div>
      <div className="relative z-[3] mx-auto mt-2.5 max-w-[280px]">
        <ResultPanel />
      </div>
    </div>
  );
}

function DesktopDiagram() {
  return (
    <div className="relative hidden h-[268px] lg:block">
      <DesktopConnectors />

      <Fragment
        label="Stock"
        className="absolute left-[7%] top-[9%] z-[2] w-[22%]"
      >
        <Row left="Gloves" right="0" />
        <Row left="Wipes" right="2" />
        <Row left="Composite" right="1" />
      </Fragment>
      <Fragment
        label="Dental supplier"
        external
        className="absolute right-[7%] top-[9%] z-[2] w-[22%]"
      >
        <Row left="Gloves" right="£7.99" />
        <p className="text-[11px] text-muted-foreground">Quote received</p>
      </Fragment>
      <Fragment
        label="Team message"
        className="absolute bottom-[9%] left-[7%] z-[2] w-[22%]"
      >
        <p className="text-[12px] leading-[1.4] text-foreground/70">
          “Have the gloves been ordered?”
        </p>
      </Fragment>
      <Fragment
        label="Delivery"
        className="absolute bottom-[9%] right-[7%] z-[2] w-[22%]"
      >
        <p className="text-[12px] text-foreground/70">Order #523</p>
        <p className="text-[11.5px] text-muted-foreground">Due today</p>
      </Fragment>

      <div className="absolute left-1/2 top-1/2 z-[3] w-[32%] max-w-[268px] -translate-x-1/2 -translate-y-1/2">
        <ResultPanel />
      </div>
    </div>
  );
}

function ResultPanel() {
  return (
    <div
      className={cn(
        "overflow-hidden border border-[#0B1730]/28 bg-white shadow-[0_8px_24px_-12px_rgba(11,23,48,0.22),0_2px_6px_-2px_rgba(11,23,48,0.08)] ring-1 ring-[oklch(0.66_0.11_210/0.22)]",
        radius.control,
      )}
    >
      <div className="flex items-baseline justify-between gap-2 bg-[#0B1730] px-3 py-1.5">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[oklch(0.84_0.07_210)]">
          Dental Assist
        </p>
        <p className="text-[10.5px] font-medium text-white/80">Current status</p>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[13.5px] font-semibold tracking-tight text-foreground">Gloves</p>
        <p className="mt-0.5 text-[13px] font-medium tabular-nums text-[#0B1730]">0 in stock</p>
        <div className="mt-2 space-y-0.5 border-t border-[oklch(0.66_0.11_210/0.32)] pt-2">
          <p className="text-[11.5px] leading-snug">
            <span className="text-foreground/70">Ordered · </span>
            <span className="font-medium text-[#0B1730]">Arriving today</span>
          </p>
          <p className="text-[11.5px] leading-snug text-muted-foreground">Supplier quote £7.99</p>
        </div>
      </div>
    </div>
  );
}

function DesktopConnectors() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g fill="none" stroke="#0B1730" strokeWidth="0.5" strokeLinecap="round" opacity="0.34">
        <path d="M28.5 26 C 31.5 26, 33.8 34, 34.2 42" />
        <path d="M28.5 74 C 31.5 74, 33.8 66, 34.2 58" />
        <path d="M71.5 74 C 68.5 74, 66.2 66, 65.8 58" />
      </g>
      <g
        fill="none"
        stroke="#1FA7B8"
        strokeWidth="0.5"
        strokeDasharray="0.85 2.1"
        strokeLinecap="round"
        opacity="0.78"
      >
        <path d="M71.5 26 C 68.5 26, 66.2 34, 65.8 42" />
      </g>
    </svg>
  );
}

function MobileConnectors() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g fill="none" stroke="#0B1730" strokeWidth="0.6" strokeLinecap="round" opacity="0.32">
        <path d="M25 24 C 25 42, 40 62, 50 67" />
        <path d="M25 50 C 32 56, 42 64, 50 67" />
        <path d="M75 50 C 68 56, 58 64, 50 67" />
        <path d="M50 67 L 50 71" />
      </g>
      <g
        fill="none"
        stroke="#1FA7B8"
        strokeWidth="0.6"
        strokeDasharray="1 2.1"
        strokeLinecap="round"
        opacity="0.75"
      >
        <path d="M75 24 C 75 42, 60 62, 50 67" />
      </g>
    </svg>
  );
}

function Fragment({
  label,
  children,
  className,
  external = false,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <div
      className={cn(
        "border bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(11,23,48,0.03)]",
        external
          ? "border-dashed border-[#1FA7B8]/45"
          : "border-border/50",
        radius.control,
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-1.5 space-y-0.5">{children}</div>
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 text-[12px] leading-[1.35]">
      <span className="truncate text-foreground/70">{left}</span>
      <span className="shrink-0 tabular-nums text-foreground/60">{right}</span>
    </div>
  );
}
