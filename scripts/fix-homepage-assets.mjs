import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = "public/product-screens";
const SRC = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const DESKTOP = path.join(process.env.USERPROFILE, "Desktop");

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

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

async function save(pipeline, name, q = 84) {
  const out = path.join(OUT, name);
  await pipeline.webp({ quality: q, effort: 5 }).toFile(out);
  await sharp(out).png().toFile(path.join(OUT, name.replace(".webp", ".preview.png")));
  const m = await sharp(out).metadata();
  console.log("✓", name, `${m.width}x${m.height}`);
}

// STOCK — 5 complete columns
{
  const left = 248,
    top = 18,
    width = 1240,
    height = 852;
  await save(
    sharp(path.join(SRC, "1.stock page.jpg")).extract({ left, top, width, height }),
    "mkt-stock.webp",
  );
}

// EXPIRY — tight around 3 cards
{
  const left = 248,
    top = 18,
    width = 940,
    height = 620;
  await save(
    sharp(path.join(SRC, "4. expiry stock.jpg")).extract({ left, top, width, height }),
    "mkt-expiring.webp",
  );
}

// SUPPLIERS — opaque rewrite of list body
{
  const left = 244,
    top = 16;
  const src = path.join(DESKTOP, "3. suplyer management.jpg");
  const m = await sharp(src).metadata();
  const width = m.width - left - 18;
  const height = m.height - top - 8;
  const vendors = [
    ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
    ["Henry Schein", "Practice sales", "uk.orders@example-supplier.co.uk"],
    ["Dental Directory", "Account team", "sales@dentaldirectory.example"],
    ["Practice Supplies UK", "Purchasing", "purchasing@practicesupplies.example"],
    ["Schottlander", "Customer service", "orders@schottlander.example"],
    ["SmileSource Supplies", "Sales", "sales@smilesource.example"],
    ["TOC Dental", "Orders", "orders@tocdental.example"],
    ["Premium Plus UK", "Accounts", "accounts@premiumplus.example"],
    ["ArosChem", "Sales desk", "sales@aroschem.example"],
  ];
  const listH = height - 100;
  let rows = "";
  vendors.forEach(([n, c, e], i) => {
    const y = 8 + i * 62;
    if (y + 50 > listH) return;
    rows += `
      <rect x="0" y="${y}" width="100%" height="58" fill="#FFFFFF"/>
      <rect x="8" y="${y + 10}" width="32" height="32" rx="8" fill="#E4F2EC"/>
      <text x="52" y="${y + 24}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${esc(n)}</text>
      <text x="52" y="${y + 40}" font-family="Segoe UI, Arial, sans-serif" font-size="10" fill="#7A8B93">Recognised dental supplier</text>
      <text x="360" y="${y + 30}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#2A3A42">${esc(c)}</text>
      <text x="560" y="${y + 30}" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#2A3A42">${esc(e)}</text>
      <rect x="980" y="${y + 16}" width="58" height="24" rx="12" fill="#E7F5EF"/>
      <text x="992" y="${y + 32}" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#1F6B52">Active</text>
    `;
  });
  const listSvg = Buffer.from(
    `<svg width="${width}" height="${listH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${rows}</svg>`,
  );
  await save(
    sharp(src)
      .extract({ left, top, width, height })
      .composite([
        { input: box(42, 42, "#D5E3DE", [], 21), left: width - 54, top: 8 },
        { input: listSvg, left: 0, top: 100 },
      ]),
    "mkt-suppliers.webp",
  );
}

// PO — cover full supplier column solidly
{
  const left = 258,
    top = 18;
  const src = path.join(SRC, "5. purchase order.jpg");
  const m = await sharp(src).metadata();
  const width = m.width - left - 14;
  const height = m.height - top - 10;
  const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
  const colW = 180;
  const colLeft = 205;
  const colTop = 448;
  const colH = 320;
  let labels = "";
  names.forEach((n, i) => {
    labels += `<text x="12" y="${28 + i * 76}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${esc(n)}</text>`;
  });
  const colSvg = Buffer.from(
    `<svg width="${colW}" height="${colH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${labels}</svg>`,
  );
  await save(
    sharp(src)
      .extract({ left, top, width, height })
      .composite([
        { input: box(42, 42, "#D5E3DE", [], 21), left: width - 54, top: 6 },
        { input: colSvg, left: colLeft, top: colTop },
      ]),
    "mkt-purchase-orders.webp",
  );
}

