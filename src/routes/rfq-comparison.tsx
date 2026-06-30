import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Package,
  Search,
  Sparkles,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/rfq-comparison")({
  head: () => ({
    meta: [
      { title: "Compare Supplier Quotes — Dental Assist" },
      {
        name: "description",
        content:
          "Compare supplier RFQ responses side-by-side and confidently choose the best option for each product before raising a purchase order.",
      },
    ],
  }),
  component: RfqComparisonPage,
});

/* ---------------- data (static, visual only) ---------------- */

type Availability = "in_stock" | "low" | "backorder";

type SupplierMeta = {
  id: string;
  name: string;
  initials: string;
  tint: string;
  delivery: string;
  minOrder: string;
  rating: number;
  quoteDate: string;
};

type Quote = {
  supplierId: string;
  unitPrice: number;
  availability: Availability;
  note?: string;
};

type Product = {
  id: string;
  name: string;
  pack: string;
  qty: number;
  category: string;
  quotes: Quote[];
  notes: string;
  alternatives: string[];
  comments: { supplierId: string; text: string }[];
};

const suppliers: SupplierMeta[] = [
  {
    id: "henry",
    name: "Henry Schein",
    initials: "HS",
    tint: "bg-slate-900 text-white",
    delivery: "2 business days",
    minOrder: "£150",
    rating: 4.7,
    quoteDate: "28 Jun 2026",
  },
  {
    id: "dental-sky",
    name: "Dental Sky",
    initials: "DS",
    tint: "bg-teal-700 text-white",
    delivery: "1 business day",
    minOrder: "£100",
    rating: 4.6,
    quoteDate: "29 Jun 2026",
  },
  {
    id: "wright",
    name: "Wright Health",
    initials: "WH",
    tint: "bg-slate-700 text-white",
    delivery: "3 business days",
    minOrder: "£200",
    rating: 4.4,
    quoteDate: "27 Jun 2026",
  },
  {
    id: "kent",
    name: "Kent Express",
    initials: "KE",
    tint: "bg-amber-700 text-white",
    delivery: "2–4 business days",
    minOrder: "£120",
    rating: 4.3,
    quoteDate: "28 Jun 2026",
  },
];

const products: Product[] = [
  {
    id: "p1",
    name: "Composite — A2 shade, 4g syringe",
    pack: "Box of 20",
    qty: 4,
    category: "Restorative",
    quotes: [
      { supplierId: "henry", unitPrice: 84.5, availability: "in_stock" },
      { supplierId: "dental-sky", unitPrice: 78.9, availability: "in_stock", note: "Free shipping over £100" },
      { supplierId: "wright", unitPrice: 89.0, availability: "low" },
      { supplierId: "kent", unitPrice: 92.4, availability: "in_stock" },
    ],
    notes: "Confirm batch expiry > 18 months on receipt.",
    alternatives: ["3M Filtek Z250 A2 (compatible shade)"],
    comments: [
      { supplierId: "dental-sky", text: "Bulk pricing applies on 6+ boxes." },
      { supplierId: "wright", text: "Limited stock — next batch arrives 10 July." },
    ],
  },
  {
    id: "p2",
    name: "Nitrile examination gloves (M)",
    pack: "200 / box",
    qty: 12,
    category: "PPE",
    quotes: [
      { supplierId: "henry", unitPrice: 7.2, availability: "in_stock" },
      { supplierId: "dental-sky", unitPrice: 6.85, availability: "in_stock" },
      { supplierId: "wright", unitPrice: 6.95, availability: "in_stock" },
      { supplierId: "kent", unitPrice: 6.5, availability: "in_stock", note: "Volume discount applied" },
    ],
    notes: "Powder-free, EN 455 compliant.",
    alternatives: ["Medicom SafeTouch (M)"],
    comments: [{ supplierId: "kent", text: "Free next-day on orders over £250." }],
  },
  {
    id: "p3",
    name: "Lidocaine 2% with epinephrine cartridges",
    pack: "Box of 50",
    qty: 6,
    category: "Anaesthesia",
    quotes: [
      { supplierId: "henry", unitPrice: 42.0, availability: "in_stock" },
      { supplierId: "dental-sky", unitPrice: 41.5, availability: "in_stock" },
      { supplierId: "wright", unitPrice: 44.2, availability: "in_stock" },
      { supplierId: "kent", unitPrice: 43.8, availability: "backorder" },
    ],
    notes: "Verify CoA on delivery.",
    alternatives: [],
    comments: [],
  },
  {
    id: "p4",
    name: "Endo files 25mm — assorted",
    pack: "Pack of 6",
    qty: 8,
    category: "Endodontics",
    quotes: [
      { supplierId: "henry", unitPrice: 28.9, availability: "in_stock" },
      { supplierId: "dental-sky", unitPrice: 31.4, availability: "in_stock" },
      { supplierId: "wright", unitPrice: 27.5, availability: "in_stock", note: "Single-use NiTi" },
      { supplierId: "kent", unitPrice: 30.1, availability: "low" },
    ],
    notes: "Single-use only.",
    alternatives: ["Dentsply ProTaper Next 25mm"],
    comments: [{ supplierId: "wright", text: "Sleeves included at no extra cost." }],
  },
  {
    id: "p5",
    name: "Bonding agent — universal adhesive",
    pack: "5ml bottle",
    qty: 3,
    category: "Restorative",
    quotes: [
      { supplierId: "henry", unitPrice: 64.0, availability: "in_stock" },
      { supplierId: "dental-sky", unitPrice: 61.2, availability: "in_stock" },
      { supplierId: "wright", unitPrice: 66.5, availability: "in_stock" },
      { supplierId: "kent", unitPrice: 63.4, availability: "in_stock" },
    ],
    notes: "Store at 2–8 °C on arrival.",
    alternatives: [],
    comments: [],
  },
];

