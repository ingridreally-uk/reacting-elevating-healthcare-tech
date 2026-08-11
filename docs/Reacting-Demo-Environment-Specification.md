REACTING DEMO ENVIRONMENT SPECIFICATION
Permanent Specification — v1.0
________________________________________
Status

This is a specification, not an implementation task list. It defines the single fictional environment that every future public-facing asset — website, screenshots, product video, sales demos, documentation, investor presentations, marketing — must be captured from.

Nothing in this document has been built, filmed, or captured. No dataset has been created. No code or asset in this repository has been changed.

Governs: Reacting-Design-Bible.md, REACTING WEBSITE PLAYBOOK.md, Product-Demo-Video-Storyboard.md, Product-Demo-Video-Shot-List.md
This document must not contradict any of them. Where it makes a judgement call, the reasoning is stated so it can be checked against all four.

Source-document note: `docs/Product-Readiness-Review.md` and a document named "Tier 0 Production & Trust Audit" could not be located in this repository or in prior session history. In their place, this specification is grounded in a first-hand, read-only audit of every current public-facing marketing asset in this codebase, cross-referenced against the PII finding (B4) already recorded in `Product-Demo-Video-Shot-List.md`. That audit's findings are folded into §9 (Migration Plan) as the factual baseline. If either source document exists outside this workspace, this spec should be reconciled against it before final approval.
________________________________________
Why this exists

The current public asset set already fails the trust bar Reacting is trying to set for the entire dental industry. Committed marketing screenshots contain real-looking personal Gmail addresses, a real headshot, real personal names, and real supplier names (Henry Schein, Kent Express, and others) attached to fabricated prices, ratings and delivery promises inside the interactive `/rfq-comparison` demo. This is not a cosmetic issue — it is the exact failure mode the Website Playbook warns against: a visitor who notices this stops believing "these people understand how practices operate" and starts wondering what else isn't real.

The fix is not to blur, crop, or edit any of this. Per the objective, every affected asset is replaced at the source, by capturing everything from one clean, permanent, fictional demonstration environment.
________________________________________
1. Demo Environment Principles

Maximum 10. Every rule below exists to survive contact with a deadline — "we just need one quick screenshot" is not an exception to any of them.

1. No real people. Not staff, not patients, not stock photography of dentists — no photographic likeness of any human, ever.
2. No real emails. Every address uses an IANA-reserved, non-resolvable domain (RFC 2606 `.test` / `.example`) so nothing can ever be delivered to, or squatted by, a real inbox.
3. No real customer data, ever. No screenshot, video, or export may be captured from a live customer account, a staging copy of one, or any account seeded with imported real practice data.
4. No real supplier commercial claims. Real supplier names may appear only as a neutral compatibility statement (§4) — never with an invented price, rating, delivery SLA, or account history attached.
5. No real practices, addresses, or postcodes. The demo practice and its location are fictional composites, not modelled on any identifiable real practice.
6. Realistic, not decorative, data. Every number, name and status must look like it came from a genuinely busy practice — no "test", no placeholder Lorem ipsum, no zero-value fields, no obviously fake round numbers.
7. One dataset, one truth. Every asset — website, video, deck, PDF — is generated from the same seeded environment and the same underlying dataset. No two assets may show different numbers for the same fact.
8. Captured, never composited. Every screenshot and video frame is a live capture of the running product. Nothing is built, retouched, or assembled in a design tool.
9. Reusable forever. The environment is built once and re-seeded to the same canonical state for every future capture session — it is not rebuilt from scratch per campaign.
10. Cropping is framing, not editing. Resizing or cropping a capture for a placement is allowed. Altering, blurring, or removing any name, number, or detail within the frame is not — if something in frame shouldn't be public, the environment is fixed, not the picture.
________________________________________
2. Demo Practice

One fictional practice, used everywhere, forever.

- Practice name: Aldergate Dental Care
- Location: A fictional composite market town in the South East of England. No real street address, postcode, or Google Maps pin is ever attached to it — this removes the main way a fictional name could ever collide with a real, identifiable premises.
- Branding style: Understated and clinical-professional, in the same register as real UK independent practices (name + "Dental Care", not a gimmicky consumer brand). Its in-app palette is a single muted accent (deep teal) on white — calm and premium, never bright "friendly dental" colours — so it reads as a serious, established business inside every screenshot, consistent with Design Bible Chapter 6.
- Practice type: Independent, single-site, mixed NHS and private (private-majority), general and cosmetic dentistry with a light specialist list (implants, orthodontics). This matches Reacting's primary buyer (an independent practice owner, not yet a corporate group) and gives enough clinical variety to justify a believable, varied product catalogue.
- Number of surgeries: 6.
- Number of staff: ~19 — 1 principal dentist/owner, 4 associate dentists, 1 hygienist, 7 nurses, 1 practice manager, 1 head nurse/ordering lead, 3 reception, 1 part-time bookkeeper.
- Realistic scale: Large enough to generate genuine operational complexity (multiple suppliers, a real RFQ with competing quotes, a believable monthly spend in the low tens of thousands of pounds) without looking like an aspirational enterprise showcase. This is deliberately the practice Reacting's actual first customers look like — not the largest plausible practice, the most representative one.

