import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Boxes,
  ClipboardList,
  Clock,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Dental Assist" },
      {
        name: "description",
        content:
          "Your daily operational view. See what needs attention across stock, purchasing and budget.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardPage,
});

/* ---------------- shared primitives ---------------- */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

function PriorityDot({ tone }: { tone: "high" | "medium" | "low" }) {
  const map = {
    high: "bg-rose-500 ring-rose-100",
    medium: "bg-amber-500 ring-amber-100",
    low: "bg-emerald-500 ring-emerald-100",
  };
  return (
    <span
      className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-4 ${map[tone]}`}
      aria-hidden
    />
  );
}

function PrimaryBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-slate-800 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 ${className}`}
    >
      {children}
    </button>
  );
}

function OutlineBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------------- sidebar / topbar (visual only) ---------------- */

function Sidebar() {
  const items = [
    { label: "Today", icon: Sparkles, active: true },
    { label: "Inventory", icon: Boxes },
    { label: "Purchasing", icon: ShoppingCart },
    { label: "RFQs", icon: ClipboardList },
    { label: "Suppliers", icon: Wallet },
    { label: "Reporting", icon: TrendingUp },
  ];
  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-slate-200/80 lg:bg-white">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-[11px] font-semibold text-white">
          R
        </div>
        <div className="text-[13px] font-semibold tracking-tight text-slate-900">
          Reacting
        </div>
        <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
          Dental
        </span>
      </div>
      <nav className="flex-1 px-3 py-2">
        <p className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>
        {items.map((it) => (
          <button
            key={it.label}
            className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
              it.active
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </button>
        ))}
      </nav>
      <div className="border-t border-slate-200/80 p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700">
            DM
          </div>
          <div className="min-w-0">
            <div className="truncate text-[12px] font-medium text-slate-900">
              Dr. Mitchell
            </div>
            <div className="truncate text-[11px] text-slate-500">
              Highfield Dental
            </div>
          </div>
          <Settings className="ml-auto h-4 w-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-slate-200/80 bg-white/85 px-6 backdrop-blur-md lg:px-10">
      <div>
        <h1 className="text-[15px] font-semibold tracking-tight text-slate-900">
          Today
        </h1>
        <p className="text-[11.5px] text-slate-500">
          Monday, 30 June · Highfield Dental
        </p>
      </div>
      <div className="relative ml-6 hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search inventory, suppliers, RFQs…"
          className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <OutlineBtn>
          <Bell className="h-3.5 w-3.5" /> Alerts
        </OutlineBtn>
        <PrimaryBtn>
          New Order <ArrowRight className="h-3.5 w-3.5" />
        </PrimaryBtn>
      </div>
    </header>
  );
}

/* ---------------- sections ---------------- */

const actions = [
  {
    tone: "high" as const,
    title: "Review stockouts",
    desc: "4 items are out of stock and being used in scheduled appointments this week.",
    cta: "Review stockouts",
  },
  {
    tone: "medium" as const,
    title: "Continue stock audit",
    desc: "62% complete · 38 items remaining in Operatory 2 and Sterilisation.",
    cta: "Resume audit",
  },
  {
    tone: "low" as const,
    title: "Review received RFQs",
    desc: "3 suppliers have responded to your composite restoratives request.",
    cta: "Compare quotes",
  },
];

