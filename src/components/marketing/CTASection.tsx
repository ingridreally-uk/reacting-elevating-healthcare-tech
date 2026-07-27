import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_LOGIN, APP_SIGNUP } from "./content";
import { btn, iconStroke, layout } from "./design";
import { cn } from "@/lib/utils";

export function CTASection({
  title = "Ready for clearer practice operations?",
  body = "Start your free trial and bring stock, suppliers and purchasing into one workspace.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="final-cta-heading" className="relative">
      {/* Spacing bridge from FAQ — rhythm, not a gradient wash */}
      <div aria-hidden className="h-10 bg-[#F7FBF9] sm:h-12 lg:h-14" />
      <div className="border-t border-border/30 bg-[#0B2B28] text-white">
        <div className={cn(layout.shell, "py-14 text-center lg:py-16")}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <h2
              id="final-cta-heading"
              className="mx-auto max-w-[18ch] text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[38px]"
            >
              {title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-[38ch] text-[15px] leading-[1.65] text-white/70">
              {body}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={APP_SIGNUP} className={cn(btn.base, btn.onDarkPrimary, "w-full sm:w-auto")}>
                Start Free Trial
                <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
              </a>
              <a href={APP_LOGIN} className={cn(btn.base, btn.onDarkSecondary, "w-full sm:w-auto")}>
                Login
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
