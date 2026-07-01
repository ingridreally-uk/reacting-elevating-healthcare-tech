import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight, Linkedin } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Product", to: "/product" as const },
  { label: "Features", to: "/features" as const },
  { label: "Resources", to: "/resources" as const },
  { label: "About", to: "/about" as const },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Reacting home">
      <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-foreground" />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Reacting
      </span>
    </Link>
  );
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
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild className="h-9 rounded-full px-4 text-[13px] font-medium">
            <Link to="/book-demo">Book Demo</Link>
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
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-[15px] text-foreground/85 hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-3 h-11 w-full rounded-full">
              <Link to="/book-demo" onClick={() => setOpen(false)}>
                Book Demo
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}


export function SiteFooter() {
  const cols: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Overview", to: "/product" },
        { label: "Features", to: "/features" },
        { label: "Book Demo", to: "/book-demo" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Academy", to: "/resources" },
        { label: "Help Centre", to: "/resources" },
        { label: "Blog", to: "/resources" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
        { label: "Cookies", to: "/cookies" },
      ],
    },
  ];
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-14">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[13.5px] leading-[1.65] text-muted-foreground">
              Reacting builds intelligent cloud software for healthcare
              businesses. Dental Assist is our first product.
            </p>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reacting on LinkedIn"
              className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
                {c.title}
              </div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-muted-foreground">
            © {new Date().getFullYear()} Reacting Ltd. All rights reserved.
          </p>
          <p className="text-[12.5px] text-muted-foreground">
            Dental Assist · A Reacting product · Made in the UK
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
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
      <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-24 lg:px-10 lg:pb-20 lg:pt-24">
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
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {primaryCta && (
                <Button asChild size="lg" className="h-11 rounded-full px-6 text-[13.5px] font-medium">
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
          app.dentalassist.com
        </div>
      </div>
      <div
        className={`${aspect} flex flex-col items-center justify-center gap-2 bg-secondary p-8 text-center`}
      >
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Product screenshot
        </div>
        <div className="text-[18px] font-semibold tracking-tight text-foreground">
          {label}
        </div>
        {caption && (
          <div className="max-w-md text-[13px] leading-[1.5] text-muted-foreground">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
