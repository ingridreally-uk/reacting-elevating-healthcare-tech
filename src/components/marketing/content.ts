export const APP_SIGNUP = "https://app.reacting.io/signup";
export const APP_LOGIN = "https://app.reacting.io/login";

/** Short, silent, looping capture of the real app for the hero. */
export const HERO_LOOP_VIDEO = "/product-screens/hero-product-loop.mp4";
export const HERO_LOOP_POSTER = "/product-screens/hero-product-loop-poster.jpg";

/** Longer narrated walkthrough, played on demand from a lightbox. */
export const PRODUCT_TOUR_VIDEO = "/product-screens/product-tour.mp4";
export const PRODUCT_TOUR_POSTER = "/product-screens/product-tour-poster.jpg";

/**
 * Homepage hero only — tight, identity-safe crops of the cleaned dashboard.
 * Edge-filled (no letterbox slate). Not used by Product / Features / DayInPractice.
 */
export const HERO_DASHBOARD = {
  desktop: "/product-screens/mkt-hero-dashboard.webp",
  mobile: "/product-screens/mkt-hero-dashboard-mobile.webp",
  /** Native prepared ratios — MediaViewer contain, no runtime scale. */
  desktopAspect: "1683 / 831",
  mobileAspect: "1010 / 582",
} as const;

/**
 * DayInPractice desktop media viewport — stable outer frame for all steps.
 * ~687×420 at 1440 desktop (aspect 229/140). Tight natural crops are fitted
 * with object-fit:contain; no shared baked 1400×840 canvas.
 */
export const DIP_DESKTOP_ASPECT = "229 / 140" as const;

/**
 * DayInPractice only — tight natural desktop crops + shared viewport aspect.
 * Desktop uses contain + no DIP runtime scale (Order included).
 * Product/Features keep SCREENS + SCREEN_FOCUS.
 */
export const DIP_SCREENS = {
  stock: {
    // PNG: dense Stock UI — avoid lossy WebP softening (composition locked).
    desktop: "/product-screens/mkt-dip-stock.png",
    // Mobile: detail-led crop from locked desktop (aspect ~1.30).
    mobile: "/product-screens/mkt-dip-stock-mobile.webp",
    desktopAspect: DIP_DESKTOP_ASPECT,
    mobileAspect: "1140 / 878",
    objectPosition: "center",
  },
  risk: {
    desktop: "/product-screens/mkt-dip-risk.webp",
    // Mobile: two complete cards + Details/RFQ (taller than landscape target for completeness).
    mobile: "/product-screens/mkt-dip-risk-mobile.webp",
    desktopAspect: DIP_DESKTOP_ASPECT,
    mobileAspect: "648 / 585",
    objectPosition: "center top",
  },
  decision: {
    // PNG: continuous sanitised RFQ crop — comparison through Budget Impact
    desktop: "/product-screens/mkt-dip-decision.png",
    // Mobile: two authentic regions from owner RFQ (comparison + budget consequence).
    mobile: "/product-screens/mkt-dip-decision-mobile.webp",
    desktopAspect: DIP_DESKTOP_ASPECT,
    mobileAspect: "1098 / 987",
    objectPosition: "center",
  },
  order: {
    // PNG: owner Purchase Orders — full L/R workspace; Create Order + Actions preserved
    desktop: "/product-screens/mkt-dip-order.png",
    // Mobile: identity + KPIs + Waiting rows + Status (Actions excluded for legibility).
    mobile: "/product-screens/mkt-dip-order-mobile.webp",
    desktopAspect: DIP_DESKTOP_ASPECT,
    mobileAspect: "1128 / 632",
    objectPosition: "center top",
  },
  control: {
    // PNG: owner Savings & Usage — authentic Mar→Aug (incl. July)
    desktop: "/product-screens/mkt-dip-control.png",
    // Mobile: Jun 2026 KPIs + trend with July visible.
    mobile: "/product-screens/mkt-dip-control-mobile.webp",
    desktopAspect: DIP_DESKTOP_ASPECT,
    mobileAspect: "1420 / 850",
    objectPosition: "center",
  },
} as const;

/** Feature-section screenshots (consistent prepared canvases). */
export const SCREENS = {
  dashboard: "/product-screens/mkt-dashboard.webp",
  stockPage: "/product-screens/mkt-stock.webp",
  lowStockPage: "/product-screens/mkt-low-stock.webp",
  expiring: "/product-screens/mkt-expiring.webp",
  purchasing: "/product-screens/mkt-purchase-orders.webp",
  deliveries: "/product-screens/mkt-deliveries.webp",
  suppliers: "/product-screens/mkt-suppliers.webp",
  reporting: "/product-screens/mkt-savings-usage.webp",
  rfqCompare: "/product-screens/mkt-rfq-workflow.webp",
} as const;

export type MediaFit = "cover" | "contain";

export type ScreenFocus = {
  objectFit: MediaFit;
  objectPosition: string;
  aspectRatio?: string;
  /**
   * Zoom into the prepared canvas to crop baked slate margins.
   * Same-aspect cover alone cannot remove that letterboxing.
   */
  scale?: number;
};

/**
 * Display focus for prepared mkt-* canvases.
 * Assets stay identity-safe; cover + origin + scale pull the operational
 * action into the frame instead of floating in empty slate.
 */
export const SCREEN_FOCUS = {
  dashboard: {
    objectFit: "cover",
    // Keep KPI row fully in frame — only crop baked bottom slate.
    objectPosition: "50% 20%",
    aspectRatio: "16 / 10",
    scale: 1.22,
  },
  stockPage: {
    objectFit: "cover",
    objectPosition: "60% 28%",
    aspectRatio: "16 / 10",
    scale: 1.24,
  },
  lowStockPage: {
    objectFit: "cover",
    objectPosition: "50% 14%",
    aspectRatio: "16 / 10",
    scale: 1.34,
  },
  expiring: {
    objectFit: "cover",
    objectPosition: "50% 16%",
    aspectRatio: "16 / 10",
    scale: 1.26,
  },
  suppliers: {
    objectFit: "cover",
    objectPosition: "30% 14%",
    aspectRatio: "16 / 10",
    scale: 1.26,
  },
  rfqCompare: {
    objectFit: "cover",
    objectPosition: "50% 40%",
    aspectRatio: "16 / 10",
    scale: 1.14,
  },
  purchasing: {
    objectFit: "cover",
    objectPosition: "38% 12%",
    aspectRatio: "16 / 10",
    scale: 1.12,
  },
  deliveries: {
    objectFit: "cover",
    objectPosition: "50% 18%",
    aspectRatio: "16 / 10",
    scale: 1.24,
  },
  reporting: {
    objectFit: "cover",
    objectPosition: "46% 12%",
    aspectRatio: "16 / 10",
    scale: 1.18,
  },
} as const satisfies Record<keyof typeof SCREENS, ScreenFocus>;

export type MediaItem = {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
  lightboxSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  alt: string;
  objectPosition?: string;
  aspectRatio?: string;
  objectFit?: MediaFit;
  /** Wider card — unused by the focused tour selector; retained for type compatibility */
  wide?: boolean;
};
