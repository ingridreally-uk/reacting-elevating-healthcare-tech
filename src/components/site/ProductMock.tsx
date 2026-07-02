import { ShieldCheck, RefreshCw, Clock } from "lucide-react";

/**
 * Real Dental Assist product screenshots.
 * PNGs in /public/product-screens/ have been pre-cropped to remove
 * browser chrome (tabs, URL bar, bookmarks) and the Windows taskbar,
 * so they are pure app UI at 1920x890.
 */

const APP_ASPECT = "1920 / 890";

const screenMap: Record<string, string> = {
  // Dashboard / overview — real Dashboard screen
  dashboard: "/product-screens/screen-10.png",
  overview: "/product-screens/screen-10.png",
  // Inventory / stock — Stock page with folders and items
  inventory: "/product-screens/screen-22.png",
  stock: "/product-screens/screen-22.png",
  "stock-folders": "/product-screens/screen-25.png",
  // Low stock
  "low-stock": "/product-screens/screen-21.png",
  // Expiring stock — Stock Audit with expiry date column
  expiring: "/product-screens/screen-29.png",
  // Purchasing — Purchase Orders list
  purchasing: "/product-screens/screen-05.png",
  orders: "/product-screens/screen-05.png",
  "order-detail": "/product-screens/screen-09.png",
  // Suppliers / vendors
  suppliers: "/product-screens/screen-17.png",
  vendors: "/product-screens/screen-17.png",
  // RFQs — comparison used for the feature card, list for generic
  rfq: "/product-screens/screen-19.png",
  "rfq-compare": "/product-screens/screen-19.png",
  "rfq-list": "/product-screens/screen-15.png",
  // Deliveries — receive order modal
  deliveries: "/product-screens/screen-12.png",
  // Reporting
  reporting: "/product-screens/screen-28.png",
  savings: "/product-screens/screen-03.png",
  // Audit / team workflow
  audit: "/product-screens/screen-27.png",
  team: "/product-screens/screen-15.png",
};

export function BrowserFrame({
  url = "app.dentalassist.com",
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_50px_100px_-40px_rgb(15_23_42/0.28),0_2px_4px_-2px_rgb(15_23_42/0.06)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-[#F6F8FB] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
        <div className="ml-3 hidden h-6 flex-1 items-center justify-center gap-1.5 rounded-md border border-border/70 bg-background px-2.5 text-[11px] text-muted-foreground sm:flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/70" />
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

/**
 * Displays a pre-cropped Dental Assist screenshot at its native app aspect
 * ratio. Images are already chrome-free, so no transform is needed.
 * `focus` optionally shifts object-position to zoom to a region of the image.
 */
export function AppScreenshot({
  src,
  alt,
  className = "",
  focus = "top",
}: {
  src: string;
  alt: string;
  className?: string;
  focus?: "top" | "center";
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-background ${className}`}
      style={{ aspectRatio: APP_ASPECT }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full select-none object-cover"
        style={{ objectPosition: focus === "center" ? "center" : "top" }}
        draggable={false}
      />
    </div>
  );
}

/**
 * Tighter, zoomed crop of a real screenshot for use inside small cards.
 * Uses a taller aspect ratio and scales the image toward the top-left so
 * the sidebar + header + first content row are legible instead of a
 * shrunken full-page capture.
 */
export function CardScreenshot({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-background ${className}`}
      style={{ aspectRatio: "16 / 10" }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="absolute left-0 top-0 h-auto w-full max-w-none origin-top-left select-none"
        style={{ transform: "scale(1.35)" }}
      />
    </div>
  );
}

function RealScreen({ variant = "dashboard" }: { variant?: string }) {
  const src = screenMap[variant] ?? screenMap.dashboard;
  return <AppScreenshot src={src} alt={`Dental Assist — ${variant}`} />;
}

export function DashboardMock() {
  return <RealScreen variant="dashboard" />;
}
export function InventoryMock() {
  return <RealScreen variant="inventory" />;
}
export function PurchasingMock() {
  return <RealScreen variant="purchasing" />;
}
export function SuppliersMock() {
  return <RealScreen variant="suppliers" />;
}
export function RFQMock() {
  return <RealScreen variant="rfq" />;
}
export function DeliveriesMock() {
  return <RealScreen variant="deliveries" />;
}
export function ReportingMock() {
  return <RealScreen variant="reporting" />;
}
export function OverviewMock() {
  return <DashboardMock />;
}

export function ProductMock({ variant }: { variant: string }) {
  return <RealScreen variant={variant} />;
}

/** Convenience: real screenshot wrapped in a browser frame. */
export function FramedScreen({
  variant,
  url,
  className = "",
}: {
  variant: string;
  url?: string;
  className?: string;
}) {
  const src = screenMap[variant] ?? screenMap.dashboard;
  return (
    <BrowserFrame url={url} className={className}>
      <AppScreenshot src={src} alt={`Dental Assist — ${variant}`} />
    </BrowserFrame>
  );
}

export function TrustBar() {
  const items = [
    { icon: ShieldCheck, title: "Built in Practice", body: "Based on real dental purchasing, inventory and RFQ workflows." },
    { icon: RefreshCw, title: "Live Product", body: "Every screenshot on this site is from the actual Dental Assist software." },
    { icon: Clock, title: "Daily Use", body: "Designed around repeatable, practical tasks used by practice teams." },
  ];
  return (
    <div className="grid gap-3 border-y border-border/70 py-6 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="flex gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <item.icon className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{item.title}</div>
            <p className="mt-1 text-[13px] leading-6 text-muted-foreground">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