function ActionsRequired() {
  return (
    <Card className="p-6 lg:p-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            Today
          </p>
          <h2 className="mt-1 text-[22px] font-semibold tracking-tight text-slate-900">
            Actions required
          </h2>
          <p className="mt-1 text-[13px] text-slate-500">
            Three items need your attention before end of day.
          </p>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 sm:inline">
          3 open
        </span>
      </div>
      <ul className="divide-y divide-slate-100">
        {actions.map((a) => (
          <li
            key={a.title}
            className="group flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-4"
          >
            <PriorityDot tone={a.tone} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-slate-900">
                {a.title}
              </p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">
                {a.desc}
              </p>
            </div>
            <div className="sm:pt-0.5">
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-slate-700 transition-all group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
                {a.cta} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

const kpis = [
  {
    label: "Savings this month",
    value: "£2,418",
    sub: "+12.4% vs last month",
    trend: "up" as const,
  },
  {
    label: "Spend this month",
    value: "£11,920",
    sub: "68% of budget",
    trend: "flat" as const,
  },
  {
    label: "Inventory value",
    value: "£38,540",
    sub: "1,284 SKUs tracked",
    trend: "up" as const,
  },
  {
    label: "Stock risk",
    value: "12",
    sub: "items below par",
    trend: "down" as const,
  },
  {
    label: "Purchasing queue",
    value: "7",
    sub: "orders awaiting approval",
    trend: "flat" as const,
  },
];

function KPIs() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {kpis.map((k) => (
        <Card key={k.label} className="p-4 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {k.label}
            </p>
            {k.trend === "up" && (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            )}
            {k.trend === "down" && (
              <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
            )}
          </div>
          <p className="mt-2 text-[26px] font-semibold tracking-tight text-slate-900 tabular-nums">
            {k.value}
          </p>
          <p className="mt-0.5 text-[11.5px] text-slate-500">{k.sub}</p>
        </Card>
      ))}
    </div>
  );
}

function Budget() {
  const budget = 17500;
  const spent = 11920;
  const remaining = budget - spent;
  const pct = Math.round((spent / budget) * 100);
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Budget
          </p>
          <h3 className="mt-1 text-[16px] font-semibold tracking-tight text-slate-900">
            June overview
          </h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
          On track
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-[11px] text-slate-500">Monthly budget</p>
          <p className="mt-1 text-[18px] font-semibold tabular-nums text-slate-900">
            £{budget.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">Spent</p>
          <p className="mt-1 text-[18px] font-semibold tabular-nums text-slate-900">
            £{spent.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">Remaining</p>
          <p className="mt-1 text-[18px] font-semibold tabular-nums text-emerald-700">
            £{remaining.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>{pct}% used</span>
          <span>{100 - pct}% remaining</span>
        </div>
      </div>

      <a
        href="#"
        className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-medium text-slate-900 hover:text-slate-700"
      >
        View Budget Insights <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </Card>
  );
}

const lowStock = [
  { product: "Composite — A2 shade", reason: "Below par level", qty: "2 left" },
  { product: "Nitrile gloves (M)", reason: "High weekly usage", qty: "1 box" },
  { product: "Lidocaine 2% cartridges", reason: "Below par level", qty: "6 left" },
  { product: "Endo files 25mm", reason: "Reorder point reached", qty: "3 left" },
  { product: "Disposable bibs", reason: "Below par level", qty: "12 left" },
];

const expiring = [
  { product: "Bonding agent — Bottle 02", expiry: "12 Jul 2026", status: "12 days" as const },
  { product: "Etch gel syringes", expiry: "21 Jul 2026", status: "21 days" as const },
  { product: "Topical anaesthetic gel", expiry: "04 Aug 2026", status: "35 days" as const },
  { product: "Impression material", expiry: "11 Aug 2026", status: "42 days" as const },
  { product: "Fluoride varnish", expiry: "29 Aug 2026", status: "60 days" as const },
];

function ListCard({
  title,
  eyebrow,
  icon: Icon,
  rows,
  columns,
}: {
  title: string;
  eyebrow: string;
  icon: React.ComponentType<{ className?: string }>;
  rows: Array<Record<string, string>>;
  columns: { key: string; label: string; className?: string }[];
}) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-700">
            <Icon className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
              {eyebrow}
            </p>
            <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">
              {title}
            </h3>
          </div>
        </div>
        <a
          href="#"
          className="text-[12px] font-medium text-slate-600 hover:text-slate-900"
        >
          View all
        </a>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <div className="grid grid-cols-[1.4fr_1fr_0.7fr_auto] gap-4 border-b border-slate-100 bg-slate-50/60 px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
          {columns.map((c) => (
            <div key={c.key} className={c.className}>
              {c.label}
            </div>
          ))}
          <div className="text-right">Action</div>
        </div>
        <ul className="divide-y divide-slate-100">
          {rows.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[1.4fr_1fr_0.7fr_auto] items-center gap-4 px-4 py-3 transition-colors hover:bg-slate-50/60"
            >
              {columns.map((c) => (
                <div
                  key={c.key}
                  className={`text-[13px] ${
                    c.key === columns[0].key
                      ? "font-medium text-slate-900"
                      : "text-slate-600"
                  } ${c.className ?? ""}`}
                >
                  {r[c.key]}
                </div>
              ))}
              <div className="text-right">
                <button className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white">
                  Review
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ---------------- page ---------------- */

function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50/60 font-sans text-slate-900">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-8 lg:px-10 lg:py-10">
          {/* Today */}
          <section className="mb-10">
            <ActionsRequired />
          </section>

          {/* KPIs */}
          <section className="mb-10">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-slate-500">
                Key metrics
              </h2>
              <span className="text-[12px] text-slate-400">
                Updated 2 min ago
              </span>
            </div>
            <KPIs />
          </section>

          {/* Budget + (room for future) */}
          <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ListCard
                title="Low stock"
                eyebrow="Inventory"
                icon={AlertCircle}
                rows={lowStock}
                columns={[
                  { key: "product", label: "Product" },
                  { key: "reason", label: "Reason" },
                  { key: "qty", label: "Quantity" },
                ]}
              />
            </div>
            <Budget />
          </section>

          {/* Expiring */}
          <section className="mb-10">
            <ListCard
              title="Expiring stock"
              eyebrow="Inventory"
              icon={Clock}
              rows={expiring}
              columns={[
                { key: "product", label: "Product" },
                { key: "expiry", label: "Expiry" },
                { key: "status", label: "Status" },
              ]}
            />
          </section>

          <div className="pt-2 text-center">
            <Link
              to="/"
              className="text-[12px] font-medium text-slate-500 hover:text-slate-900"
            >
              ← Back to website
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
