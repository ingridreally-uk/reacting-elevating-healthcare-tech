import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { elev, iconStroke, radius } from "./design";

export function StatisticCard({
  label,
  icon: Icon,
}: {
  label: string;
  icon?: LucideIcon;
}) {
  return (
    <motion.div
      className={cn(
        "h-full border border-border/70 bg-card/90 px-4 py-3.5",
        radius.card,
        elev.card,
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {Icon ? (
        <Icon
          className="h-4 w-4 text-[oklch(0.42_0.08_175)]"
          strokeWidth={iconStroke}
        />
      ) : null}
      <p
        className={cn(
          "text-[13px] font-medium leading-[1.45] text-foreground",
          Icon && "mt-2",
        )}
      >
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
      className={cn(
        "group h-full border border-border/70 bg-card p-4 transition duration-200",
        radius.card,
        elev.card,
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center bg-[oklch(0.96_0.02_165)] text-[oklch(0.38_0.08_175)]",
          radius.control,
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={iconStroke} />
      </div>
      <h3 className="mt-3 text-[15.5px] font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-[1.6] text-muted-foreground">
        {body}
      </p>
    </motion.div>
  );
}
