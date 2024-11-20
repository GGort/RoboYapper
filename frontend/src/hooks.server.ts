import "reflect-metadata";
import type { Handle } from "@sveltejs/kit";
import TypeOrm from "$lib/database_src/db.server";

await TypeOrm.getDb();

const securityHeaders = {
  // 'Cross-Origin-Embedder-Policy': 'require-corp',
  // 'Cross-Origin-Opener-Policy': 'same-origin',
  // 'Cross-Origin-Resource-Policy': 'same-origin', // disabled ivm keycloak
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '0',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'no-referrer-when-downgrade',
  'Permissions-Policy': 'microphone=(), camera=(), geolocation=()',
  // 'access-control-allow-origin': '[domain]',
}

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  if (process.env.DEV || process.env.UNIT_TEST) return response; //disable CORS for dev/unit

  Object.entries(securityHeaders).forEach(
    ([header, value]) => response.headers.set(header, value)
  );
  if (response.headers.get('content-type') == 'text/html') {
    response.headers.set('content-type', 'text/html; charset=utf-8');
  }
  return response
}


