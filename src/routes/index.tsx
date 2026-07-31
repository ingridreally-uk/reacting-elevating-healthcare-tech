import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteChrome";
import { MarketingHero } from "@/components/marketing/MarketingHero";
import { DayInPractice } from "@/components/marketing/DayInPractice";
import { PricingCard } from "@/components/marketing/PricingCard";
import { FAQ } from "@/components/marketing/FAQ";
import { faqs } from "@/components/marketing/faq-data";
import { CTASection } from "@/components/marketing/CTASection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { TrustSignals } from "@/components/marketing/TrustSignals";
import { PracticeProblems } from "@/components/marketing/PracticeProblems";
import { Outcomes } from "@/components/marketing/Outcomes";
import { SCREENS } from "@/components/marketing/content";
import { SITE_ORIGIN } from "@/lib/site-url";

const HOME_TITLE = "Dental Practice Stock & Purchasing Software | Dental Assist";
const HOME_DESCRIPTION =
  "Dental Assist gives UK dental practices one clear view of stock, expiry, suppliers, quotes, purchase orders and monthly spend. Start a 14-day free trial.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/` },
      { property: "og:site_name", content: "Reacting" },
      {
        property: "og:image",
        content: `${SITE_ORIGIN}/og-reacting-dental-assist.png`,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Dental Assist dashboard showing practice stock, spend and actions requiring attention",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESCRIPTION },
      {
        name: "twitter:image",
        content: `${SITE_ORIGIN}/og-reacting-dental-assist.png`,
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_ORIGIN}/` },
      {
        rel: "preload",
        as: "image",
        href: SCREENS.dashboard,
        type: "image/webp",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "@id": `${SITE_ORIGIN}/#dental-assist`,
              name: "Dental Assist",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: SITE_ORIGIN,
              description: HOME_DESCRIPTION,
              audience: {
                "@type": "BusinessAudience",
                audienceType: "UK dental practices",
              },
              offers: {
                "@type": "Offer",
                price: "59",
                priceCurrency: "GBP",
                category: "subscription",
                url: "https://app.reacting.io/signup",
              },
              provider: { "@id": `${SITE_ORIGIN}/#organization` },
              isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_ORIGIN}/#faq`,
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: MarketingHome,
});

/**
 * Art-directed homepage architecture:
 * Hero → Trust → Problems → Day journey (product story) → Outcomes → Onboarding → Pricing → FAQ → Trial
 * Features + Tour merged into one memorable journey.
 */
function MarketingHome() {
  return (
    <SiteShell>
      <MarketingHero />
      <TrustSignals />
      <PracticeProblems />
      <DayInPractice />
      <Outcomes />
      <HowItWorks />

      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="scroll-mt-24 border-b border-border/40 bg-background"
      >
        <div className="mx-auto max-w-[1200px] px-6 py-14 lg:px-10 lg:py-16">
          <PricingCard />
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#F1F5F9]">
        <div className="mx-auto max-w-[1200px] px-6 py-14 lg:px-10 lg:py-16">
          <FAQ />
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
