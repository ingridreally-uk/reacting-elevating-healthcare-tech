/**
 * Canonical marketing screenshot builder.
 *
 * Usage: node scripts/prepare-marketing-screens.mjs
 *
 * - Feature frames: 1440×900 with equal margins (contain — no accidental side-crop)
 * - Sources: Desktop app images + in-repo screen-22/24 where needed
 * - Rebuilds feature WebPs used on the homepage (and optional tour variants)
 *
 * This is the only maintained screenshot pipeline. Do not add disposable fix-* scripts.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { execSync } from "node:child_process";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const BG = "#F4F8F7";

const FW = 1440;
const FH = 900;
const TW = 1200;
const TH = 750;
/** Identical inner margins — feature + tour families */
const FM = 20;
const TM = 16;

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("£", "&#163;");

function svg(w, h, color, lines = [], rx = 4) {
  const t = lines
    .map(
      (l) =>
        `<text x="${l.x ?? 10}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size ?? 13}" font-weight="${l.weight ?? 500}" fill="${l.color ?? "#0B1F2A"}">${esc(l.text)}</text>`,
    )
    .join("");
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="${rx}" ry="${rx}" fill="${color}"/>${t}</svg>`,
  );
}

async function save(buf, name) {
  const alt = path.join(OUT, `alt-${name}`);
  await fs.writeFile(alt, buf);
  const dest = path.join(OUT, name);
  let lastErr;
  for (let i = 0; i < 14; i++) {
    try {
      // Prefer atomic replace via rename after clearing dest when unlocked.
      try {
        await fs.unlink(dest);
      } catch {
        /* locked or missing */
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

/** Identical outer proportions + identical inner margin. */
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
  return sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .composite([{ input: fitted, left: margin, top: margin }])
    .webp({ quality: 91, effort: 5 })
    .toBuffer();
}

/** Tour family — same perceived fill: contain into equal margin box (no crop surprise). */
async function tourFamily(buf) {
  const innerW = TW - TM * 2;
  const innerH = TH - TM * 2;
  const fitted = await sharp(buf)
    .resize({ width: innerW, height: innerH, fit: "contain", background: BG })
    .png()
    .toBuffer();
  const m = await sharp(fitted).metadata();
  const left = TM + Math.round((innerW - m.width) / 2);
  const top = TM + Math.round((innerH - m.height) / 2);
  return sharp({ create: { width: TW, height: TH, channels: 3, background: BG } })
    .composite([{ input: fitted, left, top }])
    .webp({ quality: 91, effort: 5 })
    .toBuffer();
}

async function featureThenTour(featureBuf, featureName, tourName, opts = {}) {
  const { position = "north", fit = "contain" } = opts;
  const feat = await canvas(featureBuf, FW, FH, FM, position, fit);
  await save(feat, featureName);
  await save(await tourFamily(await sharp(feat).png().toBuffer()), tourName);
}

async function main() {
  const dashSrc = path.join(APP, "3. dashboard.jpg");
  const dm = await sharp(dashSrc).metadata();

  // ─── HERO DASHBOARD — header, KPI row, Budget, Actions, Low stock, About to expire ───
  {
    const left = 236;
    const top = 4;
    const width = Math.min(1680, dm.width - left - 6);
    const height = Math.min(980, dm.height - top - 2);
    const content = await sharp(dashSrc)
      .extract({ left, top, width, height })
      .png()
      .toBuffer();
    // Fit to frame: cover fills the hero without soft empty mint bands.
    const fitted = await sharp(content)
      .resize({
        width: 1600,
        height: 1000,
        fit: "cover",
        position: "north",
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer();
    await save(
      await sharp(fitted).webp({ quality: 92, effort: 6 }).toBuffer(),
      "mkt-dashboard.webp",
    );
  }

  // ─── INVENTORY — balanced list/detail (~55/45), ≥2 stock cards + detail fields ───
  {
    const inv = await sharp(path.join(PUBLIC, "screen-24.png")).metadata();
    const left = 248;
    const top = 8;
    const width = Math.min(960, inv.width - left - 8);
    const height = Math.min(860, inv.height - top - 2);
    const buf = await sharp(path.join(PUBLIC, "screen-24.png"))
      .extract({ left, top, width, height })
      .png()
      .toBuffer();
    await featureThenTour(buf, "mkt-stock.webp", "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK — heading, action count, complete first row + part of second ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const lm = await sharp(src).metadata();
    const left = 248;
    const top = 4;
    const width = Math.min(1620, lm.width - left - 8);
    const height = Math.min(860, lm.height - top - 2);
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .png()
      .toBuffer();
    await featureThenTour(buf, "mkt-low-stock.webp", "mkt-tour-low-stock.webp", {
      fit: "cover",
      position: "north",
    });
  }

  // ─── EXPIRY — three complete cards, less empty mint floor ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const em = await sharp(src).metadata();
    const left = 248;
    const top = 28;
    const width = Math.min(1220, em.width - left - 8);
    const height = Math.min(600, em.height - top - 2);
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .png()
      .toBuffer();
    await featureThenTour(buf, "mkt-expiring.webp", "mkt-tour-expiring.webp", {
      fit: "cover",
      position: "north",
    });
  }

  // ─── SUPPLIERS — 55% directory / 45% profile ───
  {
    const leftW = Math.round(FW * 0.55);
    const rightW = FW - leftW;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["TOC Dental", "Purchasing", "orders@tocdental.com"],
      ["Wright Cottrell", "Accounts", "accounts@wrightcottrell.co.uk"],
      ["DDS Dental", "Orders", "orders@ddsdental.co.uk"],
    ];
    const rowH = 100;
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = i * rowH;
      const selected = i === 0;
      rows += `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${selected ? "#EAF6F1" : "#FFFFFF"}"/>
        ${selected ? `<rect x="0" y="${y}" width="4" height="${rowH}" fill="#1F6B52"/>` : ""}
        <rect x="16" y="${y + 28}" width="40" height="40" rx="10" fill="#E4F2EC"/>
        <text x="68" y="${y + 44}" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
        <text x="68" y="${y + 66}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#6B7C84">${esc(c)} · ${esc(e)}</text>
        <rect x="${leftW - 100}" y="${y + 34}" width="72" height="28" rx="14" fill="#1F6B52"/>
        <text x="${leftW - 86}" y="${y + 53}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Active</text>`;
    });
    const dir = Buffer.from(`<svg width="${leftW}" height="${FH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      <text x="20" y="40" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Suppliers</text>
      <text x="20" y="64" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Directory linked to RFQs and purchase orders</text>
      <g transform="translate(0,80)">${rows}</g>
    </svg>`);
    const detail = Buffer.from(`<svg width="${rightW}" height="${FH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#EEF5F2"/>
      <rect x="10" y="14" width="${rightW - 20}" height="${FH - 28}" rx="16" fill="#FFFFFF" stroke="#E2EBE7"/>
      <text x="28" y="50" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">SUPPLIERS / Kent Express</text>
      <text x="28" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Kent Express</text>
      <rect x="220" y="66" width="68" height="26" rx="13" fill="#1F6B52"/>
      <text x="234" y="84" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF">Active</text>
      <text x="28" y="124" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Supplier profile for RFQs, quotations and purchase orders</text>
      <text x="28" y="172" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Main contact</text>
      <text x="28" y="198" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
      <text x="28" y="246" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Email</text>
      <text x="28" y="272" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
      <text x="28" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Account ref</text>
      <text x="28" y="346" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
      <rect x="28" y="376" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
      <text x="28" y="416" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
      <rect x="28" y="434" width="${(rightW - 64) / 2}" height="78" rx="12" fill="#EAF6F1"/>
      <text x="44" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">3</text>
      <text x="44" y="494" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Open RFQs</text>
      <rect x="${36 + (rightW - 64) / 2}" y="434" width="${(rightW - 64) / 2}" height="78" rx="12" fill="#EAF6F1"/>
      <text x="${52 + (rightW - 64) / 2}" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">2</text>
      <text x="${52 + (rightW - 64) / 2}" y="494" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Purchase orders</text>
      <rect x="28" y="532" width="${rightW - 56}" height="74" rx="12" fill="#F4F8F7"/>
      <text x="44" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred for gloves and PPE</text>
      <text x="44" y="588" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Payment terms · net 30</text>
      <text x="28" y="646" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">CATEGORIES</text>
      <text x="28" y="674" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">PPE · Gloves · Consumables</text>
      <rect x="28" y="702" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
      <text x="28" y="742" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">PURCHASE HISTORY</text>
      <text x="28" y="774" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">16 delivered · 0 pending</text>
      <text x="28" y="800" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Last order 10 Apr 2026</text>
    </svg>`);
    const composed = await sharp({
      create: { width: FW, height: FH, channels: 3, background: BG },
    })
      .composite([
        { input: dir, left: 0, top: 0 },
        { input: detail, left: leftW, top: 0 },
      ])
      .png()
      .toBuffer();
    await featureThenTour(composed, "mkt-suppliers.webp", "mkt-tour-suppliers.webp");
  }

  // ─── RFQ — comparison ~81% (+5%), full summary ───
  {
    const leftW = Math.round(FW * 0.81);
    const products = [
      { name: "ProTaper Hand File 25mm S1 6pk", mfr: "Maillefer / Dentsply", a: "42.55", b: "46.55", pick: "a", qty: 1 },
      { name: "Sterile Safeskin Purple Nitrile Gloves S", mfr: "Kimberly Clark", a: "7.99", b: "8.99", pick: "a", qty: 2 },
      { name: "Venus Diamond Composite Syringe 4g A4", mfr: "Kulzer", a: "57.26", b: "47.26", pick: "b", qty: 4, saved: "40.00" },
      { name: "Pana Spray Plus 500ml", mfr: "NSK", a: "28.50", b: "26.90", pick: "b", qty: 1, saved: "1.60" },
      { name: "Septanest Articaine 1:100,000 50pk", mfr: "Septodont", a: "64.80", b: "61.20", pick: "b", qty: 1, saved: "3.60" },
      { name: "Empress Direct Syringe 3g Dentin D2", mfr: "Ivoclar", a: "39.90", b: "37.50", pick: "b", qty: 2, saved: "4.80" },
    ];
    const rowH = 118;
    let rows = "";
    products.forEach((p, i) => {
      const y = 88 + i * rowH;
      rows += `<rect x="0" y="${y}" width="${leftW}" height="${rowH}" fill="${i % 2 ? "#FAFCFB" : "#FFFFFF"}"/>
        <text x="22" y="${y + 36}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${esc(p.name)}</text>
        <text x="22" y="${y + 58}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">${esc(p.mfr)}</text>
        <rect x="${Math.round(leftW * 0.44)}" y="${y + 30}" width="148" height="46" rx="10" fill="${p.pick === "a" ? "#E7F5EF" : "#FFF4EB"}"/>
        <text x="${Math.round(leftW * 0.44) + 18}" y="${y + 60}" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">${p.pick === "a" ? "✓" : "+"} &#163;${p.a}</text>
        <rect x="${Math.round(leftW * 0.44) + 164}" y="${y + 30}" width="148" height="46" rx="10" fill="${p.pick === "b" ? "#E7F5EF" : "#FFF4EB"}"/>
        <text x="${Math.round(leftW * 0.44) + 182}" y="${y + 60}" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">${p.pick === "b" ? "✓" : "+"} &#163;${p.b}</text>
        <text x="${leftW - 44}" y="${y + 60}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">${p.qty}</text>
        ${p.saved ? `<text x="${leftW - 138}" y="${y + 92}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Saved &#163;${p.saved}</text>` : ""}`;
    });
    const screen = Buffer.from(`<svg width="${FW}" height="${FH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      <rect x="${leftW}" y="0" width="${FW - leftW}" height="${FH}" fill="#F7FAF9"/>
      <line x1="${leftW}" y1="0" x2="${leftW}" y2="${FH}" stroke="#E2EBE7"/>
      <text x="22" y="38" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Urgent order</text>
      <rect x="190" y="18" width="100" height="26" rx="13" fill="#E7F5EF"/>
      <text x="204" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Responses</text>
      <text x="22" y="64" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">2/2 suppliers replied · comparison ready</text>
      <text x="22" y="86" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Product</text>
      <text x="${Math.round(leftW * 0.44) + 18}" y="86" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Henry Schein</text>
      <text x="${Math.round(leftW * 0.44) + 182}" y="86" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Kent Express</text>
      ${rows}
      <text x="${leftW + 16}" y="40" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
      <text x="${leftW + 16}" y="74" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">Kent Express</text>
      <text x="${leftW + 16}" y="98" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">4 items selected</text>
      <text x="${leftW + 16}" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
      <text x="${FW - 80}" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;348.16</text>
      <text x="${leftW + 16}" y="180" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
      <text x="${FW - 74}" y="180" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;69.63</text>
      <line x1="${leftW + 16}" y1="204" x2="${FW - 16}" y2="204" stroke="#E2EBE7"/>
      <text x="${leftW + 16}" y="246" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#1F6B52">Order total</text>
      <text x="${FW - 92}" y="246" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#1F6B52">&#163;417.79</text>
      <text x="${leftW + 16}" y="282" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#1F6B52">Money saved</text>
      <text x="${FW - 74}" y="282" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#1F6B52">&#163;50.00</text>
      <rect x="${leftW + 16}" y="310" width="${FW - leftW - 32}" height="1" fill="#E2EBE7"/>
      <text x="${leftW + 16}" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
      <text x="${leftW + 16}" y="388" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
      <text x="${FW - 92}" y="388" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,447.33</text>
      <text x="${leftW + 16}" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
      <text x="${FW - 92}" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,029.54</text>
      <rect x="${leftW + 16}" y="442" width="${FW - leftW - 32}" height="10" rx="5" fill="#EAF6F1"/>
      <rect x="${leftW + 16}" y="442" width="${Math.round((FW - leftW - 32) * 0.59)}" height="10" rx="5" fill="#2F8F6B"/>
      <text x="${leftW + 16}" y="480" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">59% of monthly materials budget</text>
      <rect x="${leftW + 16}" y="506" width="${FW - leftW - 32}" height="1" fill="#E2EBE7"/>
      <text x="${leftW + 16}" y="550" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
      <text x="${leftW + 16}" y="574" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · &#163;98.53</text>
      <text x="${leftW + 16}" y="630" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">COMBINED</text>
      <text x="${leftW + 16}" y="668" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#0B1F2A">Grand total &#163;516.32</text>
      <text x="${leftW + 16}" y="700" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#1F6B52">Total money saved &#163;50.00</text>
      <text x="${leftW + 16}" y="760" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Compare · select · order with confidence</text>
    </svg>`);
    const png = await sharp(screen).png().toBuffer();
    await featureThenTour(png, "mkt-rfq-workflow.webp", "mkt-tour-rfq.webp");
    await save(await canvas(png, FW, FH, FM, "north"), "mkt-rfq-workflow-full.webp");
  }

  // ─── REPORTING — margins only (match family) ───
  {
    const candidates = [
      path.join(PUBLIC, "_qa", "report-source.png"),
      path.join(PUBLIC, "mkt-savings-usage.webp"),
      path.join(PUBLIC, "mkt-reporting.webp"),
    ];
    let src = candidates[1];
    for (const c of candidates) {
      try {
        await fs.access(c);
        src = c;
        break;
      } catch {
        /* */
      }
    }
    // Buffer fully before writing so we never lock the destination while reading it.
    const sourceBuf = await fs.readFile(src);
    const m = await sharp(sourceBuf).metadata();
    const buf = await sharp(sourceBuf)
      .extract({
        left: Math.round(m.width * 0.012),
        top: Math.round(m.height * 0.015),
        width: Math.round(m.width * 0.976),
        height: Math.round(m.height * 0.96),
      })
      .png()
      .toBuffer();
    await featureThenTour(buf, "mkt-savings-usage.webp", "mkt-tour-reporting.webp");
    // Keep legacy filename in sync when unlocked (best-effort).
    try {
      const legacy = await fs.readFile(path.join(OUT, "mkt-savings-usage.webp"));
      await save(legacy, "mkt-reporting.webp");
    } catch {
      console.warn("⚠ could not refresh legacy mkt-reporting.webp (file may be locked)");
    }
  }

  // ─── PO — same family margins ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const pm = await sharp(src).metadata();
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const left = 248;
    const top = 8;
    const pw = Math.min(1400, pm.width - left - 8);
    const ph = Math.min(760, pm.height - top - 2);
    const comps = [{ input: svg(32, 32, "#D5E3DE", [], 16), left: pw - 42, top: 4 }];
    names.forEach((n, i) => {
      comps.push({
        input: svg(168, 26, "#FFFFFF", [{ text: n, y: 18, size: 12, weight: 600 }]),
        left: 290,
        top: 420 + i * 44,
      });
    });
    const buf = await sharp(src)
      .extract({ left, top, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await featureThenTour(buf, "mkt-purchase-orders.webp", "mkt-tour-orders.webp");
  }

  console.log("\nFinal shot pass complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
