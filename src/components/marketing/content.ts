export const APP_SIGNUP = "https://app.reacting.io/signup";
export const APP_LOGIN = "https://app.reacting.io/login";

/** Feature-section screenshots (consistent prepared canvases). */
export const SCREENS = {
  dashboard: "/product-screens/mkt-dashboard.webp",
  stockPage: "/product-screens/mkt-stock.webp",
  lowStockPage: "/product-screens/mkt-low-stock.webp",
  expiring: "/product-screens/mkt-expiring.webp",
  purchasing: "/product-screens/mkt-purchase-orders.webp",
  suppliers: "/product-screens/mkt-suppliers.webp",
  reporting: "/product-screens/mkt-savings-usage.webp",
  rfqCompare: "/product-screens/mkt-rfq-workflow.webp",
  rfqCompareFull: "/product-screens/mkt-rfq-workflow-full.webp",
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
