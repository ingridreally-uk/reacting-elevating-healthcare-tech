/**
 * Design-audit asset pass — optical balance, integrated RFQ, normalised tour zoom.
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

async function save(buf, name) {
  const dest = path.join(OUT, name);
  const tmp = `${dest}.new.webp`;
  await fs.writeFile(tmp, buf);
  await fs.copyFile(tmp, dest);
  await fs.unlink(tmp).catch(() => {});
  console.log("✓", name);
}

async function padFrame(buf, w, h, { padX = 32, padY = 26, position = "north" } = {}) {
  const fitted = await sharp(buf)
    .resize({ width: w - padX * 2, height: h - padY * 2, fit: "contain", background: BG })
    .png()
    .toBuffer();
  const m = await sharp(fitted).metadata();
  const left = Math.round((w - m.width) / 2);
  const top = position === "center" ? Math.round((h - m.height) / 2) : padY;
  return sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .composite([{ input: fitted, left, top }])
    .webp({ quality: 88, effort: 5 })
    .toBuffer();
}

async function cover(buf, w, h, position = "north") {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "cover", position })
    .webp({ quality: 88, effort: 5 })
    .toBuffer();
}

async function main() {
  // ─── HERO ───
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
        .webp({ quality: 90 })
        .toBuffer(),
      "mkt-dashboard.webp",
    );
    await save(
      await sharp(buf)
        .resize({ width: 1600, height: 1000, fit: "cover" })
        .blur(22)
        .modulate({ brightness: 1.04, saturation: 0.8 })
        .webp({ quality: 65 })
        .toBuffer(),
      "mkt-hero-depth.webp",
    );
    // Focus extracts — Actions required (product focus), Stock risk KPI
    await save(
      await sharp(src)
        .extract({ left: 990, top: 285, width: 620, height: 300 })
        .resize({ width: 440, height: 212, fit: "cover", position: "northwest" })
        .webp({ quality: 90 })
        .toBuffer(),
      "mkt-hero-actions.webp",
    );
    await save(
      await sharp(src)
        .extract({ left: 1185, top: 88, width: 215, height: 145 })
        .resize({ width: 210, height: 142, fit: "cover" })
        .webp({ quality: 90 })
        .toBuffer(),
      "mkt-hero-stock-risk.webp",
    );
    await save(await cover(await sharp(src).extract({ left: 248, top: 175, width: 1580, height: 620 }).png().toBuffer(), TW, TH, "north"), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY — list → selected → stock flow ───
  {
    const src = path.join(PUBLIC, "screen-24.png");
    const buf = await sharp(src)
      .extract({ left: 250, top: 24, width: 1560, height: 830 })
      .composite([{ input: svg(38, 38, "#D5E3DE", [], 19), left: 1512, top: 2 }])
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 22, padY: 20, position: "west" }), "mkt-stock.webp");
    await save(await cover(await sharp(src).extract({ left: 280, top: 60, width: 1460, height: 760 }).png().toBuffer(), TW, TH, "northwest"), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK — four cards focal, badge clear ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const buf = await sharp(src)
      .extract({ left: 252, top: 16, width: 1270, height: 710 })
      .composite([{ input: svg(34, 34, "#D5E3DE", [], 17), left: 1226, top: 4 }])
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 36, padY: 30, position: "north" }), "mkt-low-stock.webp");
    await save(await padFrame(buf, TW, TH, { padX: 26, padY: 22, position: "north" }), "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY — smarter frame use ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const crop = await sharp(src)
      .extract({ left: 250, top: 8, width: 1120, height: 720 })
      .png()
      .toBuffer();
    await save(await padFrame(crop, FW, FH, { padX: 40, padY: 28, position: "north" }), "mkt-expiring.webp");
    await save(await padFrame(crop, TW, TH, { padX: 30, padY: 22, position: "north" }), "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS — denser, less blank ───
  {
    const leftW = 880;
    const rightW = 560;
    const canvasW = leftW + rightW;
    const canvasH = 900;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["TOC Dental", "Purchasing", "orders@tocdental.com"],
      ["Wright Cottrell", "Accounts", "accounts@wrightcottrell.co.uk"],
      ["DDS Dental", "Orders", "orders@ddsdental.co.uk"],
      ["Med-Dent UK", "Support", "support@meddent.co.uk"],
    ];
    const rowH = 78;
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = i * rowH;
      const selected = i === 0;
      rows += `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${selected ? "#EAF6F1" : i % 2 ? "#FAFCFB" : "#FFFFFF"}"/>
        ${selected ? `<rect x="0" y="${y}" width="3" height="${rowH}" fill="#1F6B52"/>` : ""}
        <rect x="16" y="${y + 20}" width="30" height="30" rx="7" fill="#E4F2EC"/>
        <text x="58" y="${y + 34}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
        <text x="58" y="${y + 54}" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#6B7C84">${esc(c)}</text>
        <text x="340" y="${y + 44}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#2A3A42">${esc(e)}</text>
        <rect x="${leftW - 96}" y="${y + 24}" width="64" height="24" rx="12" fill="#1F6B52"/>
        <text x="${leftW - 84}" y="${y + 41}" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF">Active</text>`;
    });
    const dir = Buffer.from(`<svg width="${leftW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      <text x="20" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Vendors</text>
      <text x="20" y="56" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Directory linked to RFQs and purchase orders</text>
      <g transform="translate(0,70)">${rows}</g>
    </svg>`);
    const detail = Buffer.from(`<svg width="${rightW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#EEF5F2"/>
      <rect x="10" y="14" width="${rightW - 20}" height="${canvasH - 28}" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
      <text x="26" y="46" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">VENDORS / Kent Express</text>
      <text x="26" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Kent Express</text>
      <rect x="208" y="58" width="64" height="26" rx="13" fill="#1F6B52"/>
      <text x="220" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Active</text>
      <text x="26" y="114" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Supplier profile for RFQs, quotations and purchase orders</text>
      <text x="26" y="160" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Main contact</text>
      <text x="26" y="184" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
      <text x="26" y="226" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Email</text>
      <text x="26" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
      <text x="26" y="292" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account ref</text>
      <text x="26" y="316" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
      <rect x="26" y="346" width="${rightW - 52}" height="1" fill="#E2EBE7"/>
      <text x="26" y="382" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
      <rect x="26" y="400" width="${(rightW - 60) / 2}" height="64" rx="10" fill="#EAF6F1"/>
      <text x="38" y="428" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#0B1F2A">3</text>
      <text x="38" y="448" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Open RFQs</text>
      <rect x="${26 + (rightW - 60) / 2 + 8}" y="400" width="${(rightW - 60) / 2}" height="64" rx="10" fill="#EAF6F1"/>
      <text x="${38 + (rightW - 60) / 2 + 8}" y="428" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#0B1F2A">2</text>
      <text x="${38 + (rightW - 60) / 2 + 8}" y="448" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">Purchase orders</text>
      <rect x="26" y="484" width="${rightW - 52}" height="72" rx="12" fill="#F4F8F7"/>
      <text x="38" y="516" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred for gloves and PPE</text>
      <text x="38" y="538" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Payment terms · net 30</text>
      <text x="26" y="596" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">CATEGORIES</text>
      <text x="26" y="626" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">PPE · Gloves · Consumables</text>
      <rect x="26" y="658" width="${rightW - 52}" height="1" fill="#E2EBE7"/>
      <text x="26" y="696" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">PURCHASE HISTORY</text>
      <text x="26" y="726" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">16 delivered · 0 pending</text>
      <text x="26" y="752" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Last order 10 Apr 2026</text>
    </svg>`);
    const composed = await sharp({ create: { width: canvasW, height: canvasH, channels: 3, background: BG } })
      .composite([
        { input: dir, left: 0, top: 0 },
        { input: detail, left: leftW, top: 0 },
      ])
      .webp({ quality: 88 })
      .toBuffer();
    await save(composed, "mkt-suppliers.webp");
    await save(await cover(await sharp(composed).png().toBuffer(), TW, TH, "north"), "mkt-tour-suppliers.webp");
  }

  // ─── RFQ — integrated comparison + summary (shared canvas, less detachment) ───
  {
    const W = FW;
    const H = FH;
    const products = [
      { name: "ProTaper Hand File 25mm S1 6pk", mfr: "Maillefer / Dentsply", a: "42.55", b: "46.55", pick: "a", qty: 1 },
      { name: "Sterile Safeskin Purple Nitrile Gloves S", mfr: "Kimberly Clark", a: "7.99", b: "8.99", pick: "a", qty: 2 },
      { name: "Venus Diamond Composite Syringe 4g A4", mfr: "Kulzer", a: "57.26", b: "47.26", pick: "b", qty: 4, saved: "40.00" },
      { name: "Pana Spray Plus 500ml", mfr: "NSK", a: "28.50", b: "26.90", pick: "b", qty: 1, saved: "1.60" },
      { name: "Septanest Articaine 1:100,000 50pk", mfr: "Septodont", a: "64.80", b: "61.20", pick: "b", qty: 1, saved: "3.60" },
    ];
    const leftW = Math.round(W * 0.7);
    const rightW = W - leftW;
    let rows = "";
    products.forEach((p, i) => {
      const y = 96 + i * 112;
      const aBg = p.pick === "a" ? "#E7F5EF" : "#FFF4EB";
      const bBg = p.pick === "b" ? "#E7F5EF" : "#FFF4EB";
      rows += `<rect x="0" y="${y}" width="${leftW}" height="108" fill="${i % 2 ? "#FAFCFB" : "#FFFFFF"}"/>
        <text x="24" y="${y + 28}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${esc(p.name)}</text>
        <text x="24" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">${esc(p.mfr)}</text>
        <rect x="${Math.round(leftW * 0.42)}" y="${y + 22}" width="130" height="40" rx="10" fill="${aBg}"/>
        <text x="${Math.round(leftW * 0.42) + 16}" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${p.pick === "a" ? "✓" : "+"} &#163;${p.a}</text>
        <rect x="${Math.round(leftW * 0.42) + 148}" y="${y + 22}" width="130" height="40" rx="10" fill="${bBg}"/>
        <text x="${Math.round(leftW * 0.42) + 164}" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${p.pick === "b" ? "✓" : "+"} &#163;${p.b}</text>
        <text x="${leftW - 56}" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Qty ${p.qty}</text>
        ${p.saved ? `<text x="${leftW - 120}" y="${y + 78}" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#1F6B52">Saved &#163;${p.saved}</text>` : ""}`;
    });
    const screen = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#F4F8F7"/>
      <rect x="0" y="0" width="${leftW}" height="${H}" fill="#FFFFFF"/>
      <rect x="${leftW}" y="0" width="${rightW}" height="${H}" fill="#F7FAF9"/>
      <line x1="${leftW}" y1="0" x2="${leftW}" y2="${H}" stroke="#E2EBE7"/>
      <text x="24" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Urgent order</text>
      <rect x="182" y="18" width="96" height="24" rx="12" fill="#E7F5EF"/>
      <text x="194" y="35" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Responses</text>
      <text x="24" y="60" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2/2 suppliers replied · 3/5 quotes selected</text>
      <text x="24" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Product</text>
      <text x="${Math.round(leftW * 0.42) + 16}" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Henry Schein</text>
      <text x="${Math.round(leftW * 0.42) + 164}" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Kent Express</text>
      ${rows}
      <text x="${leftW + 24}" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
      <text x="${leftW + 24}" y="68" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">Kent Express</text>
      <text x="${leftW + 24}" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">3 items selected</text>
      <text x="${leftW + 24}" y="134" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
      <text x="${W - 88}" y="134" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;312.40</text>
      <text x="${leftW + 24}" y="162" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
      <text x="${W - 80}" y="162" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;62.48</text>
      <line x1="${leftW + 24}" y1="182" x2="${W - 24}" y2="182" stroke="#E2EBE7"/>
      <text x="${leftW + 24}" y="218" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">Order total</text>
      <text x="${W - 96}" y="218" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">&#163;374.88</text>
      <text x="${leftW + 24}" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Money saved</text>
      <text x="${W - 76}" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">&#163;45.20</text>
      <rect x="${leftW + 24}" y="274" width="${rightW - 48}" height="1" fill="#E2EBE7"/>
      <text x="${leftW + 24}" y="312" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
      <text x="${leftW + 24}" y="346" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
      <text x="${W - 96}" y="346" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,447.33</text>
      <text x="${leftW + 24}" y="374" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
      <text x="${W - 96}" y="374" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,072.45</text>
      <rect x="${leftW + 24}" y="396" width="${rightW - 48}" height="10" rx="5" fill="#EAF6F1"/>
      <rect x="${leftW + 24}" y="396" width="${Math.round((rightW - 48) * 0.57)}" height="10" rx="5" fill="#2F8F6B"/>
      <text x="${leftW + 24}" y="432" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">57% of monthly materials budget</text>
      <rect x="${leftW + 24}" y="456" width="${rightW - 48}" height="1" fill="#E2EBE7"/>
      <text x="${leftW + 24}" y="496" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
      <text x="${leftW + 24}" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · &#163;98.53</text>
      <rect x="${leftW + 24}" y="548" width="${rightW - 48}" height="1" fill="#E2EBE7"/>
      <text x="${leftW + 24}" y="588" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">COMBINED</text>
      <text x="${leftW + 24}" y="620" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#0B1F2A">Grand total &#163;473.41</text>
      <text x="${leftW + 24}" y="646" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#1F6B52">Total money saved &#163;45.20</text>
    </svg>`);
    const composed = await sharp(screen).webp({ quality: 88 }).toBuffer();
    await save(composed, "mkt-rfq-workflow.webp");
    await save(composed, "mkt-rfq-workflow-full.webp");
    await save(await cover(await sharp(screen).png().toBuffer(), TW, TH, "north"), "mkt-tour-rfq.webp");
  }

  // ─── REPORTING — chart-led ───
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const m = await sharp(src).metadata();
    const buf = await sharp(src)
      .extract({ left: 236, top: 6, width: m.width - 236 - 6, height: m.height - 10 })
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 14, padY: 12, position: "north" }), "mkt-reporting.webp");
    await save(await cover(buf, TW, TH, "northwest"), "mkt-tour-reporting.webp");
  }

  // ─── PO ───
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
    await save(await cover(buf, TW, TH, "north"), "mkt-tour-orders.webp");
  }

  console.log("\nDesign-audit assets ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