Governance note: before this name is locked in as permanent, run a one-time UK Companies House / CQC register / search-engine check to confirm no operating practice currently trades under this exact name (see §10). This spec proceeds on that basis, not on a guarantee.
________________________________________
3. Demo Users

Every account uses the reserved domain `@aldergatedentalcare.test` — guaranteed to never resolve or be deliverable, per Principle 2. Avatars are never photographic: every user shows a two-letter initials chip in Reacting's own accent colour system, the same treatment used for every other identity element in the product. This permanently removes the "real headshot in a screenshot" problem found in the current asset set — it isn't a workaround, it's the default identity style going forward.

| Name | Role | Avatar style | Email | Permissions |
|---|---|---|---|---|
| Owen Faraday | Principal Dentist / Owner | Initials chip "OF" | owen.faraday@aldergatedentalcare.test | Full access — dashboard, spend, budgets, all reports, no day-to-day ordering actions required of him |
| Priya Chandra | Practice Manager | Initials chip "PC" | priya.chandra@aldergatedentalcare.test | Purchasing, budgets, supplier management, reporting, approves purchase orders over a threshold |
| Callum Reid | Head Nurse / Ordering Lead | Initials chip "CR" | callum.reid@aldergatedentalcare.test | Stock, low stock, RFQs, purchase orders, deliveries — the primary operator of the workflow shown in the video |
| Mia Thornton | Staff Nurse | Initials chip "MT" | mia.thornton@aldergatedentalcare.test | Everyday stock actions only — take an item, update a quantity, flag a shortage. No purchasing, no financial visibility |
| Jade Osei | Reception | Initials chip "JO" | jade.osei@aldergatedentalcare.test | View-only status (has an order arrived?) — no financial or purchasing access, matching the Design Bible's reception principle |

Five roles, matching every persona named in the Design Bible and Website Playbook (Owner, Manager, Head Nurse, Nurse, Reception) — no more, so the roster stays memorable rather than becoming its own maintenance burden.
________________________________________
4. Demo Suppliers

Two different rules apply, and mixing them is exactly what caused the current problem.

**Real public companies — compatibility mentions only.**
Reacting may state, in plain text and without attached numbers, that it works alongside suppliers practices already use — e.g. "compatible with suppliers like Henry Schein, Trycare, Kent Express and Dental Directory." This is a true, defensible, non-comparative statement of category compatibility. It is the only context in which a real supplier name may ever appear.

**Anything with invented data attached — fictional suppliers only.**
The moment a supplier is shown with a price, a delivery rating, a quote date, an account reference, a contact name, or an order history — all of which are fabricated for demo purposes — attaching that fabrication to an identifiable real company is a factual-misrepresentation risk, not just a branding inconsistency (this is exactly what `/rfq-comparison` does today with Henry Schein, Dental Sky, Wright Health and Kent Express). Every supplier inside stock, RFQs, purchase orders, deliveries, reports, the video and website screenshots is therefore 100% fictional:

| Fictional supplier | Style it replaces | Rationale |
|---|---|---|
| Ashcombe Dental Supply Co. | Henry Schein (largest, broadest range) | Reads as an established, large national wholesaler |
| Blackthorn Dental Wholesale | Dental Sky (fastest delivery, lowest minimum order) | Reads as a leaner, next-day specialist |
| Ferrow & Vale Dental | Wright Health (slower, higher minimum order) | Reads as a traditional, higher-touch regional supplier |
| Marlin Dental Distribution | Kent Express (mid-range on every metric) | Reads as a solid, mid-market generalist |

Every fictional supplier gets a reserved `.test` domain contact email (e.g. `orders@ashcombedental.test`) — never a real-looking Gmail address, closing the exact gap found in the current screenshots.

Governance note: run the same one-time name-collision check described in §2 against UK Companies House before these four names are finalised.
________________________________________
5. Demo Products

One recurring catalogue, used identically across Stock, RFQs, Deliveries, Purchase Orders, Reports, the video, and every website screenshot. No page is ever seeded with a different set of products than any other page.

