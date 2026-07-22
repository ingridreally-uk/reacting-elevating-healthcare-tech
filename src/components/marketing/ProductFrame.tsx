import { cn } from "@/lib/utils";
import { elev, radius } from "./design";

/**
 * Editorial product panel — refined frame without heavy browser chrome.
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
  /** Hero gets deeper elevation; feature/gallery stay consistent */
  emphasis?: "default" | "hero";
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute -z-10 bg-[linear-gradient(145deg,oklch(0.94_0.015_165)_0%,oklch(0.97_0.008_200)_50%,transparent_100%)]",
          emphasis === "hero"
            ? "-inset-4 rounded-[1.75rem] opacity-90"
            : "-inset-2.5 rounded-[1.5rem] opacity-70",
        )}
      />
      <div
        className={cn(
          "overflow-hidden border border-border/60 bg-card",
          radius.panel,
          emphasis === "hero" ? elev.productHero : elev.product,
        )}
      >
        {label ? (
          <div className="flex items-center gap-1.5 border-b border-border/50 bg-[#F4F8F7] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]/75" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/75" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]/75" />
            <span className="ml-2 truncate text-[10px] tracking-wide text-muted-foreground">
              {label}
            </span>
          </div>
        ) : null}
        <div className="relative bg-[#F7FAF9]">{children}</div>
      </div>
    </div>
  );
}
