/**
 * Final demo identity cleanup (merge polish).
 *
 * 1) Real company email domains → reserved .example domains (brands untouched)
 * 2) Personal names → consistent fictional contacts
 * 3) RFQ supplier labels made consistent (no mixed personal/brand leftovers)
 *
 * Usage: node scripts/final-demo-identity-cleanup.mjs
 */
import Tesseract from "tesseract.js";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = path.resolve(".");
const DIR = path.join(ROOT, "public/product-screens");

const NAME_MAP = [
  { from: /^john\s+brown$/i, to: "Daniel Harris" },
  { from: /^john$/i, to: "Daniel" }, // only used with adjacent Brown
  { from: /^ingrid$/i, to: "Emma Foster" },
  { from: /^marcus\s+hale$/i, to: "Daniel Harris" },
  { from: /^marcus$/i, to: "Daniel" },
  { from: /^elena\s+voss\.?$/i, to: "Emma Foster" },
  { from: /^elena$/i, to: "Emma" },
];

/** Exact email rewrites — local-part kept where possible; TLD forced to .example */
const EMAIL_REWRITE = [
  [/orders@ashcombedental\.co\.uk/i, "orders@ashcombedental.example"],
  [/uk\.?orders@blackthorndental\.co\.uk/i, "uk.orders@blackthorndental.example"],
  [/orders@blackthorndental\.co\.uk/i, "orders@blackthorndental.example"],
  [/sales@ferrowvale\.co\.?uk/i, "sales@ferrowvale.example"],
  [/hello@marlindental\.co\.?uk/i, "hello@marlindental.example"],
  [/care@willowbrooksupplies\.co\.uk/i, "care@willowbrooksupplies.example"],
  [/orders@northgatesupplies\.co\.uk/i, "orders@northgatesupplies.example"],
  [/hello@mertondentalimports\.co\.?uk/i, "hello@mertondentalimports.example"],
  [/orders@kentexpress\.co\.uk/i, "orders@kentexpress.example"],
  [/uk\.?orders@henryschein\.co\.uk/i, "uk.orders@henryschein.example"],
  [/orders@henryschein\.co\.?uk/i, "orders@henryschein.example"],
  [/sales@dentaldirectory\.co\.?uk/i, "sales@dentaldirectory.example"],
  [/hello@practicesupplies\.co\.uk/i, "hello@practicesupplies.example"],
  [/purchasing@practice\.co\.uk/i, "care@smilesource.example"],
  [/orders@schottlander\.com/i, "orders@schottlander.example"],
  [/no_mail@mail\.co\.uk/i, "web@notino.example"],
  [/no\.?mail@mail\.co\.uk/i, "web@notino.example"],
  [/orders@practice\.co\.uk/i, "orders@aldergatedentalcare.example"],
  [/purchasing@aldergatedentalcare\.test/i, "purchasing@aldergatedentalcare.example"],
  [/orders@aldergatedentalcare\.test/i, "orders@aldergatedentalcare.example"],
];

const TARGETS = [
  "mkt-suppliers.webp",
  "mkt-tour-suppliers.webp",
  "suppliers-page.webp",
  "mkt-purchase-orders.webp",
  "purchase-orders.webp",
  "mkt-tour-orders.webp",
  "mkt-rfq-workflow.webp",
  "mkt-tour-rfq.webp",
  "rfq-comparison.webp",
  "screen-13.webp",
  "screen-28.webp",
];

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

