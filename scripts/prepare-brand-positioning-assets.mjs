/**
 * Brand positioning visual rebuild — prepare homepage marketing assets.
 * Does not overwrite original source files.
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

async function fit(buf, w, h, bg = "#EEF5F2") {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "contain", background: bg })
    .webp({ quality: 86, effort: 5 })
    .toBuffer();
}

async function save(buf, name) {
  await fs.writeFile(path.join(OUT, name), buf);
  const m = await sharp(path.join(OUT, name)).metadata();
  console.log(`✓ ${name}  ${m.width}×${m.height}`);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  // ─── HERO DASHBOARD ───
  // Focus on Actions + low stock + expiry + purchasing (not KPI strip alone)
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
    await save(await fit(buf, 1520, 960), "mkt-dashboard.webp");
    await save(await fit(buf, TOUR_W, TOUR_H), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY ───
  // Rebuild as coherent list (~65%) + detail panel (~35%) from screen-24
  // (detail panel already ~35–40% of content width — better proportions than screen-22)
  {
    const src = path.join(PUBLIC, "screen-24.png");
    const left = 248;
    const top = 28;
    const width = 1580;
    const height = 830;
    let buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([
        { input: svg(44, 44, "#D5E3DE", [], 22), left: width - 54, top: 2 },
        // Soften Grade: Bad → Good
        {
          input: svg(90, 24, "#FFFFFF", [
            { text: "Good", y: 17, size: 13, weight: 600, color: "#1F6B52" },
          ]),
          left: 1180,
          top: 248,
        },
      ])
      .png()
      .toBuffer();

    // Also build explicit 65/35 composite from list + detail for cleaner marketing frame
    const listW = 980;
    const detailW = 520;
    const panelH = 820;
    const listBuf = await sharp(src)
      .extract({ left: 248, top: 28, width: 700, height: 830 })
      .resize({ width: listW, height: panelH, fit: "cover", position: "left top" })
      .png()
      .toBuffer();
    const detailBuf = await sharp(src)
      .extract({ left: 980, top: 48, width: 780, height: 800 })
      .resize({ width: detailW, height: panelH, fit: "cover", position: "left top" })
      .composite([
        {
          input: svg(90, 24, "#FFFFFF", [
            { text: "Good", y: 17, size: 13, weight: 600, color: "#1F6B52" },
          ]),
          left: 280,
          top: 210,
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
    void buf;
  }

  // ─── LOW STOCK — restore stronger card view ───
  // Prefer app image with linked RFQ activity (2. low stock page.jpg)
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const left = 258;
    const top = 16;
    // ~4 cards across; include enough of second row
    const width = 1260;
    const height = 720;
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([{ input: svg(44, 44, "#D5E3DE", [], 22), left: width - 54, top: 6 }])
      .png()
      .toBuffer();
    await save(await fit(buf, FEATURE_W, FEATURE_H), "mkt-low-stock.webp");
    await save(await fit(buf, TOUR_W, TOUR_H), "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY — three complete cards, scaled down ~12%, centred ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const left = 248;
    const top = 14;
    const width = 1000;
    const height = 640;
    const crop = await sharp(src).extract({ left, top, width, height }).png().toBuffer();
    const inner = await sharp(crop)
      .resize({ width: Math.round(FEATURE_W * 0.84), withoutEnlargement: true })
      .png()
      .toBuffer();
    const padded = await sharp({
      create: { width: FEATURE_W, height: FEATURE_H, channels: 3, background: "#EEF5F2" },
    })
      .composite([{ input: inner, gravity: "centre" }])
      .webp({ quality: 86 })
      .toBuffer();
    await save(padded, "mkt-expiring.webp");
    await save(await fit(crop, TOUR_W, TOUR_H), "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS — directory + selected profile as one screen ───
  {
    const dirSrc = path.join(DESKTOP, "3. suplyer management.jpg");
    const profileSrc = path.join(DESKTOP, "3.1 supplier managemtn.jpg");

    const canvasW = 1440;
    const canvasH = 820;
    const leftW = Math.round(canvasW * 0.62);
    const rightW = canvasW - leftW;

    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Practice Supplies UK", "Purchasing", "purchasing@practice.co.uk"],
      ["SmileSource Supplies", "Accounts", "accounts@smilesource.co.uk"],
      ["TOC Dental", "Orders", "orders@tocdental.co.uk"],
    ];

    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = 4 + i * 70;
      const selected = i === 0;
      rows += `
        <rect x="0" y="${y}" width="100%" height="66" fill="${selected ? "#EAF6F1" : "#FFFFFF"}"/>
        ${selected ? `<rect x="0" y="${y}" width="3" height="66" fill="#1F6B52"/>` : ""}
        <rect x="18" y="${y + 16}" width="32" height="32" rx="8" fill="#E4F2EC"/>
        <text x="62" y="${y + 30}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
        <text x="62" y="${y + 48}" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#6B7C84">${esc(c)}</text>
        <text x="360" y="${y + 38}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#2A3A42">${esc(e)}</text>
        <rect x="${leftW - 100}" y="${y + 20}" width="64" height="26" rx="13" fill="#E7F5EF"/>
        <text x="${leftW - 88}" y="${y + 38}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>
      `;
    });

    const dirHeaderH = 88;
    const dirBody = Buffer.from(
      `<svg width="${leftW}" height="${canvasH - dirHeaderH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${rows}</svg>`,
    );
    const dirHeader = svg(
      leftW,
      dirHeaderH,
      "#F7FAF9",
      [
        { text: "Vendors", y: 36, size: 20, weight: 700 },
        { text: "7 active suppliers · linked to RFQs and orders", y: 60, size: 12, color: "#5B6B73" },
      ],
      0,
    );

    // Profile panel: use real chrome from 3.1, rewrite as Kent Express
    const profileChrome = await sharp(profileSrc)
      .extract({ left: 250, top: 14, width: 1100, height: 780 })
      .resize({ width: rightW - 24, height: canvasH - 24, fit: "cover", position: "left top" })
      .png()
      .toBuffer();

    const profileOverlay = Buffer.from(
      `<svg width="${rightW - 24}" height="${canvasH - 24}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="100%" height="72" fill="#F4F8F7"/>
        <text x="20" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VENDORS / Kent Express</text>
        <text x="20" y="58" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Kent Express</text>
        <rect x="168" y="40" width="58" height="24" rx="12" fill="#E7F5EF"/>
        <text x="178" y="57" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#1F6B52">Active</text>
        <rect x="20" y="88" width="${rightW - 64}" height="210" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="36" y="120" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Main contact</text>
        <text x="36" y="142" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Orders desk</text>
        <text x="36" y="176" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Email</text>
        <text x="36" y="198" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
        <text x="36" y="232" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Website</text>
        <text x="36" y="254" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">www.kentexpress.co.uk</text>
        <text x="280" y="120" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account ref</text>
        <text x="280" y="142" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">KE-48291</text>
        <rect x="20" y="316" width="${rightW - 64}" height="120" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="36" y="348" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
        <text x="36" y="378" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">3 open RFQs · 2 purchase orders</text>
        <text x="36" y="404" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Categories: Infection Control, Consumables</text>
        <rect x="20" y="454" width="${rightW - 64}" height="70" rx="14" fill="#EAF6F1"/>
        <text x="36" y="484" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred supplier for gloves and PPE.</text>
        <text x="36" y="506" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account status: Active · net 30</text>
      </svg>`,
    );

    // Prefer clean constructed panel over mismatched real chrome paste
    void profileChrome;
    void dirSrc;

    const composed = await sharp({
      create: { width: canvasW, height: canvasH, channels: 3, background: "#EEF5F2" },
    })
      .composite([
        { input: dirHeader, left: 0, top: 0 },
        { input: dirBody, left: 0, top: dirHeaderH },
        {
          input: await sharp({
            create: {
              width: rightW,
              height: canvasH,
              channels: 3,
              background: "#F4F8F7",
            },
          })
            .composite([{ input: profileOverlay, left: 12, top: 12 }])
            .png()
            .toBuffer(),
          left: leftW,
          top: 0,
        },
      ])
      .png()
      .toBuffer();

    await save(await fit(composed, FEATURE_W, FEATURE_H), "mkt-suppliers.webp");
    await save(await fit(composed, TOUR_W, TOUR_H), "mkt-tour-suppliers.webp");
  }

  // ─── PURCHASE ORDERS — enlarge meaningful centre, ~5 columns ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const cropLeft = 300;
    const cropTop = 12;
    const m = await sharp(src).metadata();
    const pw = Math.min(1350, m.width - cropLeft - 16);
    const ph = m.height - cropTop - 6;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const comps = [
      { input: svg(44, 44, "#D5E3DE", [], 22), left: pw - 54, top: 4 },
      { input: svg(180, 210, "#FFFFFF", []), left: 150, top: 520 },
    ];
    names.forEach((n, i) => {
      comps.push({
        input: svg(175, 36, "#FFFFFF", [{ text: n, y: 22, size: 13, weight: 600 }]),
        left: 150,
        top: 528 + i * 40,
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

  // ─── REPORTING ───
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const left = 241;
    const top = 14;
    const m = await sharp(src).metadata();
    const buf = await sharp(src)
      .extract({ left, top, width: m.width - left - 12, height: m.height - top - 8 })
      .png()
      .toBuffer();
    await save(await fit(buf, FEATURE_W, FEATURE_H), "mkt-reporting.webp");
    await save(await fit(buf, TOUR_WIDE_W, TOUR_WIDE_H), "mkt-tour-reporting.webp");
  }

  // ─── RFQ — unified ~70/30 comparison + order summary ───
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const canvasW = 1600;
    const canvasH = 900;
    const headerH = 48;
    const pad = 16;
    const mainH = canvasH - headerH - pad * 2;
    const leftW = Math.round((canvasW - pad * 3) * 0.7);
    const rightW = canvasW - pad * 3 - leftW;

    const leftPatches = [
      { input: svg(44, 44, "#D5E3DE", [], 22), left: 1100, top: 4 },
      {
        input: svg(380, 44, "#FFFFFF", [
          { text: "Urgent order", y: 30, size: 24, weight: 700 },
        ]),
        left: 24,
        top: 132,
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
        top: 138,
      },
      {
        input: svg(900, 32, "#FFFFFF", [
          {
            text: "Created 25 Jun 2026 · 2/2 suppliers replied · 1/3 quotes selected",
            y: 20,
            size: 12,
            color: "#5B6B73",
          },
        ]),
        left: 24,
        top: 178,
      },
      {
        input: svg(250, 34, "#FFFFFF", [
          { text: "Henry Schein", y: 22, size: 13, weight: 600 },
        ]),
        left: 400,
        top: 292,
      },
      {
        input: svg(210, 34, "#FFFFFF", [
          { text: "Kent Express", y: 22, size: 13, weight: 600 },
        ]),
        left: 680,
        top: 292,
      },
    ];

    const leftBuf = await sharp(rfqSrc)
      .extract({ left: 255, top: 18, width: 1180, height: 620 })
      .composite(leftPatches)
      .resize({ width: leftW, height: mainH, fit: "cover", position: "left top" })
      .png()
      .toBuffer();

    const summarySvg = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="0" y="0" width="100%" height="100%" fill="#F4F8F7"/>
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
        <text x="28" y="580" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Compare responses before the practice commits.</text>
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
        { input: leftBuf, left: pad, top: headerH + pad },
        { input: summarySvg, left: pad + leftW + pad, top: headerH + pad },
      ])
      .webp({ quality: 86 })
      .toBuffer();

    await save(composed, "mkt-rfq-workflow-full.webp");
    await save(await fit(composed, FEATURE_W, FEATURE_H), "mkt-rfq-workflow.webp");
    await save(await fit(composed, TOUR_WIDE_W, TOUR_WIDE_H), "mkt-tour-rfq.webp");
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