// RFQ — side-by-side coherent canvas
{
  const rfqSrc = path.join(SRC, "6. rfq.jpg");
  const sumSrc = path.join(SRC, "6.1 rfq order summary.jpg");
  const left = 255,
    top = 18;
  const mainW = 1200;
  const mainH = 560;
  const mainPatches = [
    { input: box(42, 42, "#D5E3DE", [], 21), left: mainW - 54, top: 6 },
    {
      input: box(560, 70, "#FFFFFF", [
        { text: "Urgent order", y: 42, size: 26, weight: 700 },
      ]),
      left: 20,
      top: 64,
    },
    {
      input: box(
        120,
        28,
        "#E7F5EF",
        [{ text: "Responses", y: 18, size: 12, weight: 600, color: "#1F6B52", x: 18 }],
        14,
      ),
      left: 300,
      top: 78,
    },
    {
      input: box(900, 34, "#FFFFFF", [
        {
          text: "Created 25 Jun 2026 · Updated 11 Jul 2026 · 2/2 suppliers replied · 1/3 quotes selected",
          y: 22,
          size: 12,
          color: "#5B6B73",
        },
      ]),
      left: 20,
      top: 128,
    },
    {
      input: box(210, 32, "#FFFFFF", [
        { text: "Henry Schein", y: 21, size: 13, weight: 600 },
      ]),
      left: 410,
      top: 175,
    },
    {
      input: box(210, 32, "#FFFFFF", [
        { text: "Kent Express", y: 21, size: 13, weight: 600 },
      ]),
      left: 650,
      top: 175,
    },
    {
      input: box(210, 32, "#FFFFFF", [
        { text: "Kent Express", y: 21, size: 13, weight: 600 },
      ]),
      left: 960,
      top: 500,
    },
  ];
  const mainBuf = await sharp(rfqSrc)
    .extract({ left, top, width: mainW, height: mainH })
    .composite(mainPatches)
    .png()
    .toBuffer();

  const sLeft = 530,
    sTop = 100,
    sW = 900,
    sH = 620;
  const sumBuf = await sharp(sumSrc)
    .extract({ left: sLeft, top: sTop, width: sW, height: sH })
    .composite([
      {
        input: box(250, 32, "#FFFFFF", [
          { text: "Kent Express", y: 21, size: 14, weight: 600 },
        ]),
        left: 40,
        top: 36,
      },
      {
        input: box(250, 32, "#FFFFFF", [
          { text: "Henry Schein", y: 21, size: 14, weight: 600 },
        ]),
        left: 40,
        top: 168,
      },
    ])
    .resize({ height: mainH })
    .png()
    .toBuffer();
  const sumMeta = await sharp(sumBuf).metadata();

  const gap = 20;
  const canvasW = 16 + mainW + gap + sumMeta.width + 16;
  const canvasH = 52 + mainH + 16;
  const header = box(
    canvasW,
    44,
    "#F4F8F7",
    [
      { text: "RFQ · Urgent order", y: 28, size: 15, weight: 600 },
      { text: "Dental Assist", x: canvasW - 130, y: 28, size: 12, color: "#5B6B73" },
    ],
    0,
  );

  const composed = await sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background: "#EEF5F2" },
  })
    .composite([
      { input: header, left: 0, top: 0 },
      { input: mainBuf, left: 16, top: 48 },
      { input: sumBuf, left: 16 + mainW + gap, top: 48 },
    ])
    .webp({ quality: 84, effort: 5 })
    .toBuffer();

  await fs.writeFile(path.join(OUT, "mkt-rfq-workflow-full.webp"), composed);
  const cardW = 1400,
    cardH = 875;
  await sharp(composed)
    .resize({ width: cardW, height: cardH, fit: "contain", background: "#EEF5F2" })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "mkt-rfq-workflow.webp"));
  await sharp(path.join(OUT, "mkt-rfq-workflow.webp"))
    .png()
    .toFile(path.join(OUT, "mkt-rfq-workflow.preview.png"));
  const fm = await sharp(path.join(OUT, "mkt-rfq-workflow-full.webp")).metadata();
  console.log("✓ mkt-rfq-workflow + full", `${fm.width}x${fm.height}`);
}

console.log("fixes done");
