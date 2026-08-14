import { useRef, useState } from "react";
import { submitLead } from "@/lib/leads/submitLead";
import type { LeadResultCode } from "@/lib/leads/processLead";

export type LeadStatus = "idle" | "submitting" | "success" | "error";

export function turnstileSiteKey(): string {
  const key = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  return typeof key === "string" ? key : "";
}

export function useLeadSubmit() {
  const [status, setStatus] = useState<LeadStatus>("idle");
  const [errorCode, setErrorCode] = useState<LeadResultCode | "network" | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedAtRef = useRef(Date.now());
  const inFlight = useRef(false);

  async function submit(data: Record<string, unknown>) {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("submitting");
    setErrorCode(null);
    try {
      const qa =
        import.meta.env.DEV && typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("qaLead")
          : null;
      const result =
        qa === "success"
          ? { ok: true as const }
          : qa === "error"
            ? { ok: false as const, code: "delivery" as const }
            : await submitLead({
                data: {
                  ...data,
                  turnstileToken,
                  startedAt: startedAtRef.current,
                },
              });
      if (result.ok) {
        startedAtRef.current = Date.now();
        setTurnstileToken("");
        window.turnstile?.reset();
        setStatus("success");
        return;
      }
      setErrorCode(result.code);
      setStatus("error");
      window.turnstile?.reset();
      setTurnstileToken("");
    } catch {
      setErrorCode("network");
      setStatus("error");
      window.turnstile?.reset();
      setTurnstileToken("");
    } finally {
      inFlight.current = false;
    }
  }

  return {
    status,
    errorCode,
    turnstileToken,
    setTurnstileToken,
    submit,
    submitting: status === "submitting",
  };
}
