export const APP_SIGNUP = "https://app.reacting.io/signup";
export const APP_LOGIN = "https://app.reacting.io/login";

export const SCREENS = {
  dashboard: "/product-screens/mkt-dashboard.webp",
  stock: "/product-screens/screen-25.webp",
  stockPage: "/product-screens/mkt-stock.webp",
  lowStock: "/product-screens/screen-21.webp",
  lowStockPage: "/product-screens/mkt-low-stock.webp",
  expiring: "/product-screens/mkt-expiring.webp",
  purchasing: "/product-screens/mkt-purchase-orders.webp",
  suppliers: "/product-screens/mkt-suppliers.webp",
  rfq: "/product-screens/screen-15.png",
  rfqCompare: "/product-screens/mkt-rfq-workflow.webp",
  rfqCompareFull: "/product-screens/mkt-rfq-workflow-full.webp",
  deliveries: "/product-screens/screen-12.png",
  reporting: "/product-screens/mkt-reporting.webp",
  savings: "/product-screens/screen-28.webp",
  orderDetail: "/product-screens/screen-09.png",
} as const;

export type MediaFit = "cover" | "contain";

export type MediaItem = {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
  /** Optional larger image for lightbox */
  lightboxSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  alt: string;
  objectPosition?: string;
  aspectRatio?: string;
  objectFit?: MediaFit;
};
