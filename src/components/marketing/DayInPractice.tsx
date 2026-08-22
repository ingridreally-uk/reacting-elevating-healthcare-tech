import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { layout } from "./design";

type Stage = {
  id: string;
  name: string;
  line: string;
};

/**
 * Compact operational loop — Stock → Risk → Decision → Order → Control.
 * A bridge between scattered work and role-level product proof.
 */
const stages: Stage[] = [
  { id: "stock", name: "Stock", line: "What do we have?" },
  { id: "risk", name: "Risk", line: "What needs attention?" },
  { id: "decision", name: "Decision", line: "What should we do?" },
  { id: "order", name: "Order", line: "What is underway?" },
  { id: "control", name: "Control", line: "What has been handled?" },
];

function StageNode({
  stage,
  index,
  compact,
}: {
  stage: Stage;
  index: number;
  compact?: boolean;
}) {
  return (
    <li className="relative flex min-w-0 flex-col items-center px-1 text-center sm:px-2">
      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-full bg-[#0B1730] font-semibold tabular-nums text-white",
          compact ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-[13px]",
        )}
        aria-hidden
      >
        {index + 1}
      </span>
      <h3
        className={cn(
          "mt-1.5 font-semibold tracking-tight text-foreground",
          compact ? "text-[13px]" : "text-[15px]",
        )}
      >
        {stage.name}
      </h3>
      <p
        className={cn(
          "mt-0.5 text-muted-foreground",
          compact ? "text-[11.5px] leading-[1.3]" : "text-[13px] leading-[1.35]",
        )}
      >
        {stage.line}
      </p>
    </li>
  );
}

function FlowRow({
  items,
  startIndex,
  className,
}: {
  items: Stage[];
  startIndex: number;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-[12%] right-[12%] top-[14px] h-px bg-[#0B1730]/20"
      />
      <ol
        className="grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((stage, i) => (
          <StageNode key={stage.id} stage={stage} index={startIndex + i} compact />
        ))}
      </ol>
    </div>
  );
}

export function DayInPractice() {
  return (
    <section
      id="day-in-practice"
      aria-labelledby="journey-heading"
      className="scroll-mt-24 border-b border-border/40 bg-[#F1F5F9]"
    >
      <div className={cn(layout.shell, "py-8 lg:py-9")}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={layout.eyebrow}>Connected operations</p>
          <h2
            id="journey-heading"
            className="mt-1.5 text-[26px] font-semibold tracking-[-0.032em] text-foreground sm:text-[34px]"
          >
            See what needs attention.
            <span className="block">Know what's already handled.</span>
          </h2>
        </div>

        <div className="mx-auto mt-6 max-w-[880px] sm:hidden" aria-hidden>
          <FlowRow items={stages.slice(0, 3)} startIndex={0} />
          <FlowRow items={stages.slice(3)} startIndex={3} className="mx-auto mt-4 max-w-[70%]" />
        </div>
        <ol className="sr-only sm:hidden">
          {stages.map((stage, i) => (
            <li key={stage.id}>
              {i + 1}. {stage.name}. {stage.line}
            </li>
          ))}
        </ol>

        <div className="relative mx-auto mt-7 hidden max-w-[880px] sm:block">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[8%] right-[8%] top-[18px] h-[2px] bg-[#0B1730]/18"
          />
          <ol className="grid grid-cols-5" aria-label="Stock, Risk, Decision, Order, Control">
            {stages.map((stage, i) => (
              <StageNode key={stage.id} stage={stage} index={i} />
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-5 max-w-[42ch] text-center text-[13.5px] leading-[1.55] text-muted-foreground lg:mt-6 lg:text-[15px]">
          One connected operational view — instead of checking separate lists, messages and
          spreadsheets.
        </p>
        <div className="mt-3 flex justify-center">
          <Link
            to="/product"
            className="inline-flex min-h-10 items-center gap-1.5 text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
          >
            See how Dental Assist works
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
