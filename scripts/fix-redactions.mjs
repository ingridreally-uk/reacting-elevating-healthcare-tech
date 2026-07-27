/**
 * Precise redaction pass for Grade Bad, Ingrid, John Brown.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const PUBLIC = OUT;

function svg(w, h, color, lines = [], rx = 0) {
  const t = lines
    .map(
      (l) =>
        `<text x="${l.x ?? 10}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size ?? 13}" font-weight="${l.weight ?? 500}" fill="${l.color ?? "#0B1F2A"}">${String(l.text)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")}</text>`,
    )
    .join("");
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="${rx}" ry="${rx}" fill="${color}"/>${t}</svg>`,
  );
}

async function fit(buf, w, h) {
  return sharp(buf)
    .resize({ width: w, height: h, fit: "contain", background: "#EEF5F2" })
    .webp({ quality: 86 })
    .toBuffer();
}

async function main() {
  // Patch existing webps by converting to png, patching, re-saving
  // STOCK: cover Grade Bad everywhere it might sit
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

    // Extract detail and blur/cover grade region aggressively
    let detailBuf = await sharp(src)
      .extract({ left: 1000, top: 48, width: 760, height: 800 })
      .resize({ width: detailW, height: panelH, fit: "cover", position: "left top" })
      .png()
      .toBuffer();

    // Cover a wide band where Grade / Bad appears (multiple candidate positions)
    const covers = [];
    for (const y of [160, 180, 200, 220, 240, 260, 280]) {
      for (const x of [40, 80, 120, 160, 200, 240, 280, 320]) {
        covers.push({ input: svg(100, 28, "#FFFFFF"), left: x, top: y });
      }
    }
    covers.push({
      input: svg(80, 24, "#FFFFFF", [
        { text: "Good", y: 17, size: 14, weight: 600, color: "#1F6B52" },
      ]),
      left: 200,
      top: 210,
    });

    detailBuf = await sharp(detailBuf).composite(covers).png().toBuffer();

    const header = svg(listW + detailW, 52, "#F4F8F7", [
      { text: "Stock", y: 34, size: 18, weight: 700 },
      {
        text: "Root Canal · materials, quantities and stock status",
        x: 78,
        y: 32,
        size: 12,
        color: "#5B6B73",
      },
    ]);

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

    await fs.writeFile(path.join(OUT, "mkt-stock.webp"), await fit(composed, 1440, 900));
    await fs.writeFile(path.join(OUT, "mkt-tour-stock.webp"), await fit(composed, 1200, 750));
    console.log("stock patched");
  }

  // RFQ: rebuild left table with supplier headers rewritten
  {
    const rfqSrc = path.join(APP, "6. rfq.jpg");
    const canvasW = 1600;
    const canvasH = 900;
    const headerH = 48;
    const pad = 16;
    const mainH = canvasH - headerH - pad * 2;
    const leftW = Math.round((canvasW - pad * 3) * 0.7);
    const rightW = canvasW - pad * 3 - leftW;

    // Table body only
    let tableBuf = await sharp(rfqSrc)
      .extract({ left: 255, top: 300, width: 1180, height: 400 })
      .png()
      .toBuffer();

    // Cover column headers area (Ingrid / Reacting Dental Supplies)
    tableBuf = await sharp(tableBuf)
      .composite([
        { input: svg(280, 50, "#FFFFFF"), left: 360, top: 0 },
        { input: svg(280, 50, "#FFFFFF"), left: 640, top: 0 },
        {
          input: svg(240, 40, "#FFFFFF", [
            { text: "Henry Schein", y: 26, size: 14, weight: 600 },
          ]),
          left: 380,
          top: 8,
        },
        {
          input: svg(220, 40, "#FFFFFF", [
            { text: "Kent Express", y: 26, size: 14, weight: 600 },
          ]),
          left: 660,
          top: 8,
        },
      ])
      .png()
      .toBuffer();

    const leftPanel = await sharp({
      create: { width: leftW, height: mainH, channels: 3, background: "#FFFFFF" },
    })
      .composite([
        {
          input: svg(leftW, 130, "#FFFFFF", [
            { text: "Urgent order", y: 44, size: 26, weight: 700 },
            {
              text: "Created 25 Jun 2026 · 2/2 suppliers replied · 1/3 quotes selected",
              y: 78,
              size: 13,
              color: "#5B6B73",
            },
            {
              text: "Compare supplier responses before the practice commits to an order.",
              y: 106,
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
          top: 24,
        },
        {
          input: await sharp(tableBuf)
            .resize({
              width: leftW - 24,
              height: mainH - 150,
              fit: "contain",
              background: "#FFFFFF",
            })
            .png()
            .toBuffer(),
          left: 12,
          top: 140,
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

    const header = svg(canvasW, headerH, "#F4F8F7", [
      { text: "RFQ · Urgent order", y: 30, size: 15, weight: 600 },
      { text: "Dental Assist", x: canvasW - 130, y: 30, size: 12, color: "#5B6B73" },
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

    await fs.writeFile(path.join(OUT, "mkt-rfq-workflow-full.webp"), composed);
    await fs.writeFile(
      path.join(OUT, "mkt-rfq-workflow.webp"),
      await fit(composed, 1440, 900),
    );
    await fs.writeFile(
      path.join(OUT, "mkt-tour-rfq.webp"),
      await fit(composed, 1400, 788),
    );
    console.log("rfq patched");
  }

  // PO: cover entire supplier column and rewrite
  {
    const src = path.join(APP, "5. purchase order.jpg");
    const cropLeft = 320;
    const cropTop = 12;
    const pw = 1280;
    const ph = 820;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];

    // Probe supplier column x from earlier crops — cover wide band
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

    await fs.writeFile(path.join(OUT, "mkt-purchase-orders.webp"), await fit(buf, 1440, 900));
    await fs.writeFile(path.join(OUT, "mkt-tour-orders.webp"), await fit(buf, 1200, 750));
    console.log("po patched");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
