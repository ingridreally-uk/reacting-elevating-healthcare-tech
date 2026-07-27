/**
 * Homepage visual correction — prepare dedicated marketing WebPs
 * from audited source screenshots. Does not overwrite original sources.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = path.resolve(".");
const OUT = path.join(ROOT, "public/product-screens");
const PUBLIC = path.join(ROOT, "public/product-screens");
const APP = path.join(
  process.env.USERPROFILE,
  "Desktop/New reacting/app images",
);
const DESKTOP = path.join(process.env.USERPROFILE, "Desktop");

const FEATURE_W = 1400;
const FEATURE_H = 900; // 14:9 — consistent visual weight
const TOUR_W = 1200;
const TOUR_H = 750; // 16:10 card canvas
const TOUR_WIDE_W = 1400;
const TOUR_WIDE_H = 780;

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

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

async function fitCanvas(inputBuf, canvasW, canvasH, bg = "#EEF5F2") {
  return sharp(inputBuf)
    .resize({
      width: canvasW,
      height: canvasH,
      fit: "contain",
      background: bg,
    })
    .webp({ quality: 85, effort: 5 })
    .toBuffer();
}

async function saveNamed(buf, name) {
  const p = path.join(OUT, name);
  await fs.writeFile(p, buf);
  const m = await sharp(p).metadata();
  console.log(`✓ ${name}  ${m.width}×${m.height}`);
}

async function extract(src, region) {
  return sharp(src).extract(region).png().toBuffer();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  // ─── HERO / DASHBOARD ───
  // Source: 3. dashboard.jpg — KPIs + Actions + low stock + expiry
  {
    const src = path.join(APP, "3. dashboard.jpg");
    const left = 248;
    const top = 24;
    const m = await sharp(src).metadata();
    const width = m.width - left - 14;
    const height = m.height - top - 8;
    let buf = await extract(src, { left, top, width, height });
    buf = await sharp(buf)
      .composite([
        {
          input: svg(46, 46, "#D5E3DE", [], 23),
          left: width - 58,
          top: 6,
        },
      ])
      .png()
      .toBuffer();
    await saveNamed(await fitCanvas(buf, FEATURE_W, 920, "#EEF5F2"), "mkt-dashboard.webp");
    await saveNamed(await fitCanvas(buf, TOUR_W, TOUR_H), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY ───
  // Source: screen-22.png — product cards with Qty/Min/In Stock (not folders)
  {
    const src = path.join(PUBLIC, "screen-22.png");
    // Crop to items area + useful slice of detail panel (stock status)
    const left = 250;
    const top = 36;
    const width = 1180;
    const height = 820;
    let buf = await extract(src, { left, top, width, height });
    // Soften any personal data if present in history overlays — cover avatar zone
    buf = await sharp(buf)
      .composite([
        {
          input: svg(44, 44, "#D5E3DE", [], 22),
          left: width - 56,
          top: 4,
        },
      ])
      .png()
      .toBuffer();
    await saveNamed(await fitCanvas(buf, FEATURE_W, FEATURE_H), "mkt-stock.webp");
    await saveNamed(await fitCanvas(buf, TOUR_W, TOUR_H), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK ───
  // Source: screen-21.png — readable product table (better than tiny card grid)
  {
    const src = path.join(PUBLIC, "screen-21.png");
    const left = 250;
    const top = 28;
    const width = 1620;
    const height = 820;
    let buf = await extract(src, { left, top, width, height });
    buf = await sharp(buf)
      .composite([
        {
          input: svg(44, 44, "#D5E3DE", [], 22),
          left: width - 56,
          top: 6,
        },
      ])
      .png()
      .toBuffer();
    await saveNamed(await fitCanvas(buf, FEATURE_W, FEATURE_H), "mkt-low-stock.webp");
    await saveNamed(await fitCanvas(buf, TOUR_W, TOUR_H), "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY ───
  // Source: 4. expiry stock.jpg — three complete cards, no empty right
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const left = 248;
    const top = 18;
    const width = 960;
    const height = 640;
    const buf = await extract(src, { left, top, width, height });
    await saveNamed(await fitCanvas(buf, FEATURE_W, FEATURE_H), "mkt-expiring.webp");
    await saveNamed(await fitCanvas(buf, TOUR_W, TOUR_H), "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS ───
  // Source: 3. suplyer management.jpg — directory, rewritten with fictional data
  {
    const src = path.join(DESKTOP, "3. suplyer management.jpg");
    const left = 244;
    const top = 14;
    const m = await sharp(src).metadata();
    // Crop tightly: remove sparse right margin
    const width = Math.min(1180, m.width - left - 40);
    const height = m.height - top - 8;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Practice Supplies UK", "Purchasing", "purchasing@practice.co.uk"],
      ["SmileSource Supplies", "Accounts", "accounts@smilesource.co.uk"],
      ["TOC Dental", "Orders", "orders@tocdental.co.uk"],
      ["Premium Plus UK", "Sales desk", "sales@premiumplus.co.uk"],
    ];
    const listH = height - 96;
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = 6 + i * 68;
      if (y + 56 > listH) return;
      rows += `
        <rect x="0" y="${y}" width="100%" height="64" fill="#FFFFFF"/>
        <rect x="12" y="${y + 14}" width="34" height="34" rx="8" fill="#E4F2EC"/>
        <text x="58" y="${y + 28}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
        <text x="58" y="${y + 46}" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#6B7C84">Dental supplies partner</text>
        <text x="340" y="${y + 36}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#2A3A42">${esc(c)}</text>
        <text x="540" y="${y + 36}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#2A3A42">${esc(e)}</text>
        <rect x="920" y="${y + 18}" width="64" height="26" rx="13" fill="#E7F5EF"/>
        <text x="932" y="${y + 36}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>
      `;
    });
    const listSvg = Buffer.from(
      `<svg width="${width}" height="${listH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${rows}</svg>`,
    );
    let buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([
        { input: svg(44, 44, "#D5E3DE", [], 22), left: width - 54, top: 6 },
        { input: listSvg, left: 0, top: 96 },
      ])
      .png()
      .toBuffer();
    await saveNamed(await fitCanvas(buf, FEATURE_W, FEATURE_H), "mkt-suppliers.webp");
    await saveNamed(await fitCanvas(buf, TOUR_W, TOUR_H), "mkt-tour-suppliers.webp");
  }

  // ─── REPORTING ───
  // Source: 4.4reporting.jpg — Savings & Usage with chart + totals + highlights
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const left = 241;
    const top = 14;
    const m = await sharp(src).metadata();
    const width = m.width - left - 12;
    const height = m.height - top - 8;
    const buf = await extract(src, { left, top, width, height });
    await saveNamed(await fitCanvas(buf, FEATURE_W, FEATURE_H), "mkt-reporting.webp");
    await saveNamed(
      await fitCanvas(buf, TOUR_WIDE_W, TOUR_WIDE_H),
      "mkt-tour-reporting.webp",
    );
  }

  // ─── PURCHASE ORDERS ───
  // Source: 5. purchase order.jpg — KPIs, tabs, rows; replace personal names
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const cropLeft = 258;
    const cropTop = 16;
    const m = await sharp(src).metadata();
    const pw = m.width - cropLeft - 12;
    const ph = m.height - cropTop - 8;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const sourceYs = [560, 600, 640, 680];
    const comps = [
      { input: svg(44, 44, "#D5E3DE", [], 22), left: pw - 54, top: 4 },
    ];
    names.forEach((n, i) => {
      comps.push({
        input: svg(175, 38, "#FFFFFF", [
          { text: n, y: 24, size: 13, weight: 600 },
        ]),
        left: 450 - cropLeft,
        top: sourceYs[i] - cropTop,
      });
    });
    // Extra solid cover over remaining personal names
    comps.push({
      input: svg(175, 200, "#FFFFFF", []),
      left: 450 - cropLeft,
      top: 555 - cropTop,
    });
    names.forEach((n, i) => {
      comps.push({
        input: svg(175, 36, "#FFFFFF", [
          { text: n, y: 22, size: 13, weight: 600 },
        ]),
        left: 450 - cropLeft,
        top: 555 - cropTop + 8 + i * 40,
      });
    });
    const buf = await sharp(src)
      .extract({ left: cropLeft, top: cropTop, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await saveNamed(await fitCanvas(buf, FEATURE_W, FEATURE_H), "mkt-purchase-orders.webp");
    await saveNamed(await fitCanvas(buf, TOUR_W, TOUR_H), "mkt-tour-orders.webp");
  }

  // ─── RFQ ───
  // Sources: 6. rfq.jpg + 6.1 rfq order summary.jpg — matched-scale coherent canvas
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const sumSrc = path.join(APP, "6.1 rfq order summary.jpg");
    const cropLeft = 255;
    const cropTop = 18;
    const panelH = 560;
    const leftW = 980;
    const rightW = 620;

    const leftPatches = [
      { input: svg(44, 44, "#D5E3DE", [], 22), left: leftW - 54, top: 4 },
      {
        input: svg(400, 44, "#FFFFFF", [
          { text: "Urgent order", y: 30, size: 24, weight: 700 },
        ]),
        left: 24,
        top: 150 - cropTop,
      },
      {
        input: svg(
          110,
          28,
          "#E7F5EF",
          [{ text: "Responses", y: 18, size: 12, weight: 600, color: "#1F6B52", x: 16 }],
          14,
        ),
        left: 270,
        top: 155 - cropTop,
      },
      {
        input: svg(900, 34, "#FFFFFF", [
          {
            text: "Created 25 Jun 2026 · Updated 11 Jul 2026 · 2/2 suppliers replied · 1/3 quotes selected",
            y: 22,
            size: 12,
            color: "#5B6B73",
          },
        ]),
        left: 24,
        top: 195 - cropTop,
      },
      {
        input: svg(260, 34, "#FFFFFF", [
          { text: "Henry Schein", y: 22, size: 13, weight: 600 },
        ]),
        left: 400,
        top: 310 - cropTop,
      },
      {
        input: svg(200, 34, "#FFFFFF", [
          { text: "Kent Express", y: 22, size: 13, weight: 600 },
        ]),
        left: 680,
        top: 310 - cropTop,
      },
    ];

    const leftBuf = await sharp(rfqSrc)
      .extract({ left: cropLeft, top: cropTop, width: leftW, height: panelH })
      .composite(leftPatches)
      .resize({ height: panelH })
      .png()
      .toBuffer();

    const rightBuf = await sharp(sumSrc)
      .extract({ left: 540, top: 100, width: 900, height: 620 })
      .composite([
        {
          input: svg(260, 36, "#FFFFFF", [
            { text: "Kent Express", y: 24, size: 14, weight: 600 },
          ]),
          left: 36,
          top: 28,
        },
        {
          input: svg(260, 36, "#FFFFFF", [
            { text: "Henry Schein", y: 24, size: 14, weight: 600 },
          ]),
          left: 36,
          top: 150,
        },
      ])
      .resize({ width: rightW, height: panelH, fit: "cover", position: "left top" })
      .png()
      .toBuffer();

    const gap = 16;
    const headerH = 44;
    const canvasW = 24 + leftW + gap + rightW + 24;
    const canvasH = headerH + 16 + panelH + 16;
    const header = svg(
      canvasW,
      headerH,
      "#F4F8F7",
      [
        { text: "RFQ · Urgent order", y: 28, size: 15, weight: 600 },
        {
          text: "Dental Assist",
          x: canvasW - 130,
          y: 28,
          size: 12,
          color: "#5B6B73",
        },
      ],
      0,
    );

    const composed = await sharp({
      create: {
        width: canvasW,
        height: canvasH,
        channels: 3,
        background: "#EEF5F2",
      },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        { input: leftBuf, left: 24, top: headerH + 8 },
        { input: rightBuf, left: 24 + leftW + gap, top: headerH + 8 },
      ])
      .webp({ quality: 85 })
      .toBuffer();

    await saveNamed(composed, "mkt-rfq-workflow-full.webp");
    await saveNamed(
      await fitCanvas(composed, TOUR_WIDE_W, TOUR_WIDE_H),
      "mkt-rfq-workflow.webp",
    );
    await saveNamed(
      await fitCanvas(composed, TOUR_WIDE_W, TOUR_WIDE_H),
      "mkt-tour-rfq.webp",
    );
  }

  console.log("\nAsset preparation complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
