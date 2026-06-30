import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  BarChart3,
  LineChart,
  Check,
  Cloud,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  Plus,
  Minus,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Reacting home">
      <span
        aria-hidden
        className="inline-block h-6 w-6 rounded-[7px] bg-primary"
        style={{
          background:
            "conic-gradient(from 210deg, var(--primary) 0 60%, var(--accent) 60% 100%)",
        }}
      />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Reacting
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#signin"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </a>
          <Button className="h-9 rounded-full px-4 text-sm">Book Demo</Button>
        </div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-foreground/80 hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <Button className="mt-2 w-full rounded-full">Book Demo</Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard mock (used in hero + product section)                    */
/* ------------------------------------------------------------------ */

function DashboardMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-accent/10 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgb(15_23_42/0.25)]">
        {/* Top chrome */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/70 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="ml-3 flex h-6 max-w-xs flex-1 items-center gap-2 rounded-md bg-background px-2.5 text-[11px] text-muted-foreground">
            <Search className="h-3 w-3" />
            app.dentalassist.com / inventory
          </div>
          <Bell className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-[170px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden border-r border-border/70 bg-secondary/50 p-4 sm:block">
            <div className="mb-4 flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-5 w-5 rounded-md"
                style={{
                  background:
                    "conic-gradient(from 210deg, var(--primary) 0 60%, var(--accent) 60% 100%)",
                }}
              />
              <span className="text-[13px] font-semibold">Dental Assist</span>
            </div>
            <ul className="space-y-0.5 text-[13px]">
              {[
                "Overview",
                "Inventory",
                "Purchasing",
                "Suppliers",
                "RFQs",
                "Reports",
              ].map((item, i) => (
                <li
                  key={item}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 ${
                    i === 1
                      ? "bg-background font-medium text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === 1 ? "bg-accent" : "bg-border"
                    }`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          {/* Main */}
          <div className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Inventory
                </div>
                <div className="mt-0.5 text-base font-semibold tracking-tight">
                  Practice overview
                </div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                  Last 30 days
                </span>
                <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
                  + New order
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Items tracked", v: "1,284", d: "+24 this week" },
                { k: "Low stock", v: "12", d: "Action needed", warn: true },
                { k: "Open POs", v: "7", d: "3 awaiting delivery" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-background p-3.5"
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1 text-lg font-semibold tracking-tight">
                    {s.v}
                  </div>
                  <div
                    className={`mt-1 text-[11px] ${
                      s.warn ? "text-[color:var(--warning)]" : "text-muted-foreground"
                    }`}
                  >
                    {s.d}
                  </div>
                </div>
              ))}
            </div>
            {!compact && (
              <div className="mt-4 rounded-xl border border-border bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-medium">Spend by category</div>
                  <div className="text-[11px] text-muted-foreground">
                    Last 30 days
                  </div>
                </div>
                <div className="flex h-28 items-end gap-1.5">
                  {[40, 65, 50, 80, 55, 72, 48, 90, 60, 75, 58, 84].map(
                    (h, i) => (
                      <div key={i} className="flex flex-1 flex-col gap-1">
                        <div
                          style={{ height: `${h}%` }}
                          className={`w-full rounded-sm ${
                            i % 4 === 0 ? "bg-primary" : "bg-primary/20"
                          }`}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
              {[
                {
                  n: "Composite refills · A2",
                  s: "Henry Schein",
                  t: "Delivered",
                  c: "success",
                },
                {
                  n: "Nitrile gloves · Medium",
                  s: "Wright Cottrell",
                  t: "In transit",
                  c: "muted",
                },
                {
                  n: "Endo files · 25mm",
                  s: "Dentsply Sirona",
                  t: "Approved",
                  c: "accent",
                },
              ].map((r, i) => (
                <div
                  key={r.n}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{r.n}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {r.s}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      r.c === "success"
                        ? "bg-[color:var(--success)]/12 text-[color:var(--success)]"
                        : r.c === "accent"
                          ? "bg-accent/15 text-accent"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {r.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="product" className="relative">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Reacting · Dental Assist
            </div>
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground sm:text-[56px] lg:text-[64px]">
              Spend less time managing your practice.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-[18px]">
              Dental Assist helps dental practices manage inventory, purchasing,
              suppliers and daily operations through one simple cloud platform.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="h-11 rounded-full px-6 text-sm">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-11 rounded-full px-5 text-sm text-foreground hover:bg-secondary"
              >
                <Play className="h-4 w-4" />
                Watch 2-minute Overview
              </Button>
            </div>
          </div>
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust strip                                                        */
/* ------------------------------------------------------------------ */

function TrustStrip() {
  const items = [
    { icon: Cloud, label: "Cloud based" },
    { icon: ShieldCheck, label: "Secure" },
    { icon: RefreshCw, label: "Continuous updates" },
    { icon: MessageCircle, label: "Friendly support" },
  ];
  return (
    <section aria-label="Trust" className="border-y border-border/70 bg-card">
      <div className="mx-auto max-w-6xl px-5 py-7 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <p className="text-sm font-medium text-foreground">
            Built and used daily in a real dental practice.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {items.map((i) => (
              <li
                key={i.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <i.icon className="h-4 w-4 text-accent" />
                {i.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  const cls = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${cls}`}>
      {eyebrow && (
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </div>
      )}
      <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[36px]">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Audiences                                                          */
/* ------------------------------------------------------------------ */

const audiences = [
  {
    title: "Practice Owners",
    points: ["Reduce costs.", "Improve visibility.", "Control purchasing."],
  },
  {
    title: "Practice Managers",
    points: [
      "Simplify inventory.",
      "Manage suppliers.",
      "Save hours every week.",
    ],
  },
  {
    title: "Dental Teams",
    points: [
      "Easy stock counts.",
      "Simple deliveries.",
      "Quick product search.",
    ],
  },
];

function Audiences() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading title="Built for your whole practice." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="group rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.18)]"
            >
              <div className="text-lg font-semibold tracking-tight text-foreground">
                {a.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {a.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-[15px] text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Package,
    title: "Inventory",
    body: "Live stock levels across every room, with low-stock alerts and expiry tracking.",
  },
  {
    icon: ShoppingCart,
    title: "Purchasing",
    body: "Approve, send and track every order from one tidy queue.",
  },
  {
    icon: Truck,
    title: "Supplier Management",
    body: "Keep contacts, pricing and lead times in one organised place.",
  },
  {
    icon: FileText,
    title: "RFQs",
    body: "Send requests for quotes to multiple suppliers and compare side by side.",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    body: "Clear monthly reports on spend, usage and supplier performance.",
  },
  {
    icon: LineChart,
    title: "Analytics",
    body: "Spot trends, forecast demand and find savings across the practice.",
  },
];

function Features() {
  return (
    <section id="features" className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Core Features"
          title="Everything a modern practice needs."
          body="One platform for the day-to-day work that keeps the practice running smoothly."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.18)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground ring-1 ring-inset ring-border">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-[17px] font-semibold tracking-tight text-foreground">
                {f.title}
              </div>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                {f.body}
              </p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-foreground"
              >
                Learn more
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Product screenshot section                                         */
/* ------------------------------------------------------------------ */

function ProductShowcase() {
  return (
    <section className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            The Product
          </div>
          <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[36px]">
            Designed for busy practices.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            Simple enough for every member of the team — from the front desk to
            the surgery.
          </p>
        </div>
        <div className="mt-14">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Built in practice                                                  */
/* ------------------------------------------------------------------ */

function BuiltInPractice() {
  return (
    <section id="about" className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Our Approach
            </div>
            <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[36px]">
              Built inside a real dental practice.
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted-foreground">
              <p>
                Dental Assist wasn't imagined in a meeting room. It was
                developed and refined inside a working dental practice to solve
                real operational problems.
              </p>
              <p>Every feature has been shaped by day-to-day use.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Chairside", v: "Tested" },
                { k: "Iterations", v: "Weekly" },
                { k: "Workflows", v: "Real" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-card px-4 py-3"
                >
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1 text-base font-semibold tracking-tight">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Authentic imagery placeholder — abstract, not stock */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-2xl"
            />
            <div
              aria-hidden
              role="img"
              aria-label="Workspace inside a dental practice"
              className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-[0_30px_80px_-40px_rgb(15_23_42/0.25)]"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.21 0.034 264) 0%, oklch(0.34 0.13 268) 60%, oklch(0.7 0.105 192) 100%)",
              }}
            >
              <div className="flex h-full w-full flex-col justify-between p-8 text-primary-foreground">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] opacity-80">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                  From the practice
                </div>
                <div>
                  <div className="text-[24px] font-medium leading-snug tracking-tight">
                    "We built the tool we wished we had — then we kept refining
                    it, day after day, in the practice."
                  </div>
                  <div className="mt-5 text-sm opacity-80">
                    The Reacting team
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Videos                                                             */
/* ------------------------------------------------------------------ */

const videos = [
  { title: "Inventory", desc: "Counts, alerts and expiry tracking." },
  { title: "Purchasing", desc: "Approve and send orders in seconds." },
  { title: "RFQs", desc: "Compare supplier quotes side by side." },
  { title: "Reports", desc: "Monthly spend and usage at a glance." },
];

function Videos() {
  return (
    <section id="resources" className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading title="See Dental Assist in action." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <button
              key={v.title}
              type="button"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.18)]"
              aria-label={`Play ${v.title} overview`}
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(140deg, oklch(0.21 0.034 264) 0%, oklch(0.34 0.13 268) 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/95 text-foreground shadow-[0_8px_24px_-8px_rgb(15_23_42/0.4)] transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2 py-0.5 text-[11px] font-medium text-foreground">
                  2:14
                </div>
              </div>
              <div className="p-5">
                <div className="text-[15px] font-semibold tracking-tight text-foreground">
                  {v.title}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "How long does setup take?",
    a: "Most practices are up and running within a day. We help you import your existing stock list and set up your team accounts on a guided onboarding call.",
  },
  {
    q: "Can we import our stock?",
    a: "Yes. We accept CSV exports from most existing systems and our team will help you map fields and clean up data before going live.",
  },
  {
    q: "Is training included?",
    a: "Every plan includes onboarding and live training for your team, plus a library of short how-to videos you can come back to anytime.",
  },
  {
    q: "How secure is the platform?",
    a: "Data is encrypted in transit and at rest, hosted in UK and EU data centres, with role-based access controls and full audit logs.",
  },
  {
    q: "Can multiple practices use it?",
    a: "Yes. Groups can manage multiple sites from a single account, with per-site permissions, shared supplier catalogues and consolidated reporting.",
  },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[16px] font-medium tracking-tight text-foreground">
          {q}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pr-10 text-[15px] leading-relaxed text-muted-foreground">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <section className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              FAQ
            </div>
            <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[36px]">
              Questions, answered.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Can't find what you're looking for? Get in touch — we reply
              personally within a working day.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-6 sm:px-8">
            {faqs.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-8 lg:py-32">
        <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[44px]">
          Ready to simplify your practice?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
          See Dental Assist in a short, tailored walkthrough — or send us a
          question and we'll get back to you.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="h-11 rounded-full px-6">
            Book a Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 rounded-full border-border bg-card px-6 hover:bg-secondary"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Dental Assist", "Features", "Roadmap", "Changelog"],
    },
    {
      title: "Resources",
      links: ["Help centre", "Guides", "Videos", "Status"],
    },
    {
      title: "Company",
      links: ["About", "Contact", "LinkedIn", "Careers"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "DPA"],
    },
  ];
  return (
    <footer id="pricing" className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Intelligent cloud software for healthcare businesses. Dental
              Assist is the first product in the Reacting family.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-[13px] font-semibold tracking-tight text-foreground">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Reacting. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">
            Coming next: Vet Assist · Medical Assist · Optical Assist
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function Landing() {
  return (
    <div id="top" className="min-h-dvh bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Audiences />
        <Features />
        <ProductShowcase />
        <BuiltInPractice />
        <Videos />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
