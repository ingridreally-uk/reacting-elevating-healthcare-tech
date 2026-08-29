import sharp from "sharp";

const src = "public/product-screens/role-manager-purchase-orders.jpg";
const dest = "public/product-screens/role-manager-final.png";

const TW = 1600;
const TH = 1000;
const MINT = "#F3F7F5";

// Exact contiguous source crop:
// Left: 268 (clean margin before left border of content)
// Top: 12 (top of Purchase Orders header)
// Width: 1628 (covers all 4 KPI cards, full controls, full table to right border)
// Height: 752 (from header through bottom of 3rd table row)
const crop = {
  left: 268,
  top: 12,
  width: 1628,
  height: 752,
};

// Scale proportionally to 96% canvas width
const targetW = 1536; // 96% of 1600
const scale = targetW / crop.width;
const sw = Math.round(crop.width * scale); // 1536
const sh = Math.round(crop.height * scale); // 709
const leftOffset = Math.round((TW - sw) / 2); // 32
const topOffset = Math.round((TH - sh) / 2); // 145

const extracted = await sharp(src)
  .extract(crop)
  .resize(sw, sh, { kernel: sharp.kernel.lanczos3 })
  .toBuffer();

const bg = sharp({
  create: {
    width: TW,
    height: TH,
    channels: 3,
    background: MINT,
  },
});

const base = await bg.png().toBuffer();

await sharp(base)
  .composite([
    {
      input: extracted,
      left: leftOffset,
      top: topOffset,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(dest);

console.log("Created", dest, {
  crop,
  scaled: { sw, sh, leftOffset, topOffset },
  wOcc: +(sw / TW).toFixed(3),
  hOcc: +(sh / TH).toFixed(3),
});
