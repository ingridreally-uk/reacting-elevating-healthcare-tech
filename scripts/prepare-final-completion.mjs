/**
 * Final completion — edge-safe crops at exact frame aspect (no accidental zoom-crop).
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
const TWW = 1400;
const TWH = 788;

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

/** Scale source to cover target without letterboxing. */
async function cover(buf, w, h, position = "north") {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "cover", position })
    .webp({ quality: 88, effort: 5 })
    .toBuffer();
}

/**
 * Place content into exact canvas. Prefer slight uniform scale-up (cover)
 * only when source aspect is close; otherwise pad with matched BG.
 */
async function toFrame(buf, w, h, { prefer = "cover", position = "north" } = {}) {
  const m = await sharp(buf).metadata();
  const srcA = m.width / m.height;
  const dstA = w / h;
  const ratioDiff = Math.abs(srcA - dstA) / dstA;

  if (prefer === "contain" || ratioDiff >= 0.18) {
    // Matched BG contain — no clipping of meaningful UI
    return sharp(buf)
      .resize({ width: w, height: h, fit: "contain", background: BG })
      .webp({ quality: 88, effort: 5 })
      .toBuffer();
  }

  return cover(buf, w, h, position);
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

  // ─── HERO DASHBOARD — full KPIs, no side clipping ───
  {
    const src = path.join(APP, "3. dashboard.jpg");
    const m = await sharp(src).metadata();
    const left = 248;
    const top = 12;
    const width = m.width - left - 6;
    const height = m.height - top - 4;
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([{ input: svg(42, 42, "#D5E3DE", [], 21), left: width - 52, top: 4 }])
      .png()
      .toBuffer();
    // Keep natural proportions in a 16:10 frame (contain) so KPIs never clip
    await save(await toFrame(buf, 1600, 1000, { prefer: "contain" }), "mkt-dashboard.webp");
    const tour = await sharp(src)
      .extract({ left: 248, top: 170, width: Math.min(1580, width), height: 640 })
      .png()
      .toBuffer();
    await save(await toFrame(tour, TW, TH, { prefer: "cover", position: "north" }), "mkt-tour-dashboard.webp");
  }

  // ─── INVENTORY — continuous screen-24, redact avatar only ───
  {
    const src = path.join(PUBLIC, "screen-24.png");
    const buf = await sharp(src)
      .extract({ left: 248, top: 18, width: 1600, height: 850 })
      .composite([{ input: svg(40, 40, "#D5E3DE", [], 20), left: 1548, top: 2 }])
      .png()
      .toBuffer();
    await save(await toFrame(buf, FW, FH, { prefer: "cover", position: "west" }), "mkt-stock.webp");
    const tour = await sharp(src)
      .extract({ left: 270, top: 80, width: 1400, height: 720 })
      .png()
      .toBuffer();
    await save(await toFrame(tour, TW, TH, { prefer: "cover", position: "northwest" }), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK — card UI, 118 items ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const buf = await sharp(src)
      .extract({ left: 252, top: 14, width: 1280, height: 740 })
      .composite([{ input: svg(38, 38, "#D5E3DE", [], 19), left: 1232, top: 4 }])
      .png()
      .toBuffer();
    await save(await toFrame(buf, FW, FH, { prefer: "cover", position: "north" }), "mkt-low-stock.webp");
    const tour = await sharp(src)
      .extract({ left: 258, top: 30, width: 1200, height: 660 })
      .png()
      .toBuffer();
    await save(await toFrame(tour, TW, TH, { prefer: "cover", position: "north" }), "mkt-tour-low-stock.webp");
  }

  // ─── EXPIRY — three complete cards ───
  {
    const src = path.join(APP, "4. expiry stock.jpg");
    const crop = await sharp(src)
      .extract({ left: 244, top: 10, width: 1020, height: 670 })
      .png()
      .toBuffer();
    await save(await toFrame(crop, FW, FH, { prefer: "cover", position: "north" }), "mkt-expiring.webp");
    await save(await toFrame(crop, TW, TH, { prefer: "cover", position: "north" }), "mkt-tour-expiring.webp");
  }

  // ─── SUPPLIERS — compose at exact frame size (no zoom-crop) ───
  {
    const leftW = 860;
    const rightW = 520;
    const canvasW = leftW + rightW;
    const canvasH = 900;
    const headerH = 56;
    const rowH = 78;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Practice Supplies UK", "Purchasing", "purchasing@practice.co.uk"],
      ["Wright Cottrell", "Accounts", "accounts@wrightcottrell.co.uk"],
      ["DDS Dental", "Orders", "orders@ddsdental.co.uk"],
      ["Med-Dent UK", "Support", "support@meddent.co.uk"],
    ];

    let rows = "";
    vendors.forEach(([n, c, e], i) => {
      const y = i * rowH;
      const selected = i === 0;
      const bg = selected ? "#EAF6F1" : i % 2 === 0 ? "#FFFFFF" : "#FAFCFB";
      const bar = selected
        ? `<rect x="0" y="${y}" width="3" height="${rowH}" fill="#1F6B52"/>`
        : "";
      rows +=
        `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${bg}"/>` +
        bar +
        `<rect x="18" y="${y + 20}" width="32" height="32" rx="8" fill="#E4F2EC"/>` +
        `<text x="64" y="${y + 34}" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">${esc(n)}</text>` +
        `<text x="64" y="${y + 54}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#6B7C84">${esc(c)}</text>` +
        `<text x="390" y="${y + 44}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#2A3A42">${esc(e)}</text>` +
        `<rect x="${leftW - 100}" y="${y + 24}" width="68" height="26" rx="13" fill="#E7F5EF"/>` +
        `<text x="${leftW - 86}" y="${y + 42}" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>`;
    });

    const bodyH = canvasH - headerH;
    const dirHeader = svg(leftW, headerH, "#F7FAF9", [
      { text: "Vendors", y: 24, size: 18, weight: 700 },
      { text: "Directory linked to RFQs and purchase orders", y: 46, size: 12, color: "#5B6B73" },
    ]);
    const dirBody = Buffer.from(
      `<svg width="${leftW}" height="${bodyH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${rows}</svg>`,
    );
    const profile = Buffer.from(
      `<svg width="${rightW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#EEF5F2"/>
        <rect x="12" y="12" width="${rightW - 24}" height="${canvasH - 24}" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="28" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">VENDORS / Kent Express</text>
        <text x="28" y="82" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Kent Express</text>
        <rect x="210" y="60" width="64" height="26" rx="13" fill="#E7F5EF"/>
        <text x="222" y="78" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>
        <text x="28" y="130" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Main contact</text>
        <text x="28" y="154" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
        <text x="28" y="198" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Email</text>
        <text x="28" y="222" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
        <text x="28" y="266" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account ref</text>
        <text x="28" y="290" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
        <text x="28" y="334" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Phone</text>
        <text x="28" y="358" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">01634 878 787</text>
        <rect x="28" y="388" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
        <text x="28" y="426" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
        <text x="28" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">3 open RFQs</text>
        <text x="28" y="480" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">2 purchase orders this month</text>
        <rect x="28" y="510" width="${rightW - 56}" height="72" rx="12" fill="#EAF6F1"/>
        <text x="40" y="542" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred for gloves and PPE</text>
        <text x="40" y="564" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Payment terms · net 30</text>
        <rect x="28" y="610" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
        <text x="28" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">CATEGORIES</text>
        <text x="28" y="678" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">PPE · Gloves · Consumables</text>
      </svg>`,
    );

    const composed = await sharp({
      create: { width: canvasW, height: canvasH, channels: 3, background: BG },
    })
      .composite([
        { input: dirHeader, left: 0, top: 0 },
        { input: dirBody, left: 0, top: headerH },
        { input: profile, left: leftW, top: 0 },
      ])
      .png()
      .toBuffer();

    await save(await toFrame(composed, FW, FH, { prefer: "cover", position: "north" }), "mkt-suppliers.webp");
    await save(await toFrame(composed, TW, TH, { prefer: "cover", position: "north" }), "mkt-tour-suppliers.webp");
  }

  // ─── PURCHASE ORDERS ───
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const pw = 1300;
    const ph = 820;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
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
      .extract({ left: 290, top: 10, width: pw, height: ph })
      .composite(comps)
      .png()
      .toBuffer();
    await save(await toFrame(buf, FW, FH, { prefer: "cover", position: "north" }), "mkt-purchase-orders.webp");
    await save(await toFrame(buf, TW, TH, { prefer: "cover", position: "north" }), "mkt-tour-orders.webp");
  }

  // ─── REPORTING — keep left totals + title ───
  {
    const src = path.join(DESKTOP, "4.4reporting.jpg");
    const m = await sharp(src).metadata();
    // Sidebar ~236–245; take from just after sidebar so title isn't cut
    const buf = await sharp(src)
      .extract({
        left: 236,
        top: 8,
        width: m.width - 236 - 8,
        height: m.height - 8 - 4,
      })
      .png()
      .toBuffer();
    await save(await toFrame(buf, FW, FH, { prefer: "cover", position: "northwest" }), "mkt-reporting.webp");
    await save(await toFrame(buf, TWW, TWH, { prefer: "cover", position: "northwest" }), "mkt-tour-reporting.webp");
  }

  // ─── RFQ — full SVG composition at exact frame (ProductFrame supplies chrome) ───
  {
    const W = FW;
    const H = FH;
    const pad = 16;
    const leftW = Math.round((W - pad * 3) * 0.68);
    const rightW = W - pad * 3 - leftW;
    const mainTop = pad;
    const mainH = H - pad * 2;

    const products = [
      {
        name: "ProTaper Hand File 25mm S1 6pk",
        mfr: "Maillefer / Dentsply",
        a: "42.55",
        b: "46.55",
        pick: "a",
      },
      {
        name: "Sterile Safeskin Purple Nitrile Gloves S",
        mfr: "Kimberly Clark",
        a: "7.99",
        b: "8.99",
        pick: "a",
      },
      {
        name: "Venus Diamond Composite Syringe 4g A4",
        mfr: "Kulzer",
        a: "57.26",
        b: "47.26",
        pick: "b",
        saved: "40.00",
      },
    ];

    let productRows = "";
    products.forEach((p, i) => {
      const y = 118 + i * 118;
      const aBg = p.pick === "a" ? "#E7F5EF" : "#FFF4EB";
      const bBg = p.pick === "b" ? "#E7F5EF" : "#FFF4EB";
      const aMark = p.pick === "a" ? "✓" : "+";
      const bMark = p.pick === "b" ? "✓" : "+";
      const saved =
        p.saved
          ? `<rect x="${leftW - 210}" y="${y + 70}" width="88" height="22" rx="11" fill="#E7F5EF"/><text x="${leftW - 200}" y="${y + 85}" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#1F6B52">Saved &#163;${p.saved}</text>`
          : "";
      productRows += `
        <rect x="16" y="${y}" width="${leftW - 32}" height="108" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="32" y="${y + 28}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${esc(p.name)}</text>
        <text x="32" y="${y + 50}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">${esc(p.mfr)}</text>
        <rect x="${leftW * 0.42}" y="${y + 28}" width="120" height="40" rx="10" fill="${aBg}"/>
        <text x="${leftW * 0.42 + 16}" y="${y + 54}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${aMark} &#163;${p.a}</text>
        <rect x="${leftW * 0.42 + 140}" y="${y + 28}" width="120" height="40" rx="10" fill="${bBg}"/>
        <text x="${leftW * 0.42 + 156}" y="${y + 54}" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">${bMark} &#163;${p.b}</text>
        <text x="${leftW - 70}" y="${y + 54}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Qty 1</text>
        ${saved}
      `;
    });

    const leftPanel = Buffer.from(
      `<svg width="${leftW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="20" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#0B1F2A">Urgent order</text>
        <rect x="178" y="18" width="96" height="24" rx="12" fill="#E7F5EF"/>
        <text x="190" y="35" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Responses</text>
        <text x="20" y="62" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2/2 suppliers replied · 1/3 quotes selected</text>
        <text x="20" y="96" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#5B6B73">Product</text>
        <text x="${leftW * 0.42 + 16}" y="96" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#5B6B73">Henry Schein</text>
        <text x="${leftW * 0.42 + 156}" y="96" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#5B6B73">Kent Express</text>
        ${productRows}
      </svg>`,
    );

    const summary = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="20" y="36" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
        <text x="20" y="68" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">Kent Express</text>
        <text x="20" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">1 item selected</text>
        <text x="20" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
        <text x="${rightW - 92}" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;189.04</text>
        <text x="20" y="160" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
        <text x="${rightW - 84}" y="160" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;37.81</text>
        <line x1="20" y1="180" x2="${rightW - 20}" y2="180" stroke="#E2EBE7"/>
        <text x="20" y="214" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">Order total</text>
        <text x="${rightW - 100}" y="214" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">&#163;226.85</text>
        <text x="20" y="246" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Money saved</text>
        <text x="${rightW - 80}" y="246" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">&#163;56.00</text>
        <rect x="20" y="268" width="${rightW - 40}" height="1" fill="#E2EBE7"/>
        <text x="20" y="306" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
        <text x="20" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
        <text x="${rightW - 100}" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,447.33</text>
        <text x="20" y="368" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
        <text x="${rightW - 100}" y="368" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">&#163;1,220.48</text>
        <rect x="20" y="390" width="${rightW - 40}" height="10" rx="5" fill="#EAF6F1"/>
        <rect x="20" y="390" width="${Math.round((rightW - 40) * 0.5)}" height="10" rx="5" fill="#2F8F6B"/>
        <text x="20" y="426" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">50% of monthly materials budget</text>
        <rect x="20" y="450" width="${rightW - 40}" height="1" fill="#E2EBE7"/>
        <text x="20" y="490" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
        <text x="20" y="514" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · &#163;178.82</text>
      </svg>`,
    );

    const composed = await sharp({
      create: { width: W, height: H, channels: 3, background: BG },
    })
      .composite([
        { input: leftPanel, left: pad, top: mainTop },
        { input: summary, left: pad + leftW + pad, top: mainTop },
      ])
      .png()
      .toBuffer();

    await save(await sharp(composed).webp({ quality: 88, effort: 5 }).toBuffer(), "mkt-rfq-workflow.webp");
    await save(await sharp(composed).webp({ quality: 88, effort: 5 }).toBuffer(), "mkt-rfq-workflow-full.webp");
    await save(await toFrame(composed, TWW, TWH, { prefer: "cover", position: "north" }), "mkt-tour-rfq.webp");
  }

  console.log("\nFinal completion assets ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
