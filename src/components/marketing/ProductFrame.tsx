import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

/**
 * Shared browser chrome — identical height, radius, border, shadow treatment.
 */
export function ProductFrame({
  children,
  className,
  label,
  emphasis = "default",
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  emphasis?: "default" | "hero";
}) {
  const isHero = emphasis === "hero";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "overflow-hidden bg-card",
          radius.panel,
          isHero
            ? cn("border border-black/[0.08]", elev.productHero)
            : cn("border border-border/55", elev.product),
        )}
      >
        {label ? (
          <div
            className={cn(
              "flex items-center gap-1.5 border-b border-border/40 bg-[#F6F9F8] px-3",
              layout.chromeH,
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/70" />
            <span className="ml-2 truncate text-[10px] tracking-wide text-muted-foreground/80">
              {label}
            </span>
          </div>
        ) : null}
        <div className="relative bg-[#F4F8F7]">{children}</div>
      </div>
    </div>
  );
}
