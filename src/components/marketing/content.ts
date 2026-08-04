export const APP_SIGNUP = "https://app.reacting.io/signup";
export const APP_LOGIN = "https://app.reacting.io/login";

/** Short, silent, looping capture of the real app for the hero. */
export const HERO_LOOP_VIDEO = "/product-screens/hero-product-loop.mp4";
export const HERO_LOOP_POSTER = "/product-screens/hero-product-loop-poster.jpg";

/** Longer narrated walkthrough, played on demand from a lightbox. */
export const PRODUCT_TOUR_VIDEO = "/product-screens/product-tour.mp4";
export const PRODUCT_TOUR_POSTER = "/product-screens/product-tour-poster.jpg";

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
