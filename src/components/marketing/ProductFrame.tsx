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
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute -z-10 rounded-[1.35rem]",
          emphasis === "hero"
            ? "-inset-3 bg-[radial-gradient(ellipse_at_50%_35%,oklch(0.92_0.025_165)_0%,transparent_68%)] opacity-80"
            : "-inset-2 bg-[linear-gradient(160deg,oklch(0.95_0.012_165)_0%,transparent_70%)] opacity-55",
        )}
      />
      <div
        className={cn(
          "overflow-hidden border border-border/50 bg-card",
          radius.panel,
          emphasis === "hero" ? elev.productHero : elev.product,
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
