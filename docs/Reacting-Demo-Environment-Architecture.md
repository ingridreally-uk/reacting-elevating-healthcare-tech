# Reacting Demo Environment Architecture

Permanent Engineering Standard — v1.0

---

## Status

This document turns `Reacting-Demo-Environment-Specification.md` from documentation into a permanent part of the product development workflow. The Specification defines *what* the one true demo environment (Aldergate Dental Care) contains. This document defines *how* that environment is built, stored, captured from, reset, extended, and enforced — as a standing engineering standard, not a one-time migration.

This is an architecture and governance document. It contains no code and does not modify the application. It governs process going forward; it does not redesign the product, and it does not contradict `Reacting-Design-Bible.md` or `REACTING WEBSITE PLAYBOOK.md`.

Grounded against the current codebase: this is a single TanStack Start / React application with no real backend or database yet — all data today lives as hand-written TypeScript mock objects scattered across route/component files (e.g. `rfq-comparison.tsx`, `content.ts`, `ProductMock.tsx`), and there is no CI pipeline. The recommendations below are written to work today, against that reality, and to keep working unchanged once a real backend/database exists.

---

## 1. Environment strategy

Four environments. Not three, not five.

| Environment | Purpose | Data | Who captures from it |
|---|---|---|---|
| **Local development** | Engineer's own machine, arbitrary in-progress state | Scratch data, may be broken or partial | Nobody. Never a source for any public asset. |
| **Demo** | The one permanent, fictional Aldergate Dental Care environment defined in the Specification | The canonical fixture (§2) — reset, never accumulated | Everyone: screenshots, video, sales demos, investor decks, self-serve "try it live" |
| **Staging** | Pre-release verification of the real product before it ships | Synthetic/anonymised data, changes freely, may be mid-feature | Nobody for public assets. QA and engineering only. |
| **Production** | The real, live product once real customers exist | Real customer data | Nobody, ever, for anything public. |

**Why four, and why Demo is not merged into Staging.** Staging exists to move fast — it changes every day, breaks sometimes, and reflects whatever is mid-flight. Demo exists to never change except in a deliberate, reviewed reseed (Specification Principle 9: "reusable forever"). Collapsing them into one environment forces a choice between marketing assets churning on every deploy, or engineers being afraid to use Staging freely. Keeping them separate lets each optimise for its actual job.

**Why Demo is not split per campaign or per module.** A "Demo for the website" and a different "Demo for sales calls" is exactly the failure mode already found (three catalogues, three sets of numbers). One Demo, one fixture, every consumer.

**Relationship to the codebase.** Demo, Staging, and Production are the same application, built from the same codebase, at the same version — they differ only in which dataset they're seeded with. Demo is never a fork, a separate design-tool mockup, or a hand-maintained duplicate.

---

## 2. Demo database

Recommended approach: a single versioned TypeScript fixture module — not SQL, not loose JSON, not runtime-generated.

Reasoning, against each alternative:

