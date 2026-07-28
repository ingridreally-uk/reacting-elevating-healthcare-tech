import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_LOGIN, APP_SIGNUP } from "./content";
import { btn, iconStroke, layout } from "./design";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-t border-border/30 bg-[#0B2B28] text-white"
    >
      <div className={cn(layout.shell, "py-11 text-center lg:py-12")}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-[20ch] text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[34px]"
          >
            Ready to take control of practice stock and purchasing?
          </h2>
          <p className="mx-auto mt-3 max-w-[44ch] text-[14.5px] leading-[1.65] text-white/70">
            Start your 14-day free trial and bring stock, suppliers, expiry tracking and purchasing
            into one clear workspace.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a
              href={APP_SIGNUP}
              rel="noopener noreferrer"
              className={cn(btn.base, btn.onDarkPrimary, "w-full sm:w-auto")}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
            </a>
            <a
              href={APP_LOGIN}
              rel="noopener noreferrer"
              className={cn(btn.base, btn.onDarkSecondary, "w-full sm:w-auto")}
            >
              Login
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
