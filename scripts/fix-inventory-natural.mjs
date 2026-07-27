import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const src = path.join(OUT, "screen-24.png");

function svg(w, h, color, lines = [], rx = 0) {
  const t = lines
    .map(
      (l) =>
        `<text x="${l.x ?? 10}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size ?? 13}" font-weight="${l.weight ?? 500}" fill="${l.color ?? "#0B1F2A"}">${String(l.text)}</text>`,
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

// Full continuous content: prioritize keeping related docs + ≥2 cards
let buf = await sharp(src)
  .extract({ left: 260, top: 20, width: 1580, height: 850 })
  .composite([
    { input: svg(40, 40, "#D5E3DE", [], 20), left: 1530, top: 2 },
    // Small Grade Bad cover only (under product image in detail)
    { input: svg(72, 28, "#FFFFFF"), left: 820, top: 430 },
    {
      input: svg(56, 22, "#FFFFFF", [
        { text: "Good", y: 16, size: 13, weight: 600, color: "#1F6B52" },
      ]),
      left: 828,
      top: 433,
    },
  ])
  .png()
  .toBuffer();

await save(
  await sharp(buf)
    .resize({ width: 1440, height: 900, fit: "cover", position: "centre" })
    .webp({ quality: 86 })
    .toBuffer(),
  "mkt-stock.webp",
);

await save(
  await sharp(buf)
    .extract({ left: 0, top: 40, width: 1500, height: 760 })
    .resize({ width: 1200, height: 750, fit: "cover", position: "northwest" })
    .webp({ quality: 86 })
    .toBuffer(),
  "mkt-tour-stock.webp",
);

console.log("done");
