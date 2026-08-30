import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PUBLIC_ENQUIRY_EMAIL } from "@/lib/leads/constants";
import type { LeadResultCode } from "@/lib/leads/processLead";

export function LeadPrivacyNote() {
  return (
    <p className="text-center text-[12px] leading-[1.55] text-muted-foreground">
      See our{" "}
      <Link to="/privacy" className="text-foreground underline-offset-4 hover:underline">
        Privacy Policy
      </Link>
      .
    </p>
  );
}

export function LeadError({ code }: { code: LeadResultCode | "network" }) {
  return (
    <div className="rounded-xl border border-border bg-[#F8FAFC] px-4 py-3.5" role="alert">
      <p className="text-[14px] leading-[1.6] text-foreground">
        We couldn't send that just now. Please try again, or email{" "}
        <a
          href={`mailto:${PUBLIC_ENQUIRY_EMAIL}`}
          className="underline underline-offset-4 hover:text-foreground"
        >
          {PUBLIC_ENQUIRY_EMAIL}
        </a>
        .
      </p>
      {code === "validation" ? (
        <p className="mt-1.5 text-[13px] leading-[1.55] text-muted-foreground">
          Please check the required fields and email address.
        </p>
      ) : null}
    </div>
  );
}

export function LeadSuccess({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // The form collapses to this shorter card on success, so the viewport can be
  // left below the confirmation on mobile.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  }, []);

  return (
    <div ref={ref} className="py-5 sm:py-6" role="status">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background">
        <Check className="h-4 w-4 text-foreground" strokeWidth={1.75} />
      </span>
      <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">Sent</div>
      <h2 className="mt-3 text-[22px] font-semibold tracking-tight text-foreground sm:text-[24px]">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{children}</p>
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] leading-[1.45] text-foreground">
      {message}
    </p>
  );
}

export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function HoneypotInput() {
  return (
    <div aria-hidden className="pointer-events-none absolute -left-[10000px] h-0 w-0 overflow-hidden">
      <label htmlFor="faxNumber">Company website</label>
      <input
        id="faxNumber"
        name="faxNumber"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
