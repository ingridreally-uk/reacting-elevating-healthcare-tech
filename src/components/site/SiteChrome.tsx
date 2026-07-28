import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ReactingLogoLink } from "./ReactingLogo";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Product tour", href: "/#product-gallery" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function Logo(_props: { height?: number } = {}) {
  return <ReactingLogoLink widthClassName="w-[135px] md:w-[160px]" />;
}

function HeaderLogo() {
  return <ReactingLogoLink widthClassName="w-[135px] md:w-[160px]" />;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/90 shadow-[0_1px_0_rgb(15_23_42/0.02)] backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <HeaderLogo />
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-sm text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://app.reacting.io/login"
            rel="noopener noreferrer"
            className="rounded-sm px-3 py-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Login
          </a>
          <Button asChild className="h-9 rounded-full px-4 text-[13px] font-medium">
            <a href="https://app.reacting.io/signup" rel="noopener noreferrer">
              Start Free Trial
            </a>
          </Button>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-[15px] text-foreground/85 hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://app.reacting.io/login"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-[15px] text-foreground/85 hover:bg-secondary"
            >
              Login
            </a>
            <Button asChild className="mt-3 h-11 w-full rounded-full">
              <a
                href="https://app.reacting.io/signup"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Start Free Trial
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { rel: "noopener noreferrer" } : {})}
      className="rounded-sm text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {label}
    </a>
  );
}

export function SiteFooter() {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Product tour", href: "/#product-gallery" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Login", href: "https://app.reacting.io/login" },
        { label: "Start Free Trial", href: "https://app.reacting.io/signup" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-[#FBFDFC]">
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-10 lg:px-10 lg:pb-9 lg:pt-11">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_1fr_1fr] lg:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <ReactingLogoLink widthClassName="w-[140px]" />
            <p className="mt-4 max-w-[34ch] text-[13px] leading-[1.7] text-muted-foreground">
              Reacting builds practical operational software for modern dental practices. Dental
              Assist is our first product.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink label={l.label} href={l.href} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} Reacting Ltd. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
            <li>
              <FooterLink label="Privacy Policy" href="/privacy" />
            </li>
            <li>
              <FooterLink label="Terms" href="/terms" />
            </li>
            <li>
              <FooterLink label="Cookie Policy" href="/cookies" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}) {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-14 lg:px-10 lg:pb-12 lg:pt-16">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="mb-5 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </div>
          )}
          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[52px] lg:text-[60px]">
            {title}
          </h1>
          {body && (
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-muted-foreground sm:text-[18px]">
              {body}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-full px-6 text-[13.5px] font-medium"
                >
                  <Link to={primaryCta.to}>
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-11 rounded-full px-5 text-[13.5px] font-medium text-foreground hover:bg-secondary"
                >
                  <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ScreenshotPlaceholder({
  label,
  caption,
  aspect = "aspect-[16/10]",
}: {
  label: string;
  caption?: string;
  aspect?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_80px_-40px_rgb(15_23_42/0.18),0_2px_4px_-2px_rgb(15_23_42/0.06)]">
      <div className="flex items-center gap-2 border-b border-border/70 bg-[#F8FAFC] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="ml-3 hidden h-6 flex-1 items-center justify-center rounded-md border border-border/70 bg-background px-2.5 text-[11px] text-muted-foreground sm:flex">
          app.reacting.io
        </div>
      </div>
      <div
        className={`${aspect} flex flex-col items-center justify-center gap-2 bg-secondary p-8 text-center`}
      >
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Product screenshot
        </div>
        <div className="text-[18px] font-semibold tracking-tight text-foreground">{label}</div>
        {caption && (
          <div className="max-w-md text-[13px] leading-[1.5] text-muted-foreground">{caption}</div>
        )}
      </div>
    </div>
  );
}
