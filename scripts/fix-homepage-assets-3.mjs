import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = "public/product-screens";
const SRC = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");

const esc = (s) =>
  String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function box(w, h, color, lines = [], rx = 4) {
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

// PO — solid supplier column rewrite
{
  const left = 258;
  const top = 18;
  const src = path.join(SRC, "5. purchase order.jpg");
  const m = await sharp(src).metadata();
  const pw = m.width - left - 14;
  const ph = m.height - top - 10;
  const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
  let nameTexts = "";
  names.forEach((n, i) => {
    nameTexts += `<text x="14" y="${32 + i * 76}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${esc(n)}</text>`;
  });
  const column = Buffer.from(
    `<svg width="190" height="340" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${nameTexts}</svg>`,
  );
  await sharp(src)
    .extract({ left, top, width: pw, height: ph })
    .composite([
      { input: box(42, 42, "#D5E3DE", [], 21), left: pw - 54, top: 6 },
      { input: column, left: 205, top: 448 },
    ])
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "mkt-purchase-orders.webp"));
  console.log("po rewritten");
}

// RFQ — large cover bands for title + supplier headers
{
  const left = 255;
  const top = 18;
  const mainW = 1180;
  const mainH = 540;
  const patches = [
    { input: box(42, 42, "#D5E3DE", [], 21), left: mainW - 54, top: 6 },
    // Full title / meta / badge band
    {
      input: box(1050, 130, "#FFFFFF", [
        { text: "Urgent order", y: 42, size: 26, weight: 700 },
        {
          text: "Created 25 Jun 2026 · Updated 11 Jul 2026 · 2/2 suppliers replied · 1/3 quotes selected",
          y: 78,
          size: 12,
          color: "#5B6B73",
        },
      ]),
      left: 16,
      top: 55,
    },
    {
      input: box(
        110,
        28,
        "#E7F5EF",
        [{ text: "Responses", y: 18, size: 12, weight: 600, color: "#1F6B52", x: 16 }],
        14,
      ),
      left: 250,
      top: 68,
    },
    // Full supplier header strip
    {
      input: box(620, 44, "#FFFFFF", [
        { text: "Henry Schein", x: 40, y: 28, size: 13, weight: 600 },
        { text: "Kent Express", x: 300, y: 28, size: 13, weight: 600 },
      ]),
      left: 380,
      top: 175,
    },
    // Bottom selected-supplier label area
    {
      input: box(260, 40, "#FFFFFF", [
        { text: "Kent Express", y: 26, size: 13, weight: 600 },
      ]),
      left: 920,
      top: 470,
    },
  ];

  const mainBuf = await sharp(path.join(SRC, "6. rfq.jpg"))
    .extract({ left, top, width: mainW, height: mainH })
    .composite(patches)
    .png()
    .toBuffer();

  const sumBuf = await sharp(path.join(SRC, "6.1 rfq order summary.jpg"))
    .extract({ left: 548, top: 110, width: 880, height: 580 })
    .composite([
      {
        input: box(280, 40, "#FFFFFF", [
          { text: "Kent Express", y: 26, size: 14, weight: 600 },
        ]),
        left: 30,
        top: 24,
      },
      {
        input: box(280, 40, "#FFFFFF", [
          { text: "Henry Schein", y: 26, size: 14, weight: 600 },
        ]),
        left: 30,
        top: 148,
      },
    ])
    .resize({ height: mainH })
    .png()
    .toBuffer();

  const sm = await sharp(sumBuf).metadata();
  const canvasW = 16 + mainW + 16 + sm.width + 16;
  const canvasH = 48 + mainH + 16;
  const header = box(
    canvasW,
    40,
    "#F4F8F7",
    [
      { text: "RFQ · Urgent order", y: 26, size: 14, weight: 600 },
      { text: "Dental Assist", x: canvasW - 120, y: 26, size: 12, color: "#5B6B73" },
    ],
    0,
  );

  const composed = await sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background: "#EEF5F2" },
  })
    .composite([
      { input: header, left: 0, top: 0 },
      { input: mainBuf, left: 16, top: 44 },
      { input: sumBuf, left: 16 + mainW + 16, top: 44 },
    ])
    .webp({ quality: 84 })
    .toBuffer();

  await fs.writeFile(path.join(OUT, "mkt-rfq-workflow-full.webp"), composed);
  await sharp(composed)
    .resize({ width: 1400, height: 875, fit: "contain", background: "#EEF5F2" })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "mkt-rfq-workflow.webp"));
  console.log("rfq rewritten");
}

// cleanup QA
for (const f of ["_qa-po.png", "_qa-rfq.png"]) {
  try {
    await fs.unlink(path.join(OUT, f));
  } catch {
    /* ignore */
  }
}

console.log("done");
