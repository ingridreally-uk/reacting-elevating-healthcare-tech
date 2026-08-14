import { createServerFn } from "@tanstack/react-start";
import { processLead, type LeadResult } from "./processLead.ts";

/**
 * Shared Book Demo / Contact submission. Runs only on the server.
 * To/From/source routing are never taken from the visitor.
 * Env/Resend/Turnstile modules are loaded inside the handler so they stay off the client bundle.
 */
export const submitLead = createServerFn({ method: "POST" }).handler(
  async ({ data }): Promise<LeadResult> => {
    try {
      const [{ readLeadConfig }, { verifyTurnstileToken }, { sendResendEmail }] = await Promise.all([
        import("./env.ts"),
        import("./turnstile.ts"),
        import("./resend.ts"),
      ]);
      return await processLead(data, {
        now: () => Date.now(),
        readConfig: readLeadConfig,
        verifyTurnstile: verifyTurnstileToken,
        sendEmail: sendResendEmail,
      });
    } catch {
      return { ok: false, code: "unavailable" };
    }
  },
);
