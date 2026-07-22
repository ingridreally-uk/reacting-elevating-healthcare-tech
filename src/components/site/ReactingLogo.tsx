import { Link } from "@tanstack/react-router";
import { ReactingMark } from "./ReactingMark";
import { cn } from "@/lib/utils";

/**
 * Transparent wordmark for light and dark surfaces (no white plate).
 */
export function ReactingLogo({
  className,
  markSize = 28,
  wordClassName,
}: {
  className?: string;
  markSize?: number;
  wordClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <ReactingMark size={markSize} className="shrink-0" />
      <span
        className={cn(
          "text-[17px] font-semibold tracking-[-0.03em] text-foreground",
          wordClassName,
        )}
      >
        Reacting
      </span>
    </span>
  );
}

export function ReactingLogoLink({
  className,
  markSize = 28,
  wordClassName,
}: {
  className?: string;
  markSize?: number;
  wordClassName?: string;
}) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Reacting home"
    >
      <ReactingLogo markSize={markSize} wordClassName={wordClassName} />
    </Link>
  );
}
