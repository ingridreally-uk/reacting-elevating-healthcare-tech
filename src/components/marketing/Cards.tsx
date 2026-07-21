import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatisticCard({
  label,
  icon: Icon,
}: {
  label: string;
  icon?: LucideIcon;
}) {
  return (
    <motion.div
      className="h-full rounded-2xl border border-border/70 bg-card/80 px-5 py-5 shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {Icon ? (
        <Icon className="h-4 w-4 text-[oklch(0.42_0.08_175)]" strokeWidth={1.75} />
      ) : null}
      <p className={cn("text-[14.5px] font-medium leading-[1.45] text-foreground", Icon && "mt-3")}>
        {label}
      </p>
    </motion.div>
  );
}

export function BenefitCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <motion.div
      className="group h-full rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(15_23_42/0.18)]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.96_0.02_165)] text-[oklch(0.38_0.08_175)]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.65] text-muted-foreground">
        {body}
      </p>
    </motion.div>
  );
}
