/**
 * Homepage design tokens — one intentional system.
 * Colours and typography remain brand-owned; this locks layout rhythm.
 */
export const elev = {
  card: "shadow-[0_1px_2px_rgba(11,43,40,0.04),0_4px_12px_-4px_rgba(11,43,40,0.08)]",
  cardHover: "shadow-[0_4px_16px_-4px_rgba(11,43,40,0.12)]",
  product: "shadow-[0_8px_24px_-12px_rgba(11,43,40,0.14),0_2px_6px_-2px_rgba(11,43,40,0.05)]",
  /** Hero product — restrained contact + ambient. */
  productHero:
    "shadow-[0_1px_2px_rgba(11,43,40,0.04),0_12px_28px_-10px_rgba(11,43,40,0.14),0_28px_48px_-20px_rgba(11,43,40,0.12)]",
  focus: "shadow-[0_6px_16px_-8px_rgba(11,43,40,0.12),0_2px_6px_-2px_rgba(11,43,40,0.06)]",
} as const;

export const radius = {
  card: "rounded-2xl",
  panel: "rounded-2xl",
  control: "rounded-lg",
  pill: "rounded-full",
} as const;

export const layout = {
  shell: "mx-auto max-w-[1200px] px-6 lg:px-10",
  sectionY: "py-12 lg:py-14",
  sectionYTight: "py-10 lg:py-12",
  featureGap: "gap-8 md:gap-10 lg:gap-12",
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.08_175)]",
  h2: "text-[26px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]",
  lead: "text-[14.5px] leading-[1.65] text-muted-foreground",
  chromeH: "h-8",
  /** Optical text column — shared across features for alignment */
  copyMax: "max-w-[38ch]",
  titleMax: "max-w-[18ch]",
} as const;

export const btn = {
  base: "inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-[14px] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  primary: "bg-primary font-semibold text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border/80 bg-white/80 font-medium text-foreground hover:bg-white",
  onDarkPrimary: "bg-white font-semibold text-[#0B2B28] hover:bg-white/90",
  onDarkSecondary: "border border-white/25 font-medium text-white hover:bg-white/10",
} as const;

export const iconStroke = 1.75;
