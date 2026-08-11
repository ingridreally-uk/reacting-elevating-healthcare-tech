PRODUCT DEMO VIDEO — STORYBOARD
Master Document (Pre-Production)
________________________________________
Status
This is the storyboard only.
Not a script for filming.
Not an edit.
Not a motion graphics brief.

No frame of this video should be recorded, filmed, screen-captured or animated until this document is approved. Once approved, this document becomes the single source of truth. If the video changes during production, this document is updated first — production never quietly diverges from it.

Governs: Reacting-Design-Bible.md, REACTING WEBSITE PLAYBOOK.md
This document must not contradict either. Where a decision below required a judgement call, the reasoning is stated so it can be checked against both documents.
________________________________________
1. Why This Exists

The Product page (`/product`) and the homepage hero both already have a slot built for this asset:

- `HeroProductMedia` on the Product page (`src/routes/product.tsx`) is explicitly built to accept a `videoSrc` prop "to swap the dashboard poster for a looping product video without changing layout." Today it only shows a static screenshot.
- `content.ts` already reserves `PRODUCT_TOUR_VIDEO` / `PRODUCT_TOUR_POSTER` — described in code as "Longer narrated walkthrough, played on demand from a lightbox." No file exists there yet.
- The Website Playbook specifies the homepage hero's secondary CTA as **"Watch 3 Minute Overview."** The current build uses "Follow the morning" (an on-page anchor) as a placeholder for this.

In other words: the site was already designed around this video existing. Continuing to polish page layout around an empty slot is lower-value than defining what actually fills it. This storyboard is that definition.
________________________________________
2. Where This Video Will Live

| Placement | Behaviour |
|---|---|
| Homepage hero, secondary CTA | Replaces "Follow the morning" with "Watch 3 Minute Overview," opening this video in a lightbox. |
| Product page hero | `HeroProductMedia` swaps its static dashboard poster for this video (muted loop of the opening seconds, or full video on click — decide at build time). |
| Resources / Knowledge Centre | Flagship video referenced from supporting articles, per the Design Bible's video strategy. |
| YouTube | Education, not marketing, per Design Bible ("YouTube — Not marketing. Education."). |

One video, several doors. Nothing bespoke per page.
________________________________________
3. Non-Negotiable Constraints

Pulled directly from the Design Bible and Website Playbook. Any storyboard decision that conflicts with these is wrong, not the rule.

- **Maximum 3 minutes.** ("Every major page contains one short video. Maximum 3 minutes.")
- **Real product only.** No stock footage, no stock actors, no smiling-dentist photography, no generic office B-roll.
- **Understand first, demonstrate second.** Never open on the software. Open on the practice's reality.
- **Follow the real workflow, not the menu.** Need → Stock → Supplier → Quote → Comparison → Delivery → Invoice → Reporting. Never Dashboard → Inventory → Reports → Suppliers. (Comparison and Order resolve as one motion — see §7 — and Invoice is where the timing problem named in the opening is proven solved.)
- **No feature-card narration.** Never "here's X, here's Y, here's Z." Every screen shown must answer a problem just named out loud.
- **Motion is slow and deliberate.** Nothing bounces. Nothing spins. Nothing zooms for effect.
- **No fake proof.** No invented statistics, no testimonials that don't exist yet, no "practices save 30%" claims we can't back.
- **One throughline.** This is not an attempt to show everything Dental Assist does. It is an attempt to make one thing believable: operations connect.
________________________________________
4. Objective

Applying the Playbook's own test to this specific asset:

By the end of 3 minutes, someone who has never seen Reacting should think:

> "That's not a stock app. That's how the whole morning actually connects."

They should **not** think "nice inventory software" — the outcome the Playbook explicitly warns against.

The software is proof, not the story. The story is: *the practice finds out too late, and now it doesn't.*
________________________________________
5. Narrator & Persona

**Decision: voiceover only. No on-camera talent, no actor, no stock presenter.**

Reasoning: any on-camera person reads as a sales presenter or a stock actor — both violate "never overpromise, never use fear, use understanding" and the anti-stock-photography rule. A calm, plain-spoken voice over real product screens keeps 100% of visual attention on the workspace itself, which is the actual proof.

