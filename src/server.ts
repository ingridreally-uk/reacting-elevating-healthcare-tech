import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

const APEX_HOST = "reacting.io";
const CANONICAL_HOST = "www.reacting.io";

function canonicalHostRedirect(request: Request): Response | null {
  const incoming = new URL(request.url);
  const host = (request.headers.get("host") ?? incoming.hostname)
    .split(":")[0]
    .toLowerCase();

  const isApex = host === APEX_HOST;
  const isLegacyDe = incoming.pathname === "/de" || incoming.pathname === "/de/";

  if (!isApex && !isLegacyDe) return null;

  const dest = new URL(incoming.href);
  if (isApex) {
    dest.protocol = "https:";
    dest.hostname = CANONICAL_HOST;
    dest.port = "";
  }
  if (isLegacyDe) {
    dest.pathname = "/";
  }

  if (dest.href === incoming.href) return null;
  return Response.redirect(dest.href, 301);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirected = canonicalHostRedirect(request);
      if (redirected) return redirected;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