async function sampleColor(buf, x, y) {
  const meta = await sharp(buf).metadata();
  const cx = Math.max(0, Math.min(Math.round(x), meta.width - 2));
  const cy = Math.max(0, Math.min(Math.round(y), meta.height - 2));
  const { data } = await sharp(buf)
    .extract({ left: cx, top: cy, width: 2, height: 2 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return `rgb(${data[0]},${data[1]},${data[2]})`;
}

async function writeOut(buf, dest) {
  let out;
  if (dest.endsWith(".webp")) out = await sharp(buf).webp({ quality: 92, effort: 5 }).toBuffer();
  else if (dest.endsWith(".jpg") || dest.endsWith(".jpeg"))
    out = await sharp(buf).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
  else out = await sharp(buf).png().toBuffer();
  const tmp = dest + ".finaltmp";
  await fs.writeFile(tmp, out);
  await fs.copyFile(tmp, dest);
  await fs.unlink(tmp).catch(() => {});
}

async function paintText(buf, { x, y, x1, y1 }, text, fontSize, fill = "#64748B") {
  const left = Math.max(0, Math.floor(x) - 2);
  const top = Math.max(0, Math.floor(y) - 2);
  const height = Math.max(Math.ceil(y1 - y) + 6, fontSize + 6);
  const clearW = Math.max(
    Math.ceil(x1 - x) + 10,
    Math.ceil(text.length * fontSize * 0.58) + 12,
  );
  const bg = await sampleColor(buf, Math.max(0, left - 4), top + height / 2);
  const meta = await sharp(buf).metadata();
  const baseline = Math.round(y + (y1 - y) * 0.82);
  const svg = Buffer.from(`<svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${left}" y="${top}" width="${clearW}" height="${height}" fill="${bg}"/>
    <text x="${left + 1}" y="${baseline}"
      font-family="Segoe UI, Arial, sans-serif" font-size="${fontSize}" font-weight="500"
      fill="${fill}">${esc(text)}</text>
  </svg>`);
  return sharp(buf).composite([{ input: svg, left: 0, top: 0 }]).toBuffer();
}

function rewriteEmail(raw) {
  const cleaned = raw.replace(/\s+/g, "").replace(/\.couk$/i, ".co.uk");
  for (const [re, to] of EMAIL_REWRITE) {
    if (re.test(cleaned) || re.test(raw)) return to;
  }
  // Generic: any non-.example / non-.test company-looking domain → .example
  const m = cleaned.match(/^([^@]+)@([^.]+)\.(.+)$/i);
  if (m) {
    const [, local, host, tld] = m;
    if (!/\b(example|test)$/i.test(tld) && !/\b(example|test)$/i.test(host)) {
      return `${local}@${host}.example`;
    }
  }
  return null;
}

function mergeEmailFragments(words) {
  // Join adjacent @ fragments on same baseline into full emails
  const sorted = [...words].sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0);
  const emails = [];
  for (let i = 0; i < sorted.length; i++) {
    const w = sorted[i];
    if (!/@/.test(w.text) && !/\.(co\.?uk|com)$/i.test(w.text)) continue;
    let text = w.text;
    let x = w.bbox.x0;
    let y = w.bbox.y0;
    let x1 = w.bbox.x1;
    let y1 = w.bbox.y1;
    // absorb neighbours on same line
    for (let j = 0; j < sorted.length; j++) {
      if (j === i) continue;
      const o = sorted[j];
      if (Math.abs(o.bbox.y0 - y) > 10) continue;
      const gap = o.bbox.x0 - x1;
      const gapL = x - o.bbox.x1;
      if (gap >= 0 && gap < 18) {
        text += o.text;
        x1 = Math.max(x1, o.bbox.x1);
        y1 = Math.max(y1, o.bbox.y1);
      } else if (gapL >= 0 && gapL < 18) {
        text = o.text + text;
        x = Math.min(x, o.bbox.x0);
        y = Math.min(y, o.bbox.y0);
      }
    }
    if (/@/.test(text)) emails.push({ text, x, y, x1, y1, conf: w.confidence });
  }
  // de-dupe overlapping
  const uniq = [];
  for (const e of emails.sort((a, b) => a.y - b.y || a.x - b.x)) {
    if (uniq.some((u) => Math.abs(u.y - e.y) < 8 && Math.abs(u.x - e.x) < 40)) continue;
    uniq.push(e);
  }
  return uniq;
}

async function processFile(rel) {
  const file = path.join(DIR, rel);
  try {
    await fs.access(file);
  } catch {
    console.log("· missing", rel);
    return false;
  }

  let buf = await sharp(file).toBuffer();
  const { data } = await Tesseract.recognize(await sharp(buf).png().toBuffer(), "eng", {
    logger: () => {},
  });
  const words = data.words.filter((w) => w.confidence > 28);
  let changed = false;

  // --- emails ---
  const emailHits = mergeEmailFragments(words);
  // Also catch full-text regex emails without boxes via line scan
  for (const e of emailHits) {
    const next = rewriteEmail(e.text);
    if (!next || next === e.text.replace(/\s+/g, "")) continue;
    const fontSize = Math.max(10, Math.min(13, Math.round((e.y1 - e.y) * 0.95)));
    buf = await paintText(buf, e, next, fontSize, "#64748B");
    changed = true;
    console.log(`  email ${e.text} → ${next}`);
  }

  // Fallback known rows if OCR missed a domain but we know the file
  if (/suppliers/i.test(rel)) {
    const text = data.text;
    for (const [re, to] of EMAIL_REWRITE) {
      if (re.test(text) && !emailHits.some((e) => rewriteEmail(e.text) === to)) {
        // find any word matching part of the pattern
        const partial = words.find((w) => re.test(w.text) || re.test(w.text.replace(/\s/g, "")));
        if (partial) {
          buf = await paintText(
            buf,
            {
              x: partial.bbox.x0,
              y: partial.bbox.y0,
              x1: partial.bbox.x0 + Math.ceil(to.length * 7.2),
              y1: partial.bbox.y1,
            },
            to,
            12,
            "#64748B",
          );
          changed = true;
          console.log(`  email-fallback → ${to}`);
        }
      }
    }
  }

  // --- personal names (supplier contacts) ---
  // John Brown as two words
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (/^john$/i.test(w.text) && w.confidence > 40) {
      const next = words.find(
        (o) =>
          /^brown$/i.test(o.text) &&
          Math.abs(o.bbox.y0 - w.bbox.y0) < 12 &&
          o.bbox.x0 > w.bbox.x0 - 5,
      );
      if (next) {
        buf = await paintText(
          buf,
          {
            x: w.bbox.x0,
            y: Math.min(w.bbox.y0, next.bbox.y0),
            x1: next.bbox.x1,
            y1: Math.max(w.bbox.y1, next.bbox.y1),
          },
          "Daniel Harris",
          Math.max(11, Math.round(w.bbox.y1 - w.bbox.y0)),
          "#0F172A",
        );
        changed = true;
        console.log("  name John Brown → Daniel Harris");
      }
    }
    if (/^ingrid$/i.test(w.text) && w.confidence > 40) {
      buf = await paintText(
        buf,
        {
          x: w.bbox.x0,
          y: w.bbox.y0,
          x1: w.bbox.x1,
          y1: w.bbox.y1,
        },
        "Emma Foster",
        Math.max(11, Math.round((w.bbox.y1 - w.bbox.y0) * 0.9)),
        "#0F172A",
      );
      changed = true;
      console.log("  name Ingrid → Emma Foster");
    }
    if (/^marcus$/i.test(w.text) && w.confidence > 40) {
      const next = words.find(
        (o) =>
          /^hale$/i.test(o.text) &&
          Math.abs(o.bbox.y0 - w.bbox.y0) < 12 &&
          o.bbox.x0 > w.bbox.x0 - 5,
      );
      if (next) {
        buf = await paintText(
          buf,
          {
            x: w.bbox.x0,
            y: Math.min(w.bbox.y0, next.bbox.y0),
            x1: next.bbox.x1,
            y1: Math.max(w.bbox.y1, next.bbox.y1),
          },
          "Daniel Harris",
          Math.max(11, Math.round(w.bbox.y1 - w.bbox.y0)),
          "#0F172A",
        );
        changed = true;
        console.log("  name Marcus Hale → Daniel Harris");
      }
    }
    if (/^elena$/i.test(w.text) && w.confidence > 40) {
      const next = words.find(
        (o) =>
          /^voss\.?$/i.test(o.text) &&
          Math.abs(o.bbox.y0 - w.bbox.y0) < 14 &&
          o.bbox.x0 > w.bbox.x0 - 5,
      );
      const box = next
        ? {
            x: w.bbox.x0,
            y: Math.min(w.bbox.y0, next.bbox.y0),
            x1: next.bbox.x1,
            y1: Math.max(w.bbox.y1, next.bbox.y1),
          }
        : { x: w.bbox.x0, y: w.bbox.y0, x1: w.bbox.x1 + 50, y1: w.bbox.y1 };
      buf = await paintText(
        buf,
        box,
        "Emma Foster",
        Math.max(11, Math.round((w.bbox.y1 - w.bbox.y0) * 0.9)),
        "#0F172A",
      );
      changed = true;
      console.log("  name Elena → Emma Foster");
    }
  }

  if (changed) {
    await writeOut(buf, file);
    console.log(`✓ ${rel}`);
  } else {
    console.log(`· no changes — ${rel}`);
  }
  return changed;
}

