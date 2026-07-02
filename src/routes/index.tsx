import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import {
  ArrowRight,
  Play,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  BarChart3,
  LineChart,
  Check,
  Plus,
  Minus,
  Search,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Users,
  Briefcase,
  Building2,
  Lightbulb,
  Hammer,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import { AppScreenshot, BrowserFrame as RealBrowserFrame } from "@/components/site/ProductMock";

const SCREEN = {
  dashboard: "/product-screens/screen-02.png",
  inventory: "/product-screens/screen-25.png",
  lowStock: "/product-screens/screen-08.png",
  expiring: "/product-screens/screen-09.png",
  purchasing: "/product-screens/screen-11.png",
  suppliers: "/product-screens/screen-21.png",
  rfq: "/product-screens/screen-15.png",
  rfqCompare: "/product-screens/screen-17.png",
  deliveries: "/product-screens/screen-12.png",
  reporting: "/product-screens/screen-01.png",
  savings: "/product-screens/screen-03.png",
  audit: "/product-screens/screen-28.png",
  team: "/product-screens/screen-14.png",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Assist by Reacting — Practice management, simplified" },
      {
        name: "description",
        content:
          "Dental Assist helps dental practices manage inventory, purchasing, suppliers and daily operations from one simple cloud platform. Built inside a real dental practice.",
      },
      { property: "og:title", content: "Dental Assist by Reacting" },
      {
        property: "og:description",
        content:
          "Cloud software that helps dental practices manage inventory, purchasing, suppliers and daily operations.",
      },
    ],
  }),
  component: Landing,
});

const SECTION = "py-10 lg:py-14";
const CONTAINER = "mx-auto max-w-[1280px] px-6 lg:px-10";
const HEADING_GAP = "mt-8";

/* ------------------------------------------------------------------ */
/*  Browser frame                                                     */
/* ------------------------------------------------------------------ */

