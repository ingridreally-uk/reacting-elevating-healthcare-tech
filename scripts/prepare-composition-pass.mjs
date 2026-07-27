/**
 * Final composition pass — intentional crops, normalised zoom, meaningful hero widgets.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const DESKTOP = path.join(process.env.USERPROFILE, "Desktop");
const BG = "#F4F8F7";

/** Universal feature canvas — same optical weight everywhere */
const FW = 1440;
const FH = 900;
/** Universal tour canvas — same perceived zoom family */
const TW = 1200;
const TH = 750;
const PAD = { x: 28, y: 24 }; // shared internal breathing room

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

/** Fit content into universal frame with identical padding — same perceived zoom. */
async function frame(buf, w, h, { padX = PAD.x, padY = PAD.y } = {}) {
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;
  const fitted = await sharp(buf)
    .resize({ width: innerW, height: innerH, fit: "contain", background: BG })
    .png()
    .toBuffer();
  const m = await sharp(fitted).metadata();
  const left = Math.round((w - m.width) / 2);
  const top = Math.round((h - m.height) / 2);
  return sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .composite([{ input: fitted, left, top }])
    .webp({ quality: 88, effort: 5 })
    .toBuffer();
}

async function main() {
  // ─── HERO DASHBOARD + MEANINGFUL FOCUS WIDGETS ───
  {
    const src = path.join(APP, "3. dashboard.jpg");
    const m = await sharp(src).metadata();
    const content = await sharp(src)
      .extract({ left: 248, top: 10, width: m.width - 252, height: m.height - 14 })
      .composite([{ input: svg(40, 40, "#D5E3DE", [], 20), left: m.width - 252 - 50, top: 2 }])
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
        .blur(24)
        .modulate({ brightness: 1.05, saturation: 0.75 })
        .webp({ quality: 60 })
        .toBuffer(),
      "mkt-hero-depth.webp",
    );

    // Complete Actions Required card (full widget, not table fragments)
    await save(
      await sharp(src)
        .extract({ left: 990, top: 268, width: 620, height: 330 })
        .resize({ width: 460, height: 245, fit: "cover", position: "northwest" })
        .webp({ quality: 92 })
        .toBuffer(),
      "mkt-hero-actions.webp",
    );

    // Complete Stock Risk KPI card
    await save(
      await sharp(src)
        .extract({ left: 1175, top: 85, width: 230, height: 150 })
        .resize({ width: 220, height: 144, fit: "cover" })
        .webp({ quality: 92 })
        .toBuffer(),
      "mkt-hero-stock-risk.webp",
    );

    // Complete Budget widget (optional third — prepared for hero)
    await save(
      await sharp(src)
        .extract({ left: 265, top: 268, width: 680, height: 300 })
        .resize({ width: 400, height: 176, fit: "cover", position: "northwest" })
        .webp({ quality: 92 })
        .toBuffer(),
      "mkt-hero-budget.webp",
    );

    await save(await frame(await sharp(src).extract({ left: 248, top: 180, width: 1580, height: 620 }).png().toBuffer(), TW, TH, { padX: 16, padY: 14 }), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY — ~42% list / ~58% detail ───
  {
    const listSrc = path.join(PUBLIC, "screen-24.png");
    const detailSrc = path.join(PUBLIC, "screen-22.png");
    const listW = Math.round(FW * 0.42);
    const detailW = FW - listW;
    const panelH = FH;

    const list = await sharp(listSrc)
      .extract({ left: 250, top: 90, width: 720, height: 740 })
      .resize({ width: listW, height: panelH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    let detail = await sharp(detailSrc)
      .extract({ left: 880, top: 50, width: 900, height: 800 })
      .resize({ width: detailW, height: panelH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    detail = await sharp(detail)
      .composite([
        { input: svg(detailW, 36, "#FFFFFF"), left: 0, top: 0 },
        {
          input: svg(detailW - 24, 28, "#FFFFFF", [
            { text: "Enhance PoGo · stock detail", y: 20, size: 13, weight: 600 },
          ]),
          left: 12,
          top: 4,
        },
      ])
      .png()
      .toBuffer();

    const header = svg(FW, 48, "#F7FAF9", [
      { text: "Stock", y: 32, size: 18, weight: 700 },
      { text: "Materials · quantities · selected item", x: 78, y: 30, size: 12, color: "#5B6B73" },
    ]);

    const composed = await sharp({
      create: { width: FW, height: FH, channels: 3, background: BG },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        {
          input: await sharp(list).resize({ width: listW, height: FH - 48, fit: "cover", position: "northwest" }).png().toBuffer(),
          left: 0,
          top: 48,
        },
        {
          input: await sharp(detail).resize({ width: detailW, height: FH - 48, fit: "cover", position: "northwest" }).png().toBuffer(),
          left: listW,
          top: 48,
        },
      ])
      .webp({ quality: 88 })
      .toBuffer();

    await save(composed, "mkt-stock.webp");
    await save(await frame(await sharp(composed).png().toBuffer(), TW, TH, { padX: 12, padY: 10 }), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK — badge + four cards fill the frame ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const buf = await sharp(src)
      .extract({ left: 255, top: 18, width: 1200, height: 620 })
      .composite([{ input: svg(34, 34, "#D5E3DE", [], 17), left: 1156, top: 2 }])
      .resize({ width: FW, height: FH, fit: "cover", position: "north" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(buf, "mkt-low-stock.webp");
    await save(
      await sharp(src)
        .extract({ left: 255, top: 18, width: 1200, height: 620 })
        .resize({ width: TW, height: TH, fit: "cover", position: "north" })
        .webp({ quality: 88 })
        .toBuffer(),
      "mkt-tour-low-stock.webp",
    );
  }

  // ─── EXPIRY — three cards focal, same density family as low stock ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const buf = await sharp(src)
      .extract({ left: 260, top: 20, width: 980, height: 620 })
      .resize({ width: FW, height: FH, fit: "cover", position: "north" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(buf, "mkt-expiring.webp");
    await save(
      await sharp(src)
        .extract({ left: 260, top: 20, width: 980, height: 620 })
        .resize({ width: TW, height: TH, fit: "cover", position: "north" })
        .webp({ quality: 88 })
        .toBuffer(),
      "mkt-tour-expiring.webp",
    );
  }

  // ─── SUPPLIERS — larger scale, fills frame ───
  {
    const leftW = 820;
    const rightW = 620;
    const W = leftW + rightW;
    const H = 900;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["TOC Dental", "Purchasing", "orders@tocdental.com"],
      ["Wright Cottrell", "Accounts", "accounts@wrightcottrell.co.uk"],
      ["DDS Dental", "Orders", "orders@ddsdental.co.uk"],
    ];
    const rowH = 92;
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = i * rowH;
      const selected = i === 0;
      rows += `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${selected ? "#EAF6F1" : "#FFFFFF"}"/>
        ${selected ? `<rect x="0" y="${y}" width="4" height="${rowH}" fill="#1F6B52"/>` : ""}
        <rect x="20" y="${y + 26}" width="36" height="36" rx="8" fill="#E4F2EC"/>
        <text x="70" y="${y + 40}" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
        <text x="70" y="${y + 62}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#6B7C84">${esc(c)}</text>
        <text x="360" y="${y + 52}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#2A3A42">${esc(e)}</text>
        <rect x="${leftW - 108}" y="${y + 30}" width="72" height="28" rx="14" fill="#1F6B52"/>
        <text x="${leftW - 94}" y="${y + 49}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Active</text>`;
    });
    const dir = Buffer.from(`<svg width="${leftW}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      <text x="24" y="40" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Vendors</text>
      <text x="24" y="64" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Directory linked to RFQs and purchase orders</text>
      <g transform="translate(0,84)">${rows}</g>
    </svg>`);
    const detail = Buffer.from(`<svg width="${rightW}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#EEF5F2"/>
      <rect x="12" y="16" width="${rightW - 24}" height="${H - 32}" rx="16" fill="#FFFFFF" stroke="#E2EBE7"/>
      <text x="32" y="52" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">VENDORS / Kent Express</text>
      <text x="32" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#0B1F2A">Kent Express</text>
      <rect x="230" y="66" width="70" height="28" rx="14" fill="#1F6B52"/>
      <text x="244" y="85" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Active</text>
      <text x="32" y="128" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Supplier profile for RFQs, quotations and purchase orders</text>
      <text x="32" y="180" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Main contact</text>
      <text x="32" y="206" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">Orders desk</text>
      <text x="32" y="254" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Email</text>
      <text x="32" y="280" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">orders@kentexpress.co.uk</text>
      <text x="32" y="328" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account ref</text>
      <text x="32" y="354" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">KE-48291</text>
      <rect x="32" y="388" width="${rightW - 64}" height="1" fill="#E2EBE7"/>
      <text x="32" y="428" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
      <rect x="32" y="448" width="${(rightW - 72) / 2}" height="78" rx="12" fill="#EAF6F1"/>
      <text x="48" y="482" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">3</text>
      <text x="48" y="506" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Open RFQs</text>
      <rect x="${40 + (rightW - 72) / 2}" y="448" width="${(rightW - 72) / 2}" height="78" rx="12" fill="#EAF6F1"/>
      <text x="${56 + (rightW - 72) / 2}" y="482" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">2</text>
      <text x="${56 + (rightW - 72) / 2}" y="506" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Purchase orders</text>
      <rect x="32" y="548" width="${rightW - 64}" height="80" rx="12" fill="#F4F8F7"/>
      <text x="48" y="584" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">Preferred for gloves and PPE</text>
      <text x="48" y="608" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Payment terms · net 30</text>
      <text x="32" y="670" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">CATEGORIES</text>
      <text x="32" y="700" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">PPE · Gloves · Consumables</text>
      <rect x="32" y="732" width="${rightW - 64}" height="1" fill="#E2EBE7"/>
      <text x="32" y="772" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">PURCHASE HISTORY</text>
      <text x="32" y="804" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">16 delivered · 0 pending</text>
      <text x="32" y="832" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Last order 10 Apr 2026</text>
    </svg>`);

    const composed = await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
      .composite([
        { input: dir, left: 0, top: 0 },
        { input: detail, left: leftW, top: 0 },
      ])
      .resize({ width: FW, height: FH, fit: "cover", position: "north" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(composed, "mkt-suppliers.webp");
    await save(await frame(await sharp(composed).png().toBuffer(), TW, TH, { padX: 10, padY: 8 }), "mkt-tour-suppliers.webp");
  }

  // ─── RFQ — table dominates (~72%), summary secondary, no empty void ───
  {
    const W = FW;
    const H = FH;
    const leftW = Math.round(W * 0.72);
    const products = [
      { name: "ProTaper Hand File 25mm S1 6pk", mfr: "Maillefer / Dentsply", a: "42.55", b: "46.55", pick: "a", qty: 1 },
      { name: "Sterile Safeskin Purple Nitrile Gloves S", mfr: "Kimberly Clark", a: "7.99", b: "8.99", pick: "a", qty: 2 },
      { name: "Venus Diamond Composite Syringe 4g A4", mfr: "Kulzer", a: "57.26", b: "47.26", pick: "b", qty: 4, saved: "40.00" },
      { name: "Pana Spray Plus 500ml", mfr: "NSK", a: "28.50", b: "26.90", pick: "b", qty: 1, saved: "1.60" },
      { name: "Septanest Articaine 1:100,000 50pk", mfr: "Septodont", a: "64.80", b: "61.20", pick: "b", qty: 1, saved: "3.60" },
      { name: "Empress Direct Syringe 3g Dentin D2", mfr: "Ivoclar", a: "39.90", b: "37.50", pick: "b", qty: 2, saved: "4.80" },
    ];
    let rows = "";
    const rowH = 98;
    products.forEach((p, i) => {
      const y = 88 + i * rowH;
      rows += `<rect x="0" y="${y}" width="${leftW}" height="${rowH}" fill="${i % 2 ? "#FAFCFB" : "#FFFFFF"}"/>
        <text x="20" y="${y + 28}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${esc(p.name)}</text>
        <text x="20" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">${esc(p.mfr)}</text>
        <rect x="${Math.round(leftW * 0.4)}" y="${y + 20}" width="128" height="40" rx="10" fill="${p.pick === "a" ? "#E7F5EF" : "#FFF4EB"}"/>
        <text x="${Math.round(leftW * 0.4) + 14}" y="${y + 46}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${p.pick === "a" ? "✓" : "+"} &#163;${p.a}</text>
        <rect x="${Math.round(leftW * 0.4) + 144}" y="${y + 20}" width="128" height="40" rx="10" fill="${p.pick === "b" ? "#E7F5EF" : "#FFF4EB"}"/>
        <text x="${Math.round(leftW * 0.4) + 158}" y="${y + 46}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${p.pick === "b" ? "✓" : "+"} &#163;${p.b}</text>
        <text x="${leftW - 52}" y="${y + 46}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">${p.qty}</text>
        ${p.saved ? `<text x="${leftW - 130}" y="${y + 72}" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#1F6B52">Saved &#163;${p.saved}</text>` : ""}`;
    });
    const screen = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      <rect x="${leftW}" y="0" width="${W - leftW}" height="${H}" fill="#F7FAF9"/>
      <line x1="${leftW}" y1="0" x2="${leftW}" y2="${H}" stroke="#E2EBE7"/>
      <text x="20" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Urgent order</text>
      <rect x="178" y="16" width="96" height="24" rx="12" fill="#E7F5EF"/>
      <text x="190" y="33" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Responses</text>
      <text x="20" y="58" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2/2 suppliers replied · comparison ready</text>
      <text x="20" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Product</text>
      <text x="${Math.round(leftW * 0.4) + 14}" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Henry Schein</text>
      <text x="${Math.round(leftW * 0.4) + 158}" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Kent Express</text>
      ${rows}
      <text x="${leftW + 22}" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
      <text x="${leftW + 22}" y="68" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">Kent Express</text>
      <text x="${leftW + 22}" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">4 items selected</text>
      <text x="${leftW + 22}" y="136" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
      <text x="${W - 86}" y="136" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;348.16</text>
      <text x="${leftW + 22}" y="164" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
      <text x="${W - 80}" y="164" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;69.63</text>
      <line x1="${leftW + 22}" y1="184" x2="${W - 22}" y2="184" stroke="#E2EBE7"/>
      <text x="${leftW + 22}" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#1F6B52">Order total</text>
      <text x="${W - 96}" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#1F6B52">&#163;417.79</text>
      <text x="${leftW + 22}" y="254" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#1F6B52">Money saved</text>
      <text x="${W - 80}" y="254" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#1F6B52">&#163;50.00</text>
      <rect x="${leftW + 22}" y="280" width="${W - leftW - 44}" height="1" fill="#E2EBE7"/>
      <text x="${leftW + 22}" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
      <text x="${leftW + 22}" y="356" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
      <text x="${W - 96}" y="356" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,447.33</text>
      <text x="${leftW + 22}" y="384" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
      <text x="${W - 96}" y="384" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,029.54</text>
      <rect x="${leftW + 22}" y="408" width="${W - leftW - 44}" height="10" rx="5" fill="#EAF6F1"/>
      <rect x="${leftW + 22}" y="408" width="${Math.round((W - leftW - 44) * 0.59)}" height="10" rx="5" fill="#2F8F6B"/>
      <text x="${leftW + 22}" y="444" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">59% of monthly materials budget</text>
      <rect x="${leftW + 22}" y="470" width="${W - leftW - 44}" height="1" fill="#E2EBE7"/>
      <text x="${leftW + 22}" y="510" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
      <text x="${leftW + 22}" y="534" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · &#163;98.53</text>
      <text x="${leftW + 22}" y="580" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">COMBINED</text>
      <text x="${leftW + 22}" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#0B1F2A">Grand total &#163;516.32</text>
      <text x="${leftW + 22}" y="640" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#1F6B52">Total money saved &#163;50.00</text>
    </svg>`);
    const composed = await sharp(screen).webp({ quality: 88 }).toBuffer();
    await save(composed, "mkt-rfq-workflow.webp");
    await save(composed, "mkt-rfq-workflow-full.webp");
    await save(await frame(await sharp(screen).png().toBuffer(), TW, TH, { padX: 10, padY: 8 }), "mkt-tour-rfq.webp");
  }

  // ─── REPORTING — chart + totals dominate, minimal empty margin ───
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const m = await sharp(src).metadata();
    const buf = await sharp(src)
      .extract({ left: 248, top: 20, width: m.width - 258, height: m.height - 40 })
      .resize({ width: FW, height: FH, fit: "cover", position: "north" })
      .webp({ quality: 88 })
      .toBuffer();
    await save(buf, "mkt-reporting.webp");
    await save(
      await sharp(src)
        .extract({ left: 248, top: 20, width: m.width - 258, height: m.height - 40 })
        .resize({ width: TW, height: TH, fit: "cover", position: "north" })
        .webp({ quality: 88 })
        .toBuffer(),
      "mkt-tour-reporting.webp",
    );
  }

  // ─── PO ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const pw = 1320;
    const ph = 800;
    const comps = [
      { input: svg(38, 38, "#D5E3DE", [], 19), left: pw - 48, top: 4 },
      { input: svg(210, 280, "#FFFFFF"), left: 115, top: 470 },
    ];
    names.forEach((n, i) => {
      comps.push({
        input: svg(190, 32, "#FFFFFF", [{ text: n, y: 22, size: 13, weight: 600 }]),
        left: 122,
        top: 486 + i * 46,
      });
    });
    const buf = await sharp(src)
      .extract({ left: 285, top: 12, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await save(await frame(buf, FW, FH, { padX: 16, padY: 14 }), "mkt-purchase-orders.webp");
    await save(await frame(buf, TW, TH, { padX: 12, padY: 10 }), "mkt-tour-orders.webp");
  }

  console.log("\nComposition assets ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
