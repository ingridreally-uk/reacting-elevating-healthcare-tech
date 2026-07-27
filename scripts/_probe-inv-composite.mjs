import sharp from "sharp";
import fs from "fs";

const out = "public/product-screens/_probe";
fs.mkdirSync(out, { recursive: true });

const list = await sharp("public/product-screens/screen-22.png")
  .extract({ left: 250, top: 36, width: 620, height: 820 })
  .png()
  .toBuffer();
const detail = await sharp("public/product-screens/screen-22.png")
  .extract({ left: 780, top: 55, width: 850, height: 800 })
  .resize({ width: 420, height: 820, fit: "cover", position: "left top" })
  .png()
  .toBuffer();
const header = Buffer.from(
  `<svg width="1040" height="56" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#F4F8F7"/><text x="16" y="36" font-family="Segoe UI" font-size="20" font-weight="700" fill="#0B1F2A">Stock</text><text x="90" y="34" font-family="Segoe UI" font-size="12" fill="#5B6B73">Root Canal · 24 items</text></svg>`,
);
await sharp({
  create: { width: 1040, height: 876, channels: 3, background: "#EEF5F2" },
})
  .composite([
    { input: header, left: 0, top: 0 },
    { input: list, left: 0, top: 56 },
    { input: detail, left: 620, top: 56 },
  ])
  .png()
  .toFile(`${out}/inv-composite.png`);
console.log("ok");
