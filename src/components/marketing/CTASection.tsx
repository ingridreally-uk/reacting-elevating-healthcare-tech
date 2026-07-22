import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_LOGIN, APP_SIGNUP } from "./content";
import { btn, iconStroke } from "./design";
import { cn } from "@/lib/utils";

export function CTASection({
  title = "Ready to simplify purchasing?",
  body = "Start your free trial today.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-border/60 bg-[linear-gradient(180deg,#0B2B28_0%,#0F3A35_100%)] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-10 text-center lg:px-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="mx-auto max-w-[18ch] text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[38px]">
            {title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-[36ch] text-[14.5px] leading-[1.65] text-white/70">
            {body}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a
              href={APP_SIGNUP}
              className={cn(btn.base, btn.onDarkPrimary, "w-full sm:w-auto")}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" strokeWidth={iconStroke} />
            </a>
            <a
              href={APP_LOGIN}
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
