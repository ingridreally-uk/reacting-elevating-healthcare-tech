import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const OUT = "public/product-screens";
const SRC = path.join(
  process.env.USERPROFILE,
  "Desktop/New reacting/app images/5. purchase order.jpg",
);

const esc = (s) => String(s).replaceAll("&", "&amp;");
const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
let texts = "";
names.forEach((n, i) => {
  texts += `<text x="12" y="${24 + i * 40}" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#0B1F2A">${esc(n)}</text>`;
});

const cropLeft = 258;
const cropTop = 18;
const m = await sharp(SRC).metadata();
const pw = m.width - cropLeft - 14;
const ph = m.height - cropTop - 10;
const colTop = 555 - cropTop;
const colH = 175;
const colSvg = Buffer.from(
  `<svg width="175" height="${colH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/>${texts}</svg>`,
);
const avatar = Buffer.from(
  `<svg width="42" height="42" xmlns="http://www.w3.org/2000/svg"><circle cx="21" cy="21" r="21" fill="#D5E3DE"/></svg>`,
);

await sharp(SRC)
  .extract({ left: cropLeft, top: cropTop, width: pw, height: ph })
  .composite([
    { input: avatar, left: pw - 54, top: 6 },
    { input: colSvg, left: 450 - cropLeft, top: colTop },
  ])
  .webp({ quality: 84 })
  .toFile(path.join(OUT, "mkt-purchase-orders.webp"));

await sharp(path.join(OUT, "mkt-purchase-orders.webp"))
  .png()
  .toFile(path.join(OUT, "_qa-po.png"));

for (const f of fs.readdirSync(OUT)) {
  if (
    f.startsWith("_strip") ||
    f.startsWith("_t-") ||
    f.startsWith("_po") ||
    f === "_qa-rfq.png"
  ) {
    try {
      fs.unlinkSync(path.join(OUT, f));
    } catch {
      /* ignore */
    }
  }
}

console.log("po column cover done");
