import sharp from "sharp";
import fs from "fs";

const out = "public/product-screens/_probe";
fs.mkdirSync(out, { recursive: true });

for (const n of [23, 24, 25, 28, 29]) {
  const src = `public/product-screens/screen-${String(n).padStart(2, "0")}.png`;
  const m = await sharp(src).metadata();
  await sharp(src).resize({ width: 800 }).png().toFile(`${out}/s${n}.png`);
  console.log(n, `${m.width}x${m.height}`);
}

await import("./_probe-inv-composite.mjs");