**The flagship item.** One SKU recurs through every touchpoint and is the one the video, the website, and every screenshot are built around: **Lidocaine 2% with epinephrine cartridges, box of 50.** This is not a new choice — it is already the anchor product defined in `Product-Demo-Video-Storyboard.md` and already exists in `rfq-comparison.tsx` — this spec preserves it rather than fragmenting continuity that's already been designed and agreed.

**The supporting catalogue** spans the categories already established in the product's own mock data, so the transition is a relabelling exercise, not a redesign:

| Category | Example SKUs (generic, non-trademarked descriptions) |
|---|---|
| Anaesthesia | Lidocaine 2% with epinephrine cartridges *(flagship)*; topical anaesthetic gel |
| Restorative | Composite — A2 shade, 4g syringe; universal bonding agent, 5ml |
| PPE | Nitrile examination gloves (S/M/L); disposable patient bibs |
| Endodontics | Endodontic files, 25mm assorted; irrigation syringes |
| Preventive | Fluoride varnish; etch gel syringes |
| Impression & Lab | Impression material, standard set; alginate |

Where the current catalogue references a specific real trademarked brand as an "alternative product" (e.g. 3M Filtek, Dentsply ProTaper), the demo catalogue uses a fictional brand name instead (e.g. "Voltrex Z250-equivalent composite"). The category and generic description stay realistic and true to dentistry; only the brand name attached to invented stock levels, prices and expiry dates is fictional — for the same reason suppliers are fictional in §4.

This catalogue is designed here at the category/structure level only — actual stock quantities, prices and expiry dates are defined as rules in §6, not filled in as a dataset yet, per the task's restriction.
________________________________________
6. Financial Data

Rules, not numbers — no dataset is created here.

- Currency: GBP throughout, matching the product's existing UK positioning.
- VAT: always shown at the UK standard rate (20%), always clearly labelled ex-VAT or inc-VAT — never ambiguous, since this is a specific factual claim about tax treatment.
- Single source of truth: every price, saving, budget and spend figure is generated once, from one model of Aldergate Dental Care's fictional scale, and reused everywhere. No screenshot or report is ever hand-typed with its own numbers.
- Believable precision: figures carry realistic pence-level detail (e.g. £41.50, not £40.00 or £41.499). Round, suspiciously clean numbers read as fake and undermine the exact trust the environment exists to build.
- Believable magnitude: no figure is allowed to be an outlier that doesn't match its category (the current data's "£11,490 of a low-value antibiotic" is the kind of number this rule exists to prevent).
- Savings stay defensible: percentage savings shown anywhere stay in a modest, believable range consistent with real supplier price variance — never a headline number Reacting "can't back," per the Storyboard's existing no-fake-proof rule.
- Never a testimonial. These figures illustrate how the product displays data. They are never captioned as "what our customers save" or attributed to a real customer — that would turn an illustrative demo number into an unverifiable public claim.
- Traceable, not orphaned. Every figure on a report ties back to a specific transaction that actually happened inside the Demo Timeline (§7) in this same environment — nothing is a standalone number invented just to fill a chart.
- Non-coincidence check: because the dataset is generated from Aldergate's fictional model rather than copied from any real customer's numbers, it should never need to be checked against a real practice's actual figures — but if a real customer's numbers are ever known internally, a final check that nothing coincidentally matches is part of the gold-master sign-off (§10).
________________________________________
7. Demo Timeline

One operational week, repeatable indefinitely, that every screenshot and every second of video must sit inside. This is the same Need → Stock → Supplier → Quote → Comparison → Order → Delivery → Invoice → Reporting chain already defined in the Design Bible and the Storyboard, mapped onto a working week so it's easy to reason about and re-capture identically every time.

| Day | Operational event | Who |
|---|---|---|
| Monday | Morning stock check — shelves reviewed, quantities confirmed, the flagship item flagged low | Callum (Head Nurse) |
| Tuesday | RFQ sent to the four fictional suppliers for the low-stock items | Callum |
| Wednesday | Quotes compared side by side; cheapest supplier selected; purchase order generated | Callum, approved by Priya (Manager) |
| Thursday | Delivery arrives and is checked against the order; invoice arrives and is matched against what was actually delivered | Callum |
| Friday | Weekly reporting — spend, usage, savings and any mismatch reviewed | Priya, visible to Owen (Owner) |

Four repeated weekly cycles inside the environment produce one internally consistent month-end report — this is how the "monthly" figures in §6 stay traceable rather than invented separately. No asset is ever captured that implies an event happening on a day it didn't actually happen on in this timeline.
________________________________________
8. Media Rules

