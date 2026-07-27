/**
 * Premium SaaS visual polish — consistent edge-filled canvases.
 * Value-first crops so each screenshot reads before the heading.
 * Does not overwrite original sources.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const DESKTOP = path.join(process.env.USERPROFILE, "Desktop");

const BG = "#F4F8F7";
const FEATURE_W = 1440;
const FEATURE_H = 900; // 16:10
const TOUR_W = 1200;
const TOUR_H = 750; // 16:10
const TOUR_WIDE_W = 1400;
const TOUR_WIDE_H = 788; // ~16:9

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

/** Edge-fill canvas — no pale letterbox inside the asset. */
async function edgeFill(buf, w, h, position = "centre") {
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

  // ─── DASHBOARD — actions + risk + purchasing (value before KPIs) ───
  {
    const src = path.join(APP, "3. dashboard.jpg");
    const buf = await sharp(src)
      .extract({ left: 248, top: 190, width: 1600, height: 650 })
      .composite([{ input: svg(40, 40, "#D5E3DE", [], 20), left: 1548, top: 4 }])
      .png()
      .toBuffer();
    // Hero keeps slightly wider operational overview
    const hero = await sharp(src)
      .extract({ left: 248, top: 16, width: 1600, height: 830 })
      .composite([{ input: svg(42, 42, "#D5E3DE", [], 21), left: 1548, top: 4 }])
      .png()
      .toBuffer();
    await save(await edgeFill(hero, FEATURE_W, FEATURE_H, "north"), "mkt-dashboard.webp");
    await save(await edgeFill(buf, TOUR_W, TOUR_H, "north"), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY — one continuous natural screen, value = materials + status ───
  {
    const src = path.join(PUBLIC, "screen-24.png");
    let buf = await sharp(src)
      .extract({ left: 255, top: 24, width: 1580, height: 840 })
      .composite([
        { input: svg(40, 40, "#D5E3DE", [], 20), left: 1530, top: 2 },
        { input: svg(70, 26, "#FFFFFF"), left: 820, top: 428 },
        {
          input: svg(54, 20, "#FFFFFF", [
            { text: "Good", y: 15, size: 13, weight: 600, color: "#1F6B52" },
          ]),
          left: 828,
          top: 431,
        },
      ])
      .png()
      .toBuffer();
    await save(await edgeFill(buf, FEATURE_W, FEATURE_H, "west"), "mkt-stock.webp");
    const tour = await sharp(src)
      .extract({ left: 280, top: 90, width: 1400, height: 720 })
      .png()
      .toBuffer();
    await save(await edgeFill(tour, TOUR_W, TOUR_H, "northwest"), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK — urgency: cards + action ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const buf = await sharp(src)
      .extract({ left: 258, top: 20, width: 1260, height: 720 })
      .composite([{ input: svg(38, 38, "#D5E3DE", [], 19), left: 1212, top: 4 }])
      .png()
      .toBuffer();
    await save(await edgeFill(buf, FEATURE_W, FEATURE_H, "north"), "mkt-low-stock.webp");
    const tour = await sharp(src)
      .extract({ left: 262, top: 36, width: 1180, height: 640 })
      .png()
      .toBuffer();
    await save(await edgeFill(tour, TOUR_W, TOUR_H, "north"), "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY — three cards fill the frame ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const crop = await sharp(src)
      .extract({ left: 248, top: 12, width: 1000, height: 650 })
      .png()
      .toBuffer();
    await save(await edgeFill(crop, FEATURE_W, FEATURE_H, "north"), "mkt-expiring.webp");
    await save(await edgeFill(crop, TOUR_W, TOUR_H, "north"), "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS — directory + selected detail, edge-filled ───
  {
    const canvasW = 1600;
    const leftW = Math.round(canvasW * 0.62);
    const rightW = canvasW - leftW;
    const rowH = 74;
    const dirHeaderH = 60;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Practice Supplies UK", "Purchasing", "purchasing@practice.co.uk"],
    ];
    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = i * rowH;
      const selected = i === 0;
      const bg = selected ? "#EAF6F1" : "#FFFFFF";
      const bar = selected
        ? `<rect x="0" y="${y}" width="3" height="${rowH}" fill="#1F6B52"/>`
        : "";
      rows +=
        `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${bg}"/>` +
        bar +
        `<rect x="16" y="${y + 18}" width="32" height="32" rx="8" fill="#E4F2EC"/>` +
        `<text x="60" y="${y + 32}" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">${esc(n)}</text>` +
        `<text x="60" y="${y + 52}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#6B7C84">${esc(c)}</text>` +
        `<text x="380" y="${y + 42}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#2A3A42">${esc(e)}</text>` +
        `<rect x="${leftW - 96}" y="${y + 22}" width="68" height="26" rx="13" fill="#E7F5EF"/>` +
        `<text x="${leftW - 82}" y="${y + 40}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>`;
    });
    const dirBodyH = vendors.length * rowH;
    const panelH = dirHeaderH + dirBodyH;
    const dirHeader = svg(leftW, dirHeaderH, "#F7FAF9", [
      { text: "Vendors", y: 26, size: 18, weight: 700 },
      {
        text: "Linked to RFQs and purchase orders",
        y: 48,
        size: 12,
        color: "#5B6B73",
      },
    ]);
    const dirBody = Buffer.from(
      `<svg width="${leftW}" height="${dirBodyH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${rows}</svg>`,
    );
    const profile = Buffer.from(
      `<svg width="${rightW}" height="${panelH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="8" y="8" width="${rightW - 16}" height="${panelH - 16}" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="24" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">VENDORS / Kent Express</text>
        <text x="24" y="66" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Kent Express</text>
        <rect x="196" y="46" width="60" height="24" rx="12" fill="#E7F5EF"/>
        <text x="208" y="63" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#1F6B52">Active</text>
        <text x="24" y="106" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Main contact</text>
        <text x="24" y="128" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Orders desk</text>
        <text x="24" y="162" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Email</text>
        <text x="24" y="184" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
        <text x="24" y="218" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account ref</text>
        <text x="24" y="240" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">KE-48291</text>
        <rect x="24" y="262" width="${rightW - 48}" height="1" fill="#E2EBE7"/>
        <text x="24" y="292" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
        <text x="24" y="318" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">3 open RFQs · 2 purchase orders</text>
        <rect x="24" y="340" width="${rightW - 48}" height="52" rx="10" fill="#EAF6F1"/>
        <text x="38" y="372" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred for gloves and PPE · net 30</text>
      </svg>`,
    );
    const composed = await sharp({
      create: { width: canvasW, height: panelH, channels: 3, background: BG },
    })
      .composite([
        { input: dirHeader, left: 0, top: 0 },
        { input: dirBody, left: 0, top: dirHeaderH },
        { input: profile, left: leftW, top: 0 },
      ])
      .png()
      .toBuffer();
    await save(await edgeFill(composed, FEATURE_W, FEATURE_H, "north"), "mkt-suppliers.webp");
    await save(await edgeFill(composed, TOUR_W, TOUR_H, "north"), "mkt-tour-suppliers.webp");
  }

  // ─── PURCHASE ORDERS ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const pw = 1280;
    const ph = 800;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const comps = [
      { input: svg(40, 40, "#D5E3DE", [], 20), left: pw - 50, top: 4 },
      { input: svg(210, 300, "#FFFFFF"), left: 115, top: 470 },
    ];
    names.forEach((n, i) => {
      comps.push({
        input: svg(190, 34, "#FFFFFF", [{ text: n, y: 22, size: 13, weight: 600 }]),
        left: 122,
        top: 485 + i * 46,
      });
    });
    const buf = await sharp(src)
      .extract({ left: 310, top: 12, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await save(await edgeFill(buf, FEATURE_W, FEATURE_H, "north"), "mkt-purchase-orders.webp");
    await save(await edgeFill(buf, TOUR_W, TOUR_H, "north"), "mkt-tour-orders.webp");
  }

  // ─── REPORTING ───
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const m = await sharp(src).metadata();
    const buf = await sharp(src)
      .extract({
        left: 241,
        top: 36,
        width: m.width - 241 - 10,
        height: m.height - 36 - 6,
      })
      .png()
      .toBuffer();
    await save(await edgeFill(buf, FEATURE_W, FEATURE_H, "north"), "mkt-reporting.webp");
    await save(await edgeFill(buf, TOUR_WIDE_W, TOUR_WIDE_H, "north"), "mkt-tour-reporting.webp");
  }

  // ─── RFQ — comparison + impact, dense and readable ───
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const canvasW = 1680;
    const canvasH = 860;
    const headerH = 34;
    const pad = 8;
    const mainH = canvasH - headerH - pad * 2;
    const leftW = Math.round((canvasW - pad * 3) * 0.72);
    const rightW = canvasW - pad * 3 - leftW;
    const titleH = 52;

    let tableBuf = await sharp(rfqSrc)
      .extract({ left: 255, top: 300, width: 1300, height: 460 })
      .png()
      .toBuffer();
    tableBuf = await sharp(tableBuf)
      .composite([
        { input: svg(560, 40, "#FFFFFF"), left: 380, top: 0 },
        {
          input: svg(230, 30, "#FFFFFF", [
            { text: "Henry Schein", y: 20, size: 14, weight: 600 },
          ]),
          left: 420,
          top: 6,
        },
        {
          input: svg(210, 30, "#FFFFFF", [
            { text: "Kent Express", y: 20, size: 14, weight: 600 },
          ]),
          left: 700,
          top: 6,
        },
      ])
      .png()
      .toBuffer();

    const leftPanel = await sharp({
      create: { width: leftW, height: mainH, channels: 3, background: "#FFFFFF" },
    })
      .composite([
        {
          input: svg(leftW, titleH, "#FFFFFF", [
            { text: "Urgent order", y: 24, size: 18, weight: 700 },
            {
              text: "2/2 suppliers replied · 1/3 quotes selected",
              y: 44,
              size: 12,
              color: "#5B6B73",
            },
          ]),
          left: 0,
          top: 0,
        },
        {
          input: svg(
            92,
            20,
            "#E7F5EF",
            [{ text: "Responses", y: 14, size: 10, weight: 600, color: "#1F6B52", x: 10 }],
            10,
          ),
          left: 168,
          top: 10,
        },
        {
          input: await sharp(tableBuf)
            .resize({
              width: leftW - 6,
              height: mainH - titleH,
              fit: "cover",
              position: "northwest",
            })
            .png()
            .toBuffer(),
          left: 3,
          top: titleH,
        },
      ])
      .png()
      .toBuffer();

    const summary = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="4" y="4" width="${rightW - 8}" height="${mainH - 8}" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="18" y="32" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
        <text x="18" y="58" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Kent Express</text>
        <text x="18" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">1 item selected</text>
        <text x="18" y="110" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Subtotal</text>
        <text x="${rightW - 78}" y="110" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#0B1F2A">£189.04</text>
        <text x="18" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">VAT (20%)</text>
        <text x="${rightW - 78}" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#0B1F2A">£37.81</text>
        <line x1="18" y1="148" x2="${rightW - 18}" y2="148" stroke="#E2EBE7"/>
        <text x="18" y="176" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#1F6B52">Order total</text>
        <text x="${rightW - 90}" y="176" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#1F6B52">£226.85</text>
        <text x="18" y="204" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Money saved</text>
        <text x="${rightW - 70}" y="204" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">£56.00</text>
        <rect x="18" y="222" width="${rightW - 36}" height="1" fill="#E2EBE7"/>
        <text x="18" y="252" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
        <text x="18" y="278" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Budget remaining</text>
        <text x="${rightW - 90}" y="278" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#0B1F2A">£1,447.33</text>
        <text x="18" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">After this order</text>
        <text x="${rightW - 90}" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#0B1F2A">£1,220.48</text>
        <rect x="18" y="316" width="${rightW - 36}" height="9" rx="4" fill="#EAF6F1"/>
        <rect x="18" y="316" width="${Math.round((rightW - 36) * 0.5)}" height="9" rx="4" fill="#2F8F6B"/>
        <text x="18" y="346" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">50% of monthly materials budget</text>
        <rect x="18" y="364" width="${rightW - 36}" height="1" fill="#E2EBE7"/>
        <text x="18" y="396" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">Henry Schein</text>
        <text x="18" y="416" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">2 items · £178.82</text>
      </svg>`,
    );

    const header = svg(canvasW, headerH, "#F4F8F7", [
      { text: "RFQ · Urgent order", y: 22, size: 12, weight: 600 },
      { text: "Dental Assist", x: canvasW - 108, y: 22, size: 11, color: "#5B6B73" },
    ]);

    const composed = await sharp({
      create: { width: canvasW, height: canvasH, channels: 3, background: BG },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        { input: leftPanel, left: pad, top: headerH + pad },
        { input: summary, left: pad + leftW + pad, top: headerH + pad },
      ])
      .png()
      .toBuffer();

    await save(await edgeFill(composed, FEATURE_W, FEATURE_H, "north"), "mkt-rfq-workflow.webp");
    await save(await sharp(composed).webp({ quality: 88 }).toBuffer(), "mkt-rfq-workflow-full.webp");
    await save(await edgeFill(composed, TOUR_WIDE_W, TOUR_WIDE_H, "north"), "mkt-tour-rfq.webp");
  }

  console.log("\nPremium polish assets ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
