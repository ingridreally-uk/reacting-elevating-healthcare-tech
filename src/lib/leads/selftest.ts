/**
 * Isolated lead-pipeline checks. Run:
 * node --experimental-strip-types src/lib/leads/selftest.ts
 */
import assert from "node:assert/strict";
import { composeLeadEmail, sanitizeHeader } from "./compose.ts";
import { MIN_SUBMIT_MS } from "./constants.ts";
import { readLeadConfig, readServerSecret } from "./env.ts";
import { isHoneypotFilled, isImplausibleSubmitTime, processLead, type LeadDeps } from "./processLead.ts";
import { leadInputSchema } from "./schema.ts";

const now = 1_700_000_000_000;

function deps(overrides: Partial<LeadDeps> = {}): LeadDeps {
  return {
    now: () => now,
    readConfig: () => ({
      ok: true,
      config: {
        resendApiKey: "re_test",
        leadFrom: "Reacting Website <info@reacting.io>",
        leadTo: "info@reacting.io",
        turnstileSecret: "secret",
      },
    }),
    verifyTurnstile: async () => true,
    sendEmail: async () => ({ ok: true }),
    ...overrides,
  };
}

const bookDemo = {
  source: "book-demo" as const,
  firstName: "Jane",
  lastName: "Reed",
  email: "jane@practice.example",
  practiceName: "High Street Dental",
  role: "Practice Manager",
  surgeries: "4",
  notes: "Prefer Thursday.",
  turnstileToken: "token",
  honeypot: "",
  startedAt: now - 5_000,
};

const contact = {
  source: "contact" as const,
  name: "Jane Reed",
  email: "jane@practice.example",
  company: "High Street Dental",
  message: "Can we talk about onboarding?",
  turnstileToken: "token",
  honeypot: "",
  startedAt: now - 5_000,
};

async function run() {
  assert.equal((await processLead(bookDemo, deps())).ok, true, "valid book demo");
  assert.equal((await processLead(contact, deps())).ok, true, "valid contact");

  assert.equal((await processLead({ ...bookDemo, email: "not-an-email" }, deps())).ok, false);
  assert.equal((await processLead({ ...bookDemo, firstName: "" }, deps())).code, "validation");
  assert.equal((await processLead({ ...contact, message: "" }, deps())).code, "validation");
  assert.equal(
    (await processLead({ ...bookDemo, firstName: "x".repeat(200) }, deps())).code,
    "validation",
  );

  assert.equal(isHoneypotFilled("http://spam.test"), true);
  assert.equal((await processLead({ ...bookDemo, honeypot: "bot" }, deps())).code, "spam");

  assert.equal(isImplausibleSubmitTime(now - 10, now), true);
  assert.equal(isImplausibleSubmitTime(now - MIN_SUBMIT_MS - 1, now), false);
  assert.equal((await processLead({ ...bookDemo, startedAt: now }, deps())).code, "spam");

  assert.equal(
    (await processLead(bookDemo, deps({ verifyTurnstile: async () => false }))).code,
    "turnstile",
  );
  assert.equal(
    (await processLead(bookDemo, deps({ readConfig: () => ({ ok: false, missing: ["RESEND_API_KEY"] }) }))).code,
    "config",
  );
  assert.equal(
    (await processLead(
      bookDemo,
      deps({
        readConfig: () => ({
          ok: false,
          missing: ["TURNSTILE_SECRET_KEY"],
        }),
      }),
    )).code,
    "config",
  );
  assert.equal((await processLead(bookDemo, deps({ sendEmail: async () => ({ ok: false }) }))).code, "delivery");

  const names = ["RESEND_API_KEY", "LEAD_FROM", "LEAD_TO", "TURNSTILE_SECRET_KEY"] as const;
  const previousProcess = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  const previousNitro = (globalThis as { __env__?: Record<string, unknown> }).__env__;
  try {
    for (const name of names) delete process.env[name];
    (globalThis as { __env__?: Record<string, unknown> }).__env__ = undefined;
    const missing = readLeadConfig();
    assert.equal(missing.ok, false);
    if (!missing.ok) {
      assert.deepEqual(missing.missing, [...names]);
    }

    (globalThis as { __env__?: Record<string, unknown> }).__env__ = {
      RESEND_API_KEY: "from-nitro",
      LEAD_FROM: "from-nitro",
      LEAD_TO: "info@reacting.io",
      TURNSTILE_SECRET_KEY: "nitro-secret",
    };
    assert.equal(readServerSecret("RESEND_API_KEY"), "from-nitro");

    process.env.RESEND_API_KEY = "from-process";
    process.env.LEAD_FROM = "from-process";
    process.env.LEAD_TO = "info@reacting.io";
    process.env.TURNSTILE_SECRET_KEY = "process-secret";
    assert.equal(readServerSecret("RESEND_API_KEY"), "from-process");
    const present = readLeadConfig();
    assert.equal(present.ok, true);
    if (present.ok) assert.equal(present.config.resendApiKey, "from-process");
  } finally {
    for (const name of names) {
      if (previousProcess[name] === undefined) delete process.env[name];
      else process.env[name] = previousProcess[name];
    }
    (globalThis as { __env__?: Record<string, unknown> }).__env__ = previousNitro;
  }

  let configBlocked = false;
  const blocked = await processLead(
    bookDemo,
    deps({
      readConfig: () => ({ ok: false, missing: ["RESEND_API_KEY"] }),
      verifyTurnstile: async () => {
        configBlocked = true;
        return true;
      },
      sendEmail: async () => {
        configBlocked = true;
        return { ok: true };
      },
    }),
  );
  assert.equal(blocked.code, "config");
  assert.equal(configBlocked, false);

  const order: string[] = [];
  await processLead(
    bookDemo,
    deps({
      verifyTurnstile: async () => {
        order.push("turnstile");
        return true;
      },
      sendEmail: async () => {
        order.push("resend");
        return { ok: true };
      },
    }),
  );
  assert.deepEqual(order, ["turnstile", "resend"]);

  let sent: unknown;
  await processLead(
    bookDemo,
    deps({
      sendEmail: async (args) => {
        sent = args;
        return { ok: true };
      },
    }),
  );
  const email = sent as { from: string; to: string; replyTo: string; subject: string; text: string };
  assert.equal(email.to, "info@reacting.io");
  assert.equal(email.from, "Reacting Website <info@reacting.io>");
  assert.equal(email.replyTo, "jane@practice.example");
  assert.equal(email.subject, "Book Demo — High Street Dental");
  assert.match(email.text, /Source: Book Demo/);
  assert.doesNotMatch(email.from, /jane@/);

  const injected = composeLeadEmail(
    leadInputSchema.parse({
      ...contact,
      name: "Evil\r\nBcc: spam@evil.test",
    }),
    new Date(now),
  );
  assert.equal(sanitizeHeader("a\r\nBcc: x").includes("\n"), false);
  assert.doesNotMatch(injected.subject, /\n/);

  const parsed = leadInputSchema.parse({
    ...bookDemo,
    email: "  jane@practice.example  ",
    firstName: "  Jane  ",
  });
  assert.equal(parsed.email, "jane@practice.example");
  if (parsed.source === "book-demo") assert.equal(parsed.firstName, "Jane");

  console.log("leads selftest passed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
