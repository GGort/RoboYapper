import {type Cookies} from "@sveltejs/kit"

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const DISCORD_SCOPE = import.meta.env.VITE_DISCORD_SCOPE;
const DISCORD_API_URL = import.meta.env.VITE_DISCORD_API_URL;

export async function validateToken(authToken: string | undefined, refreshToken: string | undefined,  cookies: Cookies): Promise<{authorized : boolean, authToken?: string, refreshToken?: string, ttl?: number }> {
    if (!authToken && refreshToken) { // Only refresh-token (auth expired)
        const {succes, response} =  await discordRefresh(refreshToken);
        if (!succes) return {authorized: false};
        authToken = response.access_token as string;
        refreshToken = response.refresh_token as string;
        await discordSetCookies(refreshToken, authToken, response.expires_in, cookies);
    }

    if (authToken) {
        const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
            headers: { 'Authorization': `Bearer ${authToken}`}
        });
    }

    // return JSON.stringify(discord_refresh)
    return {authorized: false};
}

export async function discordRefresh(refresh: string): Promise<{succes: boolean, response: any}> {
    // initializing data object to be pushed to Discord's token endpoint.
    // quite similar to what we set up in callback/+server.ts, expect with different grant_type.
    const dataObject = {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        redirect_uri: DISCORD_REDIRECT_URI,
        refresh_token: refresh,
        scope: DISCORD_SCOPE
    };

    // performing a Fetch request to Discord's token endpoint
    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const response = await request.json();

    if (response.error) {
        return {succes: false, response};
    }

    return {succes: true, response};
}

export async function discordSetCookies(refresh: string, access: string, ttl: number, cookies: Cookies) : Promise<void>{
    const access_token_expires_in = new Date(Date.now() + ttl); // 10 minutes
    const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    cookies.set('disco_access_token', access,  {path: '/', sameSite: 'strict', expires: access_token_expires_in});
    cookies.set('disco_refresh_token', refresh, {path: '/', sameSite: 'strict', expires: refresh_token_expires_in});
}
