import sharp from "sharp";
import fs from "fs/promises";

const svg = Buffer.from(
  `<svg width="90" height="28" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FFFFFF"/><text x="8" y="19" font-family="Segoe UI" font-size="14" font-weight="600" fill="#1F6B52">Good</text></svg>`,
);

async function patch(src, dest) {
  const m = await sharp(src).metadata();
  const sx = m.width / 1440;
  const sy = m.height / 900;
  const left = Math.round(730 * sx);
  const top = Math.round(840 * sy);
  const w = Math.round(100 * sx);
  const h = Math.round(40 * sy);
  const patchBuf = await sharp(svg).resize(w, h).png().toBuffer();
  await sharp(src)
    .composite([{ input: patchBuf, left, top }])
    .webp({ quality: 86 })
    .toFile(dest);
  console.log("wrote", dest);
}

await patch(
  "public/product-screens/mkt-stock.webp",
  "public/product-screens/mkt-stock-clean.webp",
);
await patch(
  "public/product-screens/mkt-tour-stock.webp",
  "public/product-screens/mkt-tour-stock-clean.webp",
);

await sharp("public/product-screens/mkt-stock-clean.webp")
  .png()
  .toFile("public/product-screens/_qa/mkt-stock.png");

const { data } = await sharp("public/product-screens/_qa/mkt-stock.png")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let red = 0;
for (let i = 0; i < data.length; i += 4) {
  const r = data[i],
    g = data[i + 1],
    b = data[i + 2];
  if (r > 150 && g < 100 && b < 100 && r - g > 60) red++;
}
console.log("remaining red pixels", red);
