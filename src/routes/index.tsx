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
  Plus,
  Minus,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteChrome";

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
  { label: "About", href: "#about" },
];

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Reacting home">
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full bg-foreground"
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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button className="h-9 rounded-full px-4 text-[13px] font-medium">
            Book Demo
          </Button>
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
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
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
/*  Dashboard mock                                                     */
/* ------------------------------------------------------------------ */

function DashboardPreview() {
  return (
    <div className="relative">
      {/* Window frame */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_80px_-40px_rgb(15_23_42/0.22),0_2px_4px_-2px_rgb(15_23_42/0.06)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-[#F8FAFC] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="ml-3 hidden h-6 max-w-xs flex-1 items-center gap-2 rounded-md border border-border/70 bg-background px-2.5 text-[11px] text-muted-foreground sm:flex">
            <Search className="h-3 w-3" />
            app.dentalassist.com / inventory
          </div>
        </div>

        <div className="grid grid-cols-[180px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden border-r border-border/70 bg-[#F8FAFC] p-4 sm:block">
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

          {/* Main */}
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
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28 lg:px-10 lg:pb-32 lg:pt-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <div className="mb-5 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              Dental Assist
            </div>
            <h1 className="text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[56px] lg:text-[64px]">
              Spend less time managing your practice.
            </h1>
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.6] text-muted-foreground sm:text-[18px]">
              Manage inventory, purchasing, suppliers and day-to-day operations
              through one simple cloud platform built for modern dental practices.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-11 rounded-full px-5 text-[13.5px] font-medium text-foreground hover:bg-secondary"
              >
                <Play className="h-4 w-4" />
                Watch Overview
              </Button>
            </div>
          </div>
          <DashboardPreview />
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
  align = "left",
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
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </div>
      )}
      <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px]">
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-[16.5px] leading-[1.6] text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */

const benefits = [
  "Stop using spreadsheets.",
  "Know exactly what is in stock.",
  "Compare supplier prices faster.",
  "Reduce expired materials.",
  "Give your whole team one simple workflow.",
];

