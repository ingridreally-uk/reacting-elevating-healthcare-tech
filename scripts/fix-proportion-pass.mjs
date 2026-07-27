/**
 * Fix proportion-pass issues: inventory continuous crop, suppliers both panes,
 * RFQ fill, low-stock badge.
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

async function save(buf, name) {
  const dest = path.join(OUT, name);
  const tmp = `${dest}.new.webp`;
  await fs.writeFile(tmp, buf);
  try {
    await fs.copyFile(tmp, dest);
  } finally {
    await fs.unlink(tmp).catch(() => {});
  }
  console.log("✓", name);
}

async function fillFrame(buf, w, h, position = "centre") {
  // Prefer cover so content fills ≥85% of frame
  return sharp(buf)
    .resize({ width: w, height: h, fit: "cover", position })
    .webp({ quality: 86 })
    .toBuffer();
}

async function main() {
  // ─── INVENTORY: natural single-screen crop from screen-24 ───
  // Detail panel is part of the same UI overlay — do not stitch separately.
  {
    const src = path.join(PUBLIC, "screen-24.png");
    // After sidebar; include list + full detail panel (incl. related docs)
    // Bias crop so list/cards ≈65% visual width: start at sidebar, end after related docs
    const left = 248;
    const top = 20;
    const width = 1588; // to near right edge of 1920
    const height = 840;

    let buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([{ input: svg(42, 42, "#D5E3DE", [], 21), left: width - 52, top: 2 }])
      .png()
      .toBuffer();

    // Patch Grade Bad via red-pixel search in this buffer
    const { data, info } = await sharp(buf)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const reds = [];
    for (let y = 200; y < info.height - 40; y++) {
      for (let x = Math.floor(info.width * 0.45); x < info.width - 40; x++) {
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
      const x0 = Math.min(...xs) - 8;
      const y0 = Math.min(...ys) - 6;
      const pw = Math.max(...xs) - Math.min(...xs) + 40;
      const ph = Math.max(...ys) - Math.min(...ys) + 20;
      buf = await sharp(buf)
        .composite([
          { input: svg(pw, ph, "#FFFFFF"), left: x0, top: y0 },
          {
            input: svg(60, 22, "#FFFFFF", [
              { text: "Good", y: 16, size: 13, weight: 600, color: "#1F6B52" },
            ]),
            left: x0 + 4,
            top: y0 + 2,
          },
        ])
        .png()
        .toBuffer();
      console.log("inventory grade patched at", x0, y0);
    }

    await save(await fillFrame(buf, FEATURE_W, FEATURE_H, "centre"), "mkt-stock.webp");

    // Tour: tighter on cards + stock status
    const tour = await sharp(src)
      .extract({ left: 300, top: 100, width: 1450, height: 720 })
      .png()
      .toBuffer();
    await save(await fillFrame(tour, TOUR_W, TOUR_H, "northwest"), "mkt-tour-stock.webp");
  }

  // ─── LOW STOCK: include full “118 items” badge ───
  {
    const src = path.join(APP, "2. low stock page.jpg");
    const left = 255;
    const top = 22;
    const width = 1260;
    const height = 710;
    const buf = await sharp(src)
      .extract({ left, top, width, height })
      .composite([{ input: svg(40, 40, "#D5E3DE", [], 20), left: width - 50, top: 4 }])
      .png()
      .toBuffer();
    await save(await fillFrame(buf, FEATURE_W, FEATURE_H, "north"), "mkt-low-stock.webp");
    const tour = await sharp(src)
      .extract({ left: 258, top: 36, width: 1200, height: 640 })
      .png()
      .toBuffer();
    await save(await fillFrame(tour, TOUR_W, TOUR_H, "north"), "mkt-tour-low-stock.webp");
  }

  // ─── SUPPLIERS: keep both panes visible (contain then slight cover) ───
  {
    const canvasW = 1560;
    const leftW = Math.round(canvasW * 0.62);
    const rightW = canvasW - leftW;
    const rowH = 80;
    const dirHeaderH = 70;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "UK orders", "uk.orders@henryschein.co.uk"],
      ["Dental Directory", "Sales", "sales@dentaldirectory.co.uk"],
      ["Schottlander", "Customer service", "orders@schottlander.co.uk"],
      ["Practice Supplies UK", "Purchasing", "purchasing@practice.co.uk"],
      ["SmileSource Supplies", "Accounts", "accounts@smilesource.co.uk"],
    ];

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
        `<rect x="18" y="${y + 20}" width="34" height="34" rx="8" fill="#E4F2EC"/>` +
        `<text x="64" y="${y + 36}" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#0B1F2A">${esc(n)}</text>` +
        `<text x="64" y="${y + 56}" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#6B7C84">${esc(c)}</text>` +
        `<text x="380" y="${y + 46}" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#2A3A42">${esc(e)}</text>` +
        `<rect x="${leftW - 108}" y="${y + 24}" width="72" height="28" rx="14" fill="#E7F5EF"/>` +
        `<text x="${leftW - 94}" y="${y + 43}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Active</text>`;
    });

    const dirBodyH = vendors.length * rowH + 4;
    const panelH = dirHeaderH + dirBodyH;
    const dirHeader = svg(leftW, dirHeaderH, "#F7FAF9", [
      { text: "Vendors", y: 30, size: 22, weight: 700 },
      {
        text: "6 active suppliers · linked to RFQs and orders",
        y: 54,
        size: 13,
        color: "#5B6B73",
      },
    ]);
    const dirBody = Buffer.from(
      `<svg width="${leftW}" height="${dirBodyH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${rows}</svg>`,
    );
    const profile = Buffer.from(
      `<svg width="${rightW}" height="${panelH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="12" y="12" width="${rightW - 24}" height="${panelH - 24}" rx="14" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="28" y="44" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">VENDORS / Kent Express</text>
        <text x="28" y="78" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#0B1F2A">Kent Express</text>
        <rect x="210" y="56" width="64" height="26" rx="13" fill="#E7F5EF"/>
        <text x="222" y="74" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#1F6B52">Active</text>
        <text x="28" y="124" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Main contact</text>
        <text x="28" y="148" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Orders desk</text>
        <text x="28" y="188" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Email</text>
        <text x="28" y="212" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">orders@kentexpress.co.uk</text>
        <text x="28" y="252" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Account ref</text>
        <text x="28" y="276" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">KE-48291</text>
        <text x="28" y="316" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Website</text>
        <text x="28" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">www.kentexpress.co.uk</text>
        <rect x="28" y="366" width="${rightW - 64}" height="1" fill="#E2EBE7"/>
        <text x="28" y="402" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" fill="#5B6B73">LINKED ACTIVITY</text>
        <text x="28" y="434" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#0B1F2A">3 open RFQs · 2 purchase orders</text>
        <text x="28" y="462" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#5B6B73">Categories: Infection Control, Consumables</text>
        <rect x="28" y="488" width="${rightW - 64}" height="68" rx="12" fill="#EAF6F1"/>
        <text x="44" y="518" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#0B1F2A">Preferred supplier for gloves and PPE.</text>
        <text x="44" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Account status: Active · net 30</text>
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

    // Contain first so both panes stay visible, then mild enlarge into frame
    const contained = await sharp(composed)
      .resize({
        width: FEATURE_W,
        height: FEATURE_H,
        fit: "contain",
        background: "#EEF5F2",
      })
      .png()
      .toBuffer();
    // Slight zoom toward content (trim ~4% pale margin)
    const m = await sharp(contained).metadata();
    const trimX = Math.round(m.width * 0.02);
    const trimY = Math.round(m.height * 0.03);
    const tight = await sharp(contained)
      .extract({
        left: trimX,
        top: trimY,
        width: m.width - trimX * 2,
        height: m.height - trimY * 2,
      })
      .resize({ width: FEATURE_W, height: FEATURE_H, fit: "cover", position: "centre" })
      .webp({ quality: 86 })
      .toBuffer();
    await save(tight, "mkt-suppliers.webp");
    await save(await fillFrame(composed, TOUR_W, TOUR_H, "centre"), "mkt-tour-suppliers.webp");
  }

  // ─── RFQ: less empty white, full product names, filled summary ───
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const canvasW = 1680;
    const canvasH = 900;
    const headerH = 40;
    const pad = 10;
    const mainH = canvasH - headerH - pad * 2;
    const leftW = Math.round((canvasW - pad * 3) * 0.72);
    const rightW = canvasW - pad * 3 - leftW;

    // Include product column (start earlier in source)
    let tableBuf = await sharp(rfqSrc)
      .extract({ left: 255, top: 295, width: 1280, height: 440 })
      .png()
      .toBuffer();

    tableBuf = await sharp(tableBuf)
      .composite([
        { input: svg(280, 44, "#FFFFFF"), left: 420, top: 0 },
        { input: svg(280, 44, "#FFFFFF"), left: 720, top: 0 },
        {
          input: svg(240, 34, "#FFFFFF", [
            { text: "Henry Schein", y: 22, size: 14, weight: 600 },
          ]),
          left: 440,
          top: 6,
        },
        {
          input: svg(220, 34, "#FFFFFF", [
            { text: "Kent Express", y: 22, size: 14, weight: 600 },
          ]),
          left: 740,
          top: 6,
        },
      ])
      .png()
      .toBuffer();

    const titleH = 72;
    const leftPanel = await sharp({
      create: { width: leftW, height: mainH, channels: 3, background: "#FFFFFF" },
    })
      .composite([
        {
          input: svg(leftW, titleH, "#FFFFFF", [
            { text: "Urgent order", y: 30, size: 22, weight: 700 },
            {
              text: "Created 25 Jun 2026 · 2/2 suppliers replied · 1/3 quotes selected",
              y: 54,
              size: 12,
              color: "#5B6B73",
            },
          ]),
          left: 0,
          top: 0,
        },
        {
          input: svg(
            100,
            24,
            "#E7F5EF",
            [{ text: "Responses", y: 16, size: 11, weight: 600, color: "#1F6B52", x: 12 }],
            12,
          ),
          left: 195,
          top: 14,
        },
        {
          input: await sharp(tableBuf)
            .resize({
              width: leftW - 12,
              height: mainH - titleH - 4,
              fit: "cover",
              position: "northwest",
            })
            .png()
            .toBuffer(),
          left: 6,
          top: titleH,
        },
      ])
      .png()
      .toBuffer();

    const summarySvg = Buffer.from(
      `<svg width="${rightW}" height="${mainH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F4F8F7"/>
        <rect x="6" y="6" width="${rightW - 12}" height="${mainH - 12}" rx="12" fill="#FFFFFF" stroke="#E2EBE7"/>
        <text x="20" y="38" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">ORDER SUMMARY</text>
        <text x="20" y="68" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#0B1F2A">Kent Express</text>
        <text x="20" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">1 item selected</text>
        <text x="20" y="128" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Subtotal</text>
        <text x="${rightW - 84}" y="128" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£189.04</text>
        <text x="20" y="154" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">VAT (20%)</text>
        <text x="${rightW - 84}" y="154" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£37.81</text>
        <line x1="20" y1="174" x2="${rightW - 20}" y2="174" stroke="#E2EBE7"/>
        <text x="20" y="206" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">Order total</text>
        <text x="${rightW - 96}" y="206" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1F6B52">£226.85</text>
        <text x="20" y="240" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">Money saved</text>
        <text x="${rightW - 78}" y="240" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#1F6B52">£56.00</text>
        <rect x="20" y="262" width="${rightW - 40}" height="1" fill="#E2EBE7"/>
        <text x="20" y="298" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#5B6B73">BUDGET IMPACT</text>
        <text x="20" y="328" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">Budget remaining</text>
        <text x="${rightW - 96}" y="328" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,447.33</text>
        <text x="20" y="354" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#5B6B73">After this order</text>
        <text x="${rightW - 96}" y="354" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#0B1F2A">£1,220.48</text>
        <rect x="20" y="374" width="${rightW - 40}" height="10" rx="5" fill="#EAF6F1"/>
        <rect x="20" y="374" width="${Math.round((rightW - 40) * 0.5)}" height="10" rx="5" fill="#2F8F6B"/>
        <text x="20" y="408" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">50% of monthly materials budget</text>
        <rect x="20" y="432" width="${rightW - 40}" height="1" fill="#E2EBE7"/>
        <text x="20" y="468" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#0B1F2A">Henry Schein</text>
        <text x="20" y="490" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#5B6B73">2 items · £178.82</text>
      </svg>`,
    );

    const header = svg(canvasW, headerH, "#F4F8F7", [
      { text: "RFQ · Urgent order", y: 26, size: 14, weight: 600 },
      { text: "Dental Assist", x: canvasW - 118, y: 26, size: 12, color: "#5B6B73" },
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
    await save(await fillFrame(composed, FEATURE_W, FEATURE_H, "centre"), "mkt-rfq-workflow.webp");
    await save(await fillFrame(composed, TOUR_WIDE_W, TOUR_WIDE_H, "centre"), "mkt-tour-rfq.webp");
  }

  console.log("fixes done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
