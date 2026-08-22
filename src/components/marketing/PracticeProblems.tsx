import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

/**
 * Recognition of operational fragmentation — one composition, not a feature grid.
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
          className={cn(
            "relative mx-auto mt-8 max-w-[880px] overflow-hidden border border-border/55 bg-[#F3F7F5]",
            radius.panel,
          )}
        >
          <div className="relative mx-auto h-[256px] w-full max-w-[340px] sm:max-w-[520px] lg:h-[232px] lg:max-w-none">
            <Connectors />

            <Fragment
              label="Stock list"
              className="absolute left-[4%] top-[8%] z-[2] w-[47%] sm:left-[6%] sm:w-[38%] lg:left-[12%] lg:top-[7%] lg:w-[24%]"
            >
              <Row left="Gloves" right="0" />
              <Row left="Wipes" right="2" />
              <Row left="Composite" right="1" />
            </Fragment>
            <Fragment
              label="Supplier quote"
              className="absolute right-[4%] top-[8%] z-[2] w-[44%] sm:right-[6%] sm:w-[34%] lg:left-auto lg:right-[12%] lg:top-[7%] lg:w-[24%]"
            >
              <p className="text-[12px] text-foreground/80">Ingrid</p>
              <Row left="Gloves" right="£7.99" />
            </Fragment>
            <Fragment
              label="Message"
              className="absolute bottom-[46px] left-[5%] z-[2] w-[48%] sm:left-[8%] sm:w-[40%] lg:bottom-[40px] lg:left-[12%] lg:w-[24%]"
            >
              <p className="text-[12px] leading-[1.45] text-foreground/80">
                Have we ordered the gloves?
              </p>
            </Fragment>
            <Fragment
              label="Delivery note"
              className="absolute bottom-[46px] right-[5%] z-[2] w-[42%] sm:right-[7%] sm:w-[34%] lg:bottom-[40px] lg:left-auto lg:right-[12%] lg:w-[23%]"
            >
              <p className="text-[12px] text-foreground/80">Order 523</p>
              <p className="text-[11.5px] text-muted-foreground">Arriving today</p>
            </Fragment>

            <p
              className={cn(
                "absolute bottom-2.5 left-1/2 z-[3] -translate-x-1/2 whitespace-nowrap",
                "rounded-full border border-[oklch(0.66_0.11_210/0.38)] bg-white px-3.5 py-1.5",
                "text-[12px] font-semibold tracking-[-0.02em] text-[#0B1730] sm:px-4 sm:text-[12.5px]",
                elev.card,
              )}
            >
              One current operational view
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Connectors() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g
        fill="none"
        stroke="#0B1730"
        strokeWidth="0.45"
        strokeDasharray="1.6 2.8"
        strokeLinecap="round"
        opacity="0.28"
      >
        <path d="M28 26 C 34 38, 40 50, 45 64" />
        <path d="M72 26 C 66 38, 60 50, 55 64" />
        <path d="M28 64 C 34 70, 40 74, 45 78" />
        <path d="M72 66 C 66 72, 60 76, 55 78" />
      </g>
      <g
        fill="none"
        stroke="#1FA7B8"
        strokeWidth="0.4"
        strokeDasharray="0.9 2.4"
        strokeLinecap="round"
        opacity="0.55"
      >
        <path d="M46 78 C 48 82, 50 84, 50 86" />
        <path d="M54 78 C 52 82, 50 84, 50 86" />
      </g>
    </svg>
  );
}

function Fragment({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-border/60 bg-white px-3 py-2.5",
        radius.control,
        elev.card,
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[12px] leading-[1.4]">
      <span className="truncate text-foreground/80">{left}</span>
      <span className="shrink-0 tabular-nums text-foreground/70">{right}</span>
    </div>
  );
}
