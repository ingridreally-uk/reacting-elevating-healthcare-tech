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
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Assist by Reacting — Practice management, simplified" },
      {
        name: "description",
        content:
          "Dental Assist helps dental practices manage inventory, purchasing, suppliers and daily operations from one simple cloud platform.",
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

const audiences = [
  {
    title: "Practice Owners",
    body: "Reduce costs, improve visibility and stay in control.",
  },
  {
    title: "Practice Managers",
    body: "Simplify purchasing, suppliers and inventory.",
  },
  {
    title: "Dental Teams",
    body: "Easy stock counts, deliveries and product tracking.",
  },
];

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

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2">
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Reacting
      </span>
      <span className="hidden text-sm text-muted-foreground sm:inline">
        / Dental Assist
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
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
        <div className="hidden md:block">
          <Button className="rounded-full px-5">Book Demo</Button>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-muted"
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

function DashboardMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/5 blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        {/* Top chrome */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="ml-3 h-6 w-56 max-w-full rounded-md bg-background" />
        </div>
        <div className="grid grid-cols-[160px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden border-r border-border/70 bg-muted/30 p-4 sm:block">
            <div className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Practice
            </div>
            <ul className="space-y-1.5 text-sm">
              {["Overview", "Inventory", "Purchasing", "Suppliers", "RFQs", "Reports"].map(
                (item, i) => (
                  <li
                    key={item}
                    className={`rounded-md px-2.5 py-1.5 ${
                      i === 1
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-foreground/70"
                    }`}
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </aside>
          {/* Main */}
          <div className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Inventory</div>
                <div className="text-base font-semibold">This month</div>
              </div>
              <div className="hidden items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground sm:flex">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                On track
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Items", v: "1,284" },
                { k: "Low stock", v: "12" },
                { k: "Open POs", v: "7" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-background p-3"
                >
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1 text-lg font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
            {/* Chart */}
            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-medium">Spend by category</div>
                <div className="text-xs text-muted-foreground">Last 30 days</div>
              </div>
              <div className="flex h-28 items-end gap-2">
                {[40, 65, 50, 80, 55, 72, 48, 90, 60, 75, 58, 84].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-md ${
                      i % 3 === 0 ? "bg-primary" : "bg-primary/25"
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* List */}
            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
              {[
                { n: "Composite refills", s: "Henry Schein", t: "Delivered" },
                { n: "Nitrile gloves M", s: "Wright Cottrell", t: "In transit" },
                { n: "Endo files 25mm", s: "Dentsply", t: "Approved" },
              ].map((r, i) => (
                <div
                  key={r.n}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{r.n}</div>
                    <div className="truncate text-xs text-muted-foreground">{r.s}</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-foreground/70">
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

function Hero() {
  return (
    <section id="product" className="relative">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Reacting · Dental Assist
            </div>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Spend less time managing your practice.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Dental Assist helps dental practices manage inventory, purchasing,
              suppliers and daily operations from one simple cloud platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="rounded-full px-6">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-5 text-foreground"
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
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p>
      )}
    </div>
  );
}

function Audiences() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeading title="Built for your whole practice." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="group rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]"
            >
              <div className="text-lg font-semibold text-foreground">{a.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Core Features"
          title="Everything a modern practice needs."
          body="One platform for the day-to-day work that keeps the practice running."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-base font-semibold text-foreground">
                {f.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const points = [
    "Designed from real daily workflows, not assumptions.",
    "Tested chairside before any feature ships.",
    "Built to reduce admin, not add to it.",
  ];
  return (
    <section id="about" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Our Approach
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Built inside a real dental practice.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Dental Assist wasn't designed in a boardroom. Every feature comes
              from the daily reality of running a practice — the stock counts,
              the supplier calls, the orders that never arrived on time. We
              shipped it where it was needed and refined it from there.
            </p>
            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground/80">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)] lg:p-10">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              From the workshop
            </div>
            <p className="mt-4 text-xl font-medium leading-snug text-foreground sm:text-2xl">
              "We built the tool we wished we had — then we kept refining it,
              day after day, in the practice."
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              The Reacting team
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="resources" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Ready to simplify your practice?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          See Dental Assist in a short, tailored walkthrough — or send us a
          question and we'll get back to you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full px-6">
            Book a Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-6"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="pricing" className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center lg:px-8">
        <div>
          <div className="text-sm font-semibold text-foreground">Reacting</div>
          <div className="text-xs text-muted-foreground">
            Intelligent cloud software for healthcare businesses.
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Reacting. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Audiences />
        <Features />
        <Story />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
