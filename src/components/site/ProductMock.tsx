import {
  Package,
  ShoppingCart,
  Users,
  FileText,
  Truck,
  BarChart3,
  LayoutDashboard,
  Search,
  Bell,
  Plus,
  Check,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Filter,
} from "lucide-react";

/**
 * BrowserFrame — realistic macOS-style chrome for product mockups.
 * Keep chrome consistent across every screenshot on the marketing site.
 */
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
      className={`overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_1px_2px_0_oklch(0.17_0.05_265/0.04),0_28px_70px_-28px_oklch(0.17_0.05_265/0.22),0_10px_20px_-10px_oklch(0.17_0.05_265/0.08)] ${className}`}
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

/* ------------------------------------------------------------ */
/* Shared app shell used inside every mock                       */
/* ------------------------------------------------------------ */

function AppShell({
  active,
  title,
  subtitle,
  children,
}: {
  active: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const nav = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "inventory", label: "Inventory", icon: Package },
    { key: "purchasing", label: "Purchasing", icon: ShoppingCart },
    { key: "suppliers", label: "Suppliers", icon: Users },
    { key: "rfq", label: "RFQs", icon: FileText },
    { key: "deliveries", label: "Deliveries", icon: Truck },
    { key: "reporting", label: "Reporting", icon: BarChart3 },
  ];
  return (
    <div className="grid grid-cols-[168px_1fr] bg-[#FAFBFC]">
      {/* Sidebar */}
      <aside className="border-r border-border/70 bg-[oklch(0.17_0.05_265)] p-3 text-[11.5px]">
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[oklch(0.66_0.11_210)]" />
          <span className="text-[12px] font-semibold tracking-tight text-white">
            Dental Assist
          </span>
        </div>
        <div className="mt-4 space-y-0.5">
          {nav.map((n) => {
            const isActive = n.key === active;
            return (
              <div
                key={n.key}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60"
                }`}
              >
                <n.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>{n.label}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 border-t border-white/10 pt-3">
          <div className="flex items-center gap-2 px-2 py-1.5 text-white/60">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[oklch(0.66_0.11_210)] text-[9px] font-semibold text-white">
              SR
            </span>
            <div className="min-w-0">
              <div className="truncate text-[10.5px] text-white">Sarah R.</div>
              <div className="truncate text-[9.5px] text-white/50">
                Practice Manager
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0">
        {/* Topbar */}
        <div className="flex items-center justify-between border-b border-border/70 bg-background px-5 py-3">
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold tracking-tight text-foreground">
              {title}
            </div>
            {subtitle && (
              <div className="truncate text-[10.5px] text-muted-foreground">
                {subtitle}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden h-7 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[10.5px] text-muted-foreground sm:flex">
              <Search className="h-3 w-3" strokeWidth={1.75} />
              Search
            </div>
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground">
              <Bell className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Individual mocks                                              */
/* ------------------------------------------------------------ */

const chip = (tone: "aqua" | "amber" | "slate" | "green") => {
  const map = {
    aqua: "bg-[oklch(0.66_0.11_210)]/10 text-[oklch(0.42_0.09_210)] border-[oklch(0.66_0.11_210)]/25",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    slate: "bg-slate-50 text-slate-600 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return `inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9.5px] font-medium ${map[tone]}`;
};

export function DashboardMock() {
  return (
    <AppShell
      active="dashboard"
      title="Good morning, Sarah"
      subtitle="Thursday · 7 things to look at"
    >
      <div className="grid grid-cols-4 gap-3">
        {[
          { l: "Low stock", v: "12", d: "items", trend: "+3", tone: "amber" as const },
          { l: "Open POs", v: "8", d: "awaiting delivery", trend: "-1", tone: "aqua" as const },
          { l: "Pending approvals", v: "3", d: "requests", trend: "", tone: "slate" as const },
          { l: "Spend this month", v: "£4,182", d: "vs £4,910 last", trend: "-15%", tone: "green" as const },
        ].map((k) => (
          <div key={k.l} className="rounded-lg border border-border/70 bg-background p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {k.l}
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <div className="text-[19px] font-semibold tracking-tight text-foreground">
                {k.v}
              </div>
              {k.trend && (
                <span className={`text-[10px] font-medium ${
                  k.trend.startsWith("-15") ? "text-emerald-600" :
                  k.trend.startsWith("-") ? "text-emerald-600" : "text-amber-600"
                }`}>
                  {k.trend}
                </span>
              )}
            </div>
            <div className="mt-0.5 text-[10.5px] text-muted-foreground">{k.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-5 gap-3">
        <div className="col-span-3 rounded-lg border border-border/70 bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-semibold text-foreground">
              Spend, last 30 days
            </div>
            <div className="text-[10.5px] text-muted-foreground">Category</div>
          </div>
          <svg viewBox="0 0 320 110" className="mt-3 h-[110px] w-full">
            <defs>
              <linearGradient id="fadeArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="oklch(0.66 0.11 210)" stopOpacity="0.25" />
                <stop offset="1" stopColor="oklch(0.66 0.11 210)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 40, 60, 80].map((y) => (
              <line
                key={y}
                x1="0"
                x2="320"
                y1={y}
                y2={y}
                stroke="oklch(0.929 0.013 255)"
                strokeDasharray="2 3"
              />
            ))}
            <path
              d="M0,80 L30,72 L60,74 L90,58 L120,64 L150,46 L180,50 L210,34 L240,40 L270,26 L300,32 L320,20 L320,110 L0,110 Z"
              fill="url(#fadeArea)"
            />
            <path
              d="M0,80 L30,72 L60,74 L90,58 L120,64 L150,46 L180,50 L210,34 L240,40 L270,26 L300,32 L320,20"
              fill="none"
              stroke="oklch(0.36 0.09 260)"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="col-span-2 rounded-lg border border-border/70 bg-background p-4">
          <div className="text-[12px] font-semibold text-foreground">Today</div>
          <div className="mt-3 space-y-2.5">
            {[
              { l: "3 POs awaiting approval", tone: "amber" as const, icon: AlertTriangle },
              { l: "Henry Schein delivery 2pm", tone: "aqua" as const, icon: Truck },
              { l: "RFQ #241 responses ready", tone: "green" as const, icon: Check },
            ].map((t) => (
              <div
                key={t.l}
                className="flex items-start gap-2 border-b border-border/60 pb-2.5 last:border-none last:pb-0"
              >
                <span className={chip(t.tone)}>
                  <t.icon className="h-2.5 w-2.5" strokeWidth={2} />
                </span>
                <div className="text-[11px] text-foreground">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export function InventoryMock() {
  const rows = [
    { name: "Composite A2 syringe", cat: "Restorative", loc: "Surgery 1", stock: 4, par: 12, tone: "amber" as const },
    { name: "Nitrile gloves, medium", cat: "PPE", loc: "Store room", stock: 28, par: 40, tone: "aqua" as const },
    { name: "Endo files 25/.04", cat: "Endodontic", loc: "Surgery 2", stock: 2, par: 8, tone: "amber" as const },
    { name: "Impression tray, upper", cat: "Prosthetic", loc: "Store room", stock: 18, par: 20, tone: "green" as const },
    { name: "Local anaesthetic 2%", cat: "Anaesthesia", loc: "Locked cab.", stock: 34, par: 30, tone: "green" as const },
  ];
  return (
    <AppShell active="inventory" title="Inventory" subtitle="418 items · 5 locations">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {["All items", "Low stock", "Expiring", "Locked"].map((t, i) => (
            <div
              key={t}
              className={`rounded-md border px-2 py-1 text-[10.5px] ${
                i === 0
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex h-7 items-center gap-1 rounded-md border border-border bg-background px-2 text-[10.5px] text-muted-foreground">
            <Filter className="h-3 w-3" strokeWidth={1.75} /> Filter
          </div>
          <div className="flex h-7 items-center gap-1 rounded-md bg-foreground px-2 text-[10.5px] font-medium text-background">
            <Plus className="h-3 w-3" strokeWidth={2} /> Add item
          </div>
        </div>
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-border/70 bg-background">
        <div className="grid grid-cols-[1.8fr_1fr_1fr_0.9fr_0.9fr] gap-2 border-b border-border/70 bg-[#FAFBFC] px-3 py-2 text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Item</div>
          <div>Category</div>
          <div>Location</div>
          <div>Stock</div>
          <div>Status</div>
        </div>
        {rows.map((r) => {
          const pct = Math.min(100, Math.round((r.stock / r.par) * 100));
          return (
            <div
              key={r.name}
              className="grid grid-cols-[1.8fr_1fr_1fr_0.9fr_0.9fr] items-center gap-2 border-b border-border/60 px-3 py-2.5 last:border-none"
            >
              <div className="text-[11.5px] font-medium text-foreground">{r.name}</div>
              <div className="text-[10.5px] text-muted-foreground">{r.cat}</div>
              <div className="text-[10.5px] text-muted-foreground">{r.loc}</div>
              <div>
                <div className="text-[10.5px] text-foreground">
                  {r.stock} / {r.par}
                </div>
                <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-border/60">
                  <div
                    className={`h-full rounded-full ${
                      r.tone === "amber"
                        ? "bg-amber-500"
                        : r.tone === "green"
                        ? "bg-emerald-500"
                        : "bg-[oklch(0.66_0.11_210)]"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div>
                <span className={chip(r.tone)}>
                  {r.tone === "amber" ? "Low" : r.tone === "green" ? "OK" : "Reorder"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}

export function PurchasingMock() {
  const rows = [
    { id: "PO-2418", sup: "Henry Schein", tot: "£412.80", stat: "Awaiting approval", tone: "amber" as const },
    { id: "PO-2417", sup: "DD Group", tot: "£184.20", stat: "Sent", tone: "aqua" as const },
    { id: "PO-2416", sup: "Wright Cottrell", tot: "£1,204.00", stat: "Delivered", tone: "green" as const },
    { id: "PO-2415", sup: "Kent Express", tot: "£78.40", stat: "Delivered", tone: "green" as const },
  ];
  return (
    <AppShell active="purchasing" title="Purchase orders" subtitle="Q2 · 46 orders raised">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10.5px]">
          <span className="text-muted-foreground">Open</span>
          <span className="font-semibold text-foreground">8</span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">Awaiting</span>
          <span className="font-semibold text-foreground">3</span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">Delivered this month</span>
          <span className="font-semibold text-foreground">17</span>
        </div>
        <div className="flex h-7 items-center gap-1 rounded-md bg-foreground px-2 text-[10.5px] font-medium text-background">
          <Plus className="h-3 w-3" strokeWidth={2} /> New PO
        </div>
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-border/70 bg-background">
        <div className="grid grid-cols-[0.9fr_1.4fr_0.9fr_1.3fr] gap-2 border-b border-border/70 bg-[#FAFBFC] px-3 py-2 text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Order</div>
          <div>Supplier</div>
          <div>Total</div>
          <div>Status</div>
        </div>
        {rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[0.9fr_1.4fr_0.9fr_1.3fr] items-center gap-2 border-b border-border/60 px-3 py-2.5 last:border-none"
          >
            <div className="text-[11px] font-medium text-foreground">{r.id}</div>
            <div className="text-[11px] text-foreground">{r.sup}</div>
            <div className="text-[11px] tabular-nums text-foreground">{r.tot}</div>
            <div>
              <span className={chip(r.tone)}>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    r.tone === "amber"
                      ? "bg-amber-500"
                      : r.tone === "green"
                      ? "bg-emerald-500"
                      : "bg-[oklch(0.66_0.11_210)]"
                  }`}
                />
                {r.stat}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

export function SuppliersMock() {
  const list = [
    { n: "Henry Schein", acc: "HS-40217", cat: "General & PPE", spend: "£12,480", trend: "+2%" },
    { n: "DD Group", acc: "DD-1108", cat: "Restorative", spend: "£8,914", trend: "-4%" },
    { n: "Wright Cottrell", acc: "WC-778", cat: "Equipment", spend: "£4,120", trend: "+11%" },
    { n: "Kent Express", acc: "KX-2201", cat: "Consumables", spend: "£2,380", trend: "-1%" },
  ];
  return (
    <AppShell active="suppliers" title="Suppliers" subtitle="24 active · YTD spend £42,614">
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((s) => (
          <div
            key={s.n}
            className="rounded-lg border border-border/70 bg-background p-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] font-semibold text-foreground">{s.n}</div>
                <div className="mt-0.5 text-[10.5px] text-muted-foreground">
                  Account {s.acc}
                </div>
              </div>
              <span className={chip("slate")}>{s.cat}</span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  YTD spend
                </div>
                <div className="text-[15px] font-semibold tabular-nums text-foreground">
                  {s.spend}
                </div>
              </div>
              <span
                className={`text-[10.5px] font-medium ${
                  s.trend.startsWith("-") ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {s.trend} vs last yr
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

export function RFQMock() {
  const items = [
    { item: "Composite A2", hs: "£8.40", dd: "£7.90", wc: "£8.10" },
    { item: "Endo files 25/.04", hs: "£12.20", dd: "£11.80", wc: "£11.40" },
    { item: "Nitrile gloves M (x100)", hs: "£6.10", dd: "£5.90", wc: "£6.30" },
    { item: "Impression tray (upper)", hs: "£1.20", dd: "£1.10", wc: "£1.15" },
  ];
  const best = ["dd", "wc", "dd", "dd"] as const;
  return (
    <AppShell
      active="rfq"
      title="RFQ #241 — Restorative & PPE"
      subtitle="3 suppliers responded · Saves £48.20 vs default supplier"
    >
      <div className="overflow-hidden rounded-lg border border-border/70 bg-background">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.8fr] gap-2 border-b border-border/70 bg-[#FAFBFC] px-3 py-2 text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Item</div>
          <div>Henry Schein</div>
          <div>DD Group</div>
          <div>Wright Cottrell</div>
          <div>Best</div>
        </div>
        {items.map((r, i) => {
          const b = best[i];
          const cell = (key: "hs" | "dd" | "wc", val: string) => (
            <div
              className={`text-[11px] tabular-nums ${
                b === key
                  ? "font-semibold text-[oklch(0.36_0.09_260)]"
                  : "text-foreground"
              }`}
            >
              {val}
              {b === key && (
                <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.66_0.11_210)] align-middle" />
              )}
            </div>
          );
          return (
            <div
              key={r.item}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.8fr] items-center gap-2 border-b border-border/60 px-3 py-2.5 last:border-none"
            >
              <div className="text-[11px] font-medium text-foreground">{r.item}</div>
              {cell("hs", r.hs)}
              {cell("dd", r.dd)}
              {cell("wc", r.wc)}
              <div>
                <span className={chip("green")}>
                  {(b as string) === "hs" ? "HS" : (b as string) === "dd" ? "DD" : "WC"}
                </span>
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-between border-t border-border/70 bg-[#FAFBFC] px-3 py-2.5">
          <div className="text-[10.5px] text-muted-foreground">
            Selected: 4 items · <span className="font-medium text-foreground">£112.80</span>
          </div>
          <div className="flex h-7 items-center gap-1 rounded-md bg-foreground px-2 text-[10.5px] font-medium text-background">
            Convert to PO
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export function DeliveriesMock() {
  const rows = [
    { id: "DL-118", sup: "Henry Schein", exp: "Today, 2pm", stat: "In transit", tone: "aqua" as const },
    { id: "DL-117", sup: "DD Group", exp: "Yesterday", stat: "Received · 12/12", tone: "green" as const },
    { id: "DL-116", sup: "Wright Cottrell", exp: "Mon 24", stat: "Short · 3 items", tone: "amber" as const },
    { id: "DL-115", sup: "Kent Express", exp: "Mon 24", stat: "Received · 6/6", tone: "green" as const },
  ];
  return (
    <AppShell active="deliveries" title="Deliveries" subtitle="Goods-in — this week">
      <div className="overflow-hidden rounded-lg border border-border/70 bg-background">
        <div className="grid grid-cols-[0.9fr_1.4fr_1fr_1.3fr_0.8fr] gap-2 border-b border-border/70 bg-[#FAFBFC] px-3 py-2 text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Ref</div>
          <div>Supplier</div>
          <div>Expected</div>
          <div>Status</div>
          <div />
        </div>
        {rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[0.9fr_1.4fr_1fr_1.3fr_0.8fr] items-center gap-2 border-b border-border/60 px-3 py-2.5 last:border-none"
          >
            <div className="text-[11px] font-medium text-foreground">{r.id}</div>
            <div className="text-[11px] text-foreground">{r.sup}</div>
            <div className="text-[10.5px] text-muted-foreground">{r.exp}</div>
            <div>
              <span className={chip(r.tone)}>
                <Truck className="h-2.5 w-2.5" strokeWidth={2} />
                {r.stat}
              </span>
            </div>
            <div className="text-right text-[10.5px] font-medium text-[oklch(0.36_0.09_260)]">
              Receive →
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

export function ReportingMock() {
  const bars = [
    { l: "PPE", v: 82 },
    { l: "Restorative", v: 64 },
    { l: "Endodontic", v: 48 },
    { l: "Anaesthesia", v: 40 },
    { l: "Prosthetic", v: 32 },
    { l: "Cleaning", v: 22 },
    { l: "Admin", v: 14 },
  ];
  return (
    <AppShell
      active="reporting"
      title="Spend by category"
      subtitle="Last 90 days · £14,218 total"
    >
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Total spend", v: "£14,218", d: "vs £15,704 prev.", trend: "-9.5%" },
          { l: "Avg. order value", v: "£184", d: "77 orders", trend: "+3%" },
          { l: "Savings via RFQ", v: "£612", d: "18 comparisons", trend: "+22%" },
        ].map((k) => (
          <div key={k.l} className="rounded-lg border border-border/70 bg-background p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {k.l}
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <div className="text-[18px] font-semibold tabular-nums tracking-tight text-foreground">
                {k.v}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  k.trend.startsWith("-") || k.trend.startsWith("+22") || k.trend.startsWith("+3")
                    ? "text-emerald-600"
                    : "text-amber-600"
                }`}
              >
                {k.trend}
              </span>
            </div>
            <div className="text-[10.5px] text-muted-foreground">{k.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-border/70 bg-background p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[12px] font-semibold text-foreground">
            Spend by category
          </div>
          <div className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
            <TrendingUp className="h-3 w-3" strokeWidth={1.75} /> Trending down
          </div>
        </div>
        <div className="space-y-2">
          {bars.map((b) => (
            <div key={b.l} className="grid grid-cols-[80px_1fr_44px] items-center gap-3">
              <div className="text-[10.5px] text-muted-foreground">{b.l}</div>
              <div className="h-2 overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[oklch(0.36_0.09_260)] to-[oklch(0.66_0.11_210)]"
                  style={{ width: `${b.v}%` }}
                />
              </div>
              <div className="text-right text-[10.5px] tabular-nums text-foreground">
                £{(b.v * 34).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function OverviewMock() {
  return <DashboardMock />;
}

/**
 * Dispatcher used by features page — pass a key, get the matching mock.
 */
export function ProductMock({ variant }: { variant: string }) {
  switch (variant) {
    case "inventory":
      return <InventoryMock />;
    case "purchasing":
      return <PurchasingMock />;
    case "suppliers":
      return <SuppliersMock />;
    case "rfq":
      return <RFQMock />;
    case "deliveries":
      return <DeliveriesMock />;
    case "reporting":
      return <ReportingMock />;
    case "dashboard":
    default:
      return <DashboardMock />;
  }
}

/**
 * Small stat chip used inside trust bars.
 */
export function TrustBar() {
  const items = [
    { k: "Built in a real UK dental practice", v: "Since 2023" },
    { k: "Used every operational day", v: "5-day working week" },
    { k: "Hosted in UK data centres", v: "ISO-aligned" },
    { k: "Small, senior product team", v: "Direct access" },
  ];
  return (
    <section className="border-y border-border/70 bg-[oklch(0.988_0.002_247)]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10 lg:py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
          {items.map((i) => (
            <div key={i.k} className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.66_0.11_210)]/12">
                  <Check
                    className="h-3 w-3 text-[oklch(0.36_0.09_260)]"
                    strokeWidth={2.5}
                  />
                </span>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[oklch(0.36_0.09_260)]">
                  {i.v}
                </div>
              </div>
              <div className="mt-2 text-[13.5px] leading-[1.5] text-foreground">
                {i.k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Legacy convenience export (used to be arrow-only) */
export { ArrowUpRight };
