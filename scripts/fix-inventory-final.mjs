/**
 * Final inventory composite: list without modal bleed + clean detail.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const PUBLIC = OUT;

function svg(w, h, color, lines = [], rx = 0) {
  const t = lines
    .map(
      (l) =>
        `<text x="${l.x ?? 10}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size ?? 13}" font-weight="${l.weight ?? 500}" fill="${l.color ?? "#0B1F2A"}">${String(
          l.text,
        )
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
  const src = path.join(PUBLIC, "screen-24.png");
  // Prefer screen-22 for detail stock status (cleaner) + screen-24 list
  // List: stop before modal (~x 900 on 1920 canvas with sidebar)
  const listW = 960;
  const detailW = 500;
  const panelH = 820;

  const listBuf = await sharp(src)
    .extract({ left: 248, top: 28, width: 640, height: 830 })
    .resize({ width: listW, height: panelH, fit: "cover", position: "left top" })
    .png()
    .toBuffer();

  // Detail: take right portion of modal — stock status + related docs
  // Prefer screen-22 detail which has clear stock status cards
  const detailSrc = path.join(PUBLIC, "screen-22.png");
  let detailBuf = await sharp(detailSrc)
    .extract({ left: 900, top: 55, width: 820, height: 800 })
    .resize({ width: detailW, height: panelH, fit: "cover", position: "left top" })
    .png()
    .toBuffer();

  // Cover any Grade Bad / personal audit names in detail
  detailBuf = await sharp(detailBuf)
    .composite([
      { input: svg(detailW, 40, "#FFFFFF"), left: 0, top: 0 },
      {
        input: svg(detailW - 20, 36, "#FFFFFF", [
          { text: "Enhance PoGo · stock detail", y: 24, size: 13, weight: 600 },
        ]),
        left: 10,
        top: 4,
      },
      // Cover grade band under image if present
      { input: svg(180, 50, "#FFFFFF"), left: 20, top: 200 },
      { input: svg(180, 50, "#FFFFFF"), left: 20, top: 240 },
      {
        input: svg(70, 22, "#FFFFFF", [
          { text: "Good", y: 16, size: 13, weight: 600, color: "#1F6B52" },
        ]),
        left: 40,
        top: 220,
      },
    ])
    .png()
    .toBuffer();

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
  await sharp(path.join(OUT, "mkt-stock.webp"))
    .png()
    .toFile(path.join(OUT, "_qa/mkt-stock.png"));
  console.log("inventory rebuilt");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
