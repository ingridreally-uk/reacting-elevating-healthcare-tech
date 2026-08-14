export async function sendResendEmail(args: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ ok: true } | { ok: false }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${args.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: args.from,
        to: [args.to],
        reply_to: args.replyTo,
        subject: args.subject,
        text: args.text,
        html: args.html,
      }),
    });
    return response.ok ? { ok: true } : { ok: false };
  } catch {
    return { ok: false };
  }
}