- **Not SQL.** There is no database in this application today. Introducing one purely to hold demo data creates infrastructure with no other consumer and nothing to keep it honest.
- **Not loose JSON.** JSON has no compile-time shape enforcement. In a TypeScript codebase, a shape drift (a renamed field, a missing supplier) fails silently in JSON and fails loudly — at build time — as a typed object. Given the app is entirely TypeScript already, this is the natural, zero-new-dependency choice.
- **Not runtime-generated (faker-style).** The Specification is explicit that data must be realistic, non-coincidental, traceable to a specific timeline, and identical every time (Principles 6, 7, 9). Regenerating data on each build would silently break "one dataset, one truth" and would require re-running every PII/collision check on every run. Generation has a narrow, acceptable use only as background noise layered on top of the fixed canonical entities (e.g. filling out a chart's non-load-bearing values) — never for the named practice, users, suppliers, or the flagship product.
- **Fixtures, in the ordinary engineering sense.** One module is the single export point for every entity already defined in the Specification — practice, users, suppliers, products, financial rules, and the weekly timeline — structured so every consuming screen imports the same objects rather than redefining its own array. This is the direct fix for the "three catalogues" root cause: it becomes structurally impossible to have two different versions of the same fact, because there is only one place the fact is written down.

**Forward compatibility.** When a real backend/database eventually exists, this same fixture module becomes the input to a seed script rather than being redesigned. Today it's imported directly by the UI; later it's loaded by a seeding job. The architecture doesn't change — only who reads the fixture does.

---

## 3. Media generation

Every screenshot and video frame must be a live capture of a running Demo build, seeded from the canonical fixture, taken inside a deliberately opened session — never an incidental "quick screenshot."

Workflow:

1. **Open a session.** A gold-master capture session is scheduled and approved by the Demo Environment Steward (never ad hoc, per Specification Governance rule 2).
2. **Reset first.** The Demo build is reset to the canonical fixture (§4) immediately before capture — never captured against whatever state it happened to be left in.
3. **Walk the Demo Timeline in order.** Capture follows the fixed weekly sequence already defined in the Specification (§7) and the shot order already defined in `Product-Demo-Video-Shot-List.md` — the same order every time, so releases are comparable and nothing is captured implying an event on a day it didn't happen.
4. **Automated screenshot pass.** A scripted pass — extending the existing pattern already started in `scripts/prepare-marketing-screens.mjs` — drives the Demo build to each named route at a fixed set of viewports and saves raw captures, replacing manual point-and-shoot screenshotting.
5. **Manual video pass.** Recorded per the Storyboard/Shot List, against the same reset Demo build, in the same session.
6. **Tag by session.** Every output is filed under a dated session identifier — never a loose, unlabelled file — so it can be traced back per Governance rule 5.
7. **Automated scan before review.** Every new raw capture passes the CI validation checks (§6) before it's eligible for human review.
8. **Review, then one coordinated cutover.** Design/marketing reviews the full new set against the Specification before any old asset is retired (Migration Plan step 3), and publishes in one release, not piecemeal.

**Trigger conditions for a new gold-master session:** a meaningful product UI change (Governance rule 6), a fixed quarterly refresh regardless of change (to catch drift, Governance rule 9), or a new module going live (§5). Never a one-off request for a single asset outside a session.

---

## 4. Demo reset

Reset means returning to the fixture — not manually undoing whatever happened last time.

- **Today (no real database):** reset is redeploying/reloading the Demo build so the UI reads the unmodified canonical fixture again. There is nothing to "clean up" because nothing is mutated in place — the fixture is the state.
- **Once a real backend/database exists:** reset becomes a single idempotent seed job that wipes the Demo database and reloads it from the same fixture manifest. One command, one owner of that command, no manual runbook.
- **When reset happens:** automatically immediately before every gold-master session; on a fixed schedule (so a Demo instance left open after a sales call or a self-serve trial never drifts into a stale, modified state for the next viewer); on demand, but only through the same single mechanism — never a bespoke manual fix.
- **Versioning:** because the fixture lives in the same repository as the product code, each product release has exactly one matching Demo dataset version. Resetting always means "this release's canonical state," never an ambiguous earlier state.

---

## 5. Future modules

The mechanism that makes this automatic, not aspirational:

- Every new module ships its demo data as a new named export inside the **same** canonical fixture module — same fictional practice (Aldergate Dental Care), same fictional users, same `.test` domain convention. A new module never introduces a new identity, a new practice, or a parallel dataset.
- A module is not considered complete until it has a corresponding fixture entry. This mirrors the Website Playbook's own rule for the site itself — "When Scheduling launches: New Product Page. Not a redesign. Architecture never changes. Modules are added." — applied identically to the Demo Environment: the environment's architecture never changes, modules are added to the one fixture.
- Ownership: the Demo Environment Steward reviews and approves new module fixture entries against Specification §1's principles before merge — the same review gate as any other fixture change, not a rebuild, not a special process.
- Practical effect: marketing and sales never have to ask "does the demo show this yet?" — if the module has shipped, the fixture entry shipped with it in the same release.

---

## 6. CI validation

Automated checks run against every pull request that touches the fixture module or any file under a demo/marketing/public-asset path. Hard-fail checks block merge; judgement-based checks require explicit reviewer sign-off.

**Hard-fail (blocks merge automatically):**

- **Real emails.** Any email literal not ending in the two reserved, non-resolvable domains already established by the Specification (RFC 2606 `.test` / `.example`) fails the build.
- **Real phone numbers.** Any phone-number-shaped string outside the UK's officially reserved fictional-use ranges (Ofcom's drama-use number blocks) fails the build.
- **Real supplier name + fabricated figure.** Any commit pairing one of the explicitly named real suppliers (Henry Schein, Kent Express, etc.) with a nearby price, rating, delivery SLA, or account-looking field in the same file fails the build — this is the exact failure already found in `/rfq-comparison`.
- **Production export signatures.** Any file matching known real-database export formats or containing markers only present in genuine exports is blocked from ever landing under a demo/marketing/public path.

**Reviewer-gated (flagged, requires human sign-off, not auto-blocked):**

