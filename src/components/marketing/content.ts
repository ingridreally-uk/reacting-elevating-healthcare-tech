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
  reporting: "/product-screens/mkt-reporting.webp",
  rfqCompare: "/product-screens/mkt-rfq-workflow.webp",
  rfqCompareFull: "/product-screens/mkt-rfq-workflow-full.webp",
  heroDepth: "/product-screens/mkt-hero-depth.webp",
  heroActions: "/product-screens/mkt-hero-actions.webp",
  heroStockRisk: "/product-screens/mkt-hero-stock-risk.webp",
  tourDashboard: "/product-screens/mkt-tour-dashboard.webp",
  tourStock: "/product-screens/mkt-tour-stock.webp",
  tourLowStock: "/product-screens/mkt-tour-low-stock.webp",
  tourExpiring: "/product-screens/mkt-tour-expiring.webp",
  tourSuppliers: "/product-screens/mkt-tour-suppliers.webp",
  tourOrders: "/product-screens/mkt-tour-orders.webp",
  tourReporting: "/product-screens/mkt-tour-reporting.webp",
  tourRfq: "/product-screens/mkt-tour-rfq.webp",
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
  /** Wider card for Product Tour final row */
  wide?: boolean;
};