function BrowserFrame({
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
      className={`overflow-hidden rounded-2xl border border-border bg-card shadow-[0_50px_100px_-40px_rgb(15_23_42/0.28),0_2px_4px_-2px_rgb(15_23_42/0.06)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-secondary px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="ml-3 hidden h-6 max-w-xs flex-1 items-center gap-2 rounded-md border border-border/70 bg-background px-2.5 text-[11px] text-muted-foreground sm:flex">
          <Search className="h-3 w-3" />
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard mock (hero)                                             */
/* ------------------------------------------------------------------ */

function DashboardPreview() {
  return (
    <BrowserFrame url="app.dentalassist.com / inventory">
      <div className="grid grid-cols-[180px_minmax(0,1fr)]">
        <aside className="hidden border-r border-border/70 bg-secondary p-4 sm:block">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-foreground" />
            <span className="text-[12px] font-semibold tracking-tight">
              Dental Assist
            </span>
          </div>
          <div className="mb-2 px-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Workspace
          </div>
          <ul className="space-y-0.5 text-[12.5px]">
            {[
              "Overview",
              "Inventory",
              "Purchasing",
              "Suppliers",
              "RFQs",
              "Reports",
              "Analytics",
            ].map((item, i) => (
              <li
                key={item}
                className={`flex items-center justify-between rounded-md px-2.5 py-1.5 ${
                  i === 1
                    ? "bg-background font-medium text-foreground shadow-[0_1px_2px_rgb(15_23_42/0.06)]"
                    : "text-muted-foreground"
                }`}
              >
                <span>{item}</span>
                {i === 1 && (
                  <span className="rounded-full bg-accent/15 px-1.5 text-[10px] font-medium text-accent">
                    12
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <div className="p-5 sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Inventory
              </div>
              <div className="mt-1 text-[15px] font-semibold tracking-tight">
                Practice overview
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                Last 30 days
              </span>
              <span className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
                + New order
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { k: "Items tracked", v: "1,284" },
              { k: "Low stock", v: "12", accent: true },
              { k: "Open POs", v: "7" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.k}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-[20px] font-semibold tracking-tight">
                    {s.v}
                  </div>
                  {s.accent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[13px] font-medium">Spend by category</div>
              <div className="text-[11px] text-muted-foreground">
                Last 30 days
              </div>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {[40, 65, 50, 80, 55, 72, 48, 90, 60, 75, 58, 84].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-sm ${
                    i === 7 ? "bg-foreground" : "bg-foreground/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
            {[
              { n: "Composite refills · A2", s: "Henry Schein", t: "Delivered" },
              { n: "Nitrile gloves · Medium", s: "Wright Cottrell", t: "In transit" },
              { n: "Endo files · 25mm", s: "Dentsply Sirona", t: "Approved" },
            ].map((r, i) => (
              <div
                key={r.n}
                className={`flex items-center justify-between px-4 py-3 text-[13px] ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{r.n}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {r.s}
                  </div>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {r.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini previews used inside benefit accordion                       */
/* ------------------------------------------------------------------ */

function PreviewInventory() {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[13px] font-semibold tracking-tight">Inventory</div>
        <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
          1,284 items
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        {[
          { n: "Composite refills · A2", q: 24, s: "in stock" },
          { n: "Nitrile gloves · M", q: 6, s: "low", warn: true },
          { n: "Endo files · 25mm", q: 48, s: "in stock" },
          { n: "Anaesthetic · 2%", q: 12, s: "in stock" },
        ].map((r, i) => (
          <div
            key={r.n}
            className={`flex items-center justify-between px-4 py-3 text-[13px] ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <span className="truncate font-medium">{r.n}</span>
            <span className="flex items-center gap-2">
              <span className="tabular-nums text-muted-foreground">{r.q}</span>
              <span
                className={`text-[11px] ${
                  r.warn ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {r.s}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewRFQ() {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[13px] font-semibold tracking-tight">
          RFQ · 3 suppliers
        </div>
        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent">
          Save £84
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { s: "Henry Schein", p: "£412", best: false },
          { s: "Wright Cottrell", p: "£328", best: true },
          { s: "Dentsply", p: "£401", best: false },
        ].map((c) => (
          <div
            key={c.s}
            className={`rounded-xl border p-3 ${
              c.best
                ? "border-foreground bg-foreground/[0.03]"
                : "border-border bg-background"
            }`}
          >
            <div className="text-[11px] text-muted-foreground">{c.s}</div>
            <div className="mt-1 text-[16px] font-semibold tracking-tight tabular-nums">
              {c.p}
            </div>
            {c.best && (
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-accent">
                <Check className="h-3 w-3" /> Best price
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewSpend() {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[13px] font-semibold tracking-tight">
          Monthly spend
        </div>
        <span className="text-[11px] text-muted-foreground">Last 6 months</span>
      </div>
      <div className="flex h-24 items-end gap-2">
        {[45, 62, 58, 74, 66, 52].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={`flex-1 rounded-sm ${
              i === 5 ? "bg-foreground" : "bg-foreground/15"
            }`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Materials · Consumables · PPE</span>
        <span className="tabular-nums text-foreground">−12.4%</span>
      </div>
    </div>
  );
}

function PreviewExpiry() {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[13px] font-semibold tracking-tight">
          Expiring soon
        </div>
        <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
          Next 30 days
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        {[
          { n: "Anaesthetic · Batch A24", d: "12 Jul" },
          { n: "Composite · Batch B11", d: "18 Jul" },
          { n: "Dental cement · Batch C08", d: "27 Jul" },
        ].map((r, i) => (
          <div
            key={r.n}
            className={`flex items-center justify-between px-4 py-3 text-[13px] ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <span className="truncate font-medium">{r.n}</span>
            <span className="tabular-nums text-muted-foreground">{r.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewTeam() {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[13px] font-semibold tracking-tight">
          Team activity
        </div>
        <span className="text-[11px] text-muted-foreground">Today</span>
      </div>
      <ul className="space-y-2">
        {[
          { u: "Sarah", a: "raised PO #1284", t: "9:12" },
          { u: "James", a: "approved £412 order", t: "9:48" },
          { u: "Priya", a: "logged delivery · Schein", t: "11:03" },
        ].map((r) => (
          <li
            key={r.a}
            className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-[12.5px]"
          >
            <span>
              <span className="font-medium">{r.u}</span>{" "}
              <span className="text-muted-foreground">{r.a}</span>
            </span>
            <span className="text-[11px] tabular-nums text-muted-foreground">
              {r.t}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className={`${CONTAINER} pb-10 pt-8 sm:pt-12 lg:pb-12 lg:pt-14`}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[12px] text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                Built and used every day in a real UK dental practice
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[46px] font-semibold leading-[1.02] tracking-[-0.028em] text-foreground sm:text-[60px] lg:text-[72px]">
                Everything your practice needs to stay organised.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-[540px] text-[17px] leading-[1.65] text-muted-foreground sm:text-[18px]">
                Dental Assist helps dental practices manage purchasing,
                inventory, suppliers and daily operations through one simple
                cloud platform built around real dental workflows.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-11 w-full rounded-full px-6 text-[13.5px] font-medium sm:w-auto"
                >
                  <Link to="/book-demo">
                    Book Your Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-11 w-full rounded-full px-5 text-[13.5px] font-medium text-foreground hover:bg-secondary sm:w-auto"
                >
                  <Link to="/product">
                    <Play className="h-4 w-4" />
                    Watch Overview
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-muted-foreground">
                {[
                  { label: "Built in Practice", icon: Hammer },
                  { label: "Secure Cloud", icon: ShieldCheck },
                  { label: "Continuous Updates", icon: RefreshCw },
                ].map((t) => (
                  <li key={t.label} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                    </span>
                    {t.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="animate-float will-change-transform">
              <DashboardPreview />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                   */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </div>
      )}
      <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[42px]">
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-[16.5px] leading-[1.65] text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits — accordion                                              */
/* ------------------------------------------------------------------ */

const benefits: {
  title: string;
  body: string;
  benefit: string;
  Preview: () => React.ReactElement;
}[] = [
  {
    title: "Stop using spreadsheets.",
    body: "Move every stock list, order log and supplier price sheet into one calm workspace the whole team can trust.",
    benefit: "Save hours a week previously lost to admin.",
    Preview: PreviewInventory,
  },
  {
    title: "Know exactly what is in stock.",
    body: "Live counts across every surgery and store room, with automatic alerts before you run out mid-procedure.",
    benefit: "Never cancel a treatment because of missing materials.",
    Preview: PreviewInventory,
  },
  {
    title: "Compare supplier prices faster.",
    body: "Send one RFQ to multiple suppliers and see every response side by side. Pick the best price per item, not per basket.",
    benefit: "Typical practices save 8–15% on materials.",
    Preview: PreviewRFQ,
  },
  {
    title: "Reduce expired materials.",
    body: "Batch and expiry tracking flags items before they go out of date so nothing is written off.",
    benefit: "Cut waste and keep clinical governance clean.",
    Preview: PreviewExpiry,
  },
  {
    title: "Give your whole team one simple workflow.",
    body: "Roles for owners, managers and dental nurses mean each person sees exactly what they need — nothing more.",
    benefit: "Everyone aligned. One source of truth.",
    Preview: PreviewTeam,
  },
];

function Benefits() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`border-t border-border/60 bg-background ${SECTION}`}>
      <div className={CONTAINER}>
        <Reveal>
          <SectionHeading
            eyebrow="Why Dental Assist"
            title="Why practices choose Dental Assist."
            body="Each of these is a small operational win. Together they change how the practice runs."
          />
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {benefits.map((b, i) => {
              const isOpen = open === i;
              const Preview = b.Preview;
              return (
                <li key={b.title}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors hover:bg-secondary/40 sm:py-8"
                  >
                    <div className="flex min-w-0 items-center gap-6">
                      <span className="w-6 shrink-0 text-[12px] font-medium tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[18px] font-medium tracking-tight text-foreground sm:text-[22px]">
                        {b.title}
                      </span>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="grid gap-8 pb-10 pl-12 pr-2 pt-1 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
                        <div>
                          <p className="max-w-md text-[15.5px] leading-[1.7] text-muted-foreground">
                            {b.body}
                          </p>
                          <div className="mt-6 inline-flex items-start gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3">
                            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <div className="text-[13.5px] font-medium text-foreground">
                              {b.benefit}
                            </div>
                          </div>
                        </div>
                        <BrowserFrame>
                          <Preview />
                        </BrowserFrame>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Audiences — premium cards                                         */
/* ------------------------------------------------------------------ */

const audiences = [
  {
    title: "Practice Owners",
    body: "Control costs and get real visibility into practice operations.",
    icon: Briefcase,
    bullets: [
      "Live spend by category & supplier",
      "Approvals with a full audit trail",
      "Confidence in monthly numbers",
    ],
    tone: "bg-foreground",
  },
  {
    title: "Practice Managers",
    body: "One calm workspace for purchasing, suppliers and stock.",
    icon: Building2,
    bullets: [
      "No more spreadsheets or paper POs",
      "Every supplier and price list in one place",
      "Weekly ordering in minutes, not hours",
    ],
    tone: "bg-accent",
  },
  {
    title: "Dental Teams",
    body: "Simple stock counts, deliveries and quick product search.",
    icon: Users,
    bullets: [
      "Barcode-friendly counts",
      "Log goods-in in seconds",
      "Search by brand, code or category",
    ],
    tone: "bg-deep-blue",
  },
];

function Audiences() {
  return (
    <section className={`border-t border-border/60 bg-secondary/60 ${SECTION}`}>
      <div className={CONTAINER}>
        <Reveal>
          <SectionHeading title="Built for your whole practice." />
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgb(15_23_42/0.18)]">
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-[3px] ${a.tone}`}
                />
                <a.icon
                  className="h-5 w-5 text-foreground"
                  strokeWidth={1.5}
                />
                <div className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-foreground">
                  {a.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
                  {a.body}
                </p>
                <div className="mt-7 border-t border-border pt-5">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Typical benefits
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {a.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[13.5px] text-foreground/85"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                          strokeWidth={2.5}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Core modules — alternating                                        */
/* ------------------------------------------------------------------ */

const modules = [
  {
    title: "Inventory",
    body: "Track every item, every location, in real time. Set par levels and get alerts before you run out.",
    icon: Package,
    href: "/features",
    hash: "inventory",
    Preview: PreviewInventory,
    large: true,
  },
  {
    title: "Purchasing",
    body: "Raise, approve and track orders in one place. No more paper trails.",
    icon: ShoppingCart,
    href: "/features",
    hash: "purchasing",
    Preview: PreviewTeam,
    large: false,
  },
  {
    title: "Supplier Management",
    body: "All your suppliers, contacts and price lists in one tidy directory.",
    icon: Truck,
    href: "/features",
    hash: "suppliers",
    Preview: PreviewSpend,
    large: false,
  },
  {
    title: "RFQ Comparison",
    body: "Request quotes from multiple suppliers and compare side by side.",
    icon: FileText,
    href: "/features",
    hash: "rfq",
    Preview: PreviewRFQ,
    large: true,
  },
  {
    title: "Reporting",
    body: "Understand spend, usage and waste across the practice.",
    icon: BarChart3,
    href: "/features",
    hash: "reporting",
    Preview: PreviewSpend,
    large: false,
  },
  {
    title: "Analytics",
    body: "Spot trends and make confident decisions about your operations.",
    icon: LineChart,
    href: "/features",
    hash: "dashboard",
    Preview: PreviewSpend,
    large: false,
  },
];

function ModuleCard({
  m,
  large,
}: {
  m: (typeof modules)[number];
  large: boolean;
}) {
  const Preview = m.Preview;
  return (
    <Link
      to={m.href}
      hash={m.hash}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_30px_70px_-30px_rgb(15_23_42/0.18)] ${
        large ? "lg:col-span-2" : ""
      }`}
    >
      <div className="p-7 lg:p-9">
        <m.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        <div className="mt-6 text-[20px] font-semibold tracking-tight sm:text-[22px]">
          {m.title}
        </div>
        <p className="mt-2 max-w-md text-[14.5px] leading-[1.65] text-muted-foreground">
          {m.body}
        </p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 transition-colors group-hover:text-foreground">
          Explore {m.title}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
      <div className="mx-7 mb-7 mt-auto overflow-hidden rounded-xl border border-border bg-background lg:mx-9 lg:mb-9">
        <Preview />
      </div>
    </Link>
  );
}

function Modules() {
  return (
    <section className={`border-t border-border/60 bg-background ${SECTION}`}>
      <div className={CONTAINER}>
        <Reveal>
          <SectionHeading
            eyebrow="Core Modules"
            title="Everything your practice needs, in one platform."
            body="Six connected modules covering the full operational side of a modern dental practice."
          />
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 80}>
              <ModuleCard m={m} large={m.large} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Our story — split layout + timeline                               */
/* ------------------------------------------------------------------ */

const timeline = [
  {
    label: "Problem",
    body: "Spreadsheets, paper POs and lost invoices slowing the whole practice down.",
    icon: Lightbulb,
  },
  {
    label: "Build",
    body: "We built the tool we needed ourselves, tested on real workflows.",
    icon: Hammer,
  },
  {
    label: "Daily Use",
    body: "Used every day inside a working UK practice by owners, managers and nurses.",
    icon: Users,
  },
  {
    label: "Continuous Improvement",
    body: "Each release shaped by real feedback from the surgery floor.",
    icon: TrendingUp,
  },
];

function StoryImagePlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary">
      <div className="aspect-[4/5] w-full">
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
            <Building2 className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Photograph
          </div>
          <div className="max-w-xs text-[14px] font-medium text-foreground">
            Practice & team photo
          </div>
          <div className="max-w-xs text-[12.5px] leading-[1.55] text-muted-foreground">
            Real, unstaged image of the practice this software is built in.
          </div>
        </div>
      </div>
    </div>
  );
}

function OurStory() {
  return (
    <section className={`border-t border-border/60 bg-secondary/60 ${SECTION}`}>
      <div className={CONTAINER}>
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.2fr] lg:gap-10">
          <Reveal>
            <StoryImagePlaceholder />
          </Reveal>
          <div>
            <Reveal>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Our story
              </div>
              <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[42px]">
                Built inside a real dental practice.
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-foreground/85">
                Dental Assist was developed and refined inside a working UK
                dental practice to solve real daily operational problems. Every
                feature is shaped by real workflows, not assumptions.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ol className="mt-6 space-y-5 border-l border-border pl-8">
                {timeline.map((t, i) => (
                  <li key={t.label} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground"
                    >
                      <t.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-[15px] font-semibold tracking-tight text-foreground">
                        {t.label}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-md text-[14px] leading-[1.65] text-muted-foreground">
                      {t.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Who is Dental Assist for?",
    a: "Independent dental practices and small groups that want to replace spreadsheets and paper with one simple platform for inventory, purchasing and supplier management.",
  },
  {
    q: "How long does it take to get started?",
    a: "Most practices are up and running within a week. We help you import existing stock lists and connect your suppliers so the team can start on day one.",
  },
  {
    q: "Does Dental Assist work with our existing suppliers?",
    a: "Yes. You can manage every supplier you already work with, store their price lists and send RFQs from inside the platform.",
  },
  {
    q: "Is our data secure?",
    a: "Dental Assist runs on a secure cloud infrastructure with encryption in transit and at rest, role-based access and regular backups.",
  },
  {
    q: "Can the whole team use it?",
    a: "Yes. Roles are designed for owners, managers and dental teams so each person sees exactly what they need.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`border-t border-border/60 bg-background ${SECTION}`}>
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <Reveal>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                FAQ
              </div>
              <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[42px]">
                Questions, answered.
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.65] text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Get in touch and
                we&apos;ll walk you through it.
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-secondary/60 p-6">
                <MessageSquare className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                <div className="mt-4 text-[15px] font-semibold tracking-tight">
                  Still have questions?
                </div>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-muted-foreground">
                  Our team replies within one working day.
                </p>
                <Button
                  asChild
                  className="mt-5 h-10 rounded-full px-5 text-[13px] font-medium"
                >
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-border border-y border-border">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[16.5px] font-medium tracking-tight text-foreground">
                        {f.q}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="pb-7 pr-10 text-[15px] leading-[1.75] text-muted-foreground">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reacting ecosystem                                                */
/* ------------------------------------------------------------------ */

function Ecosystem() {
  const products: {
    name: string;
    status: "Current" | "Coming Soon" | "Future";
    body: string;
  }[] = [
    { name: "Dental Assist", status: "Current", body: "Purchasing and inventory for dental practices." },
    { name: "Vet Assist", status: "Coming Soon", body: "Operational software for veterinary clinics." },
    { name: "Medical Assist", status: "Future", body: "Practice operations for private medical clinics." },
    { name: "Optical Assist", status: "Future", body: "Inventory and purchasing for optical practices." },
  ];
  return (
    <section className="border-t border-border/60 bg-secondary/50">
      <div className={`${CONTAINER} ${SECTION}`}>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              The Reacting ecosystem
            </div>
            <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px]">
              Intelligent software for healthcare businesses.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-muted-foreground">
              Dental Assist is the first product built by Reacting. More are on the way.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Reveal key={p.name}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-6">
                <div>
                  <div className="text-[15px] font-semibold tracking-tight text-foreground">
                    {p.name}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.55] text-muted-foreground">
                    {p.body}
                  </p>
                </div>
                <div
                  className={`mt-6 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    p.status === "Current"
                      ? "bg-accent/10 text-accent"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {p.status}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA — dark navy                                             */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="border-t border-border/60 bg-[#111827] text-white">
      <div className={`${CONTAINER} py-10 lg:py-14`}>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[54px]">
              Ready to simplify your practice?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.65] text-white/70">
              See how Dental Assist replaces spreadsheets and paper with one
              calm, connected platform.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-white px-7 text-[13.5px] font-semibold text-[#111827] hover:bg-white/90"
              >
                <Link to="/book-demo">
                  Book Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/30 bg-transparent px-7 text-[13.5px] font-medium text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

function Landing() {
  return (
    <SiteShell>
      <Hero />
      <Benefits />
      <Audiences />
      <Modules />
      <OurStory />
      <FAQ />
      <Ecosystem />
      <FinalCTA />
    </SiteShell>
  );
}