const currency = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

/* ---------------- primitives ---------------- */

function Kpi({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 transition-all hover:-translate-y-0.5 ${
        accent
          ? "border-teal-200/80 bg-teal-50/40"
          : "border-slate-200/80"
      } shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]`}
    >
      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={`mt-1.5 text-[22px] font-semibold tracking-tight tabular-nums ${
          accent ? "text-teal-700" : "text-slate-900"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[11.5px] text-slate-500">{sub}</p>}
    </div>
  );
}

function AvailabilityChip({ a }: { a: Availability }) {
  const map = {
    in_stock: { label: "In stock", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
    low: { label: "Low stock", cls: "bg-amber-50 text-amber-700 ring-amber-100" },
    backorder: { label: "Backorder", cls: "bg-slate-100 text-slate-600 ring-slate-200" },
  } as const;
  const v = map[a];
  return (
    <span
      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${v.cls}`}
    >
      {v.label}
    </span>
  );
}

function SupplierBadge({ s }: { s: SupplierMeta }) {
  return (
    <span
      className={`grid h-7 w-7 place-items-center rounded-lg text-[10.5px] font-semibold ${s.tint}`}
    >
      {s.initials}
    </span>
  );
}

function ProductThumb({ name }: { name: string }) {
  const ch = name.trim().slice(0, 1).toUpperCase();
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-[12px] font-semibold text-slate-500">
      {ch}
    </span>
  );
}

/* ---------------- page ---------------- */

function RfqComparisonPage() {
  // selection: productId -> supplierId
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    products.forEach((p) => {
      const best = [...p.quotes].sort((a, b) => a.unitPrice - b.unitPrice)[0];
      init[p.id] = best.supplierId;
    });
    return init;
  });
  const [expanded, setExpanded] = useState<string | null>(null);

  const totals = useMemo(() => {
    let total = 0;
    let savings = 0;
    const bySupplier: Record<string, number> = {};
    products.forEach((p) => {
      const sorted = [...p.quotes].sort((a, b) => a.unitPrice - b.unitPrice);
      const cheapest = sorted[0].unitPrice;
      const worst = sorted[sorted.length - 1].unitPrice;
      const chosen = p.quotes.find((q) => q.supplierId === selected[p.id])!;
      total += chosen.unitPrice * p.qty;
      savings += (worst - chosen.unitPrice) * p.qty;
      bySupplier[chosen.supplierId] =
        (bySupplier[chosen.supplierId] ?? 0) + chosen.unitPrice * p.qty;
    });
    return { total, savings, bySupplier };
  }, [selected]);

  const productsQuoted = products.filter((p) => p.quotes.length > 0).length;
  const bestSavingPerProduct = products.reduce((acc, p) => {
    const sorted = [...p.quotes].sort((a, b) => a.unitPrice - b.unitPrice);
    return acc + (sorted[sorted.length - 1].unitPrice - sorted[0].unitPrice) * p.qty;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center gap-4 px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-[13px] font-semibold tracking-tight text-slate-900"
          >
            <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-[11px] font-semibold text-white">
              R
            </div>
            Reacting
            <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
              Dental
            </span>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 text-[13px] text-slate-500 md:flex">
            <Link to="/dashboard" className="rounded-md px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-900">
              Dashboard
            </Link>
            <span className="rounded-md bg-slate-100 px-2.5 py-1.5 font-medium text-slate-900">
              RFQs
            </span>
          </nav>
          <div className="relative ml-auto hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search products, suppliers…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
            <Download className="h-3.5 w-3.5" /> Export PDF
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-6 py-8 lg:py-10">
        {/* Title row */}
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
              RFQ · 2026-06-22
            </p>
            <h1 className="mt-2 text-[34px] font-semibold leading-[1.1] tracking-tight text-slate-900 md:text-[40px]">
              Compare supplier quotes
            </h1>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-slate-500">
              Review supplier responses and select the best option for each product
              before creating your purchase order.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:w-[520px]">
            <Kpi label="Total estimated" value={currency(totals.total)} sub="across selected suppliers" />
            <Kpi label="Potential savings" value={currency(totals.savings)} sub="vs highest quotes" accent />
            <Kpi label="Suppliers responded" value={`${suppliers.length}/${suppliers.length}`} sub="all quotes received" />
          </div>
        </section>

        {/* Summary bar */}
        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Kpi label="Products requested" value={`${products.length}`} />
          <Kpi label="Products quoted" value={`${productsQuoted}`} sub="100% coverage" />
          <Kpi label="Suppliers" value={`${suppliers.length}`} sub="comparing now" />
          <Kpi label="Best saving" value={currency(bestSavingPerProduct)} sub="if all best picks chosen" />
          <Kpi label="Total purchase value" value={currency(totals.total)} sub="at current selection" />
        </section>

        {/* Body: table + sticky sidebar */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Comparison table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500" />
                <h2 className="text-[14px] font-semibold tracking-tight text-slate-900">
                  Quote comparison
                </h2>
                <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                  {products.length} items
                </span>
              </div>
              <div className="hidden items-center gap-2 text-[12px] text-slate-500 md:flex">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal-500" /> Best value
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-300" /> Second best
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-200" /> Highest
                </span>
              </div>
            </div>

            <div className="max-h-[720px] overflow-auto">
              <table className="w-full border-separate border-spacing-0 text-left text-[13px]">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-20 w-[320px] border-b border-slate-200 bg-white px-5 py-4 align-bottom">
                      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                        Product
                      </p>
                    </th>
                    {suppliers.map((s) => (
                      <th
                        key={s.id}
                        className="sticky top-0 z-10 min-w-[200px] border-b border-l border-slate-100 bg-white px-4 py-4 align-top"
                      >
                        <div className="flex items-start gap-2.5">
                          <SupplierBadge s={s} />
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-slate-900">
                              {s.name}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                              <Truck className="h-3 w-3" /> {s.delivery}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Min order {s.minOrder} · ★ {s.rating}
                            </p>
                            <p className="text-[10.5px] text-slate-400">
                              Quoted {s.quoteDate}
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const sortedQuotes = [...p.quotes].sort(
                      (a, b) => a.unitPrice - b.unitPrice,
                    );
                    const cheapest = sortedQuotes[0];
                    const second = sortedQuotes[1];
                    const worst = sortedQuotes[sortedQuotes.length - 1];
                    const isOpen = expanded === p.id;
                    return (
                      <>
                        <tr key={p.id} className="group">
                          <td className="sticky left-0 z-10 w-[320px] border-b border-slate-100 bg-white px-5 py-4 align-top group-hover:bg-slate-50/70">
                            <div className="flex items-start gap-3">
                              <ProductThumb name={p.name} />
                              <div className="min-w-0">
                                <p className="text-[13.5px] font-semibold text-slate-900">
                                  {p.name}
                                </p>
                                <p className="mt-0.5 text-[11.5px] text-slate-500">
                                  {p.pack} · {p.category}
                                </p>
                                <p className="mt-1 text-[11.5px] text-slate-600">
                                  Required: <span className="font-medium text-slate-900">{p.qty}</span>
                                </p>
                                <button
                                  onClick={() => setExpanded(isOpen ? null : p.id)}
                                  className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-slate-600 hover:text-slate-900"
                                >
                                  {isOpen ? "Hide details" : "View details"}
                                  <ChevronDown
                                    className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                  />
                                </button>
                              </div>
                            </div>
                          </td>
                          {suppliers.map((s) => {
                            const q = p.quotes.find((x) => x.supplierId === s.id);
                            if (!q) {
                              return (
                                <td
                                  key={s.id}
                                  className="border-b border-l border-slate-100 bg-white px-4 py-4 align-top text-[12px] text-slate-400 group-hover:bg-slate-50/70"
                                >
                                  No quote
                                </td>
                              );
                            }
                            const isBest = q.supplierId === cheapest.supplierId;
                            const isSecond = second && q.supplierId === second.supplierId;
                            const isWorst = q.supplierId === worst.supplierId && !isBest;
                            const isSelected = selected[p.id] === s.id;
                            const diff = q.unitPrice - cheapest.unitPrice;
                            const cellBase =
                              "relative border-b border-l border-slate-100 px-4 py-4 align-top transition-colors cursor-pointer group-hover:bg-slate-50/70";
                            const cellTone = isBest
                              ? "bg-teal-50/60 ring-1 ring-inset ring-teal-200/70 hover:bg-teal-50"
                              : isSecond
                                ? "bg-white ring-1 ring-inset ring-slate-200/60"
                                : isWorst
                                  ? "bg-slate-50/60 text-slate-500"
                                  : "bg-white";
                            const selectedRing = isSelected
                              ? "outline outline-2 outline-offset-[-2px] outline-slate-900"
                              : "";
                            return (
                              <td
                                key={s.id}
                                onClick={() =>
                                  setSelected((prev) => ({ ...prev, [p.id]: s.id }))
                                }
                                className={`${cellBase} ${cellTone} ${selectedRing}`}
                              >
                                {isBest && (
                                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-teal-600/95 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-white">
                                    <Sparkles className="h-2.5 w-2.5" /> Best
                                  </span>
                                )}
                                <p
                                  className={`text-[18px] font-semibold tabular-nums ${
                                    isBest ? "text-teal-800" : isWorst ? "text-slate-500" : "text-slate-900"
                                  }`}
                                >
                                  {currency(q.unitPrice)}
                                </p>
                                <p className="mt-0.5 text-[11px] text-slate-500">
                                  per pack · {currency(q.unitPrice * p.qty)} total
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <AvailabilityChip a={q.availability} />
                                  {diff > 0 ? (
                                    <span className="text-[10.5px] text-slate-500">
                                      +{currency(diff)} vs best
                                    </span>
                                  ) : (
                                    <span className="text-[10.5px] font-medium text-teal-700">
                                      Lowest
                                    </span>
                                  )}
                                </div>
                                {q.note && (
                                  <p className="mt-1.5 text-[10.5px] italic text-slate-500">
                                    {q.note}
                                  </p>
                                )}
                                <div className="mt-2.5 flex items-center justify-between">
                                  <span
                                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                                      isSelected
                                        ? "border-slate-900 bg-slate-900 text-white"
                                        : "border-slate-300 bg-white text-transparent"
                                    }`}
                                  >
                                    <Check className="h-2.5 w-2.5" />
                                  </span>
                                  <span className="text-[10.5px] text-slate-400 group-hover:text-slate-600">
                                    {isSelected ? "Selected" : "Select"}
                                  </span>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                        {isOpen && (
                          <tr key={`${p.id}-x`}>
                            <td
                              colSpan={suppliers.length + 1}
                              className="border-b border-slate-100 bg-slate-50/60 px-5 py-5"
                            >
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                  <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                                    Notes
                                  </p>
                                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-700">
                                    {p.notes || "—"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                                    Alternatives
                                  </p>
                                  {p.alternatives.length === 0 ? (
                                    <p className="mt-1 text-[12.5px] text-slate-500">
                                      No alternatives suggested.
                                    </p>
                                  ) : (
                                    <ul className="mt-1 space-y-1 text-[12.5px] text-slate-700">
                                      {p.alternatives.map((a) => (
                                        <li key={a} className="flex items-center gap-2">
                                          <Package className="h-3 w-3 text-slate-400" />
                                          {a}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                                <div>
                                  <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                                    Supplier comments
                                  </p>
                                  {p.comments.length === 0 ? (
                                    <p className="mt-1 text-[12.5px] text-slate-500">
                                      No comments from suppliers.
                                    </p>
                                  ) : (
                                    <ul className="mt-1 space-y-1.5 text-[12.5px] text-slate-700">
                                      {p.comments.map((c, i) => {
                                        const s = suppliers.find((x) => x.id === c.supplierId)!;
                                        return (
                                          <li key={i}>
                                            <span className="font-medium text-slate-900">
                                              {s.name}:
                                            </span>{" "}
                                            <span className="text-slate-600">{c.text}</span>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </div>
                              </div>
                              <div className="mt-4 flex items-center gap-2">
                                <button className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
                                  <ExternalLink className="h-3 w-3" /> View original quote
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-wider text-teal-700">
                    Live order
                  </p>
                  <h3 className="mt-1 text-[16px] font-semibold tracking-tight text-slate-900">
                    Your selection
                  </h3>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                  {products.length} items
                </span>
              </div>

              <div className="mt-5 space-y-2.5">
                {suppliers.map((s) => {
                  const total = totals.bySupplier[s.id];
                  if (!total) return null;
                  return (
                    <div
                      key={s.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <SupplierBadge s={s} />
                        <div>
                          <p className="text-[12.5px] font-medium text-slate-900">
                            {s.name}
                          </p>
                          <p className="text-[10.5px] text-slate-500">
                            {s.delivery}
                          </p>
                        </div>
                      </div>
                      <p className="text-[13px] font-semibold tabular-nums text-slate-900">
                        {currency(total)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-[13px]">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Items selected</span>
                  <span className="tabular-nums text-slate-900">
                    {Object.keys(selected).length}/{products.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Running total</span>
                  <span className="text-[15px] font-semibold tabular-nums text-slate-900">
                    {currency(totals.total)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated savings</span>
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[12px] font-semibold text-teal-700">
                    {currency(totals.savings)}
                  </span>
                </div>
              </div>

              <button className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2.5 text-[13px] font-medium text-white transition-all hover:-translate-y-px hover:bg-slate-800">
                Generate purchase order <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </button>
              <button className="mt-1 w-full rounded-lg px-3.5 py-2 text-[12.5px] font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                View original quotes
              </button>
            </div>

            <p className="mt-3 px-1 text-[11px] leading-relaxed text-slate-400">
              Selections update totals instantly. You can adjust suppliers per product
              before raising the PO.
            </p>
          </aside>
        </section>

        {/* Bottom summary */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
            <div className="border-b border-slate-100 p-6 md:border-b-0 md:border-r">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                Selected suppliers
              </p>
              <p className="mt-2 text-[20px] font-semibold tracking-tight text-slate-900">
                {Object.keys(totals.bySupplier).length}
              </p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">
                {Object.keys(totals.bySupplier)
                  .map((id) => suppliers.find((s) => s.id === id)?.name)
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <div className="border-b border-slate-100 p-6 md:border-b-0 md:border-r">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                Total spend
              </p>
              <p className="mt-2 text-[20px] font-semibold tracking-tight text-slate-900 tabular-nums">
                {currency(totals.total)}
              </p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">excl. VAT</p>
            </div>
            <div className="border-b border-slate-100 p-6 md:border-b-0 md:border-r">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                Savings achieved
              </p>
              <p className="mt-2 text-[20px] font-semibold tracking-tight text-teal-700 tabular-nums">
                {currency(totals.savings)}
              </p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">
                vs highest quoted price
              </p>
            </div>
            <div className="border-b border-slate-100 p-6 md:border-b-0 md:border-r">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                Delivery split
              </p>
              <p className="mt-2 text-[13px] text-slate-700">
                Fastest 1 day · Slowest 3 days
              </p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">
                Across {Object.keys(totals.bySupplier).length} shipments
              </p>
            </div>
            <div className="p-6">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                Estimated VAT (20%)
              </p>
              <p className="mt-2 text-[20px] font-semibold tracking-tight text-slate-900 tabular-nums">
                {currency(totals.total * 0.2)}
              </p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">
                Inc. VAT {currency(totals.total * 1.2)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-between gap-3 border-t border-slate-100 bg-slate-50/40 px-6 py-4 md:flex-row md:items-center">
            <p className="text-[12.5px] text-slate-500">
              Review your selection — you can edit before raising the purchase order.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-slate-800">
                Generate purchase order <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-[12px] font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to website
          </Link>
        </div>
      </main>
    </div>
  );
}
