/**
 * Inventory only — seamless 65/35 without double headers or modal bleed.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const src = path.join(OUT, "screen-24.png");

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

async function save(buf, name) {
  const dest = path.join(OUT, name);
  const tmp = `${dest}.new.webp`;
  await fs.writeFile(tmp, buf);
  await fs.copyFile(tmp, dest);
  await fs.unlink(tmp).catch(() => {});
  console.log("✓", name);
}

const canvasW = 1500;
const canvasH = 880;
const headerH = 52;
const bodyH = canvasH - headerH;
const listW = Math.round(canvasW * 0.65);
const detailW = canvasW - listW;

// List: folder + cards only (below page chrome; stop before modal)
const listBuf = await sharp(src)
  .extract({ left: 248, top: 110, width: 580, height: 740 })
  .resize({ width: listW, height: bodyH, fit: "cover", position: "northwest" })
  .png()
  .toBuffer();

// Detail: skip item title chrome; start at tabs / fields
let detailBuf = await sharp(src)
  .extract({ left: 980, top: 130, width: 760, height: 720 })
  .resize({ width: detailW, height: bodyH, fit: "cover", position: "northwest" })
  .png()
  .toBuffer();

// Patch Grade Bad
const { data, info } = await sharp(detailBuf)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const reds = [];
for (let y = 40; y < 320; y++) {
  for (let x = 0; x < Math.floor(info.width * 0.5); x++) {
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
  const x0 = Math.max(0, Math.min(...xs) - 6);
  const y0 = Math.max(0, Math.min(...ys) - 4);
  const pw = Math.min(info.width - x0, Math.max(...xs) - Math.min(...xs) + 48);
  const ph = Math.min(36, Math.max(...ys) - Math.min(...ys) + 16);
  detailBuf = await sharp(detailBuf)
    .composite([
      { input: svg(pw, ph, "#FFFFFF"), left: x0, top: y0 },
      {
        input: svg(56, 20, "#FFFFFF", [
          { text: "Good", y: 15, size: 13, weight: 600, color: "#1F6B52" },
        ]),
        left: x0 + 2,
        top: y0 + 2,
      },
    ])
    .png()
    .toBuffer();
  console.log("grade patched", x0, y0);
}

const header = svg(canvasW, headerH, "#F4F8F7", [
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
  create: { width: canvasW, height: canvasH, channels: 3, background: "#EEF5F2" },
})
  .composite([
    { input: header, left: 0, top: 0 },
    { input: listBuf, left: 0, top: headerH },
    { input: detailBuf, left: listW, top: headerH },
    { input: svg(1, bodyH, "#E2EBE7"), left: listW, top: headerH },
  ])
  .png()
  .toBuffer();

await save(
  await sharp(composed)
    .resize({ width: 1440, height: 900, fit: "cover", position: "centre" })
    .webp({ quality: 86 })
    .toBuffer(),
  "mkt-stock.webp",
);
await save(
  await sharp(composed)
    .resize({ width: 1200, height: 750, fit: "cover", position: "northwest" })
    .webp({ quality: 86 })
    .toBuffer(),
  "mkt-tour-stock.webp",
);

await sharp(path.join(OUT, "mkt-stock.webp"))
  .png()
  .toFile(path.join(OUT, "_qa/mkt-stock.png"));
console.log("inventory seamless done");
