import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { layout } from "./design";

const steps = [
  {
    n: "01",
    title: "Start your free trial",
    body: "No credit card. Explore Dental Assist with your practice in mind.",
  },
  {
    n: "02",
    title: "Import your products",
    body: "Bring in existing stock lists so setup stays quick and practical.",
  },
  {
    n: "03",
    title: "Run day-to-day operations",
    body: "Get clearer visibility across materials, suppliers, purchasing and spend.",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-b border-border/60 bg-[#F7FBF9]"
    >
      <div className={cn(layout.shell, layout.sectionY)}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={layout.eyebrow}>How it works</div>
          <h2 id="how-it-works-heading" className={cn(layout.h2, "mt-2.5")}>
            Up and running in three simple steps.
          </h2>
        </div>

        <div className="relative mx-auto mt-14 hidden max-w-4xl lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16.666%] right-[16.666%] top-[19px] flex items-center"
          >
            <div className="h-px w-full bg-[oklch(0.78_0.04_165)]" />
          </div>
          <ol className="grid grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="relative z-[1] inline-flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.72_0.05_165)] bg-[#F7FBF9] text-[12px] font-semibold tabular-nums text-[oklch(0.38_0.08_175)] shadow-[0_0_0_10px_#F7FBF9]">
                  {s.n}
                </span>
                <h3 className="mt-6 min-h-[1.4rem] text-[15.5px] font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mx-auto mt-2.5 max-w-[26ch] text-[13.5px] leading-[1.65] text-muted-foreground">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <ol className="relative mt-10 space-y-0 lg:hidden">
          <div
            aria-hidden
            className="absolute bottom-5 left-[19px] top-5 w-px bg-[oklch(0.82_0.03_165)]"
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className={cn(
                "relative grid grid-cols-[40px_1fr] gap-4",
                i < steps.length - 1 && "pb-9",
              )}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <span className="relative z-[1] inline-flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.72_0.05_165)] bg-[#F7FBF9] text-[12px] font-semibold tabular-nums text-[oklch(0.38_0.08_175)]">
                {s.n}
              </span>
              <div className="pt-1.5">
                <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-[1.65] text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
