/**
 * Visual rebuild — dedicated crops, hero highlights, dense RFQ from real sources.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const DESKTOP = path.join(process.env.USERPROFILE, "Desktop");

const BG = "#F4F8F7";
const FW = 1440;
const FH = 900;
const TW = 1200;
const TH = 750;

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

async function padFrame(buf, w, h, { padX = 36, padY = 28, position = "north" } = {}) {
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;
  const fitted = await sharp(buf)
    .resize({ width: innerW, height: innerH, fit: "contain", background: BG })
    .png()
    .toBuffer();
  const m = await sharp(fitted).metadata();
  const left = Math.round((w - m.width) / 2);
  const top =
    position === "center"
      ? Math.round((h - m.height) / 2)
      : position === "south"
        ? h - padY - m.height
        : padY;
  return sharp({
    create: { width: w, height: h, channels: 3, background: BG },
  })
    .composite([{ input: fitted, left, top }])
    .webp({ quality: 88, effort: 5 })
    .toBuffer();
}

async function coverFrame(buf, w, h, position = "north") {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "cover", position })
    .webp({ quality: 88, effort: 5 })
    .toBuffer();
}

async function save(buf, name) {
  const dest = path.join(OUT, name);
  const tmp = `${dest}.new.webp`;
  await fs.writeFile(tmp, buf);
  await fs.copyFile(tmp, dest);
  await fs.unlink(tmp).catch(() => {});
  const m = await sharp(dest).metadata();
  console.log(`✓ ${name}  ${m.width}×${m.height}`);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  // ─── HERO DASHBOARD (full, no side clip) ───
  {
    const src = path.join(APP, "3. dashboard.jpg");
    const m = await sharp(src).metadata();
    const left = 248;
    const top = 10;
    const width = m.width - left - 4;
    const height = m.height - top - 2;
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([{ input: svg(42, 42, "#D5E3DE", [], 21), left: width - 52, top: 2 }])
      .png()
      .toBuffer();
    await save(
      await sharp(buf)
        .resize({ width: 1600, height: 1000, fit: "contain", background: BG })
        .webp({ quality: 90, effort: 5 })
        .toBuffer(),
      "mkt-dashboard.webp",
    );

    // Soft depth plate (blurred tint)
    const depth = await sharp(buf)
      .resize({ width: 1600, height: 1000, fit: "cover", position: "centre" })
      .blur(18)
      .modulate({ brightness: 1.05, saturation: 0.85 })
      .webp({ quality: 70 })
      .toBuffer();
    await save(depth, "mkt-hero-depth.webp");

    // Highlight cards extracted from same dashboard
    const actions = await sharp(src)
      .extract({ left: 980, top: 280, width: 640, height: 320 })
      .resize({ width: 420, height: 210, fit: "cover", position: "northwest" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(actions, "mkt-hero-actions.webp");

    const stockRisk = await sharp(src)
      .extract({ left: 1180, top: 90, width: 220, height: 150 })
      .resize({ width: 200, height: 136, fit: "cover" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(stockRisk, "mkt-hero-stock-risk.webp");

    const purchasing = await sharp(src)
      .extract({ left: 1410, top: 90, width: 230, height: 150 })
      .resize({ width: 200, height: 136, fit: "cover" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(purchasing, "mkt-hero-purchasing.webp");

    const lowStock = await sharp(src)
      .extract({ left: 260, top: 620, width: 760, height: 200 })
      .resize({ width: 380, height: 100, fit: "cover", position: "northwest" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(lowStock, "mkt-hero-low-stock.webp");

    // Tour: actions + risk focus
    const tourDash = await sharp(src)
      .extract({ left: 248, top: 180, width: 1580, height: 620 })
      .png()
      .toBuffer();
    await save(await coverFrame(tourDash, TW, TH, "north"), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY — balanced list + detail from screen-24 ───
  {
    const src = path.join(PUBLIC, "screen-24.png");
    // Slightly wider extract so list stays readable and detail isn't dominant
    const buf = await sharp(src)
      .extract({ left: 248, top: 20, width: 1580, height: 840 })
      .composite([{ input: svg(40, 40, "#D5E3DE", [], 20), left: 1530, top: 2 }])
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 20, padY: 18, position: "west" }), "mkt-stock.webp");
    // Tour: tighter on relationship between list and detail
    const tour = await sharp(src)
      .extract({ left: 300, top: 70, width: 1480, height: 760 })
      .png()
      .toBuffer();
    await save(await coverFrame(tour, TW, TH, "northwest"), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK — four complete cards, not over-zoomed ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    // Wider crop so right card isn't cut; modest second-row peek
    const buf = await sharp(src)
      .extract({ left: 248, top: 12, width: 1380, height: 760 })
      .composite([{ input: svg(36, 36, "#D5E3DE", [], 18), left: 1334, top: 4 }])
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 28, padY: 24, position: "north" }), "mkt-low-stock.webp");
    const tour = await sharp(src)
      .extract({ left: 255, top: 28, width: 1240, height: 680 })
      .png()
      .toBuffer();
    await save(await padFrame(tour, TW, TH, { padX: 22, padY: 18, position: "north" }), "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY — breathing room, three complete cards ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const crop = await sharp(src)
      .extract({ left: 246, top: 8, width: 1180, height: 740 })
      .png()
      .toBuffer();
    await save(await padFrame(crop, FW, FH, { padX: 48, padY: 40, position: "center" }), "mkt-expiring.webp");
    await save(await padFrame(crop, TW, TH, { padX: 36, padY: 30, position: "center" }), "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS — real directory + selected detail (60/40) ───
  {
    const dirSrc = path.join(DESKTOP, "3. suplyer management.jpg");
    const detailSrc = path.join(DESKTOP, "3.1 supplier managemtn.jpg");
    const canvasW = 1440;
    const canvasH = 900;
    const leftW = Math.round(canvasW * 0.62);
    const rightW = canvasW - leftW;

    // Directory: redact personal contact names/emails, highlight top approved row
    let dir = await sharp(dirSrc)
      .extract({ left: 248, top: 70, width: 1200, height: 620 })
      .resize({ width: leftW - 24, height: canvasH - 80, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    // Cover personal names / junk emails with approved vendor rows
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["TOC Dental", "Purchasing", "orders@tocdental.com"],
      ["Wright Cottrell", "Accounts", "accounts@wrightcottrell.co.uk"],
    ];
    const rowH = 72;
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = i * rowH;
      const selected = i === 0;
      const bg = selected ? "#EAF6F1" : "#FFFFFF";
      rows += `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${bg}"/>${
        selected ? `<rect x="0" y="${y}" width="3" height="${rowH}" fill="#1F6B52"/>` : ""
      }<rect x="14" y="${y + 18}" width="30" height="30" rx="7" fill="#E4F2EC"/>
      <text x="56" y="${y + 32}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
      <text x="56" y="${y + 52}" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#6B7C84">${esc(c)}</text>
      <text x="320" y="${y + 42}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#2A3A42">${esc(e)}</text>
      <rect x="${leftW - 120}" y="${y + 22}" width="64" height="24" rx="12" fill="#1F6B52"/>
      <text x="${leftW - 108}" y="${y + 39}" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF">Active</text>`;
    });
    const dirPanel = Buffer.from(
      `<svg width="${leftW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FFFFFF"/>
        <text x="20" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Vendors</text>
        <text x="20" y="58" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Directory linked to RFQs and purchase orders</text>
        <g transform="translate(0,72)">${rows}</g>
      </svg>`,
    );

    // Detail: use real profile chrome from 3.1, then overlay approved Kent Express copy
    let detailChrome = await sharp(detailSrc)
      .extract({ left: 260, top: 70, width: 1400, height: 420 })
      .resize({ width: rightW - 24, height: 380, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    const detailOverlay = Buffer.from(
      `<svg width="${rightW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#EEF5F2"/>
        <rect x="12" y="16" width="${rightW - 24}" height="${canvasH - 32}" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="28" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">VENDORS / Kent Express</text>
        <text x="28" y="82" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Kent Express</text>
        <rect x="210" y="60" width="64" height="26" rx="13" fill="#1F6B52"/>
        <text x="222" y="78" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Active</text>
        <text x="28" y="118" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Supplier profile for RFQs, quotations and purchase orders</text>
        <text x="28" y="168" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Main contact</text>
        <text x="28" y="192" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
        <text x="28" y="236" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Email</text>
        <text x="28" y="260" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
        <text x="28" y="304" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account ref</text>
        <text x="28" y="328" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
        <rect x="28" y="360" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
        <text x="28" y="398" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
        <text x="28" y="430" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">3 open RFQs</text>
        <text x="28" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">2 purchase orders this month</text>
        <rect x="28" y="488" width="${rightW - 56}" height="70" rx="12" fill="#EAF6F1"/>
        <text x="40" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred for gloves and PPE</text>
        <text x="40" y="542" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Payment terms · net 30</text>
        <text x="28" y="600" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">CATEGORIES</text>
        <text x="28" y="630" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">PPE · Gloves · Consumables</text>
        <rect x="28" y="668" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
        <text x="28" y="706" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">PURCHASE HISTORY</text>
        <text x="28" y="736" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">16 delivered · 0 pending</text>
      </svg>`,
    );

    void detailChrome; // chrome reference kept for visual parity research
    const composed = await sharp({
      create: { width: canvasW, height: canvasH, channels: 3, background: BG },
    })
      .composite([
        { input: dirPanel, left: 0, top: 0 },
        { input: detailOverlay, left: leftW, top: 0 },
      ])
      .webp({ quality: 88, effort: 5 })
      .toBuffer();
    await save(composed, "mkt-suppliers.webp");
    await save(await coverFrame(await sharp(composed).png().toBuffer(), TW, TH, "north"), "mkt-tour-suppliers.webp");
  }

  // ─── PURCHASE ORDERS ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const pw = 1320;
    const ph = 820;
    const comps = [
      { input: svg(40, 40, "#D5E3DE", [], 20), left: pw - 50, top: 4 },
      { input: svg(220, 300, "#FFFFFF"), left: 110, top: 480 },
    ];
    names.forEach((n, i) => {
      comps.push({
        input: svg(200, 34, "#FFFFFF", [{ text: n, y: 22, size: 13, weight: 600 }]),
        left: 118,
        top: 496 + i * 46,
      });
    });
    const buf = await sharp(src)
      .extract({ left: 280, top: 10, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 18, padY: 16, position: "north" }), "mkt-purchase-orders.webp");
    await save(await coverFrame(buf, TW, TH, "north"), "mkt-tour-orders.webp");
  }

  // ─── REPORTING ───
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const m = await sharp(src).metadata();
    const buf = await sharp(src)
      .extract({
        left: 236,
        top: 6,
        width: m.width - 236 - 6,
        height: m.height - 6 - 4,
      })
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 16, padY: 14, position: "northwest" }), "mkt-reporting.webp");
    await save(await coverFrame(buf, TW, TH, "northwest"), "mkt-tour-reporting.webp");
  }

  // ─── RFQ — real comparison + real summary (70/30), renamed suppliers ───
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const sumSrc = path.join(APP, "6.1 rfq order summary.jpg");
    const W = FW;
    const H = FH;
    const pad = 14;
    const leftW = Math.round((W - pad * 3) * 0.71);
    const rightW = W - pad * 3 - leftW;
    const mainH = H - pad * 2;

    // Left: comparison table with context header
    let left = await sharp(rfqSrc)
      .extract({ left: 250, top: 70, width: 1320, height: 720 })
      .resize({ width: leftW, height: mainH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    left = await sharp(left)
      .composite([
        // Rename supplier column headers
        { input: svg(280, 36, "#FFFFFF"), left: Math.round(leftW * 0.38), top: 118 },
        {
          input: svg(200, 28, "#FFFFFF", [
            { text: "Henry Schein", y: 20, size: 14, weight: 600 },
          ]),
          left: Math.round(leftW * 0.4),
          top: 122,
        },
        { input: svg(260, 36, "#FFFFFF"), left: Math.round(leftW * 0.58), top: 118 },
        {
          input: svg(190, 28, "#FFFFFF", [
            { text: "Kent Express", y: 20, size: 14, weight: 600 },
          ]),
          left: Math.round(leftW * 0.6),
          top: 122,
        },
        // Soften Lithuanian title if visible
        { input: svg(320, 40, "#F4F8F7"), left: 8, top: 8 },
        {
          input: svg(280, 34, "#F4F8F7", [
            { text: "Urgent order", y: 24, size: 20, weight: 700 },
          ]),
          left: 16,
          top: 10,
        },
      ])
      .png()
      .toBuffer();

    // Right: order summary / budget from 6.1 — crop the cards cluster
    let right = await sharp(sumSrc)
      .extract({ left: 520, top: 90, width: 1100, height: 700 })
      .resize({ width: rightW, height: mainH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    right = await sharp(right)
      .composite([
        { input: svg(220, 32, "#FFFFFF"), left: 40, top: 48 },
        {
          input: svg(180, 28, "#FFFFFF", [
            { text: "Kent Express", y: 20, size: 15, weight: 600 },
          ]),
          left: 48,
          top: 50,
        },
        { input: svg(280, 32, "#FFFFFF"), left: 40, top: 210 },
        {
          input: svg(240, 28, "#FFFFFF", [
            { text: "Henry Schein", y: 20, size: 15, weight: 600 },
          ]),
          left: 48,
          top: 212,
        },
      ])
      .png()
      .toBuffer();

    const composed = await sharp({
      create: { width: W, height: H, channels: 3, background: BG },
    })
      .composite([
        { input: left, left: pad, top: pad },
        { input: right, left: pad + leftW + pad, top: pad },
      ])
      .webp({ quality: 88, effort: 5 })
      .toBuffer();

    await save(composed, "mkt-rfq-workflow.webp");
    await save(composed, "mkt-rfq-workflow-full.webp");
    await save(
      await coverFrame(await sharp(composed).png().toBuffer(), TW, TH, "north"),
      "mkt-tour-rfq.webp",
    );
  }

  console.log("\nVisual rebuild assets ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
