import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { APP_SIGNUP } from "./content";
import { btn, iconStroke, layout } from "./design";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-t border-border/20 bg-[#0B1730] text-white"
    >
      <div className={cn(layout.shell, "py-14 text-center lg:py-16")}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.8_0.08_210)]">
            Reacting · Dental Assist
          </p>
          <h2
            id="final-cta-heading"
            className="mx-auto mt-3 max-w-[22ch] text-[30px] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-[40px]"
          >
            Run practice operations with fewer unanswered questions.
          </h2>
          <p className="mx-auto mt-4 max-w-[38ch] text-[15px] leading-[1.65] text-white/68">
            Start a 14-day trial with your own practice in mind. No card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={APP_SIGNUP}
              rel="noopener noreferrer"
              className={cn(btn.base, btn.onDarkPrimary, "w-full sm:w-auto")}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
            </a>
            <Link to="/book-demo" className={cn(btn.base, btn.onDarkSecondary, "w-full sm:w-auto")}>
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
