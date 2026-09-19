/** FAQ for /resources/dental-stocktake-checklist — keep in sync with page FAQPage JSON-LD. */
export const stocktakeFaqs = [
  {
    q: "What should be included in a dental stocktake?",
    a: "Include the materials the practice actually holds and reorders: where each item lives, what it is, pack size, current quantity, a minimum level if the practice uses one, the earliest relevant expiry, and whether replenishment is already on order. Brand or supplier details help identify the right pack. It is an operational list, not a legal catalogue of every possible SKU.",
  },
  {
    q: "How often should a dental practice complete a stocktake?",
    a: "There is no single interval that fits every practice. Frequency depends on how the practice manages materials and how quickly the picture changes — how often rooms are restocked, how many people update lists, and how long the last count stays usable. Count often enough that the register still helps the next order. Controlled drugs and some medicines can have separate checking requirements; those records are outside this template.",
  },
  {
    q: "How should minimum stock levels be set?",
    a: "Minimum Level is the practice’s chosen reorder threshold, not a figure the workbook calculates. A practical starting point is typical use, plus supplier lead time, then adjust from what previous counts show. Leave Minimum blank if you have not set one — the workbook will not raise a false reorder.",
  },
  {
    q: "How should expiry dates be recorded?",
    a: "Enter the expiry shown on the pack or item where it is relevant. If there is no date, leave Earliest Expiry blank. The warning period on Start here is editable so the practice can choose when EXPIRING SOON appears; it is a workbook setting, not a regulatory period.",
  },
  {
    q: "What if the same material has different expiry dates?",
    a: "Use a separate row for each expiry. That is a manual counting convention so the earliest date is not hidden inside a mixed pile. It is not batch traceability or a recall system.",
  },
  {
    q: "Can I use this template in Excel?",
    a: "Yes. It is a free .xlsx workbook designed for Excel. Download it and open it in Excel to enter the count. Compatibility with other spreadsheet apps has not been tested.",
  },
  {
    q: "Is this a compliance template?",
    a: "No. It is an operational stocktake tool for general dental materials and consumables. It is not a controlled-drug register, a medicines-management compliance system, a batch or recall system, or a guarantee of CQC, GDC, HTM or MHRA compliance.",
  },
] as const;
