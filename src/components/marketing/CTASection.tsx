import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { APP_LOGIN, APP_SIGNUP } from "./content";

export function CTASection({
  title = "Ready to simplify purchasing?",
  body = "Start your free trial today.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-border/60 bg-[linear-gradient(180deg,#0B2B28_0%,#0F3A35_100%)] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 text-center lg:px-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="mx-auto max-w-2xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[48px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.65] text-white/70">
            {body}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={APP_SIGNUP}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-[14px] font-semibold text-[#0B2B28] transition hover:bg-white/90 sm:w-auto"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={APP_LOGIN}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/25 px-7 text-[14px] font-medium text-white transition hover:bg-white/10 sm:w-auto"
            >
              Login
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
