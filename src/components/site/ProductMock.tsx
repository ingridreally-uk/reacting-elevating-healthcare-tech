import { ShieldCheck, RefreshCw, Clock } from "lucide-react";

const screenMap: Record<string, string> = {
  dashboard: "/product-screens/screen-01.png",
  inventory: "/product-screens/screen-25.png",
  purchasing: "/product-screens/screen-15.png",
  suppliers: "/product-screens/screen-21.png",
  rfq: "/product-screens/screen-17.png",
  deliveries: "/product-screens/screen-12.png",
  reporting: "/product-screens/screen-03.png",
  overview: "/product-screens/screen-01.png",
  stock: "/product-screens/screen-25.png",
  orders: "/product-screens/screen-15.png",
  audit: "/product-screens/screen-28.png",
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
    <div className={`overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_50px_100px_-40px_rgb(15_23_42/0.28),0_2px_4px_-2px_rgb(15_23_42/0.06)] ${className}`}>
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

export function ProductScreenshot({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`block w-full object-cover object-top ${className}`}
    />
  );
}

function RealScreen({ variant = "dashboard" }: { variant?: string }) {
  const src = screenMap[variant] || screenMap.dashboard;
  return (
    <ProductScreenshot
      src={src}
      alt={`Real Dental Assist ${variant} screen`}
      className="aspect-[16/10]"
    />
  );
}

export function DashboardMock() { return <RealScreen variant="dashboard" />; }
export function InventoryMock() { return <RealScreen variant="inventory" />; }
export function PurchasingMock() { return <RealScreen variant="purchasing" />; }
export function SuppliersMock() { return <RealScreen variant="suppliers" />; }
export function RFQMock() { return <RealScreen variant="rfq" />; }
export function DeliveriesMock() { return <RealScreen variant="deliveries" />; }
export function ReportingMock() { return <RealScreen variant="reporting" />; }
export function OverviewMock() { return <DashboardMock />; }

export function ProductMock({ variant }: { variant: string }) {
  return <RealScreen variant={variant} />;
}

export function TrustBar() {
  const items = [
    { icon: ShieldCheck, title: "Built in Practice", body: "Based on real dental purchasing, inventory and RFQ workflows." },
    { icon: RefreshCw, title: "Live Product", body: "Website imagery now uses actual Dental Assist screens, not invented mockups." },
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
