/**
 * Art-directed marketing screenshots — one focal story per frame.
 * Usage: node scripts/prepare-marketing-screens.mjs
 *
 * Principle: crop because it tells the story, never because it fills the box.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { execSync } from "node:child_process";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const BG = "#F1F5F9";

const FW = 1440;
const FH = 900;
const TW = 1200;
const TH = 750;
const FM = 20;
const TM = 16;

/** Proportion of a real full-page capture occupied by the app's own left nav
 * rail. Measured across every source screenshot (~13.4%–14.0%); 14.5% clears
 * the rail on all of them while keeping the page's own back-arrow intact. */
const NAV_TRIM = 0.145;

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("£", "&#163;");

async function save(buf, name) {
  const alt = path.join(OUT, `alt-${name}`);
  await fs.writeFile(alt, buf);
  const dest = path.join(OUT, name);
  let lastErr;
  for (let i = 0; i < 14; i++) {
    try {
      try {
        await fs.unlink(dest);
      } catch {
        /* */
      }
      await fs.rename(alt, dest);
      lastErr = null;
      break;
    } catch (e) {
      lastErr = e;
      try {
        execSync(
          `powershell -NoProfile -Command "Copy-Item -LiteralPath '${alt.replace(/'/g, "''")}' -Destination '${dest.replace(/'/g, "''")}' -Force"`,
          { stdio: "pipe" },
        );
        lastErr = null;
        await fs.unlink(alt).catch(() => {});
        break;
      } catch (e2) {
        lastErr = e2;
        await new Promise((r) => setTimeout(r, 500 * (i + 1)));
      }
    }
  }
  if (lastErr) throw lastErr;
  await fs.unlink(alt).catch(() => {});
  const m = await sharp(dest).metadata();
  console.log(`✓ ${name}  ${m.width}×${m.height}`);
}

/** Framed marketing canvas — contain by default so UI is never side-clipped. */
async function canvas(buf, w, h, margin, position = "north", fit = "contain") {
  const fitted = await sharp(buf)
    .resize({
      width: w - margin * 2,
      height: h - margin * 2,
      fit,
      background: BG,
      position,
    })
    .png()
    .toBuffer();
  const fm = await sharp(fitted).metadata();
  const left = margin + Math.round((w - margin * 2 - fm.width) / 2);
  const top = margin + Math.round((h - margin * 2 - fm.height) / 2);
  return sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .composite([{ input: fitted, left, top }])
    .webp({ quality: 92, effort: 5 })
    .toBuffer();
}

async function tourFamily(buf) {
  return canvas(buf, TW, TH, TM, "north", "contain");
}

async function featureThenTour(featureBuf, featureName, tourName, opts = {}) {
  const { position = "north", fit = "contain" } = opts;
  const feat = await canvas(featureBuf, FW, FH, FM, position, fit);
  await save(feat, featureName);
  await save(await tourFamily(await sharp(feat).png().toBuffer()), tourName);
}

/**
 * Stitches two real captures of the same flow (e.g. a page's top vs its
 * scrolled-down conclusion) into one vertically-stacked frame with a hairline
 * divider, for stories whose payoff genuinely doesn't fit in a single
 * screenshot. Not a generic layout tool — used deliberately, once.
 */
async function verticalStack(topBuf, bottomBuf, w, h, margin, gap = 26) {
  const maxW = w - margin * 2;
  const maxH = h - margin * 2;

  // Top keeps its natural full-width scale — it's usually the denser content
  // (a data table) where shrinking hurts legibility most. Bottom then fits
  // whatever vertical space remains, rather than both being shrunk by the
  // same factor, which over-compresses the table just because the other
  // panel happens to be closer to square.
  let topResized = await sharp(topBuf).resize({ width: maxW, fit: "inside" }).png().toBuffer();
  let tm = await sharp(topResized).metadata();
  const remainingH = Math.max(60, maxH - gap - tm.height);
  let bottomResized = await sharp(bottomBuf)
    .resize({ width: maxW, height: remainingH, fit: "inside" })
    .png()
    .toBuffer();
  let bm = await sharp(bottomResized).metadata();
  let totalH = tm.height + gap + bm.height;

  // Rare fallback: if even that overflows, scale both down together.
  if (totalH > maxH) {
    const scale = (maxH - gap) / (tm.height + bm.height);
    topResized = await sharp(topResized)
      .resize({ width: Math.max(1, Math.round(tm.width * scale)) })
      .png()
      .toBuffer();
    bottomResized = await sharp(bottomResized)
      .resize({ width: Math.max(1, Math.round(bm.width * scale)) })
      .png()
      .toBuffer();
    tm = await sharp(topResized).metadata();
    bm = await sharp(bottomResized).metadata();
    totalH = tm.height + gap + bm.height;
  }

  const startY = Math.max(margin, Math.round((h - totalH) / 2));
  const topLeft = margin + Math.round((maxW - tm.width) / 2);
  const bottomLeft = margin + Math.round((maxW - bm.width) / 2);
  const dividerY = startY + tm.height + Math.round(gap / 2);
  const divider = await sharp({
    create: { width: maxW, height: 1, channels: 3, background: "#D8E0E8" },
  })
    .png()
    .toBuffer();
  return sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .composite([
      { input: topResized, left: topLeft, top: startY },
      { input: divider, left: margin, top: dividerY },
      { input: bottomResized, left: bottomLeft, top: startY + tm.height + gap },
    ])
    .png()
    .toBuffer();
}