- **Real names.** A maintained allow-list of the exact fictional names already approved in the Specification (§3). Any new person-name-shaped string in fixture or demo-facing files that isn't on the list is flagged for explicit reviewer approval — full automation here would produce too many false positives to be trustworthy.
- **Real photos.** Any newly added image under a demo/marketing asset path is flagged for a human check that it is not a photograph of a real human face or a stock photo — consistent with the Design Bible's own imagery rule ("Real work. Real hands. Real environments." — meaning real *product*, never stock people).

This is additive to, not a replacement for, the manual pre-publish check the Specification already mandates (Governance rule 4). CI catches the mechanical cases before a human has to.

---

## 7. Governance

Fifteen permanent rules. These govern engineering behaviour; they implement, and never contradict, the Specification's own 10 principles.

1. The canonical fixture module is the only legal source of data for anything captured, demoed, or published. No exception for deadlines.
2. Any pull request that adds or changes a customer-facing screen, module, or component and introduces a new data shape must update the canonical fixture in the same PR.
3. No pull request may introduce a real email, name, phone number, address, or photograph into any demo/marketing/fixture path — enforced by CI plus reviewer sign-off.
4. Demo, Staging, and Production are separate deploy targets of one codebase. No engineer ever points a capture tool or recording session at Staging or Production.
5. The Demo Environment Steward approves every gold-master capture session before it starts and every new fixture entry before it merges.
6. The Demo Environment is reset from the fixture immediately before every capture session and on a fixed schedule — never patched by hand mid-session.
7. A new module is not "done" until it ships a corresponding entry in the canonical fixture, in the same release.
8. Every screenshot, video frame, or export in circulation must be traceable to a dated gold-master session. Untraceable assets are treated as non-compliant.
9. No customer-facing visual asset may ever be created, modified, or assembled manually. Every screenshot, video frame, product recording, website image, presentation image, PDF illustration, sales asset, investor asset, documentation image and social-media visual must originate directly from the approved Reacting Demo Environment. The only permitted post-processing is non-content transformation such as resizing, compression, format conversion, or cropping that does not alter, conceal, fabricate, or remove any product information. If any content requires editing, the Demo Environment or the product itself must be corrected first, and the asset recaptured.
10. Real supplier names may only appear as plain-text compatibility statements — never attached to a fabricated price, rating, or account.
11. CI checks on fixture and asset changes are required status checks. A red check is fixed, never overridden, to hit a deadline.
12. Old assets are retired and purged in the same release that replaces them. A transition period with both old and new identities live is not permitted.
13. Quarterly, the Demo Environment Steward re-audits every live public asset against this architecture and the Specification, independent of feature work.
14. Any contractor, agency, or freelancer producing an asset is given this architecture and Demo Environment access — never Staging or Production access.
15. If a future decision needs to contradict any rule here, this document and the Specification it implements are updated first, deliberately, before the exception is acted on.

---

## 8. Final recommendation

This architecture is recommended because it removes the *conditions* that allowed the current situation, not just the current evidence of it:

- **One fixture, structurally, not by convention,** removes the root cause named in the Specification's own migration plan — three different product catalogues existed because three files each defined their own mock data. When there is exactly one place a fact can be written down, it becomes impossible for two screens to disagree.
- **CI as a mechanical gate, not a reminder,** closes the exact gap that let real Gmail addresses and a real headshot reach committed marketing screenshots in the first place — the Specification's existing manual "pre-publish check" is a courtesy step that can be skipped under deadline pressure; a required, red-blocking CI check cannot.
- **Environment separation** means there is never a route by which a capture tool can accidentally point at Staging or Production, because Demo is the only environment engineers or marketing are ever authorised to capture from.
- **Modules ship with their fixture** means Demo never falls behind the product and never needs a reactive scramble before a launch — it is current by construction, always.
- **Traceability plus a quarterly audit** means drift is caught on a schedule, not discovered by a visitor noticing a real email address, as happened this time.
- **A named owner and permanent rules** turn a document that anyone could read and nobody was accountable to into an enforced part of how Reacting ships — consistent with `AGENTS.md`'s own test: this reduces manual process, creates visibility, is the simplest workable structure for a two-environment-plus problem, and does not need to be redesigned as new modules, or eventually a real database, arrive.

No conflicts were found with `Reacting-Design-Bible.md` or `REACTING WEBSITE PLAYBOOK.md` — the module-addition model in §5 directly reuses the Playbook's own "architecture never changes, modules are added" language, and the no-real-photography rule in §6 reuses the Design Bible's existing imagery principle rather than inventing a new one.
