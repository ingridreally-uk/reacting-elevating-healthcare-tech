import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { APP_SIGNUP } from "./content";
import { btn, iconStroke, layout } from "./design";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-[#0B1730] text-white"
    >
      <div className={cn(layout.shell, "pb-16 pt-14 text-center lg:pb-[4.5rem] lg:pt-16")}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.8_0.08_210)]">
            Dental Assist
          </p>
          <h2
            id="final-cta-heading"
            className="mx-auto mt-3 max-w-[16ch] text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[40px]"
          >
            One current view.
            <span className="block">Fewer unanswered questions.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[40ch] text-[15px] leading-[1.65] text-white/68">
            Bring stock, suppliers and purchasing into one operational workspace your team can
            actually follow.
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