async function forceSupplierEmails() {
  // Deterministic email column rewrites for vendor tables (OCR is flaky on domains)
  const jobs = [
    {
      file: "mkt-suppliers.webp",
      // measured from high-res email column crop; original canvas 1440x900
      // Emails sit around x≈781–960; row baselines from earlier OCR
      rows: [
        { y: 127, text: "orders@ashcombedental.example" },
        { y: 210, text: "uk.orders@blackthorndental.example" },
        { y: 292, text: "sales@ferrowvale.example" },
        { y: 374, text: "hello@marlindental.example" },
        { y: 456, text: "care@willowbrooksupplies.example" },
        { y: 538, text: "orders@northgatesupplies.example" },
        { y: 615, text: "hello@mertondentalimports.example" },
      ],
      x: 781,
      x1: 980,
      fontSize: 12,
    },
    {
      file: "suppliers-page.webp",
      rows: [
        { y: 126, text: "orders@kentexpress.example" },
        { y: 214, text: "uk.orders@henryschein.example" },
        { y: 302, text: "sales@dentaldirectory.example" },
        { y: 390, text: "hello@practicesupplies.example" },
        { y: 478, text: "care@smilesource.example" },
        { y: 566, text: "orders@schottlander.example" },
        { y: 642, text: "web@notino.example" },
      ],
      x: 841,
      x1: 1020,
      fontSize: 12,
    },
  ];

  for (const job of jobs) {
    const file = path.join(DIR, job.file);
    let buf = await sharp(file).toBuffer();
    for (const row of job.rows) {
      buf = await paintText(
        buf,
        { x: job.x, y: row.y - 2, x1: job.x1, y1: row.y + 14 },
        row.text,
        job.fontSize,
        "#64748B",
      );
    }
    await writeOut(buf, file);
    console.log(`✓ forced emails — ${job.file}`);
  }

  // tour suppliers — scale from 1440→1200 roughly
  {
    const file = path.join(DIR, "mkt-tour-suppliers.webp");
    try {
      await fs.access(file);
      let buf = await sharp(file).toBuffer();
      const meta = await sharp(buf).metadata();
      // Use OCR for this smaller canvas
      const { data } = await Tesseract.recognize(await sharp(buf).png().toBuffer(), "eng", {
        logger: () => {},
      });
      for (const e of mergeEmailFragments(data.words.filter((w) => w.confidence > 25))) {
        const next = rewriteEmail(e.text);
        if (!next) continue;
        buf = await paintText(buf, e, next, 11, "#64748B");
        console.log(`  tour-sup email ${e.text} → ${next}`);
      }
      // Also cover known practice/gmail-looking leftovers by scanning text
      const replacements = [
        { re: /henryschein/i, to: "uk.orders@henryschein.example", yHint: 191 },
        { re: /kentexpress/i, to: "orders@kentexpress.example", yHint: 120 },
        { re: /notino|no.?mail|gmailcouk/i, to: "web@notino.example", yHint: 510 },
        { re: /dentaldirectory/i, to: "sales@dentaldirectory.example", yHint: 280 },
        { re: /practicesupplies/i, to: "hello@practicesupplies.example", yHint: 350 },
        { re: /schottlander/i, to: "orders@schottlander.example", yHint: 450 },
        { re: /practice\.co/i, to: "care@smilesource.example", yHint: 400 },
      ];
      for (const r of replacements) {
        const w = data.words.find((x) => r.re.test(x.text) && x.confidence > 25);
        if (!w) continue;
        if (!/@/.test(w.text) && !/mail|orders|sales|hello|care|web/i.test(w.text)) continue;
        buf = await paintText(
          buf,
          {
            x: Math.min(w.bbox.x0, meta.width - 220),
            y: w.bbox.y0 - 1,
            x1: Math.min(meta.width - 20, w.bbox.x0 + 200),
            y1: w.bbox.y1 + 2,
          },
          r.to,
          10,
          "#64748B",
        );
      }
      await writeOut(buf, file);
      console.log("✓ mkt-tour-suppliers.webp");
    } catch {
      console.log("· skip mkt-tour-suppliers.webp");
    }
  }
}

