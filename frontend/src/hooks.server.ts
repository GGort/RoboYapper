import "reflect-metadata";
import {type Handle} from "@sveltejs/kit";
import TypeOrm from "$lib/database_src/db.server";
import {validateToken} from "$lib/intern/functions/discord.server";

await TypeOrm.getDb();

const securityHeaders = {
    // 'Cross-Origin-Embedder-Policy': 'require-corp',
    // 'Cross-Origin-Opener-Policy': 'same-origin',
    // 'Cross-Origin-Resource-Policy': 'same-origin', // disabled ivm keycloak
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "0",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "no-referrer-when-downgrade",
    "Permissions-Policy": "microphone=(), camera=(), geolocation=()"
    // 'access-control-allow-origin': '[domain]',
};


export const handle: Handle = async ({event, resolve}) => {
    // Auth
    console.log(event.request.headers.get('cookie'))
    console.log(event.request.headers)
    const auth = await validateToken(event.cookies.get('disco_access_token'), event.cookies.get('disco_refresh_token'), event.cookies);

    event.locals.authorized = auth.authorized
    if (auth.user) event.locals.user = auth.user;

    const response = await resolve(event);
    if (process.env.DEV || process.env.UNIT_TEST) return response; //disable CORS for dev/unit

    Object.entries(securityHeaders).forEach(
        ([header, value]) => response.headers.set(header, value)
    );
    if (response.headers.get("content-type") == "text/html") {
        response.headers.set("content-type", "text/html; charset=utf-8");
    }


    return response;
};