async function extractSafe(src, region) {
  const m = await sharp(src).metadata();
  const left = Math.max(0, Math.min(region.left, m.width - 2));
  const top = Math.max(0, Math.min(region.top, m.height - 2));
  const width = Math.max(2, Math.min(region.width, m.width - left));
  const height = Math.max(2, Math.min(region.height, m.height - top));
  return sharp(src).extract({ left, top, width, height }).png().toBuffer();
}

async function main() {
  const dashSrc = path.join(APP, "3. dashboard.jpg");
  const dm = await sharp(dashSrc).metadata();
  console.log(`Dashboard source ${dm.width}×${dm.height}`);

  // ─── HERO / MORNING — notice: morning risk cards, not the full chrome ───
  // Story: "What needs you before the first patient?"
  {
    // NAV_TRIM (not a fixed pixel count) — this source has a wider nav rail
    // than the 218px used previously, which left a sliver of the sidebar's
    // white/mint edge visible on the left of the hero screenshot.
    const left = Math.round(dm.width * NAV_TRIM);
    const top = 0;
    const width = dm.width - left;
    const height = Math.min(dm.height, Math.round(dm.height * 0.92));
    const content = await sharp(dashSrc).extract({ left, top, width, height }).png().toBuffer();
    // Photographic stage: wider canvas, soft margins — product, not docs
    await save(await canvas(content, 1760, 1040, 36, "north", "contain"), "mkt-dashboard.webp");
  }

  // ─── SHELF — real capture: live quantity + full item detail drawer ───
  // Uses the actual product screenshot (list + genuine detail panel) instead
  // of a hand-drawn detail mock, so nothing looks staged or misaligned.
  {
    const src = path.join(PUBLIC, "screen-24.png");
    const sm = await sharp(src).metadata();
    const left = Math.round(sm.width * NAV_TRIM);
    // Trim a ~12px OS-taskbar sliver that bleeds into the bottom of this
    // particular capture (confirmed by pixel-sampling: rows height-12..height
    // are dark, everything above is clean white).
    const bottomTrim = 12;
    const buf = await extractSafe(src, {
      left,
      top: 0,
      width: sm.width - left,
      height: sm.height - bottomTrim,
    });
    await featureThenTour(buf, "mkt-stock.webp", "mkt-tour-stock.webp");
  }

  // ─── SHORTAGE — real capture: low-stock cards ready for action ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const lm = await sharp(src).metadata();
    const left = Math.round(lm.width * NAV_TRIM);
    const width = Math.min(1180, lm.width - left - 20);
    const height = Math.min(560, lm.height);
    const buf = await extractSafe(src, { left, top: 0, width, height });
    await featureThenTour(buf, "mkt-low-stock.webp", "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY — real capture: expired / expiring timing on the cards ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const em = await sharp(src).metadata();
    const left = Math.round(em.width * NAV_TRIM);
    const buf = await extractSafe(src, {
      left,
      top: 0,
      width: em.width - left,
      height: em.height,
    });
    await featureThenTour(buf, "mkt-expiring.webp", "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS — real capture: the Vendors directory ───
  // Was a hand-drawn SVG mockup (fabricated vendor names, fake detail panel).
  // TrustBar tells visitors "every screenshot on this site is from the actual
  // Dental Assist software" — that was false for this one. This is the real
  // Vendors page (already free of the left nav rail in the source capture).
  {
    const src = path.join(PUBLIC, "suppliers-page.webp");
    const buf = await sharp(src).png().toBuffer();
    await featureThenTour(buf, "mkt-suppliers.webp", "mkt-tour-suppliers.webp");
  }

  // ─── RFQ — real capture, composed from three moments of the same flow ───
  // The itemised quote table and the resulting order total / budget impact
  // never fit in one screenshot (the totals are below the fold). These three
  // captures are also the mathematically-consistent version: each row shows
  // its own per-item saving (£8 + £8 + £40) that actually reconciles with the
  // "Money saved: £56.00" total below, instead of one badge that doesn't
  // visibly add up to the total. Table on top, order summary + budget impact
  // (joined seamlessly, since they're one continuous panel) below.
  {
    const tableBuf = await fs.readFile(path.join(APP, "6.2 rfq itemized table.png"));

    const summarySrc = path.join(APP, "6.3 rfq order summary.png");
    const sm = await sharp(summarySrc).metadata();
    const summaryLeft = 278;
    const summaryBuf = await extractSafe(summarySrc, {
      left: summaryLeft,
      top: 0,
      width: sm.width - summaryLeft,
      height: sm.height,
    });

    const budgetSrc = path.join(APP, "6.4 rfq budget impact.png");
    const bm = await sharp(budgetSrc).metadata();
    const budgetBuf = await extractSafe(budgetSrc, {
      left: summaryLeft,
      top: 0,
      width: bm.width - summaryLeft,
      height: bm.height,
    });

    // Join summary + budget with no gap — they're one continuous panel.
    const summaryMeta = await sharp(summaryBuf).metadata();
    const budgetMeta = await sharp(budgetBuf).metadata();
    const panelW = Math.max(summaryMeta.width, budgetMeta.width);
    const summaryBudget = await sharp({
      create: {
        width: panelW,
        height: summaryMeta.height + budgetMeta.height,
        channels: 3,
        background: "#FFFFFF",
      },
    })
      .composite([
        { input: summaryBuf, left: 0, top: 0 },
        { input: budgetBuf, left: 0, top: summaryMeta.height },
      ])
      .png()
      .toBuffer();

    const composed = await verticalStack(tableBuf, summaryBudget, FW, FH, FM, 26);
    await save(await sharp(composed).webp({ quality: 92, effort: 5 }).toBuffer(), "mkt-rfq-workflow.webp");
    await save(await tourFamily(composed), "mkt-tour-rfq.webp");
  }

  // ─── ORDERS — real capture: status of what is already in flight ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const pm = await sharp(src).metadata();
    const left = Math.round(pm.width * NAV_TRIM);
    const buf = await extractSafe(src, {
      left,
      top: 0,
      width: pm.width - left,
      height: pm.height,
    });
    await featureThenTour(buf, "mkt-purchase-orders.webp", "mkt-tour-orders.webp");
  }

  // ─── DELIVERIES — real capture: receive-order flow, goods-in ───
  // Used on the Features page. Content is clean (item names only, no
  // supplier/customer names), so this only ever needed the nav rail removed.
  {
    const src = path.join(PUBLIC, "screen-12.png");
    const dm2 = await sharp(src).metadata();
    const left = Math.round(dm2.width * NAV_TRIM);
    const buf = await extractSafe(src, {
      left,
      top: 0,
      width: dm2.width - left,
      height: dm2.height,
    });
    await featureThenTour(buf, "mkt-deliveries.webp", "mkt-tour-deliveries.webp");
  }

  // ─── REPORTING — real capture: spend / usage / savings over time ───
  // IMPORTANT: only list genuine, un-cropped source captures here — never a
  // previous mkt-*.webp output. This step used to fall back to its own prior
  // output when no fresh capture existed, so every re-run re-applied the same
  // 2%/8% crop on top of an already-cropped image, progressively clipping
  // more of the chart on each run (visible as a cut-off "£3,104.8" figure).
  // "reporting-page.webp" is the genuine, uncropped capture — feed it straight
  // into the canvas at its natural size instead of blind-percentage-cropping.
  {
    const candidates = [
      path.join(PUBLIC, "reporting-page.webp"),
      path.join(APP, "5. savings and usage.jpg"),
      path.join(APP, "5. savings & usage.jpg"),
      path.join(APP, "reporting.jpg"),
    ];
    let srcBuf = null;
    for (const c of candidates) {
      try {
        srcBuf = await fs.readFile(c);
        console.log(`Reporting source: ${c}`);
        break;
      } catch {
        /* */
      }
    }
    if (!srcBuf) {
      // Synthetic reporting frame if no capture available
      const screen = Buffer.from(`<svg width="${FW}" height="${FH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FFFFFF"/>
        <text x="40" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#0B1F2A">Savings &amp; usage</text>
        <text x="40" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Last 6 months · practice materials</text>
        <rect x="40" y="110" width="420" height="140" rx="16" fill="#F4F8F7"/>
        <text x="60" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Order value</text>
        <text x="60" y="196" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" fill="#0B1F2A">&#163;18,420</text>
        <rect x="500" y="110" width="420" height="140" rx="16" fill="#EAF6F1"/>
        <text x="520" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">RFQ savings</text>
        <text x="520" y="196" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" fill="#1F6B52">&#163;1,240</text>
        <rect x="960" y="110" width="440" height="140" rx="16" fill="#F4F8F7"/>
        <text x="980" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Stock usage</text>
        <text x="980" y="196" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" fill="#0B1F2A">2,184 units</text>
        <rect x="40" y="280" width="1360" height="560" rx="16" fill="#F7FAF9"/>
        <polyline points="80,720 280,640 480,660 680,520 880,480 1080,400 1280,360" fill="none" stroke="#1F6B52" stroke-width="3"/>
        <polyline points="80,700 280,680 480,620 680,600 880,540 1080,500 1280,460" fill="none" stroke="#0B2B28" stroke-width="3" opacity="0.45"/>
        <text x="80" y="820" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Jan · Feb · Mar · Apr · May · Jun</text>
      </svg>`);
      srcBuf = await sharp(screen).png().toBuffer();
    }
    const buf = await sharp(srcBuf).png().toBuffer();
    await featureThenTour(buf, "mkt-savings-usage.webp", "mkt-tour-reporting.webp");
    try {
      await save(await fs.readFile(path.join(OUT, "mkt-savings-usage.webp")), "mkt-reporting.webp");
    } catch {
      console.warn("⚠ legacy mkt-reporting.webp skipped");
    }
  }

  console.log("\nArt-directed photography pass complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
