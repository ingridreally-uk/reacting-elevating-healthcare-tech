import type { LeadInput } from "./schema.ts";

export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n\0]/g, " ").replace(/\s+/g, " ").trim();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function line(label: string, value: string | undefined): string | null {
  const v = value?.trim();
  if (!v) return null;
  return `${label}: ${v}`;
}

export function composeLeadEmail(input: LeadInput, sentAt: Date): {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
} {
  const timestamp = sentAt.toISOString();
  const replyTo = sanitizeHeader(input.email);

  if (input.source === "book-demo") {
    const subject = sanitizeHeader(`Book Demo — ${input.practiceName}`);
    const rows = [
      line("First name", input.firstName),
      line("Last name", input.lastName),
      line("Work email", input.email),
      line("Practice", input.practiceName),
      line("Role", input.role),
      line("Number of surgeries", input.surgeries),
      line("Notes", input.notes),
      "Source: Book Demo",
      `Submitted: ${timestamp}`,
    ].filter(Boolean) as string[];
    return { subject, text: rows.join("\n"), html: toHtml(rows), replyTo };
  }

  const subject = sanitizeHeader(`Contact — ${input.name}`);
  const rows = [
    line("Name", input.name),
    line("Work email", input.email),
    line("Practice/company", input.company),
    line("Message", input.message),
    "Source: Contact",
    `Submitted: ${timestamp}`,
  ].filter(Boolean) as string[];
  return { subject, text: rows.join("\n"), html: toHtml(rows), replyTo };
}

function toHtml(rows: string[]): string {
  const body = rows
    .map((row) => `<p style="margin:0 0 8px">${escapeHtml(row).replace(/\n/g, "<br/>")}</p>`)
    .join("");
  return `<div style="font:14px/1.5 system-ui,sans-serif">${body}</div>`;
}
