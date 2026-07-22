/**
 * Homepage marketing elevation + radius conventions.
 * Prefer these over ad-hoc shadow strings.
 */
export const elev = {
  card: "shadow-[var(--shadow-sm)]",
  cardHover: "shadow-[var(--shadow-md)]",
  product: "shadow-[var(--shadow-lg)]",
  productHero: "shadow-[var(--shadow-xl)]",
} as const;

export const radius = {
  card: "rounded-2xl",
  panel: "rounded-2xl",
  control: "rounded-lg",
  pill: "rounded-full",
} as const;

/** Primary / secondary CTA shared classes */
export const btn = {
  base: "inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-[14px] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  primary:
    "bg-primary font-semibold text-primary-foreground hover:bg-primary/90",
  secondary:
    "border border-border/80 bg-white/80 font-medium text-foreground hover:bg-white",
  onDarkPrimary: "bg-white font-semibold text-[#0B2B28] hover:bg-white/90",
  onDarkSecondary:
    "border border-white/25 font-medium text-white hover:bg-white/10",
} as const;

export const iconStroke = 1.75;
