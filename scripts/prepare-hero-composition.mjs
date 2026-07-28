/**
 * Final HERO composition — rebuild dashboard + Budget + Actions from original JPG.
 * Crops are intentionally framed (with white pad); no object-contain workaround needed.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { execSync } from "node:child_process";

const OUT = path.resolve("public/product-screens");
const APP = path.join(process.env.USERPROFILE, "Desktop/New reacting/app images");
const SRC = path.join(APP, "3. dashboard.jpg");
const BG = "#F4F8F7";
const CARD = "#FFFFFF";
const PAD = 32; // clear breathing room — content never touches the card edge

async function save(buf, name) {
  const alt = path.join(OUT, `alt-${name}`);
  await fs.writeFile(alt, buf);
  const dest = path.join(OUT, name);
  execSync(
    `powershell -NoProfile -Command "Copy-Item -LiteralPath '${alt.replace(/'/g, "''")}' -Destination '${dest.replace(/'/g, "''")}' -Force"`,
    { stdio: "pipe" },
  );
  await fs.unlink(alt).catch(() => {});
  const m = await sharp(dest).metadata();
  console.log(`✓ ${name}  ${m.width}×${m.height}`);
}

/** Extract, scrub edge fragments, pad white, centre content. */
async function panelCrop({ left, top, width, height, outW, outH, name, scrubTop = 0, scrubBottom = 0 }) {
  let core = await sharp(SRC)
    .extract({ left, top, width, height })
    .png()
    .toBuffer();

  const overlays = [];
  if (scrubTop > 0) {
    overlays.push({
      input: await sharp({
        create: { width, height: scrubTop, channels: 3, background: CARD },
      })
        .png()
        .toBuffer(),
      left: 0,
      top: 0,
    });
  }
  if (scrubBottom > 0) {
    overlays.push({
      input: await sharp({
        create: { width, height: scrubBottom, channels: 3, background: CARD },
      })
        .png()
        .toBuffer(),
      left: 0,
      top: height - scrubBottom,
    });
  }
  if (overlays.length) {
    core = await sharp(core).composite(overlays).png().toBuffer();
  }

  // Always pad first, then scale the padded canvas — guarantees PAD on every edge
  const padded = await sharp({
    create: {
      width: width + PAD * 2,
      height: height + PAD * 2,
      channels: 3,
      background: CARD,
    },
  })
    .composite([{ input: core, left: PAD, top: PAD }])
    .png()
    .toBuffer();

  const buf = await sharp(padded)
    .resize({
      width: outW,
      height: outH,
      fit: "contain",
      background: CARD,
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 95, effort: 6 })
    .toBuffer();

  await save(buf, name);
}

async function main() {
  const dm = await sharp(SRC).metadata();
  console.log(`Source ${dm.width}×${dm.height}`);

  // ─── Main dashboard — 16:10 canvas, even margins, lanczos, no upscale blur ───
  {
    const content = await sharp(SRC)
      .extract({
        left: 248,
        top: 8,
        width: dm.width - 260,
        height: dm.height - 14,
      })
      .png()
      .toBuffer();

    const fitted = await sharp(content)
      .resize({
        width: 1600 - 24,
        height: 1000 - 24,
        fit: "inside",
        background: BG,
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer();
    const fm = await sharp(fitted).metadata();
    const left = Math.round((1600 - fm.width) / 2);
    const top = Math.round((1000 - fm.height) / 2);
    await save(
      await sharp({ create: { width: 1600, height: 1000, channels: 3, background: BG } })
        .composite([{ input: fitted, left, top }])
        .webp({ quality: 92, effort: 6 })
        .toBuffer(),
      "mkt-dashboard.webp",
    );
  }

  // ─── Budget — spend · progress · budget · remaining (story: saves money) ───
  await panelCrop({
    left: 280,
    top: 298,
    width: 644,
    height: 388,
    outW: 460,
    outH: 312,
    scrubTop: 10,
    name: "mkt-hero-budget.webp",
  });

  // ─── Actions — title · why · two decisions (story: prevents shortages) ───
  await panelCrop({
    left: 968,
    top: 300,
    width: 736,
    height: 278,
    outW: 600,
    outH: 288,
    scrubTop: 14,
    scrubBottom: 6,
    name: "mkt-hero-actions.webp",
  });

  // QA previews
  await fs.mkdir(path.join(OUT, "_qa"), { recursive: true });
  for (const n of ["mkt-dashboard", "mkt-hero-budget", "mkt-hero-actions"]) {
    await sharp(path.join(OUT, `${n}.webp`)).png().toFile(path.join(OUT, "_qa", `${n}.png`));
  }
  console.log("\nHero composition assets rebuilt.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
