import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { elev, iconStroke, radius } from "./design";

export function StatisticCard({
  label,
  title,
  body,
  icon: Icon,
}: {
  label?: string;
  title?: string;
  body?: string;
  icon?: LucideIcon;
}) {
  const heading = title ?? label ?? "";
  return (
    <motion.div
      className={cn(
        "flex h-full flex-col border border-border/70 bg-card/90 px-4 py-3.5",
        radius.card,
        elev.card,
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {Icon ? (
        <Icon className="h-4 w-4 text-[oklch(0.4_0.08_260)]" strokeWidth={iconStroke} />
      ) : null}
      <p
        className={cn("text-[13.5px] font-semibold leading-snug text-foreground", Icon && "mt-2.5")}
      >
        {heading}
      </p>
      {body ? (
        <p className="mt-1.5 text-[12.5px] leading-[1.5] text-muted-foreground">{body}</p>
      ) : null}
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
        "group flex h-full flex-col border border-border/65 bg-card p-5 transition duration-200",
        radius.card,
        elev.card,
      "hover:-translate-y-0.5 hover:border-border hover:shadow-[0_4px_16px_-4px_rgba(11,23,48,0.12)]",
    )}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
      <div
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center bg-[oklch(0.94_0.02_260)] text-[oklch(0.4_0.08_260)]",
          radius.control,
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={iconStroke} />
      </div>
      <h3 className="mt-4 text-[15.5px] font-semibold leading-snug tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-muted-foreground">{body}</p>
    </motion.div>
  );
}

/** One designed benefit system — unified surface on sm+, separate cards on mobile. */
export function BenefitGrid({
  items,
}: {
  items: { title: string; body: string; icon: LucideIcon }[];
}) {
  return (
    <>
      <div className="grid gap-3 sm:hidden">
        {items.map((item) => (
          <BenefitCard key={item.title} title={item.title} body={item.body} icon={item.icon} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-border/65 bg-card shadow-[0_1px_2px_rgba(11,43,40,0.04),0_4px_12px_-4px_rgba(11,43,40,0.08)] sm:block">
        <div className="grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className={cn(
                "flex h-full flex-col p-5 sm:p-6",
                i % 2 === 1 && "sm:border-l sm:border-border/55",
                i >= 2 && "sm:border-t sm:border-border/55 lg:border-t-0",
                i > 0 && "lg:border-l lg:border-border/55",
              )}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <div
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center bg-[oklch(0.94_0.02_260)] text-[oklch(0.4_0.08_260)]",
                  radius.control,
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={iconStroke} />
              </div>
              <h3 className="mt-4 text-[15.5px] font-semibold leading-snug tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
