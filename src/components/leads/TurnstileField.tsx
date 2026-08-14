import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
};

export function TurnstileField({ siteKey, onToken }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey || !hostRef.current) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !hostRef.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        callback: (token) => onTokenRef.current(token),
        "error-callback": () => onTokenRef.current(""),
        "expired-callback": () => onTokenRef.current(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>("script[data-reacting-turnstile]");
      if (existing) {
        existing.addEventListener("load", render);
      } else {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.dataset.reactingTurnstile = "true";
        script.addEventListener("load", render);
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <div className="flex justify-center">
      <div ref={hostRef} className="min-h-[65px]" />
    </div>
  );
}

export function resetTurnstile() {
  window.turnstile?.reset();
}