Voice: same register as the site's written copy — short declarative sentences, second person, no adjectives doing the selling ("calm," "clear," "connected" are earned by the visuals, not claimed by the narrator).
________________________________________
6. Structure — Five Acts

Every act answers exactly one question, per the Playbook's scroll logic.

| Act | Time | Question it answers | Runtime |
|---|---|---|---|
| 1. Recognition | 0:00–0:18 | Does this feel familiar? | 18s |
| 2. The Real Problem | 0:18–0:38 | Why does this keep happening? | 20s |
| 3. The Connected Workflow | 0:38–2:24 | How does this actually work? | 106s |
| 4. What Changes | 2:24–2:42 | Why is this different? | 18s |
| 5. Close | 2:42–2:58 | What do I do now? | 16s |

**Total runtime: 2:58** — under the 3:00 ceiling with a two-second safety margin for pacing during the edit.

Act 3 reuses the exact narrative device already built and shipped on the homepage (`DayInPractice.tsx`) — a real morning, told in timestamps (07:45 → 11:10). Reusing it here is intentional: it is already the site's proven, approved way of telling this story. The video should feel like the same story the site already tells, now moving.
________________________________________
7. Scene-by-Scene Shot List

"Screen" references the real, already-captured marketing assets in `SCREENS` (`src/components/marketing/content.ts`) wherever one exists, so production can reuse prepared canvases instead of re-shooting from scratch.

| # | Time | Visual (screen / route) | On-screen action | Voiceover | Purpose |
|---|---|---|---|---|---|
| 1 | 0:00–0:08 | No product yet. Kinetic type on the site's light background — same device as the homepage "disconnected operations" section. Words fade in and out: *Excel. WhatsApp. Memory. Paper.* | None — type only, no cursor. | **(silent — music only)** | Cold open. Recognition before explanation. |
| 2 | 0:08–0:18 | Same kinetic-type treatment. Final line holds: *"The owner asks if it's ordered. Nobody's certain."* | None. | **(silent — music only)** | Let the visitor place themselves in the scene before a word is spoken — and plant the owner as the one this actually costs, in a single held line, before stepping away from them for the rest of the film. |
| 3 | 0:18–0:33 | Type dissolves to plain background, Reacting mark begins to form quietly, bottom-left. | None. | *"It looks like a stock problem. It isn't. It's a timing problem — usually discovered at the invoice, when it's already too late to do anything about it."* | Reframes the problem exactly as the site does (`PracticeProblems.tsx`), and names the exact moment — the invoice — that Act 3 will prove is no longer where this gets discovered. First voice moment lands with intent. |
| 4 | 0:33–0:38 | `ProductFrame` (hero chrome) fades in around `SCREENS.dashboard`, label `app.reacting.io / dashboard`. | Static hold, no cursor movement yet. | *"This is Dental Assist — Reacting's first operational module."* | Names the product once, plainly. No tagline, no adjectives. |
| 5 | 0:38–0:55 | `SCREENS.stockPage` → live capture, route `/stock`. | Cursor scrolls the inventory list, hovers one product card — a box of anaesthetic cartridges — revealing live quantity + exact location. | *"07:45. Before the first patient arrives, the team already knows what's on the shelf — this box, its quantity, and exactly where it lives. Nobody's opening three cupboards to find out."* | Beat 1 of the workflow: Need is already visible, not assumed. Introduces the one item Act 3 now follows end to end. |
| 6 | 0:55–1:11 | `SCREENS.lowStockPage`, route `/low-stock`. | Cursor highlights that same box, now flagged low; clicks through toward "Request quote." | *"That same box is running low — the kind of shortage that would normally surface at the chair. Here, it shows up first, while there's still time to do something about it."* | Beat 2: the moment information usually arrives too late, now arrives early — for the same item introduced in Scene 5. |
| 7 | 1:11–1:24 | `SCREENS.suppliers`, route `/vendors`. | Cursor opens the supplier record for that box: contact, account reference, last order. | *"The supplier for it, the account and the last order are already together. No digging through email to find out who to call."* | Beat 3: Supplier — still the same box, not a fresh example. |
| 8 | 1:24–1:44 | `SCREENS.rfqCompare`, route `/rfqs`. | Cursor moves across two supplier columns quoting that same box side by side; highlights the cheaper line and selects it. | *"Two suppliers reply with a price for the same box. They sit side by side, item by item, the saving visible — and choosing one places the order, there and then."* | Beat 4–6: Quote → Comparison → Order, resolved as one motion rather than a separate screen. The single most important screen in the video — this is the section the Playbook calls "the strongest section." Give it the most breathing room. |
| 9 | 1:44–2:00 | `SCREENS.deliveries`, route `/purchasing/receive`. | Cursor marks that same box as received against the order it came from; the count on screen matches what was promised. | *"When it arrives, the team checks it against the order it came from — not against a feeling."* | Beat 7: Delivery. Confirms the order placed in Scene 8 actually arrived, closing that loop before opening the next one. |
| 10 | 2:00–2:13 | Net-new capture — an invoice-matching view, the same box's delivery held up against the supplier's bill. | Cursor lines the invoice up against the order; one row is flagged — billed for more than what actually arrived. | *"The invoice for that same box doesn't match what was delivered — billed as if nothing was missing. It's caught here, before it's paid. Not after."* | Beat 8: Invoice. The moment Scene 3 warned about — discovered too late, at the invoice — happens in time instead. This is where the timing problem gets proven solved. |
| 11 | 2:13–2:24 | `SCREENS.reporting`, route `/savings-and-usage`. | Cursor reveals the spend/usage/savings view; the corrected line for that same box sits inside it. | *"By month end, spend, usage and savings are already sitting there — including the mismatch that never made it into the bill."* | Beat 9: Reporting. Closes the loop the cold open promised, and closes the one box's journey from shelf to statement. |
| 12 | 2:24–2:42 | Quiet cut back to a wide, static dashboard frame. No new screens. | None — hold. | *"The owner used to ask if it had been ordered. Now the owner already knows. One shared view. Fewer surprises. Decisions made before the invoice — not explained after it. And inventory is only the first module. This platform grows with the practice."* | Act 4: the emotional payoff. The owner, absent since the cold open, returns only now to show what actually changed for them — answering Scene 2 directly — before opening the door to the roadmap without overselling it (Design Bible: "Never oversell" the future). |
| 13 | 2:42–2:58 | Reacting wordmark on plain background, two buttons appear: **Start Free Trial**, **Book a Demo**. | None. | *"This is Dental Assist, built inside a real dental practice. Start a free trial, or book a demo with your own practice in mind."* | Close. Matches the site's actual CTA pair (`CTASection.tsx`) — no invented CTA copy. |

