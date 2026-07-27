/**
 * Final visual proportion pass — crop/scale only.
 * Does not overwrite original source screenshots.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const DESKTOP = path.join(process.env.USERPROFILE, "Desktop");

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

/** Fill canvas tightly — cover prefers content fill; use for focused tour crops. */
async function coverCanvas(buf, w, h, bg = "#EEF5F2", position = "centre") {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "cover", position })
    .webp({ quality: 86, effort: 5 })
    .toBuffer();
}

/** Contain with minimal padding — for feature frames. */
async function containCanvas(buf, w, h, bg = "#EEF5F2") {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "contain", background: bg })
    .webp({ quality: 86, effort: 5 })
    .toBuffer();
}

async function save(buf, name) {
  const dest = path.join(OUT, name);
  const tmp = dest + ".tmp.webp";
  await fs.writeFile(tmp, buf);
  try {
    await fs.rename(tmp, dest);
  } catch {
    await fs.copyFile(tmp, dest).catch(() => {});
    await fs.unlink(tmp).catch(() => {});
  }
  const m = await sharp(dest).metadata();
  console.log(`✓ ${name}  ${m.width}×${m.height}`);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  // ─── HERO DASHBOARD (same source; keep readable) ───
  {
    const src = path.join(APP, "3. dashboard.jpg");
    const left = 248;
    const top = 18;
    const m = await sharp(src).metadata();
    const width = m.width - left - 8;
    const height = m.height - top - 4;
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([{ input: svg(46, 46, "#D5E3DE", [], 23), left: width - 56, top: 4 }])
      .png()
      .toBuffer();
    await save(await containCanvas(buf, 1520, 960), "mkt-dashboard.webp");
    // Tour: tighter on Actions + alerts (not full KPI strip)
    const tourBuf = await sharp(src)
      .extract({ left: 248, top: 200, width: 1600, height: 640 })
      .composite([{ input: svg(40, 40, "#D5E3DE", [], 20), left: 1540, top: 4 }])
      .png()
      .toBuffer();
    await save(await coverCanvas(tourBuf, TOUR_W, TOUR_H, "#EEF5F2", "north"), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY — one continuous natural crop (not pasted composite) ───
  // screen-24 already shows list + open detail as one app screen.
  // Crop so list ~65% / detail ~35%, ≥2 product cards, no clipped right chrome.
  {
    const src = path.join(PUBLIC, "screen-24.png");
    // Content after sidebar; stop before any detached right chrome
    const left = 248;
    const top = 24;
    const width = 1520; // enough for cards + detail without far-right clip
    const height = 820;
    let buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([
        { input: svg(44, 44, "#D5E3DE", [], 22), left: width - 54, top: 2 },
        // Grade Bad → Good (under product image in detail)
        { input: svg(100, 36, "#FFFFFF"), left: 980, top: 430 },
        {
          input: svg(70, 24, "#FFFFFF", [
            { text: "Good", y: 17, size: 14, weight: 600, color: "#1F6B52" },
          ]),
          left: 990,
          top: 436,
        },
      ])
      .png()
      .toBuffer();

    // Feature: fill frame tightly (cover slightly so no large pale margins)
    await save(await coverCanvas(buf, FEATURE_W, FEATURE_H, "#EEF5F2", "northwest"), "mkt-stock.webp");

    // Tour: focus 2 cards + detail qty/min
    const tour = await sharp(src)
      .extract({ left: 248, top: 120, width: 1400, height: 700 })
      .composite([
        { input: svg(90, 32, "#FFFFFF"), left: 900, top: 340 },
        {
          input: svg(60, 22, "#FFFFFF", [
            { text: "Good", y: 16, size: 13, weight: 600, color: "#1F6B52" },
          ]),
          left: 910,
          top: 345,
        },
      ])
      .png()
      .toBuffer();
    await save(await coverCanvas(tour, TOUR_W, TOUR_H, "#EEF5F2", "northwest"), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK — same card source, minor crop only ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    // Four complete cards; keep second row; less pale margin; centre vertically
    const left = 268;
    const top = 28;
    const width = 1240;
    const height = 700;
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([{ input: svg(40, 40, "#D5E3DE", [], 20), left: width - 50, top: 4 }])
      .png()
      .toBuffer();
    await save(await coverCanvas(buf, FEATURE_W, FEATURE_H, "#EEF5F2", "north"), "mkt-low-stock.webp");

    const tour = await sharp(src)
      .extract({ left: 268, top: 40, width: 1180, height: 620 })
      .png()
      .toBuffer();
    await save(await coverCanvas(tour, TOUR_W, TOUR_H, "#EEF5F2", "north"), "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY — enlarge content ~22%, less empty pale canvas ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const left = 248;
    const top = 14;
    const width = 1000;
    const height = 640;
    const crop = await sharp(src).extract({ left, top, width, height }).png().toBuffer();
    // Scale up into feature canvas (~92% fill vs previous ~84%)
    const inner = await sharp(crop)
      .resize({ width: Math.round(FEATURE_W * 0.94), withoutEnlargement: false })
      .png()
      .toBuffer();
    const padded = await sharp({
      create: { width: FEATURE_W, height: FEATURE_H, channels: 3, background: "#EEF5F2" },
    })
      .composite([{ input: inner, gravity: "centre" }])
      .webp({ quality: 86 })
      .toBuffer();
    await save(padded, "mkt-expiring.webp");
    await save(await coverCanvas(crop, TOUR_W, TOUR_H, "#EEF5F2", "north"), "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS — enlarge ~18%, detail ~38%, less blank below ───
  {
    const canvasW = 1500;
    const canvasH = 780;
    const leftW = Math.round(canvasW * 0.62);
    const rightW = canvasW - leftW;

    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Practice Supplies UK", "Purchasing", "purchasing@practice.co.uk"],
      ["SmileSource Supplies", "Accounts", "accounts@smilesource.co.uk"],
    ];

    const dirHeaderH = 72;
    const rowH = 78;
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = 2 + i * rowH;
      const selected = i === 0;
      const bg = selected ? "#EAF6F1" : "#FFFFFF";
      const bar = selected
        ? `<rect x="0" y="${y}" width="4" height="${rowH - 4}" fill="#1F6B52"/>`
        : "";
      rows +=
        `<rect x="0" y="${y}" width="100%" height="${rowH - 4}" fill="${bg}"/>` +
        bar +
        `<rect x="20" y="${y + 18}" width="36" height="36" rx="9" fill="#E4F2EC"/>` +
        `<text x="68" y="${y + 34}" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">${esc(n)}</text>` +
        `<text x="68" y="${y + 54}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#6B7C84">${esc(c)}</text>` +
        `<text x="400" y="${y + 44}" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#2A3A42">${esc(e)}</text>` +
        `<rect x="${leftW - 110}" y="${y + 24}" width="72" height="28" rx="14" fill="#E7F5EF"/>` +
        `<text x="${leftW - 96}" y="${y + 43}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Active</text>`;
    });

    const dirBodyH = vendors.length * rowH + 8;
    const dirBody = Buffer.from(
      `<svg width="${leftW}" height="${dirBodyH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${rows}</svg>`,
    );
    const dirHeader = svg(
      leftW,
      dirHeaderH,
      "#F7FAF9",
      [
        { text: "Vendors", y: 32, size: 22, weight: 700 },
        { text: "6 active suppliers · linked to RFQs and orders", y: 56, size: 13, color: "#5B6B73" },
      ],
      0,
    );

    const panelH = dirHeaderH + dirBodyH;
    const profileOverlay = Buffer.from(
      `<svg width="${rightW}" height="${panelH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="14" y="14" width="${rightW - 28}" height="${panelH - 28}" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="32" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">VENDORS / Kent Express</text>
        <text x="32" y="82" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Kent Express</text>
        <rect x="210" y="60" width="64" height="26" rx="13" fill="#E7F5EF"/>
        <text x="222" y="78" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>
        <text x="32" y="130" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Main contact</text>
        <text x="32" y="154" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
        <text x="32" y="196" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Email</text>
        <text x="32" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">orders@kentexpress.co.uk</text>
        <text x="32" y="262" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Account ref</text>
        <text x="32" y="286" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
        <text x="32" y="328" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Website</text>
        <text x="32" y="352" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">www.kentexpress.co.uk</text>
        <rect x="32" y="380" width="${rightW - 76}" height="1" fill="#E2EBE7"/>
        <text x="32" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
        <text x="32" y="452" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">3 open RFQs · 2 purchase orders</text>
        <text x="32" y="482" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#5B6B73">Categories: Infection Control, Consumables</text>
        <rect x="32" y="510" width="${rightW - 76}" height="72" rx="12" fill="#EAF6F1"/>
        <text x="48" y="542" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">Preferred supplier for gloves and PPE.</text>
        <text x="48" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Account status: Active · net 30</text>
      </svg>`,
    );

    const composed = await sharp({
      create: { width: canvasW, height: panelH, channels: 3, background: "#EEF5F2" },
    })
      .composite([
        { input: dirHeader, left: 0, top: 0 },
        { input: dirBody, left: 0, top: dirHeaderH },
        { input: profileOverlay, left: leftW, top: 0 },
      ])
      .png()
      .toBuffer();

    await save(await coverCanvas(composed, FEATURE_W, FEATURE_H, "#EEF5F2", "northwest"), "mkt-suppliers.webp");
    // Tour: 4–5 rows + detail
    await save(await coverCanvas(composed, TOUR_W, TOUR_H, "#EEF5F2", "northwest"), "mkt-tour-suppliers.webp");
  }

  // ─── PURCHASE ORDERS — tour focuses metrics + 4 rows ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const cropLeft = 320;
    const cropTop = 12;
    const pw = 1280;
    const ph = 820;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const comps = [
      { input: svg(44, 44, "#D5E3DE", [], 22), left: pw - 54, top: 4 },
      { input: svg(220, 320, "#FFFFFF"), left: 110, top: 480 },
    ];
    names.forEach((n, i) => {
      comps.push({
        input: svg(200, 36, "#FFFFFF", [{ text: n, y: 24, size: 13, weight: 600 }]),
        left: 120,
        top: 495 + i * 48,
      });
    });
    const buf = await sharp(src)
      .extract({ left: cropLeft, top: cropTop, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await save(await coverCanvas(buf, FEATURE_W, FEATURE_H, "#EEF5F2", "north"), "mkt-purchase-orders.webp");
    const tour = await sharp(buf)
      .extract({
        left: 0,
        top: 0,
        width: pw,
        height: Math.min(680, ph),
      })
      .png()
      .toBuffer();
    await save(await coverCanvas(tour, TOUR_W, TOUR_H, "#EEF5F2", "north"), "mkt-tour-orders.webp");
  }

  // ─── REPORTING — slightly enlarge, less top blank ───
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const left = 241;
    const top = 40; // trim more top blank
    const m = await sharp(src).metadata();
    const buf = await sharp(src)
      .extract({ left, top, width: m.width - left - 12, height: m.height - top - 8 })
      .png()
      .toBuffer();
    await save(await coverCanvas(buf, FEATURE_W, FEATURE_H, "#EEF5F2", "north"), "mkt-reporting.webp");
    await save(await coverCanvas(buf, TOUR_WIDE_W, TOUR_WIDE_H, "#EEF5F2", "north"), "mkt-tour-reporting.webp");
  }

  // ─── RFQ — 72/28, table up, less empty white ───
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const canvasW = 1600;
    const canvasH = 880;
    const headerH = 44;
    const pad = 12;
    const mainH = canvasH - headerH - pad * 2;
    const leftW = Math.round((canvasW - pad * 3) * 0.72);
    const rightW = canvasW - pad * 3 - leftW;

    let tableBuf = await sharp(rfqSrc)
      .extract({ left: 255, top: 300, width: 1180, height: 420 })
      .png()
      .toBuffer();

    tableBuf = await sharp(tableBuf)
      .composite([
        { input: svg(280, 48, "#FFFFFF"), left: 360, top: 0 },
        { input: svg(280, 48, "#FFFFFF"), left: 640, top: 0 },
        {
          input: svg(240, 36, "#FFFFFF", [
            { text: "Henry Schein", y: 24, size: 14, weight: 600 },
          ]),
          left: 380,
          top: 6,
        },
        {
          input: svg(220, 36, "#FFFFFF", [
            { text: "Kent Express", y: 24, size: 14, weight: 600 },
          ]),
          left: 660,
          top: 6,
        },
      ])
      .png()
      .toBuffer();

    // Compact title strip (less empty white above table)
    const leftPanel = await sharp({
      create: { width: leftW, height: mainH, channels: 3, background: "#FFFFFF" },
    })
      .composite([
        {
          input: svg(leftW, 88, "#FFFFFF", [
            { text: "Urgent order", y: 36, size: 24, weight: 700 },
            {
              text: "Created 25 Jun 2026 · 2/2 suppliers replied · 1/3 quotes selected",
              y: 64,
              size: 12,
              color: "#5B6B73",
            },
          ]),
          left: 0,
          top: 0,
        },
        {
          input: svg(
            104,
            26,
            "#E7F5EF",
            [{ text: "Responses", y: 17, size: 11, weight: 600, color: "#1F6B52", x: 14 }],
            13,
          ),
          left: 210,
          top: 18,
        },
        {
          input: await sharp(tableBuf)
            .resize({
              width: leftW - 16,
              height: mainH - 96,
              fit: "cover",
              position: "north",
            })
            .png()
            .toBuffer(),
          left: 8,
          top: 88,
        },
      ])
      .png()
      .toBuffer();

    const summarySvg = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="8" y="8" width="${rightW - 16}" height="${mainH - 16}" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="22" y="40" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
        <text x="22" y="72" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Kent Express</text>
        <text x="22" y="94" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">1 item selected</text>
        <text x="22" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
        <text x="${rightW - 88}" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£189.04</text>
        <text x="22" y="158" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
        <text x="${rightW - 88}" y="158" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£37.81</text>
        <line x1="22" y1="178" x2="${rightW - 22}" y2="178" stroke="#E2EBE7"/>
        <text x="22" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">Order total</text>
        <text x="${rightW - 100}" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">£226.85</text>
        <text x="22" y="244" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Money saved</text>
        <text x="${rightW - 82}" y="244" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">£56.00</text>
        <rect x="22" y="268" width="${rightW - 44}" height="1" fill="#E2EBE7"/>
        <text x="22" y="304" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
        <text x="22" y="334" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
        <text x="${rightW - 100}" y="334" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,447.33</text>
        <text x="22" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
        <text x="${rightW - 100}" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,220.48</text>
        <rect x="22" y="380" width="${rightW - 44}" height="10" rx="5" fill="#EAF6F1"/>
        <rect x="22" y="380" width="${Math.round((rightW - 44) * 0.5)}" height="10" rx="5" fill="#2F8F6B"/>
        <text x="22" y="414" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">50% of monthly materials budget</text>
        <rect x="22" y="440" width="${rightW - 44}" height="1" fill="#E2EBE7"/>
        <text x="22" y="476" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
        <text x="22" y="498" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · £178.82</text>
      </svg>`,
    );

    const header = svg(canvasW, headerH, "#F4F8F7", [
      { text: "RFQ · Urgent order", y: 28, size: 14, weight: 600 },
      { text: "Dental Assist", x: canvasW - 120, y: 28, size: 12, color: "#5B6B73" },
    ]);

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
    await save(await coverCanvas(composed, FEATURE_W, FEATURE_H, "#EEF5F2", "northwest"), "mkt-rfq-workflow.webp");
    await save(await coverCanvas(composed, TOUR_WIDE_W, TOUR_WIDE_H, "#EEF5F2", "northwest"), "mkt-tour-rfq.webp");
  }

  console.log("\nProportion pass complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
