/**
 * Final inventory + RFQ + suppliers visual polish for proportion pass.
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

function svg(w, h, color, lines = [], rx = 0) {
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

async function main() {
  // ─── INVENTORY: one seamless workspace (65% list / 35% detail) ───
  {
    const src = path.join(PUBLIC, "screen-24.png");
    const canvasW = 1500;
    const canvasH = 860;
    const headerH = 56;
    const bodyH = canvasH - headerH;
    const listW = Math.round(canvasW * 0.65);
    const detailW = canvasW - listW;

    // List: stock header area + product cards only (stop before modal)
    const listBuf = await sharp(src)
      .extract({ left: 248, top: 24, width: 620, height: 820 })
      .resize({ width: listW, height: bodyH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    // Detail: selected item panel content, scaled to 35%
    let detailBuf = await sharp(src)
      .extract({ left: 920, top: 48, width: 820, height: 800 })
      .resize({ width: detailW, height: bodyH, fit: "cover", position: "northwest" })
      .png()
      .toBuffer();

    // Redact Grade Bad
    const { data, info } = await sharp(detailBuf)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const reds = [];
    for (let y = 80; y < Math.min(400, info.height); y++) {
      for (let x = 0; x < Math.floor(info.width * 0.55); x++) {
        const i = (y * info.width + x) * 4;
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2];
        if (r > 150 && g < 100 && b < 100 && r - g > 55) reds.push([x, y]);
      }
    }
    if (reds.length) {
      const xs = reds.map((p) => p[0]);
      const ys = reds.map((p) => p[1]);
      const x0 = Math.max(0, Math.min(...xs) - 6);
      const y0 = Math.max(0, Math.min(...ys) - 4);
      const pw = Math.min(info.width - x0, Math.max(...xs) - Math.min(...xs) + 50);
      const ph = Math.min(40, Math.max(...ys) - Math.min(...ys) + 18);
      detailBuf = await sharp(detailBuf)
        .composite([
          { input: svg(pw, ph, "#FFFFFF"), left: x0, top: y0 },
          {
            input: svg(56, 20, "#FFFFFF", [
              { text: "Good", y: 15, size: 13, weight: 600, color: "#1F6B52" },
            ]),
            left: x0 + 2,
            top: y0 + 2,
          },
        ])
        .png()
        .toBuffer();
    }

    // Shared continuous header + pale-green body (no seam gap)
    const header = svg(canvasW, headerH, "#F4F8F7", [
      { text: "Stock", y: 36, size: 20, weight: 700 },
      {
        text: "Root Canal · materials, quantities and stock status",
        x: 82,
        y: 34,
        size: 12,
        color: "#5B6B73",
      },
    ]);

    // Soft divider that matches app borders rather than a hard paste seam
    const divider = svg(2, bodyH, "#E2EBE7");

    const composed = await sharp({
      create: { width: canvasW, height: canvasH, channels: 3, background: "#EEF5F2" },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        { input: listBuf, left: 0, top: headerH },
        { input: detailBuf, left: listW, top: headerH },
        { input: divider, left: listW - 1, top: headerH },
      ])
      .png()
      .toBuffer();

    await save(
      await sharp(composed)
        .resize({ width: FEATURE_W, height: FEATURE_H, fit: "cover", position: "centre" })
        .webp({ quality: 86 })
        .toBuffer(),
      "mkt-stock.webp",
    );
    await save(
      await sharp(composed)
        .resize({ width: TOUR_W, height: TOUR_H, fit: "cover", position: "northwest" })
        .webp({ quality: 86 })
        .toBuffer(),
      "mkt-tour-stock.webp",
    );
  }

  // ─── SUPPLIERS: tighter crop, detail ~38%, less bottom blank ───
  {
    const canvasW = 1600;
    const leftW = Math.round(canvasW * 0.62);
    const rightW = canvasW - leftW;
    const rowH = 76;
    const dirHeaderH = 64;
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
        ? `<rect x="0" y="${y}" width="4" height="${rowH}" fill="#1F6B52"/>`
        : "";
      rows +=
        `<rect x="0" y="${y}" width="100%" height="${rowH}" fill="${bg}"/>` +
        bar +
        `<rect x="18" y="${y + 18}" width="34" height="34" rx="8" fill="#E4F2EC"/>` +
        `<text x="64" y="${y + 34}" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">${esc(n)}</text>` +
        `<text x="64" y="${y + 54}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#6B7C84">${esc(c)}</text>` +
        `<text x="390" y="${y + 44}" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#2A3A42">${esc(e)}</text>` +
        `<rect x="${leftW - 100}" y="${y + 22}" width="72" height="28" rx="14" fill="#E7F5EF"/>` +
        `<text x="${leftW - 86}" y="${y + 41}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Active</text>`;
    });
    const dirBodyH = vendors.length * rowH;
    const panelH = dirHeaderH + dirBodyH;
    const dirHeader = svg(leftW, dirHeaderH, "#F7FAF9", [
      { text: "Vendors", y: 28, size: 20, weight: 700 },
      {
        text: "5 active suppliers · linked to RFQs and orders",
        y: 50,
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
        <rect x="10" y="10" width="${rightW - 20}" height="${panelH - 20}" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="26" y="40" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#5B6B73">VENDORS / Kent Express</text>
        <text x="26" y="72" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="700" fill="#0B1F2A">Kent Express</text>
        <rect x="200" y="50" width="64" height="26" rx="13" fill="#E7F5EF"/>
        <text x="212" y="68" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>
        <text x="26" y="114" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Main contact</text>
        <text x="26" y="136" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
        <text x="26" y="172" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Email</text>
        <text x="26" y="194" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">orders@kentexpress.co.uk</text>
        <text x="26" y="230" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Account ref</text>
        <text x="26" y="252" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
        <text x="26" y="288" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Website</text>
        <text x="26" y="310" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">www.kentexpress.co.uk</text>
        <rect x="26" y="332" width="${rightW - 56}" height="1" fill="#E2EBE7"/>
        <text x="26" y="364" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
        <text x="26" y="392" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">3 open RFQs · 2 purchase orders</text>
        <text x="26" y="416" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Infection Control, Consumables</text>
        <rect x="26" y="436" width="${rightW - 56}" height="56" rx="10" fill="#EAF6F1"/>
        <text x="40" y="460" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">Preferred supplier for gloves and PPE.</text>
        <text x="40" y="480" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">Active · net 30</text>
      </svg>`,
    );
    const composed = await sharp({
      create: { width: canvasW, height: panelH, channels: 3, background: "#EEF5F2" },
    })
      .composite([
        { input: dirHeader, left: 0, top: 0 },
        { input: dirBody, left: 0, top: dirHeaderH },
        { input: profile, left: leftW, top: 0 },
      ])
      .png()
      .toBuffer();

    await save(
      await sharp(composed)
        .resize({ width: FEATURE_W, height: FEATURE_H, fit: "cover", position: "north" })
        .webp({ quality: 86 })
        .toBuffer(),
      "mkt-suppliers.webp",
    );
    await save(
      await sharp(composed)
        .resize({ width: TOUR_W, height: TOUR_H, fit: "cover", position: "north" })
        .webp({ quality: 86 })
        .toBuffer(),
      "mkt-tour-suppliers.webp",
    );
  }

  // ─── RFQ: compact title, full products, filled summary, contain-to-cover ───
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const canvasW = 1680;
    const canvasH = 860;
    const headerH = 36;
    const pad = 8;
    const mainH = canvasH - headerH - pad * 2;
    const leftW = Math.round((canvasW - pad * 3) * 0.72);
    const rightW = canvasW - pad * 3 - leftW;
    const titleH = 56;

    let tableBuf = await sharp(rfqSrc)
      .extract({ left: 255, top: 305, width: 1300, height: 450 })
      .png()
      .toBuffer();

    // Cover original supplier headers and rewrite both columns cleanly
    tableBuf = await sharp(tableBuf)
      .composite([
        { input: svg(560, 42, "#FFFFFF"), left: 380, top: 0 },
        {
          input: svg(240, 32, "#FFFFFF", [
            { text: "Henry Schein", y: 22, size: 14, weight: 600 },
          ]),
          left: 420,
          top: 6,
        },
        {
          input: svg(220, 32, "#FFFFFF", [
            { text: "Kent Express", y: 22, size: 14, weight: 600 },
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
            { text: "Urgent order", y: 26, size: 20, weight: 700 },
            {
              text: "2/2 suppliers replied · 1/3 quotes selected",
              y: 46,
              size: 12,
              color: "#5B6B73",
            },
          ]),
          left: 0,
          top: 0,
        },
        {
          input: svg(
            96,
            22,
            "#E7F5EF",
            [{ text: "Responses", y: 15, size: 11, weight: 600, color: "#1F6B52", x: 12 }],
            11,
          ),
          left: 175,
          top: 10,
        },
        {
          input: await sharp(tableBuf)
            .resize({
              width: leftW - 8,
              height: mainH - titleH,
              fit: "cover",
              position: "northwest",
            })
            .png()
            .toBuffer(),
          left: 4,
          top: titleH,
        },
      ])
      .png()
      .toBuffer();

    const summary = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="4" y="4" width="${rightW - 8}" height="${mainH - 8}" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="18" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
        <text x="18" y="62" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Kent Express</text>
        <text x="18" y="82" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">1 item selected</text>
        <text x="18" y="118" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
        <text x="${rightW - 80}" y="118" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£189.04</text>
        <text x="18" y="142" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
        <text x="${rightW - 80}" y="142" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£37.81</text>
        <line x1="18" y1="160" x2="${rightW - 18}" y2="160" stroke="#E2EBE7"/>
        <text x="18" y="190" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">Order total</text>
        <text x="${rightW - 92}" y="190" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">£226.85</text>
        <text x="18" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Money saved</text>
        <text x="${rightW - 74}" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">£56.00</text>
        <rect x="18" y="240" width="${rightW - 36}" height="1" fill="#E2EBE7"/>
        <text x="18" y="274" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
        <text x="18" y="302" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
        <text x="${rightW - 92}" y="302" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,447.33</text>
        <text x="18" y="326" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
        <text x="${rightW - 92}" y="326" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,220.48</text>
        <rect x="18" y="344" width="${rightW - 36}" height="10" rx="5" fill="#EAF6F1"/>
        <rect x="18" y="344" width="${Math.round((rightW - 36) * 0.5)}" height="10" rx="5" fill="#2F8F6B"/>
        <text x="18" y="376" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">50% of monthly materials budget</text>
        <rect x="18" y="396" width="${rightW - 36}" height="1" fill="#E2EBE7"/>
        <text x="18" y="430" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
        <text x="18" y="452" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · £178.82</text>
      </svg>`,
    );

    const header = svg(canvasW, headerH, "#F4F8F7", [
      { text: "RFQ · Urgent order", y: 24, size: 13, weight: 600 },
      { text: "Dental Assist", x: canvasW - 110, y: 24, size: 11, color: "#5B6B73" },
    ]);

    const composed = await sharp({
      create: { width: canvasW, height: canvasH, channels: 3, background: "#EEF5F2" },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        { input: leftPanel, left: pad, top: headerH + pad },
        { input: summary, left: pad + leftW + pad, top: headerH + pad },
      ])
      .png()
      .toBuffer();

    await save(
      await sharp(composed)
        .resize({ width: FEATURE_W, height: FEATURE_H, fit: "cover", position: "north" })
        .webp({ quality: 86 })
        .toBuffer(),
      "mkt-rfq-workflow.webp",
    );
    await save(
      await sharp(composed).webp({ quality: 86 }).toBuffer(),
      "mkt-rfq-workflow-full.webp",
    );
    await save(
      await sharp(composed)
        .resize({ width: TOUR_WIDE_W, height: TOUR_WIDE_H, fit: "cover", position: "north" })
        .webp({ quality: 86 })
        .toBuffer(),
      "mkt-tour-rfq.webp",
    );
  }

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