- Screenshots: captured live from the running Aldergate Dental Care environment only. Never built or touched up in Figma, Photoshop, or any design tool — the product itself is the artwork.
- Video: follows every rule already set in `Product-Demo-Video-Storyboard.md` §3 and §9 — real product only, no stock footage or actors, burned-in captions, no invented statistics, slow deliberate motion.
- Presentations (investor, sales): reuse the exact same screenshots and video clips already published on the website. A separate, "nicer-looking" internal version is not permitted — two versions of the same story are how discrepancies get noticed later.
- PDFs (sample reports, invoices, exports shown in decks or sales calls): exported directly from the environment's own reporting/export function, never hand-designed to resemble one.
- Framing vs editing: cropping or resizing an asset for a specific placement (hero banner vs. blog inline image) is framing and is allowed. Changing, blurring or removing any name, number or detail inside the frame is editing and is not — see Principle 10.
- Gold-master sessions: the entire asset library for a given product version is captured in one continuous, dated session working through the Demo Timeline in order — not accumulated piecemeal over weeks, which is how the current three-catalogue inconsistency happened.
________________________________________
9. Migration Plan

Strategy only — no implementation tasks, no build steps.

1. **Freeze.** No further screenshots, crops, or recordings are taken from any current tainted source (the existing `screen-01…29.png` captures, or any real/staging account) from this point forward.
2. **Build once, capture once.** The Aldergate Dental Care environment is seeded to the canonical state defined in §2–§7, then a single gold-master session captures everything the current site, video plan and decks need in one pass — not asset-by-asset over time, which is how today's inconsistency (three different product catalogues across the dashboard, RFQ demo, and screenshots) occurred.
3. **Review before replace.** The complete new asset set is reviewed against this specification in full before a single old asset is retired — the site is never left in a state where old and new practice identities are both visible at once.
4. **One coordinated cutover.** Every reference to the old assets — `content.ts`'s `SCREENS` map, the legacy map in `ProductMock.tsx`, `DayInPractice.tsx`, `features.tsx`, `product.tsx`, the hero and tour videos, and any already-circulated decks or PDFs — is updated in a single release, not a rolling one, to minimise the window where both identities are live simultaneously.
5. **Retire and purge, not just replace.** Once the cutover is confirmed live, the old files are removed from public hosting and from the repository's public assets, and any CDN cache is purged. Leaving the old files reachable by direct URL after they're "replaced" on-page is not a real fix.
6. **External footprint check.** Anywhere the old assets already left the website — LinkedIn, YouTube, sales emails already sent, an investor deck already shared — is identified and addressed on its own terms, since removing a file from this repository does not remove it from an inbox it was already sent to.
7. **No partial fixes as a substitute.** Blurring an email, cropping out a face, or swapping only the worst-looking screenshot is explicitly rejected as a migration step, per the objective's own framing: this is a replacement, not a patch.
________________________________________
10. Governance

Maximum 10 rules to ensure this specific failure — real personal data leaking into public marketing assets — cannot recur.

1. This document is the only approved source for demo data. No screenshot, video, dataset, or deck may be produced from anything else.
2. One named owner approves every new capture session before it happens — capturing "just one quick screenshot" outside that approval is not permitted, regardless of deadline pressure.
3. No live-customer capture, ever. No marketing, sales, or investor asset may be captured from a real customer account, a staging copy containing real imported data, or a developer's personal test account.
4. Pre-publish check, mandatory not optional. Every asset is checked against §1's principles before it leaves the design/marketing team — this is a gate, not a courtesy step.
5. Every asset is traceable. Every screenshot, video, or PDF in circulation is logged against the dated gold-master session it came from.
6. Re-seed on product change, don't patch. When the product's UI changes meaningfully, the environment is re-seeded and a new gold-master session replaces the old one in full — old assets are retired, never edited to "look current."
7. External parties are briefed, never given real access. Any agency or freelancer producing an asset receives this document and demo-environment access — never real product or customer access — before doing any asset work.
8. Name-collision check on renewal. Before the practice name or any supplier name in §2/§4 is reused for a new campaign after a long gap, a quick check confirms it hasn't since become a real registered business.
9. Quarterly self-audit. Someone periodically re-checks every live public asset — website, decks, YouTube, social — against this specification to catch drift or an old asset that resurfaced.
10. Treated as Tier 0. This environment is maintained with the same seriousness as real customer data handling — a public trust failure here directly undermines the one thing the entire Website Playbook is built to prove: that Reacting understands how practices actually operate.
________________________________________
Approval

Once approved, this document is the reference every future demo-environment decision is checked against — not the other way around. If a future decision needs to contradict it (a new supplier name, a rescaled practice, a new user role), this document is updated first, deliberately, with reasoning — production and marketing never quietly diverge from it.
