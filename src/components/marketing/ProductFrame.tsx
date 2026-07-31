import { cn } from "@/lib/utils";
import { elev, layout, radius } from "./design";

/**
 * Shared product frame.
 * - default: quiet browser chrome for supporting product views
 * - hero: deeper photographed shadow with chrome
 * - stage: minimal chrome for the hero object
 * - photograph: chrome-free, art-directed product detail
 */
export function ProductFrame({
  children,
  className,
  label,
  emphasis = "default",
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  emphasis?: "default" | "hero" | "stage" | "photograph";
  tone?: "light" | "dark";
}) {
  const isStage = emphasis === "stage";
  const isPhotograph = emphasis === "photograph";
  const isHero = emphasis === "hero" || isStage;
  const dark = tone === "dark";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "overflow-hidden",
          radius.panel,
          dark ? "border border-white/10 bg-[#0F1F3D]" : "bg-card",
          !dark &&
            (isHero
              ? cn("border border-black/[0.07]", elev.productHero)
              : isPhotograph
                ? "border border-black/[0.06] shadow-[0_18px_48px_-24px_rgba(11,43,40,0.24),0_2px_8px_-4px_rgba(11,43,40,0.08)]"
                : cn("border border-border/55", elev.product)),
          dark && elev.productHero,
        )}
      >
        {!isStage && !isPhotograph && label ? (
          <div
            className={cn(
              "flex items-center gap-1.5 px-3",
              layout.chromeH,
              dark
                ? "border-b border-white/10 bg-[#081226]"
                : "border-b border-border/40 bg-[#F1F5F9]",
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/70" />
            <span
              className={cn(
                "ml-2 truncate text-[10px] tracking-wide",
                dark ? "text-white/45" : "text-muted-foreground/80",
              )}
            >
              {label}
            </span>
          </div>
        ) : null}
        {isStage ? (
          <div
            className={cn(
              "flex items-center gap-1.5 px-4",
              layout.chromeH,
              dark
                ? "border-b border-white/10 bg-[#081226]"
                : "border-b border-black/[0.04] bg-[#F1F5F9]/90",
            )}
            aria-hidden
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/65" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/65" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/65" />
          </div>
        ) : null}
        <div className={cn("relative", dark ? "bg-[#0F1F3D]" : "bg-[#F1F5F9]")}>{children}</div>
      </div>
    </div>
  );
}
