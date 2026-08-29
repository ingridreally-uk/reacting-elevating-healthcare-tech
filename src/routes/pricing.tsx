import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { PricingCard } from "@/components/marketing/PricingCard";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageMeta({
      title: "Pricing | Dental Assist by Reacting",
      description:
        "One monthly practice plan for Dental Assist. 14-day free trial, no per-seat pricing, no credit card required.",
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteShell>
      <section aria-labelledby="pricing-heading" className="bg-background">
        <div className="mx-auto max-w-[1200px] px-6 pb-9 pt-10 lg:px-10 lg:pb-10 lg:pt-10">
          <PricingCard />
        </div>
      </section>
    </SiteShell>
  );
}