function Benefits() {
  return (
    <section id="features" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Why Dental Assist"
          title="Why practices choose Dental Assist."
        />
        <ul className="mt-14 divide-y divide-border border-y border-border">
          {benefits.map((b, i) => (
            <li
              key={b}
              className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-secondary/40 sm:py-7"
            >
              <div className="flex items-center gap-6">
                <span className="w-6 text-[12px] font-medium tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[18px] font-medium tracking-tight text-foreground sm:text-[20px]">
                  {b}
                </span>
              </div>
              <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground sm:block" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Audiences                                                          */
/* ------------------------------------------------------------------ */

const audiences = [
  {
    title: "Practice Owners",
    body: "Control costs, monitor spending and improve visibility.",
  },
  {
    title: "Practice Managers",
    body: "Simplify purchasing, suppliers and stock management.",
  },
  {
    title: "Dental Teams",
    body: "Easy stock counts, simple deliveries and quick product search.",
  },
];

function Audiences() {
  return (
    <section className="border-t border-border/60 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading title="Built for your whole practice." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.15)]"
            >
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  0{i + 1}
                </div>
                <div className="mt-4 text-[20px] font-semibold tracking-tight text-foreground">
                  {a.title}
                </div>
                <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                  {a.body}
                </p>
              </div>
              <div className="mt-10 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                Learn more
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Core modules (bento with hierarchy)                                */
/* ------------------------------------------------------------------ */

const modules = [
  {
    title: "Inventory",
    body: "Track every item, every location, in real time. Set par levels and get alerts before you run out.",
    icon: Package,
  },
  {
    title: "Purchasing",
    body: "Raise, approve and track orders in one place. No more paper trails.",
    icon: ShoppingCart,
  },
  {
    title: "Supplier Management",
    body: "All your suppliers, contacts and price lists in one tidy directory.",
    icon: Truck,
  },
  {
    title: "RFQs",
    body: "Request quotes from multiple suppliers and compare side by side.",
    icon: FileText,
  },
  {
    title: "Reports",
    body: "Understand spend, usage and waste across the practice.",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    body: "Spot trends and make confident decisions about your operations.",
    icon: LineChart,
  },
];

function Modules() {
  return (
    <section id="resources" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Core Modules"
          title="Everything your practice needs, in one platform."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Featured */}
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.15)] lg:col-span-2 lg:row-span-2 lg:p-10">
            <Package className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            <div className="mt-8 text-[24px] font-semibold tracking-tight sm:text-[28px]">
              Inventory
            </div>
            <p className="mt-3 max-w-md text-[15.5px] leading-[1.6] text-muted-foreground">
              {modules[0].body}
            </p>

            {/* Mini visual */}
            <div className="mt-10 overflow-hidden rounded-xl border border-border bg-[#F8FAFC]">
              {[
                { n: "Composite refills · A2", q: "24", s: "in stock" },
                { n: "Nitrile gloves · M", q: "6", s: "low", accent: true },
                { n: "Endo files · 25mm", q: "48", s: "in stock" },
                { n: "Anaesthetic · 2%", q: "12", s: "in stock" },
              ].map((r, i) => (
                <div
                  key={r.n}
                  className={`flex items-center justify-between px-4 py-3 text-[13px] ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <span className="truncate font-medium text-foreground">
                    {r.n}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="tabular-nums text-muted-foreground">
                      {r.q}
                    </span>
                    <span
                      className={`text-[11px] ${
                        r.accent ? "text-accent" : "text-muted-foreground"
                      }`}
                    >
                      {r.s}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Smaller */}
          {modules.slice(1, 3).map((m) => (
            <div
              key={m.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.15)]"
            >
              <m.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <div className="mt-6 text-[17px] font-semibold tracking-tight">
                {m.title}
              </div>
              <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">
                {m.body}
              </p>
            </div>
          ))}

          {/* Bottom row */}
          {modules.slice(3).map((m) => (
            <div
              key={m.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgb(15_23_42/0.15)]"
            >
              <m.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <div className="mt-6 text-[17px] font-semibold tracking-tight">
                {m.title}
              </div>
              <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Built inside a real practice                                       */
/* ------------------------------------------------------------------ */

function BuiltInPractice() {
  return (
    <section id="about" className="border-t border-border/60 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              The story
            </div>
            <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px]">
              Built inside a real dental practice.
            </h2>
          </div>
          <div>
            <p className="text-[18px] leading-[1.7] text-foreground/85">
              Dental Assist was developed and refined inside a working dental
              practice to solve real daily operational problems. Every feature is
              shaped by real workflows, not assumptions.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-10 border-t border-border pt-10">
              <div>
                <div className="text-[28px] font-semibold tracking-tight">
                  Real practice
                </div>
                <p className="mt-1 text-[13.5px] text-muted-foreground">
                  Built where it&apos;s used.
                </p>
              </div>
              <div>
                <div className="text-[28px] font-semibold tracking-tight">
                  Real workflows
                </div>
                <p className="mt-1 text-[13.5px] text-muted-foreground">
                  Not assumptions.
                </p>
              </div>
            </div>
          </div>
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
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              FAQ
            </div>
            <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px]">
              Questions, answered.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Get in touch and we&apos;ll
              walk you through it.
            </p>
          </div>
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
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="pb-7 pr-10 text-[15px] leading-[1.7] text-muted-foreground">
                      {f.a}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
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
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[52px]">
            Ready to simplify your practice?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.6] text-muted-foreground">
            See how Dental Assist replaces spreadsheets and paper with one calm,
            connected platform.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
              Book Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-11 rounded-full px-6 text-[13.5px] font-medium text-foreground hover:bg-secondary"
            >
              Contact Us
            </Button>
          </div>
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
      links: ["Overview", "Features", "Modules", "Roadmap"],
    },
    {
      title: "Company",
      links: ["About", "Story", "Contact"],
    },
    {
      title: "Resources",
      links: ["Help center", "Guides", "Security"],
    },
  ];
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13.5px] leading-[1.6] text-muted-foreground">
              Reacting builds intelligent cloud software for healthcare
              businesses. Dental Assist is the first product.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-7 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-muted-foreground">
            © {new Date().getFullYear()} Reacting. All rights reserved.
          </p>
          <p className="text-[12.5px] text-muted-foreground">
            Dental Assist · A Reacting product
          </p>
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
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Benefits />
        <Audiences />
        <Modules />
        <BuiltInPractice />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
