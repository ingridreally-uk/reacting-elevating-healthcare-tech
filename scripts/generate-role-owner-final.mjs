import sharp from "sharp";
import { mkdirSync } from "fs";
import { join } from "path";

const src = "public/product-screens/role-owner-savings-usage.jpg";
const dest = "public/product-screens/role-owner-final.png";

const TW = 1600;
const TH = 1000;
const MINT = "#F3F7F5";

// Region A: Upper KPI section containing EXACTLY the first 3 KPI cards (£546.59, £1,206.88, £518.34)
// Excludes Card 4 completely (ends before Card 4 border at x=1231)
const cropA = { left: 24, top: 78, width: 1202, height: 278 };

// Region B: Lower Trend Explorer section (wider contiguous crop preserving full graph, legend pills, Jun tooltip, Jul & Aug)
const cropB = { left: 24, top: 370, width: 1615, height: 495 };

// Extract untouched pixels directly from the original screenshot
const bufA = await sharp(src).extract(cropA).toBuffer();
const bufB = await sharp(src).extract(cropB).toBuffer();

// Scale both genuine screenshot regions to fit 95% canvas width (1520px) while strictly preserving each region's 1:1 aspect ratio
const targetWidth = 1520;
const sw = targetWidth;
const shA = Math.round(cropA.height * (sw / cropA.width)); // 351px
const shB = Math.round(cropB.height * (sw / cropB.width)); // 466px

const gap = 16;
const totalH = shA + gap + shB; // 833px (83.3% canvas height occupancy)
const topStart = Math.round((TH - totalH) / 2); // 83px top margin
const leftStart = Math.round((TW - sw) / 2); // 40px left margin

const resA = await sharp(bufA).resize(sw, shA, { kernel: sharp.kernel.lanczos3 }).toBuffer();
const resB = await sharp(bufB).resize(sw, shB, { kernel: sharp.kernel.lanczos3 }).toBuffer();

const base = await sharp({
  create: {
    width: TW,
    height: TH,
    channels: 3,
    background: MINT,
  },
})
  .png()
  .toBuffer();

await sharp(base)
  .composite([
    { input: resA, left: leftStart, top: topStart },
    { input: resB, left: leftStart, top: topStart + shA + gap },
  ])
  .png()
  .toFile(dest);

console.log("Successfully generated final Owner asset:", {
  dest,
  cropA,
  cropB,
  targetWidth,
  shA,
  shB,
  gap,
  totalH,
  leftStart,
  topStart,
  occupancyWidth: +(sw / TW).toFixed(3),
  occupancyHeight: +(totalH / TH).toFixed(3),
});