async function forceRfqContacts() {
  // RFQ column header + order-summary supplier label (personal name used as supplier)
  const jobs = [
    {
      file: "mkt-rfq-workflow.webp",
      boxes: [
        { x: 732, y: 77, x1: 820, y1: 103, text: "Emma Foster", fontSize: 14 },
        { x: 418, y: 618, x1: 520, y1: 640, text: "Emma Foster", fontSize: 13 },
      ],
    },
    {
      file: "mkt-tour-rfq.webp",
      boxes: [
        { x: 609, y: 72, x1: 690, y1: 102, text: "Emma Foster", fontSize: 12 },
        { x: 348, y: 515, x1: 440, y1: 535, text: "Emma Foster", fontSize: 11 },
      ],
    },
  ];
  for (const job of jobs) {
    const file = path.join(DIR, job.file);
    let buf = await sharp(file).toBuffer();
    for (const b of job.boxes) {
      buf = await paintText(buf, b, b.text, b.fontSize, "#0F172A");
    }
    await writeOut(buf, file);
    console.log(`✓ RFQ contacts — ${job.file}`);
  }
}

async function main() {
  console.log("Final demo identity cleanup\n");
  await forceSupplierEmails();
  await forceRfqContacts();
  for (const f of TARGETS) {
    console.log("\n→", f);
    await processFile(f);
  }
  // remove stray tmp
  await fs.unlink(path.join(DIR, "mkt-purchase-orders.webp.tmp")).catch(() => {});
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