Scenes 1–2 are deliberately silent. The Playbook never asks a video to explain before the visitor recognises themselves — the same rule that keeps the homepage hero free of statistics and feature cards.
________________________________________
8. Full Voiceover Script (continuous read-through)

For timing a table read before recording. Target pace: 130–145 wpm — slower and calmer than typical product-video VO, matching the brand's "calm, architectural, premium" register.

> [0:18] It looks like a stock problem. It isn't. It's a timing problem — usually discovered at the invoice, when it's already too late to do anything about it.
>
> [0:33] This is Dental Assist — Reacting's first operational module.
>
> [0:38] 07:45. Before the first patient arrives, the team already knows what's on the shelf — this box, its quantity, and exactly where it lives. Nobody's opening three cupboards to find out.
>
> [0:55] That same box is running low — the kind of shortage that would normally surface at the chair. Here, it shows up first, while there's still time to do something about it.
>
> [1:11] The supplier for it, the account and the last order are already together. No digging through email to find out who to call.
>
> [1:24] Two suppliers reply with a price for the same box. They sit side by side, item by item, the saving visible — and choosing one places the order, there and then.
>
> [1:44] When it arrives, the team checks it against the order it came from — not against a feeling.
>
> [2:00] The invoice for that same box doesn't match what was delivered — billed as if nothing was missing. It's caught here, before it's paid. Not after.
>
> [2:13] By month end, spend, usage and savings are already sitting there — including the mismatch that never made it into the bill.
>
> [2:24] The owner used to ask if it had been ordered. Now the owner already knows. One shared view. Fewer surprises. Decisions made before the invoice — not explained after it. And inventory is only the first module. This platform grows with the practice.
>
> [2:42] This is Dental Assist, built inside a real dental practice. Start a free trial, or book a demo with your own practice in mind.

