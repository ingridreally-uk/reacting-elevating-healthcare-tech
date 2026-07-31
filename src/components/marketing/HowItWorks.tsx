import { cn } from "@/lib/utils";
import { layout } from "./design";

const steps = [
  {
    label: "Trial",
    title: "Start a 14-day trial",
    body: "Open the workspace with your own practice in mind. No credit card required.",
  },
  {
    label: "Your catalogue",
    title: "Bring in what you already buy",
    body: "Import your existing product list with guided support — no blank catalogue.",
  },
  {
    label: "Every morning",
    title: "Run tomorrow morning from one place",
    body: "Stock risk, suppliers, quotes and orders stay connected through the day.",
  },
];

/** Dark beat between journey and pricing — breaks identical section rhythm. */
export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-b border-border/50 bg-[#0B1730] text-white"
    >
      <div className={cn(layout.shell, "py-14 lg:py-16")}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.8_0.08_210)]">
            Getting started
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-[30px] font-semibold tracking-[-0.035em] text-white sm:text-[40px]"
          >
            Ready before the next busy morning.
          </h2>
          <p className="mx-auto mt-3 max-w-[42ch] text-[15.5px] leading-[1.65] text-white/65">
            No long sales process. Trial first, import your catalogue, then run the practice day in
            one workspace.
          </p>
        </div>

        <div className="relative mx-auto mt-10 hidden max-w-4xl lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16.666%] right-[16.666%] top-[19px] flex items-center"
          >
            <div className="h-px w-full bg-white/15" />
          </div>
          <ol className="grid grid-cols-3 gap-8">
            {steps.map((s) => (
              <li key={s.label} className="relative flex flex-col items-center text-center">
                <span className="relative z-[1] inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-[#0B1730] px-4 text-[11px] font-semibold uppercase tracking-[0.13em] text-[oklch(0.84_0.07_210)] shadow-[0_0_0_10px_#0B1730]">
                  {s.label}
                </span>
                <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[26ch] text-[13.5px] leading-[1.65] text-white/60">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <ol className="relative mt-8 space-y-0 lg:hidden">
          <div aria-hidden className="absolute bottom-5 left-11 top-5 w-px bg-white/15" />
          {steps.map((s, i) => (
            <li
              key={s.label}
              className={cn(
                "relative grid grid-cols-[5.5rem_1fr] gap-4",
                i < steps.length - 1 && "pb-7",
              )}
            >
              <span className="relative z-[1] inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-[#0B1730] px-3 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[oklch(0.84_0.07_210)]">
                {s.label}
              </span>
              <div className="pt-1.5">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-[1.65] text-white/60">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
