/** FAQ for /resources/dental-supply-request-template — keep in sync with page FAQPage JSON-LD. */
export const supplyRequestFaqs = [
  {
    q: "What is a dental supply request form?",
    a: "An internal record that someone in the practice has asked for something to be bought. This workbook is that record in Excel — not a form you send to a supplier.",
  },
  {
    q: "What information should staff include in a supply request?",
    a: "What is needed, who asked, when, and a quantity if known. Add brand or specification when the exact product, size or shade matters. Location and category help if they are useful. Preferred supplier only if the requester already knows it.",
  },
  {
    q: "What is the difference between a supply request and an order?",
    a: "A request is the ask. An order is the purchase that was placed. REQUESTED does not mean ORDERED. The tracker keeps both stages visible so the team can see whether anyone has dealt with it.",
  },
  {
    q: "Should requested quantity and ordered quantity be separate?",
    a: "Yes. Staff may request 3; the person responsible for ordering may buy a pack of 5. Both facts should stay on the row. The workbook does not force the two quantities to match.",
  },
  {
    q: "Does staff need to know the supplier before requesting something?",
    a: "No. Preferred supplier is optional. A request can be recorded before anyone decides where it will be bought.",
  },
  {
    q: "How should urgent requests be handled?",
    a: "Urgent means the request needs prompt review. It does not approve the purchase and it is not a clinical-emergency classification.",
  },
  {
    q: "Is this a purchase-order template?",
    a: "No. It has no prices, VAT, supplier quotes or receiving. It is an internal request tracker, not a purchase-order form.",
  },
] as const;
