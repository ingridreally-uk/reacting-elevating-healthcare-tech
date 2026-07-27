import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Approved full Reacting lock-up (symbol + wordmark), transparent background. */
export const REACTING_LOGO_SRC =
  "/brand/reacting-logo-horizontal-transparent.webp";
export const REACTING_LOGO_FALLBACK =
  "/brand/reacting-logo-horizontal-transparent.png";

/**
 * Full Reacting logo lock-up. Width-driven so aspect ratio is preserved.
 * Desktop target ~150–170px; mobile ~125–145px.
 */
export function ReactingLogo({
  className,
  widthClassName = "w-[135px] md:w-[160px]",
}: {
  className?: string;
  /** Tailwind width classes controlling display size */
  widthClassName?: string;
}) {
  return (
    <img
      src={REACTING_LOGO_SRC}
      alt="Reacting"
      width={1163}
      height={397}
      draggable={false}
      decoding="async"
      className={cn("h-auto select-none", widthClassName, className)}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src.includes(".webp")) {
          img.src = REACTING_LOGO_FALLBACK;
        }
      }}
    />
  );
}

export function ReactingLogoLink({
  className,
  widthClassName,
}: {
  className?: string;
  widthClassName?: string;
}) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Reacting home"
    >
      <ReactingLogo widthClassName={widthClassName} />
    </Link>
  );
}

/** @deprecated Prefer ReactingLogo — kept for any mark-only call sites */
export { ReactingMark } from "./ReactingMark";