Word count: ~215 words across 2:40 of spoken content — still deliberately sparse for the runtime, leaving room for the pacing this brand needs. If the read comes in noticeably under time, add silence and screen dwell time before adding words.
________________________________________
9. On-Screen Text & Caption Rules

- **Burned-in captions are required**, not optional. This video will likely be first encountered muted (autoplay hero contexts, social feeds). If it can't be understood silent, it fails on its most common placement.
- Reuse the site's existing on-screen device for screen labels — the `ProductFrame` macOS-dot chrome bar with the route printed in it (`app.reacting.io / stock`, etc.). Do not invent a separate lower-third graphic system. Consistency with the live site is the point.
- No bullet-point overlays, ever. If a sentence needs a bullet list to land, it's a feature list — which this video is explicitly not.
- Typography for captions/titles should match the site's existing type scale and voice (short, sentence case, no exclamation marks).
________________________________________
10. Sound Direction

- Music: minimal, ambient, unhurried. No "corporate epic" build-and-drop. It should be able to sit under a calm voice without competing for attention.
- Music ducks under voiceover at every VO line; the two silent scenes (1–2) can let the music breathe on its own.
- No sound effects on UI interactions (clicks, hovers) unless a single, very quiet confirmation tone is genuinely useful for accessibility — default to none.
________________________________________
11. Assets Checklist Before Filming

Reused from the existing prepared marketing library (`src/components/marketing/content.ts`) — no re-shoot needed for the static frame:

- `SCREENS.dashboard`
- `SCREENS.stockPage`
- `SCREENS.lowStockPage`
- `SCREENS.suppliers`
- `SCREENS.rfqCompare`
- `SCREENS.deliveries`
- `SCREENS.reporting`

`SCREENS.purchasing` is no longer used — Purchasing is no longer shown as its own beat; the order now resolves inside Scene 8.

Net-new capture required — these are interactions, not static screenshots, so they need a real screen recording from a seeded/demo environment (never simulated in a design tool):

- Hovering a stock card to reveal live quantity + location, for one named box of anaesthetic that recurs through every later scene (Scene 5).
- Selecting that same low-stock item toward "Request quote" (Scene 6).
- Opening a supplier record's history (Scene 7).
- Comparing two RFQ columns for that same box and selecting the cheaper line (Scene 8) — this is the single most important recording in the video; budget the most retakes here.
- Marking that same delivery received against its order (Scene 9).
- An invoice-matching view for that same delivery, with one row flagged as a mismatch (Scene 10) — this screen does not exist in the current build; it needs its own design/build pass before it can be filmed, since Invoice Matching is a named but not-yet-shipped part of the product (per the Design Bible's Procurement pillar).

Export at the aspect ratio already used for hero product media (`1640 / 876`) so it drops into `HeroProductMedia` and the homepage hero frame without letterboxing or layout changes.
________________________________________
12. Flag for Engineering (not part of the storyboard — noted so it isn't a surprise later)

`MediaViewer` (`src/components/marketing/MediaViewer.tsx`) currently renders every video as `muted / autoPlay / loop`, with no play/pause, no unmute, no controls. That's correct for the short silent hero loop (`HERO_LOOP_VIDEO`) but **cannot** carry this narrated video — a 3-minute video with voiceover needs play controls, an unmute affordance, and a captions track. This isn't a storyboard decision, but it's a real blocker between "storyboard approved" and "video live on the site," so raising it now avoids a second conversation later.
________________________________________
13. Explicitly Out of Scope for This Document

- Filming / screen recording.
- Video editing or cutting.
- Motion graphics or kinetic-type execution.
- Music selection or licensing.
- Voiceover casting or recording.

All of the above follow only after this storyboard is reviewed and approved.
________________________________________
14. Approval

Once approved, this document is the reference against which the finished video is checked — not the other way around. If a decision made during production contradicts this document, production is wrong until this document is updated to reflect a deliberate, reasoned change.
