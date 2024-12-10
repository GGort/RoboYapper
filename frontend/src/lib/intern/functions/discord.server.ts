import {type Cookies} from "@sveltejs/kit";

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const DISCORD_SCOPE = import.meta.env.VITE_DISCORD_SCOPE;
const DISCORD_API_URL = import.meta.env.VITE_DISCORD_API_URL;

export interface dcUser {
    id: string,
    username: string,
    avatar: string,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner: string,
    accent_color: null | string,
    global_name: string,
    avatar_decoration_data: null | string,
    banner_color: null | string,
    clan: null | string,
    primary_guild: null | string,
    mfa_enabled: boolean,
    locale: string,
    premium_type: number,
    email: string | null,
    verified: boolean
}

export interface partialGuilds {
    "id": string,
    "name": string,
    "icon": string,
    "banner": string,
    "owner": boolean,
    "permissions": string,
    "features": string[],
    "approximate_member_count": number,
    "approximate_presence_count": number
}

export async function validateToken(authToken: string | undefined, refreshToken: string | undefined, cookies: Cookies): Promise<{
    authorized: boolean,
    authToken?: string,
    refreshToken?: string,
    ttl?: number,
    user?: dcUser
}> {
    if (!authToken && refreshToken) { // Only refresh-token (auth expired)
        const {succes, response} = await discordRefresh(refreshToken);
        if (!succes) return {authorized: false};
        authToken = response.access_token as string;
        refreshToken = response.refresh_token as string;
        await discordSetCookies(refreshToken, authToken, response.expires_in, cookies);
    }

    if (authToken) {
        const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
            headers: {"Authorization": `Bearer ${authToken}`}
        });
        if (request.ok) {
            return {authorized: true, authToken: authToken, refreshToken: refreshToken, user: await request.json()};
        }
    }
    return {authorized: false};
}

export async function discordRefresh(refresh: string): Promise<{succes: boolean, response: any}> {
    // initializing data object to be pushed to Discord's token endpoint.
    // quite similar to what we set up in callback/+server.ts, expect with different grant_type.
    const dataObject = {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "refresh_token",
        redirect_uri: DISCORD_REDIRECT_URI,
        refresh_token: refresh,
        scope: DISCORD_SCOPE
    };

    // performing a Fetch request to Discord's token endpoint
    const request = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: new URLSearchParams(dataObject),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    });

    const response = await request.json();

    if (response.error) {
        return {succes: false, response};
    }

    return {succes: true, response};
}

export async function discordSetCookies(refresh: string, access: string, ttl: number, cookies: Cookies): Promise<void> {
    const access_token_expires_in = new Date(Date.now() + ttl); // 10 minutes
    const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    cookies.set("disco_access_token", access, {
        path: "/",
        expires: access_token_expires_in,
        httpOnly: true,
        sameSite: "none", // TODO: check production strictness
        secure: true
    });
    cookies.set("disco_refresh_token", refresh, {
        path: "/", expires: refresh_token_expires_in,
        httpOnly: true,
        sameSite: "none",// TODO: check production strictness
        secure: true
    });
}

export async function discordRequest(url: string, method: "POST" | "GET" | "DELETE", data: any | undefined, access: string): Promise<{
    succes: boolean,
    response: any
}> {
    let body: any;
    let contentType: string;
    if (method === "GET") {
        body = undefined;
        contentType = "application/x-www-form-urlencoded";
    } else {
        body = JSON.stringify(data);
        contentType = "application/json";
    }

    const request = await fetch(`${DISCORD_API_URL}${url}`, {
        method,
        body,
        headers: {
            "Content-Type": contentType,
            "Authorization": `Bearer ${access}`
        }
    });

    const response = await request.json();

    if (response.error) {
        return {succes: false, response};
    }

    return {succes: true, response};
}
