/**
 * Prepare homepage marketing WebP assets from approved source screenshots.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve("public/product-screens");
const SRC = path.resolve(
  process.env.USERPROFILE || process.env.HOME,
  "Desktop/New reacting/app images",
);
const DESKTOP = path.resolve(process.env.USERPROFILE || process.env.HOME, "Desktop");

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function svgBox({
  width,
  height,
  color = "#FFFFFF",
  rx = 4,
  lines = [],
}) {
  const texts = lines
    .map(
      (l) =>
        `<text x="${l.x ?? 10}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size ?? 13}" font-weight="${l.weight ?? 500}" fill="${l.color ?? "#0B1F2A"}">${escapeXml(l.text)}</text>`,
    )
    .join("");
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="${rx}" ry="${rx}" fill="${color}"/>${texts}</svg>`,
  );
}

async function saveWebp(pipeline, name, quality = 84) {
  const out = path.join(OUT, name);
  await pipeline.webp({ quality, effort: 5 }).toFile(out);
  await sharp(out).png().toFile(path.join(OUT, name.replace(/\.webp$/, ".preview.png")));
  const m = await sharp(out).metadata();
  console.log(`✓ ${name}  ${m.width}×${m.height}`);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  const stockSrc = path.join(SRC, "1.stock page.jpg");
  const lowSrc = path.join(SRC, "2. low stock page.jpg");
  const dashSrc = path.join(SRC, "3. dashboard.jpg");
  const expSrc = path.join(SRC, "4. expiry stock.jpg");
  const poSrc = path.join(SRC, "5. purchase order.jpg");
  const rfqSrc = path.join(SRC, "6. rfq.jpg");
  const rfqSumSrc = path.join(SRC, "6.1 rfq order summary.jpg");
  const suppliersSrc = path.join(DESKTOP, "3. suplyer management.jpg");
  const reportSrc = path.join(DESKTOP, "4.4reporting.jpg");

  // Dashboard — actions + alerts, no sidebar
  {
    const m = await sharp(dashSrc).metadata();
    const left = 250;
    const top = 30;
    const width = m.width - left - 16;
    const height = m.height - top - 10;
    await saveWebp(
      sharp(dashSrc)
        .extract({ left, top, width, height })
        .composite([
          {
            input: svgBox({ width: 46, height: 46, color: "#D5E3DE", rx: 23 }),
            left: width - 58,
            top: 6,
          },
        ]),
      "mkt-dashboard.webp",
    );
  }

  // Stock — five complete folder columns (no half card)
  {
    const m = await sharp(stockSrc).metadata();
    const left = 248;
    const top = 18;
    const full = m.width - left - 12;
    const width = Math.round(full * (5 / 6)) - 12;
    const height = m.height - top - 10;
    await saveWebp(
      sharp(stockSrc).extract({ left, top, width, height }),
      "mkt-stock.webp",
    );
  }

  // Low stock — complete first row of 5 cards
  {
    const m = await sharp(lowSrc).metadata();
    const left = 258;
    const top = 18;
    const full = m.width - left - 12;
    // Trim a few px so the 5th card edge isn't clipped
    const width = full - 8;
    const height = 720;
    await saveWebp(
      sharp(lowSrc)
        .extract({ left, top, width, height })
        .composite([
          {
            input: svgBox({ width: 42, height: 42, color: "#D5E3DE", rx: 21 }),
            left: width - 54,
            top: 8,
          },
        ]),
      "mkt-low-stock.webp",
    );
  }

  // Expiry — three complete cards, tight right edge
  {
    const m = await sharp(expSrc).metadata();
    const left = 248;
    const top = 18;
    const width = 980;
    const height = m.height - top - 14;
    await saveWebp(
      sharp(expSrc).extract({ left, top, width, height }),
      "mkt-expiring.webp",
    );
  }

  // Suppliers — full-row professional data rewrite
  {
    const m = await sharp(suppliersSrc).metadata();
    const left = 244;
    const top = 16;
    const width = m.width - left - 18;
    const height = m.height - top - 8;
    const vendors = [
      ["Kent Express", "Orders desk", "orders@kentexpress.co.uk"],
      ["Henry Schein", "Practice sales", "uk.orders@example-supplier.co.uk"],
      ["Dental Directory", "Account team", "sales@dentaldirectory.example"],
      ["Practice Supplies UK", "Purchasing", "purchasing@practicesupplies.example"],
      ["Schottlander", "Customer service", "orders@schottlander.example"],
      ["SmileSource Supplies", "Sales", "sales@smilesource.example"],
      ["TOC Dental", "Orders", "orders@tocdental.example"],
      ["Premium Plus UK", "Accounts", "accounts@premiumplus.example"],
      ["ArosChem", "Sales desk", "sales@aroschem.example"],
    ];
    const rowH = 64;
    const row0 = 108;
    const composites = [
      {
        input: svgBox({ width: 42, height: 42, color: "#D5E3DE", rx: 21 }),
        left: width - 54,
        top: 8,
      },
    ];
    vendors.forEach(([name, contact, email], i) => {
      const y = row0 + i * rowH;
      if (y + 50 > height) return;
      // Cover name + website
      composites.push({
        input: svgBox({
          width: 300,
          height: 48,
          lines: [
            { text: name, y: 18, size: 13, weight: 600 },
            { text: "Recognised dental supplier", y: 34, size: 10, color: "#7A8B93" },
          ],
        }),
        left: 52,
        top: y,
      });
      // Contact
      composites.push({
        input: svgBox({
          width: 190,
          height: 32,
          lines: [{ text: contact, y: 20, size: 12, color: "#2A3A42" }],
        }),
        left: 370,
        top: y + 6,
      });
      // Email
      composites.push({
        input: svgBox({
          width: 340,
          height: 32,
          lines: [{ text: email, y: 20, size: 12, color: "#2A3A42" }],
        }),
        left: 580,
        top: y + 6,
      });
    });
    await saveWebp(
      sharp(suppliersSrc).extract({ left, top, width, height }).composite(composites),
      "mkt-suppliers.webp",
    );
  }

  // Reporting
  {
    const m = await sharp(reportSrc).metadata();
    const left = 241;
    const top = 16;
    const width = m.width - left - 12;
    const height = m.height - top - 8;
    await saveWebp(
      sharp(reportSrc).extract({ left, top, width, height }),
      "mkt-reporting.webp",
      86,
    );
  }

  // Purchase orders — cover entire supplier column
  {
    const m = await sharp(poSrc).metadata();
    const left = 258;
    const top = 18;
    const width = m.width - left - 14;
    const height = m.height - top - 10;
    const names = ["Kent Express", "Henry Schein", "Dental Directory", "Schottlander"];
    const composites = [
      {
        input: svgBox({ width: 42, height: 42, color: "#D5E3DE", rx: 21 }),
        left: width - 54,
        top: 6,
      },
    ];
    // Supplier column sits after Order (~210px into content)
    const supplierLeft = 210;
    const tableTop = 455;
    const rowH = 76;
    names.forEach((name, i) => {
      composites.push({
        input: svgBox({
          width: 168,
          height: 36,
          lines: [{ text: name, y: 22, size: 13, weight: 600 }],
        }),
        left: supplierLeft,
        top: tableTop + i * rowH,
      });
    });
    await saveWebp(
      sharp(poSrc).extract({ left, top, width, height }).composite(composites),
      "mkt-purchase-orders.webp",
    );
  }

  // RFQ continuous page
  {
    const rfq = await sharp(rfqSrc).metadata();
    const sum = await sharp(rfqSumSrc).metadata();
    const left = 255;
    const top = 18;
    const mainW = rfq.width - left - 14;
    const mainH = 600;

    const mainPatches = [
      { input: svgBox({ width: 42, height: 42, color: "#D5E3DE", rx: 21 }), left: mainW - 54, top: 6 },
      // Cover Lithuanian title + badge area, rewrite
      {
        input: svgBox({
          width: 520,
          height: 56,
          color: "#FFFFFF",
          lines: [
            { text: "Urgent order", y: 34, size: 26, weight: 700 },
          ],
        }),
        left: 24,
        top: 68,
      },
      {
        input: svgBox({
          width: 110,
          height: 28,
          color: "#E7F5EF",
          rx: 14,
          lines: [{ text: "Responses", y: 18, size: 12, weight: 600, color: "#1F6B52" }],
        }),
        left: 280,
        top: 82,
      },
      {
        input: svgBox({
          width: 980,
          height: 30,
          color: "#FFFFFF",
          lines: [
            {
              text: "Created 25 Jun 2026 · Updated 11 Jul 2026 · 2/2 suppliers replied · 1/3 quotes selected",
              y: 20,
              size: 12,
              color: "#5B6B73",
            },
          ],
        }),
        left: 24,
        top: 128,
      },
      // Supplier column headers
      {
        input: svgBox({
          width: 200,
          height: 30,
          lines: [{ text: "Henry Schein", y: 20, size: 13, weight: 600 }],
        }),
        left: 420,
        top: 178,
      },
      {
        input: svgBox({
          width: 200,
          height: 30,
          lines: [{ text: "Kent Express", y: 20, size: 13, weight: 600 }],
        }),
        left: 660,
        top: 178,
      },
      // Bottom selected supplier label
      {
        input: svgBox({
          width: 200,
          height: 30,
          lines: [{ text: "Kent Express", y: 20, size: 13, weight: 600 }],
        }),
        left: 980,
        top: 530,
      },
    ];

    const mainBuf = await sharp(rfqSrc)
      .extract({ left, top, width: mainW, height: mainH })
      .composite(mainPatches)
      .png()
      .toBuffer();

    const sLeft = 248 + 300;
    const sTop = 95;
    const sW = sum.width - sLeft - 20;
    const sH = sum.height - sTop - 20;
    const sumBuf = await sharp(rfqSumSrc)
      .extract({ left: sLeft, top: sTop, width: sW, height: sH })
      .composite([
        {
          input: svgBox({
            width: 240,
            height: 30,
            lines: [{ text: "Kent Express", y: 20, size: 14, weight: 600 }],
          }),
          left: 36,
          top: 40,
        },
        {
          input: svgBox({
            width: 240,
            height: 30,
            lines: [{ text: "Henry Schein", y: 20, size: 14, weight: 600 }],
          }),
          left: 36,
          top: 168,
        },
      ])
      .resize({ width: mainW - 32 })
      .png()
      .toBuffer();

    const sumMeta = await sharp(sumBuf).metadata();
    const canvasW = mainW + 32;
    const canvasH = 44 + mainH + 20 + sumMeta.height + 20;
    const header = svgBox({
      width: canvasW,
      height: 44,
      color: "#F4F8F7",
      rx: 0,
      lines: [
        { text: "RFQ · Urgent order", y: 28, size: 15, weight: 600 },
        { text: "Dental Assist", x: canvasW - 130, y: 28, size: 12, color: "#5B6B73" },
      ],
    });

    const composed = await sharp({
      create: {
        width: canvasW,
        height: canvasH,
        channels: 3,
        background: "#EEF5F2",
      },
    })
      .composite([
        { input: header, left: 0, top: 0 },
        { input: mainBuf, left: 16, top: 44 },
        { input: sumBuf, left: 16, top: 44 + mainH + 16 },
      ])
      .webp({ quality: 84, effort: 5 })
      .toBuffer();

    await fs.writeFile(path.join(OUT, "mkt-rfq-workflow-full.webp"), composed);
    await sharp(composed)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(path.join(OUT, "mkt-rfq-workflow.webp"));
    await sharp(path.join(OUT, "mkt-rfq-workflow.webp"))
      .png()
      .toFile(path.join(OUT, "mkt-rfq-workflow.preview.png"));
    const fm = await sharp(path.join(OUT, "mkt-rfq-workflow-full.webp")).metadata();
    console.log(`✓ mkt-rfq-workflow.webp + full ${fm.width}×${fm.height}`);
  }

  // Clean probes / temp
  for (const f of [
    "mkt-reporting.webp.tmp.webp",
    "_probe-po.png",
    "_probe-po2.png",
    "_probe-rfq-title.png",
    "_probe-rfq-sup.png",
    "_probe-sup.png",
  ]) {
    try {
      await fs.unlink(path.join(OUT, f));
    } catch {
      /* ignore */
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
