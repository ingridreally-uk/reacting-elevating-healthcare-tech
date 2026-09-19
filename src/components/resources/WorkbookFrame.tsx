import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function WorkbookFrame({
  label,
  caption,
  children,
  className,
  compact = false,
}: {
  label: string;
  caption?: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/55 bg-white",
          compact
            ? "shadow-[0_1px_2px_rgba(11,23,48,0.04),0_8px_20px_-16px_rgba(11,23,48,0.10)]"
            : "shadow-[0_1px_2px_rgba(11,23,48,0.04),0_12px_32px_-16px_rgba(11,23,48,0.12)]",
        )}
      >
        <div
          className={cn(
            "border-b border-border/45 bg-[#F8FAFC]",
            compact ? "px-3 py-2" : "px-4 py-2.5",
          )}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">
            {label}
          </p>
        </div>
        <div className="bg-white">{children}</div>
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "mt-2.5 text-muted-foreground",
            compact ? "text-[12.5px] leading-[1.5]" : "text-[13px] leading-[1.55]",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function WorkbookImage({
  src,
  mobileSrc,
  alt,
}: {
  src: string;
  mobileSrc?: string;
  alt: string;
}) {
  const imgClass = "h-auto w-full bg-white";

  if (mobileSrc) {
    return (
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
        <img src={src} alt={alt} className={imgClass} />
      </picture>
    );
  }

  return <img src={src} alt={alt} className={imgClass} />;
}
