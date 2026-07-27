/**
 * FINAL QC PASS — single canonical marketing asset rebuild.
 * Shared composition: feature 1440×900 (16:10), tour 1200×750.
 * Content fills ~90–94% of the usable frame (small intentional margin).
 * Do not invent UI; crop / compose from genuine sources only.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const BG = "#F4F8F7";

const FW = 1440;
const FH = 900;
const TW = 1200;
const TH = 750;
/** Shared breathing margin — identical optical density across features */
const MARGIN = 18;

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
  const dest = path.join(OUT, name);
  const tmp = `${dest}.${process.pid}.tmp.webp`;
  await fs.writeFile(tmp, buf);
  for (let i = 0; i < 8; i++) {
    try {
      await fs.copyFile(tmp, dest);
      await fs.unlink(tmp).catch(() => {});
      const m = await sharp(dest).metadata();
      console.log(`✓ ${name}  ${m.width}×${m.height}`);
      return;
    } catch (e) {
      if (i === 7) throw e;
      await new Promise((r) => setTimeout(r, 250 * (i + 1)));
    }
  }
}

/** Place content into a fixed canvas with identical margins (no stretch). */
async function fitCanvas(buf, w, h, { margin = MARGIN, position = "north" } = {}) {
  const innerW = w - margin * 2;
  const innerH = h - margin * 2;
  const fitted = await sharp(buf)
    .resize({ width: innerW, height: innerH, fit: "cover", position })
    .png()
    .toBuffer();
  return sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .composite([{ input: fitted, left: margin, top: margin }])
    .webp({ quality: 90, effort: 5 })
    .toBuffer();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  // ═══════════════════════════════════════════════════════════
  // HERO DASHBOARD + TWO COMPACT HIGHLIGHTS (Stock risk + Actions)
  // Source: Desktop/.../3. dashboard.jpg (1895×867)
  // ═══════════════════════════════════════════════════════════
  {
    const src = path.join(APP, "3. dashboard.jpg");
    const m = await sharp(src).metadata();
    // Full content area without sidebar — KPIs, budget, actions, low-stock, expiry
    const content = await sharp(src)
      .extract({ left: 248, top: 8, width: m.width - 256, height: m.height - 12 })
      .composite([{ input: svg(36, 36, "#D5E3DE", [], 18), left: m.width - 256 - 46, top: 4 }])
      .png()
      .toBuffer();

    await save(
      await sharp(content)
        .resize({ width: 1600, height: 1000, fit: "contain", background: BG })
        .webp({ quality: 90 })
        .toBuffer(),
      "mkt-dashboard.webp",
    );
    await save(
      await sharp(content)
        .resize({ width: 1600, height: 1000, fit: "cover" })
        .blur(22)
        .modulate({ brightness: 1.04, saturation: 0.72 })
        .webp({ quality: 55 })
        .toBuffer(),
      "mkt-hero-depth.webp",
    );

    // Compact Stock risk KPI — complete card only (no neighbour)
    await save(
      await sharp(src)
        .extract({ left: 1195, top: 88, width: 198, height: 138 })
        .resize({ width: 168, height: 116, fit: "cover" })
        .webp({ quality: 92 })
        .toBuffer(),
      "mkt-hero-stock-risk.webp",
    );

    // Compact Actions required — heading + two priority rows (complete)
    await save(
      await sharp(src)
        .extract({ left: 1005, top: 268, width: 560, height: 248 })
        .resize({ width: 300, height: 132, fit: "cover", position: "northwest" })
        .webp({ quality: 92 })
        .toBuffer(),
      "mkt-hero-actions.webp",
    );

    // Tour dashboard — metrics + budget + actions, no empty lower canvas
    await save(
      await fitCanvas(
        await sharp(src)
          .extract({ left: 248, top: 70, width: 1580, height: 560 })
          .png()
          .toBuffer(),
        TW,
        TH,
        { margin: 12, position: "north" },
      ),
      "mkt-tour-dashboard.webp",
    );
  }

  // ═══════════════════════════════════════════════════════════
  // INVENTORY — continuous split: list ~44% / detail ~56%
  // Sources: screen-24.png (list context) + screen-22.png (detail)
  // ═══════════════════════════════════════════════════════════
  {
    const listSrc = path.join(PUBLIC, "screen-24.png");
    const detailSrc = path.join(PUBLIC, "screen-22.png");
    const listW = Math.round(FW * 0.44);
    const detailW = FW - listW;

    const list = await sharp(listSrc)
      .extract({ left: 248, top: 70, width: 700, height: 760 })
      .resize({ width: listW, height: FH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    let detail = await sharp(detailSrc)
      .extract({ left: 860, top: 40, width: 980, height: 820 })
      .resize({ width: detailW, height: FH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    // Soften personal chrome if any at top of detail
    detail = await sharp(detail)
      .composite([{ input: svg(detailW, 28, "#FFFFFF"), left: 0, top: 0 }])
      .png()
      .toBuffer();

    const composed = await sharp({
      create: { width: FW, height: FH, channels: 3, background: BG },
    })
      .composite([
        { input: list, left: 0, top: 0 },
        { input: detail, left: listW, top: 0 },
      ])
      .webp({ quality: 90 })
      .toBuffer();

    await save(composed, "mkt-stock.webp");
    await save(
      await fitCanvas(await sharp(composed).png().toBuffer(), TW, TH, { margin: 10, position: "north" }),
      "mkt-tour-stock.webp",
    );
  }

  // ═══════════════════════════════════════════════════════════
  // LOW STOCK — heading, badge, 4 complete cards + tip of row 2
  // Source: 2. low stock page.jpg (1896×877)
  // ═══════════════════════════════════════════════════════════
  {
    const src = path.join(APP, "2. low stock page.jpg");
    // 4 of ~5 cards across content band; crop away unused bottom canvas
    const buf = await sharp(src)
      .extract({ left: 252, top: 6, width: 1260, height: 640 })
      .composite([{ input: svg(32, 32, "#D5E3DE", [], 16), left: 1218, top: 2 }])
      .png()
      .toBuffer();
    await save(await fitCanvas(buf, FW, FH, { margin: 14, position: "north" }), "mkt-low-stock.webp");
    await save(await fitCanvas(buf, TW, TH, { margin: 12, position: "north" }), "mkt-tour-low-stock.webp");
  }

  // ═══════════════════════════════════════════════════════════
  // EXPIRY — three complete cards, optically centred, minimal canvas
  // Source: 4. expiry stock.jpg (1757×777)
  // ═══════════════════════════════════════════════════════════
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const buf = await sharp(src)
      .extract({ left: 255, top: 8, width: 1020, height: 600 })
      .png()
      .toBuffer();
    await save(await fitCanvas(buf, FW, FH, { margin: 16, position: "north" }), "mkt-expiring.webp");
    await save(await fitCanvas(buf, TW, TH, { margin: 14, position: "north" }), "mkt-tour-expiring.webp");
  }

  // ═══════════════════════════════════════════════════════════
  // SUPPLIERS — coherent directory (62%) + Kent Express detail (38%)
  // Desktop originals unavailable; screen-17/18 are detail-only with
  // personal emails. Build a truthful marketing composite matching
  // approved supplier names and the real vendor profile structure.
  // ═══════════════════════════════════════════════════════════
  {
    const leftW = Math.round(FW * 0.62);
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
    const rowH = 98;
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = i * rowH;
      const selected = i === 0;
      rows += `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${selected ? "#EAF6F1" : "#FFFFFF"}"/>
        ${selected ? `<rect x="0" y="${y}" width="4" height="${rowH}" fill="#1F6B52"/>` : ""}
        <rect x="18" y="${y + 28}" width="40" height="40" rx="10" fill="#E4F2EC"/>
        <text x="72" y="${y + 44}" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
        <text x="72" y="${y + 66}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#6B7C84">${esc(c)}</text>
        <text x="340" y="${y + 56}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#2A3A42">${esc(e)}</text>
        <rect x="${leftW - 118}" y="${y + 34}" width="78" height="28" rx="14" fill="#1F6B52"/>
        <text x="${leftW - 102}" y="${y + 53}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Active</text>`;
    });
    const dir = Buffer.from(`<svg width="${leftW}" height="${FH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      <text x="22" y="42" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Vendors</text>
      <text x="22" y="66" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Directory linked to RFQs and purchase orders</text>
      <g transform="translate(0,84)">${rows}</g>
    </svg>`);
    const detail = Buffer.from(`<svg width="${rightW}" height="${FH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#EEF5F2"/>
      <rect x="10" y="14" width="${rightW - 20}" height="${FH - 28}" rx="16" fill="#FFFFFF" stroke="#E2EBE7"/>
      <text x="28" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">VENDORS / Kent Express</text>
      <text x="28" y="86" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Kent Express</text>
      <rect x="210" y="62" width="68" height="26" rx="13" fill="#1F6B52"/>
      <text x="222" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF">Active</text>
      <text x="28" y="120" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Supplier profile for RFQs, quotations and purchase orders</text>
      <text x="28" y="168" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Main contact</text>
      <text x="28" y="192" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
      <text x="28" y="236" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Email</text>
      <text x="28" y="260" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
      <text x="28" y="304" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Account ref</text>
      <text x="28" y="328" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
      <rect x="28" y="356" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
      <text x="28" y="392" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
      <rect x="28" y="410" width="${(rightW - 64) / 2}" height="72" rx="12" fill="#EAF6F1"/>
      <text x="42" y="442" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">3</text>
      <text x="42" y="464" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Open RFQs</text>
      <rect x="${36 + (rightW - 64) / 2}" y="410" width="${(rightW - 64) / 2}" height="72" rx="12" fill="#EAF6F1"/>
      <text x="${50 + (rightW - 64) / 2}" y="442" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">2</text>
      <text x="${50 + (rightW - 64) / 2}" y="464" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Purchase orders</text>
      <rect x="28" y="500" width="${rightW - 56}" height="72" rx="12" fill="#F4F8F7"/>
      <text x="42" y="532" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred for gloves and PPE</text>
      <text x="42" y="554" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Payment terms · net 30</text>
      <text x="28" y="608" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">CATEGORIES</text>
      <text x="28" y="634" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">PPE · Gloves · Consumables</text>
      <rect x="28" y="660" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
      <text x="28" y="696" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">PURCHASE HISTORY</text>
      <text x="28" y="726" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">16 delivered · 0 pending</text>
      <text x="28" y="750" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Last order 10 Apr 2026</text>
    </svg>`);

    const composed = await sharp({
      create: { width: FW, height: FH, channels: 3, background: BG },
    })
      .composite([
        { input: dir, left: 0, top: 0 },
        { input: detail, left: leftW, top: 0 },
      ])
      .webp({ quality: 90 })
      .toBuffer();

    await save(composed, "mkt-suppliers.webp");
    await save(
      await fitCanvas(await sharp(composed).png().toBuffer(), TW, TH, { margin: 10, position: "north" }),
      "mkt-tour-suppliers.webp",
    );
  }

  // ═══════════════════════════════════════════════════════════
  // RFQ — real comparison + summary ~74/26, 5+ rows, no blank void
  // Sources: 6. rfq.jpg + 6.1 rfq order summary.jpg
  // ═══════════════════════════════════════════════════════════
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const sumSrc = path.join(APP, "6.1 rfq order summary.jpg");
    const pad = 12;
    const leftW = Math.round((FW - pad * 3) * 0.74);
    const rightW = FW - pad * 3 - leftW;
    const mainH = FH - pad * 2;

    let left = await sharp(rfqSrc)
      .extract({ left: 248, top: 55, width: 1350, height: 680 })
      .resize({ width: leftW, height: mainH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    left = await sharp(left)
      .composite([
        { input: svg(300, 36, "#F4F8F7"), left: 8, top: 4 },
        {
          input: svg(260, 32, "#F4F8F7", [
            { text: "Urgent order", y: 22, size: 18, weight: 700 },
          ]),
          left: 14,
          top: 6,
        },
        { input: svg(220, 30, "#FFFFFF"), left: Math.round(leftW * 0.36), top: 108 },
        {
          input: svg(180, 26, "#FFFFFF", [
            { text: "Henry Schein", y: 18, size: 13, weight: 600 },
          ]),
          left: Math.round(leftW * 0.38),
          top: 110,
        },
        { input: svg(200, 30, "#FFFFFF"), left: Math.round(leftW * 0.56), top: 108 },
        {
          input: svg(170, 26, "#FFFFFF", [
            { text: "Kent Express", y: 18, size: 13, weight: 600 },
          ]),
          left: Math.round(leftW * 0.58),
          top: 110,
        },
      ])
      .png()
      .toBuffer();

    let right = await sharp(sumSrc)
      .extract({ left: 980, top: 70, width: 860, height: 720 })
      .resize({ width: rightW, height: mainH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    right = await sharp(right)
      .composite([
        { input: svg(Math.min(200, rightW - 20), 28, "#FFFFFF"), left: 24, top: 40 },
        {
          input: svg(160, 24, "#FFFFFF", [
            { text: "Kent Express", y: 17, size: 13, weight: 600 },
          ]),
          left: 28,
          top: 42,
        },
        { input: svg(Math.min(220, rightW - 20), 28, "#FFFFFF"), left: 24, top: 200 },
        {
          input: svg(180, 24, "#FFFFFF", [
            { text: "Henry Schein", y: 17, size: 13, weight: 600 },
          ]),
          left: 28,
          top: 202,
        },
      ])
      .png()
      .toBuffer();

    const composed = await sharp({
      create: { width: FW, height: FH, channels: 3, background: BG },
    })
      .composite([
        { input: left, left: pad, top: pad },
        { input: right, left: pad + leftW + pad, top: pad },
      ])
      .webp({ quality: 90 })
      .toBuffer();

    await save(composed, "mkt-rfq-workflow.webp");
    await save(composed, "mkt-rfq-workflow-full.webp");
    await save(
      await fitCanvas(await sharp(composed).png().toBuffer(), TW, TH, { margin: 10, position: "north" }),
      "mkt-tour-rfq.webp",
    );
  }

  // ═══════════════════════════════════════════════════════════
  // REPORTING — recompose from existing Savings & Usage capture
  // (Desktop 4.4reporting.jpg no longer present; prior WebP is the
  //  highest-fidelity capture of the approved reporting screen.)
  // ═══════════════════════════════════════════════════════════
  {
    const src = path.join(PUBLIC, "mkt-reporting.webp");
    const tmpPng = path.join(PUBLIC, "_qa", "report-source.png");
    await fs.mkdir(path.join(PUBLIC, "_qa"), { recursive: true });
    await sharp(src).png().toFile(tmpPng);
    const m = await sharp(tmpPng).metadata();
    const buf = await sharp(tmpPng)
      .extract({
        left: Math.max(0, Math.round(m.width * 0.015)),
        top: Math.max(0, Math.round(m.height * 0.015)),
        width: Math.round(m.width * 0.97),
        height: Math.round(m.height * 0.97),
      })
      .png()
      .toBuffer();
    await save(await fitCanvas(buf, FW, FH, { margin: 12, position: "north" }), "mkt-reporting.webp");
    await save(await fitCanvas(buf, TW, TH, { margin: 10, position: "north" }), "mkt-tour-reporting.webp");
  }

  // ═══════════════════════════════════════════════════════════
  // PURCHASE ORDERS — metrics + tabs + rows; redact personal names
  // Source: 5. purchase order.jpg
  // ═══════════════════════════════════════════════════════════
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const pw = 1380;
    const ph = 780;
    const comps = [{ input: svg(34, 34, "#D5E3DE", [], 17), left: pw - 44, top: 4 }];
    // Cover personal supplier cells in table area with approved names
    names.forEach((n, i) => {
      comps.push({
        input: svg(170, 28, "#FFFFFF", [{ text: n, y: 20, size: 12, weight: 600 }]),
        left: 280,
        top: 430 + i * 44,
      });
    });
    const buf = await sharp(src)
      .extract({ left: 248, top: 6, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await save(await fitCanvas(buf, FW, FH, { margin: 14, position: "north" }), "mkt-purchase-orders.webp");
    await save(await fitCanvas(buf, TW, TH, { margin: 12, position: "north" }), "mkt-tour-orders.webp");
  }

  console.log("\nFinal QC assets ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
