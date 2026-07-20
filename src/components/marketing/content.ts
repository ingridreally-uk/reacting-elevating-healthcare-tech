export const APP_SIGNUP = "https://app.reacting.io/signup";
export const APP_LOGIN = "https://app.reacting.io/login";

export const SCREENS = {
  dashboard: "/product-screens/screen-10.png",
  stock: "/product-screens/screen-25.png",
  lowStock: "/product-screens/screen-21.png",
  expiring: "/product-screens/expiring-stock.webp",
  purchasing: "/product-screens/screen-05.png",
  suppliers: "/product-screens/screen-13.png",
  rfq: "/product-screens/screen-15.png",
  rfqCompare: "/product-screens/screen-19.png",
  deliveries: "/product-screens/screen-12.png",
  reporting: "/product-screens/screen-03.png",
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
