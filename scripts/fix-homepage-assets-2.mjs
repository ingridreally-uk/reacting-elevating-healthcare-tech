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

async function preview(name) {
  await sharp(path.join(OUT, name))
    .png()
    .toFile(path.join(OUT, name.replace(".webp", ".preview.png")));
}

// Stock: 4 complete columns
await sharp(path.join(SRC, "1.stock page.jpg"))
  .extract({ left: 248, top: 18, width: 1080, height: 852 })
  .webp({ quality: 84 })
  .toFile(path.join(OUT, "mkt-stock.webp"));
await preview("mkt-stock.webp");
console.log("stock ok");

// PO: cover supplier cells
{
  const poLeft = 258;
  const poTop = 18;
  const poM = await sharp(path.join(SRC, "5. purchase order.jpg")).metadata();
  const pw = poM.width - poLeft - 14;
  const ph = poM.height - poTop - 10;
  const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
  const comps = [
    { input: box(42, 42, "#D5E3DE", [], 21), left: pw - 54, top: 6 },
  ];
  names.forEach((n, i) => {
    comps.push({
      input: box(175, 40, "#FFFFFF", [{ text: n, y: 24, size: 13, weight: 600 }]),
      left: 218,
      top: 468 + i * 76,
    });
  });
  await sharp(path.join(SRC, "5. purchase order.jpg"))
    .extract({ left: poLeft, top: poTop, width: pw, height: ph })
    .composite(comps)
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "mkt-purchase-orders.webp"));
  await preview("mkt-purchase-orders.webp");
  console.log("po ok");
}

// RFQ
{
  const left = 255;
  const top = 18;
  const mainW = 1180;
  const mainH = 540;
  const patches = [
    { input: box(42, 42, "#D5E3DE", [], 21), left: mainW - 54, top: 6 },
    {
      input: box(900, 110, "#FFFFFF", [
        { text: "Urgent order", y: 36, size: 26, weight: 700 },
        {
          text: "Created 25 Jun 2026 · Updated 11 Jul 2026 · 2/2 suppliers replied · 1/3 quotes selected",
          y: 68,
          size: 12,
          color: "#5B6B73",
        },
      ]),
      left: 18,
      top: 60,
    },
    {
      input: box(
        110,
        26,
        "#E7F5EF",
        [{ text: "Responses", y: 17, size: 11, weight: 600, color: "#1F6B52", x: 16 }],
        13,
      ),
      left: 250,
      top: 72,
    },
    {
      input: box(240, 36, "#FFFFFF", [
        { text: "Henry Schein", y: 24, size: 13, weight: 600 },
      ]),
      left: 390,
      top: 168,
    },
    {
      input: box(240, 36, "#FFFFFF", [
        { text: "Kent Express", y: 24, size: 13, weight: 600 },
      ]),
      left: 640,
      top: 168,
    },
    {
      input: box(220, 34, "#FFFFFF", [
        { text: "Kent Express", y: 22, size: 13, weight: 600 },
      ]),
      left: 940,
      top: 480,
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
        input: box(260, 34, "#FFFFFF", [
          { text: "Kent Express", y: 22, size: 14, weight: 600 },
        ]),
        left: 36,
        top: 30,
      },
      {
        input: box(260, 34, "#FFFFFF", [
          { text: "Henry Schein", y: 22, size: 14, weight: 600 },
        ]),
        left: 36,
        top: 155,
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
  await preview("mkt-rfq-workflow.webp");
  console.log("rfq ok");
}

console.log("done");
