/**
 * Fix redaction / composition issues on stock, RFQ, and PO assets.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");

const FEATURE_W = 1440;
const FEATURE_H = 900;
const TOUR_W = 1200;
const TOUR_H = 750;
const TOUR_WIDE_W = 1400;
const TOUR_WIDE_H = 788;

const esc = (s) =>
  String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

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

async function fit(buf, w, h, bg = "#EEF5F2") {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "contain", background: bg })
    .webp({ quality: 86, effort: 5 })
    .toBuffer();
}

async function save(buf, name) {
  await fs.writeFile(path.join(OUT, name), buf);
  console.log("✓", name);
}

async function main() {
  // ─── INVENTORY: cleaner 65/35 with Grade redacted ───
  {
    const src = path.join(PUBLIC, "screen-24.png");
    const listW = 980;
    const detailW = 520;
    const panelH = 820;

    const listBuf = await sharp(src)
      .extract({ left: 248, top: 28, width: 720, height: 830 })
      .resize({ width: listW, height: panelH, fit: "cover", position: "left top" })
      .png()
      .toBuffer();

    let detailBuf = await sharp(src)
      .extract({ left: 1000, top: 48, width: 760, height: 800 })
      .resize({ width: detailW, height: panelH, fit: "cover", position: "left top" })
      .png()
      .toBuffer();

    // Cover Grade Bad with a solid patch + Good label (large cover)
    detailBuf = await sharp(detailBuf)
      .composite([
        { input: svg(120, 32, "#FFFFFF", []), left: 200, top: 195 },
        { input: svg(120, 32, "#FFFFFF", []), left: 200, top: 220 },
        { input: svg(120, 32, "#FFFFFF", []), left: 280, top: 195 },
        { input: svg(120, 32, "#FFFFFF", []), left: 280, top: 220 },
        {
          input: svg(70, 22, "#FFFFFF", [
            { text: "Good", y: 16, size: 13, weight: 600, color: "#1F6B52" },
          ]),
          left: 220,
          top: 205,
        },
      ])
      .png()
      .toBuffer();

    const header = svg(
      listW + detailW,
      52,
      "#F4F8F7",
      [
        { text: "Stock", y: 34, size: 18, weight: 700 },
        {
          text: "Root Canal · materials, quantities and stock status",
          x: 78,
          y: 32,
          size: 12,
          color: "#5B6B73",
        },
      ],
      0,
    );

    const composed = await sharp({
      create: {
        width: listW + detailW,
        height: panelH + 52,
        channels: 3,
        background: "#EEF5F2",
      },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        { input: listBuf, left: 0, top: 52 },
        { input: detailBuf, left: listW, top: 52 },
      ])
      .png()
      .toBuffer();

    await save(await fit(composed, FEATURE_W, FEATURE_H), "mkt-stock.webp");
    await save(await fit(composed, TOUR_W, TOUR_H), "mkt-tour-stock.webp");
  }

  // ─── RFQ: heavier metadata redaction + clean unified panel ───
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const canvasW = 1600;
    const canvasH = 900;
    const headerH = 48;
    const pad = 16;
    const mainH = canvasH - headerH - pad * 2;
    const leftW = Math.round((canvasW - pad * 3) * 0.7);
    const rightW = canvasW - pad * 3 - leftW;

    // Extract comparison body only (skip messy title zone), then rebuild header
    const tableBuf = await sharp(rfqSrc)
      .extract({ left: 255, top: 280, width: 1180, height: 420 })
      .composite([
        {
          input: svg(250, 34, "#FFFFFF", [
            { text: "Henry Schein", y: 22, size: 13, weight: 600 },
          ]),
          left: 400,
          top: 18,
        },
        {
          input: svg(210, 34, "#FFFFFF", [
            { text: "Kent Express", y: 22, size: 13, weight: 600 },
          ]),
          left: 680,
          top: 18,
        },
      ])
      .png()
      .toBuffer();

    const leftPanel = await sharp({
      create: { width: leftW, height: mainH, channels: 3, background: "#FFFFFF" },
    })
      .composite([
        {
          input: svg(leftW, 140, "#FFFFFF", [
            { text: "Urgent order", y: 48, size: 26, weight: 700 },
            {
              text: "Created 25 Jun 2026 · 2/2 suppliers replied · 1/3 quotes selected",
              y: 82,
              size: 13,
              color: "#5B6B73",
            },
            {
              text: "Compare supplier responses before the practice commits to an order.",
              y: 110,
              size: 12,
              color: "#5B6B73",
            },
          ]),
          left: 0,
          top: 0,
        },
        {
          input: svg(
            110,
            28,
            "#E7F5EF",
            [{ text: "Responses", y: 18, size: 12, weight: 600, color: "#1F6B52", x: 16 }],
            14,
          ),
          left: 220,
          top: 28,
        },
        {
          input: await sharp(tableBuf)
            .resize({ width: leftW - 24, height: mainH - 160, fit: "contain", background: "#FFFFFF" })
            .png()
            .toBuffer(),
          left: 12,
          top: 148,
        },
      ])
      .png()
      .toBuffer();

    const summarySvg = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="10" y="10" width="${rightW - 20}" height="${mainH - 20}" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="28" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
        <text x="28" y="84" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Kent Express</text>
        <text x="28" y="106" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">1 item selected</text>
        <text x="28" y="148" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
        <text x="${rightW - 96}" y="148" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£189.04</text>
        <text x="28" y="176" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
        <text x="${rightW - 96}" y="176" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£37.81</text>
        <line x1="28" y1="198" x2="${rightW - 28}" y2="198" stroke="#E2EBE7"/>
        <text x="28" y="230" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">Order total</text>
        <text x="${rightW - 108}" y="230" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">£226.85</text>
        <text x="28" y="266" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Money saved</text>
        <text x="${rightW - 90}" y="266" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">£56.00</text>
        <rect x="28" y="292" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
        <text x="28" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
        <text x="28" y="362" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
        <text x="${rightW - 110}" y="362" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,447.33</text>
        <text x="28" y="390" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
        <text x="${rightW - 110}" y="390" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,220.48</text>
        <rect x="28" y="412" width="${rightW - 56}" height="10" rx="5" fill="#EAF6F1"/>
        <rect x="28" y="412" width="${Math.round((rightW - 56) * 0.5)}" height="10" rx="5" fill="#2F8F6B"/>
        <text x="28" y="448" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">50% of monthly materials budget</text>
        <rect x="28" y="480" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
        <text x="28" y="518" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Henry Schein</text>
        <text x="28" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · £178.82</text>
      </svg>`,
    );

    const header = svg(
      canvasW,
      headerH,
      "#F4F8F7",
      [
        { text: "RFQ · Urgent order", y: 30, size: 15, weight: 600 },
        { text: "Dental Assist", x: canvasW - 130, y: 30, size: 12, color: "#5B6B73" },
      ],
      0,
    );

    const composed = await sharp({
      create: { width: canvasW, height: canvasH, channels: 3, background: "#EEF5F2" },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        { input: leftPanel, left: pad, top: headerH + pad },
        { input: summarySvg, left: pad + leftW + pad, top: headerH + pad },
      ])
      .webp({ quality: 86 })
      .toBuffer();

    await save(composed, "mkt-rfq-workflow-full.webp");
    await save(await fit(composed, FEATURE_W, FEATURE_H), "mkt-rfq-workflow.webp");
    await save(await fit(composed, TOUR_WIDE_W, TOUR_WIDE_H), "mkt-tour-rfq.webp");
  }

  // ─── PO: clean supplier column, ~5 columns ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    // Crop tighter: drop sparse right status, enlarge KPIs + table
    const cropLeft = 320;
    const cropTop = 12;
    const pw = 1280;
    const ph = 820;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    // Cover full supplier column block then rewrite row labels
    const comps = [
      { input: svg(44, 44, "#D5E3DE", [], 22), left: pw - 54, top: 4 },
      { input: svg(200, 280, "#FFFFFF", []), left: 130, top: 500 },
    ];
    names.forEach((n, i) => {
      comps.push({
        input: svg(190, 34, "#FFFFFF", [{ text: n, y: 22, size: 13, weight: 600 }]),
        left: 135,
        top: 510 + i * 42,
      });
    });
    const buf = await sharp(src)
      .extract({ left: cropLeft, top: cropTop, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await save(await fit(buf, FEATURE_W, FEATURE_H), "mkt-purchase-orders.webp");
    await save(await fit(buf, TOUR_W, TOUR_H), "mkt-tour-orders.webp");
  }

  console.log("fixes done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
