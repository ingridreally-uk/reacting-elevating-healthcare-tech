export const APP_SIGNUP = "https://app.reacting.io/signup";
export const APP_LOGIN = "https://app.reacting.io/login";

export const SCREENS = {
  dashboard: "/product-screens/screen-10.png",
  stock: "/product-screens/screen-25.webp",
  stockPage: "/product-screens/stock-page.webp",
  lowStock: "/product-screens/screen-21.webp",
  lowStockPage: "/product-screens/low-stock-page.webp",
  expiring: "/product-screens/expiring-stock.webp",
  purchasing: "/product-screens/screen-05.png",
  suppliers: "/product-screens/suppliers-page.webp",
  rfq: "/product-screens/screen-15.png",
  rfqCompare: "/product-screens/screen-19.png",
  deliveries: "/product-screens/screen-12.png",
  reporting: "/product-screens/reporting-page.webp",
  savings: "/product-screens/screen-28.webp",
  orderDetail: "/product-screens/screen-09.png",
} as const;

export type MediaItem = {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  alt: string;
};
