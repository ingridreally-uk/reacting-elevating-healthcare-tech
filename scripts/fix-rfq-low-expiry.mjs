/**
 * Fix RFQ density + low-stock/expiry framing.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
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

async function save(buf, name) {
  const dest = path.join(OUT, name);
  const tmp = `${dest}.new.webp`;
  await fs.writeFile(tmp, buf);
  await fs.copyFile(tmp, dest);
  await fs.unlink(tmp).catch(() => {});
  console.log("✓", name);
}

async function padFrame(buf, w, h, { padX = 36, padY = 28, position = "north" } = {}) {
  const fitted = await sharp(buf)
    .resize({ width: w - padX * 2, height: h - padY * 2, fit: "contain", background: BG })
    .png()
    .toBuffer();
  const m = await sharp(fitted).metadata();
  const left = Math.round((w - m.width) / 2);
  const top = position === "center" ? Math.round((h - m.height) / 2) : padY;
  return sharp({
    create: { width: w, height: h, channels: 3, background: BG },
  })
    .composite([{ input: fitted, left, top }])
    .webp({ quality: 88, effort: 5 })
    .toBuffer();
}

async function main() {
  // LOW STOCK
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const avatar = Buffer.from(
      `<svg width="36" height="36" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="18" fill="#D5E3DE"/></svg>`,
    );
    const buf = await sharp(src)
      .extract({ left: 250, top: 14, width: 1288, height: 730 })
      .composite([{ input: avatar, left: 1242, top: 4 }])
      .png()
      .toBuffer();
    await save(await padFrame(buf, FW, FH, { padX: 32, padY: 28, position: "north" }), "mkt-low-stock.webp");
    await save(await padFrame(buf, TW, TH, { padX: 24, padY: 20, position: "north" }), "mkt-tour-low-stock.webp");
  }

  // EXPIRY
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const crop = await sharp(src)
      .extract({ left: 248, top: 10, width: 1080, height: 700 })
      .png()
      .toBuffer();
    await save(await padFrame(crop, FW, FH, { padX: 44, padY: 32, position: "center" }), "mkt-expiring.webp");
    await save(await padFrame(crop, TW, TH, { padX: 32, padY: 24, position: "center" }), "mkt-tour-expiring.webp");
  }

  // RFQ dense unified
  {
    const W = FW;
    const H = FH;
    const pad = 16;
    const leftW = Math.round((W - pad * 3) * 0.71);
    const rightW = W - pad * 3 - leftW;
    const mainH = H - pad * 2;
    const products = [
      { name: "ProTaper Hand File 25mm S1 6pk", mfr: "Maillefer / Dentsply", a: "42.55", b: "46.55", pick: "a", qty: 1 },
      { name: "Sterile Safeskin Purple Nitrile Gloves S", mfr: "Kimberly Clark", a: "7.99", b: "8.99", pick: "a", qty: 2 },
      { name: "Venus Diamond Composite Syringe 4g A4", mfr: "Kulzer", a: "57.26", b: "47.26", pick: "b", qty: 4, saved: "40.00" },
      { name: "Pana Spray Plus 500ml", mfr: "NSK", a: "28.50", b: "26.90", pick: "b", qty: 1, saved: "1.60" },
      { name: "Septanest Articaine 1:100,000 50pk", mfr: "Septodont", a: "64.80", b: "61.20", pick: "b", qty: 1, saved: "3.60" },
    ];
    let rows = "";
    products.forEach((p) => {
      const i = products.indexOf(p);
      const y = 108 + i * 108;
      const aBg = p.pick === "a" ? "#E7F5EF" : "#FFF4EB";
      const bBg = p.pick === "b" ? "#E7F5EF" : "#FFF4EB";
      const aMark = p.pick === "a" ? "✓" : "+";
      const bMark = p.pick === "b" ? "✓" : "+";
      const saved = p.saved
        ? `<rect x="${leftW - 200}" y="${y + 68}" width="88" height="20" rx="10" fill="#E7F5EF"/><text x="${leftW - 190}" y="${y + 82}" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#1F6B52">Saved &#163;${p.saved}</text>`
        : "";
      rows += `<rect x="14" y="${y}" width="${leftW - 28}" height="98" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
      <text x="28" y="${y + 26}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${esc(p.name)}</text>
      <text x="28" y="${y + 46}" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">${esc(p.mfr)}</text>
      <rect x="${Math.round(leftW * 0.42)}" y="${y + 24}" width="118" height="38" rx="10" fill="${aBg}"/>
      <text x="${Math.round(leftW * 0.42) + 14}" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${aMark} &#163;${p.a}</text>
      <rect x="${Math.round(leftW * 0.42) + 132}" y="${y + 24}" width="118" height="38" rx="10" fill="${bBg}"/>
      <text x="${Math.round(leftW * 0.42) + 146}" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${bMark} &#163;${p.b}</text>
      <text x="${leftW - 58}" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Qty ${p.qty}</text>
      ${saved}`;
    });

    const leftPanel = Buffer.from(
      `<svg width="${leftW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="20" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Urgent order</text>
        <rect x="178" y="16" width="96" height="24" rx="12" fill="#E7F5EF"/>
        <text x="190" y="33" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Responses</text>
        <text x="20" y="58" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2/2 suppliers replied · 3/5 quotes selected</text>
        <text x="20" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Product</text>
        <text x="${Math.round(leftW * 0.42) + 14}" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Henry Schein</text>
        <text x="${Math.round(leftW * 0.42) + 146}" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">Kent Express</text>
        ${rows}
      </svg>`,
    );

    const summary = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="20" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
        <text x="20" y="66" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">Kent Express</text>
        <text x="20" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">3 items selected</text>
        <text x="20" y="128" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
        <text x="${rightW - 92}" y="128" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;312.40</text>
        <text x="20" y="156" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
        <text x="${rightW - 84}" y="156" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;62.48</text>
        <line x1="20" y1="176" x2="${rightW - 20}" y2="176" stroke="#E2EBE7"/>
        <text x="20" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">Order total</text>
        <text x="${rightW - 100}" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">&#163;374.88</text>
        <text x="20" y="242" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Money saved</text>
        <text x="${rightW - 80}" y="242" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">&#163;45.20</text>
        <rect x="20" y="266" width="${rightW - 40}" height="1" fill="#E2EBE7"/>
        <text x="20" y="304" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
        <text x="20" y="338" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
        <text x="${rightW - 100}" y="338" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,447.33</text>
        <text x="20" y="366" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
        <text x="${rightW - 100}" y="366" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,072.45</text>
        <rect x="20" y="388" width="${rightW - 40}" height="10" rx="5" fill="#EAF6F1"/>
        <rect x="20" y="388" width="${Math.round((rightW - 40) * 0.57)}" height="10" rx="5" fill="#2F8F6B"/>
        <text x="20" y="424" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">57% of monthly materials budget</text>
        <rect x="20" y="448" width="${rightW - 40}" height="1" fill="#E2EBE7"/>
        <text x="20" y="488" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
        <text x="20" y="512" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · &#163;98.53</text>
        <rect x="20" y="540" width="${rightW - 40}" height="1" fill="#E2EBE7"/>
        <text x="20" y="580" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">COMBINED ORDER</text>
        <text x="20" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#0B1F2A">Grand total &#163;473.41</text>
        <text x="20" y="638" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#1F6B52">Total money saved &#163;45.20</text>
      </svg>`,
    );

    const composed = await sharp({
      create: { width: W, height: H, channels: 3, background: BG },
    })
      .composite([
        { input: leftPanel, left: pad, top: pad },
        { input: summary, left: pad + leftW + pad, top: pad },
      ])
      .webp({ quality: 88, effort: 5 })
      .toBuffer();

    await save(composed, "mkt-rfq-workflow.webp");
    await save(composed, "mkt-rfq-workflow-full.webp");
    await save(
      await sharp(composed)
        .resize({ width: TW, height: TH, fit: "cover", position: "north" })
        .webp({ quality: 88 })
        .toBuffer(),
      "mkt-tour-rfq.webp",
    );
  }

  console.log("fixes done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
