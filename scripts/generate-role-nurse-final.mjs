import sharp from "sharp";
import { existsSync } from "fs";

const SOURCE_PATH = "public/product-screens/role-nurse-low-stock.jpg";
const OUTPUT_PATH = "public/product-screens/role-nurse-final.png";

// Canvas dimensions using natural aspect ratio framing
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 640;
const MINT_BG = "#F3F7F5";

// Authoritative contiguous crop rectangle for Row 1 cards 1, 2, 3:
// 1. DEHP Gloves Vinyl Powder Free Large 100pk (#437 +1 more linked RFQs)
// 2. Sterile Safeskin Purple Nitrile Gloves S (No RFQs / No orders linked)
// 3. Pana Spray Plus (500ml) (No RFQs / No orders linked)
const CROP_RECT = {
  left: 286,
  top: 195,
  width: 964,
  height: 385,
};

async function generateNurseFinal() {
  if (!existsSync(SOURCE_PATH)) {
    throw new Error(`Source not found: ${SOURCE_PATH}`);
  }

  console.log("Loading source image:", SOURCE_PATH);
  const img = sharp(SOURCE_PATH);
  const meta = await img.metadata();
  console.log(`Source image dimensions: ${meta.width}x${meta.height}`);

  console.log("Extracting raw crop rectangle:", CROP_RECT);
  const cropped = await img.extract(CROP_RECT).toBuffer();

  // Scale cards proportionally to 1504px width (94.0% of canvas width)
  const targetWidth = 1504;
  const targetHeight = Math.round(CROP_RECT.height * (targetWidth / CROP_RECT.width)); // 600px

  console.log(`Rescaling cropped content to: ${targetWidth}x${targetHeight}`);
  const scaled = await sharp(cropped)
    .resize(targetWidth, targetHeight, {
      kernel: sharp.kernel.lanczos3,
    })
    .toBuffer();

  // Centering calculations with modest balanced mint framing
  const leftOffset = Math.round((CANVAS_WIDTH - targetWidth) / 2); // 48px
  const topOffset = Math.round((CANVAS_HEIGHT - targetHeight) / 2); // 20px

  console.log(`Compositing at left=${leftOffset}, top=${topOffset} on ${CANVAS_WIDTH}x${CANVAS_HEIGHT} canvas`);

  await sharp({
    create: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      channels: 4,
      background: MINT_BG,
    },
  })
    .composite([
      {
        input: scaled,
        left: leftOffset,
        top: topOffset,
      },
    ])
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
    })
    .toFile(OUTPUT_PATH);

  console.log(`Saved final Nurse asset to: ${OUTPUT_PATH}`);
  console.log(
    `Useful content occupancy in asset: W=${((targetWidth / CANVAS_WIDTH) * 100).toFixed(1)}% (${targetWidth}px), H=${((targetHeight / CANVAS_HEIGHT) * 100).toFixed(1)}% (${targetHeight}px)`
  );
}

generateNurseFinal().catch((err) => {
  console.error(err);
  process.exit(1);
});
