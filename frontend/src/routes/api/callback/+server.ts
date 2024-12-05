import { error, redirect } from '@sveltejs/kit';
import {discordSetCookies} from "$lib/intern/functions/discord.server";


const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const DISCORD_SCOPE = import.meta.env.VITE_DISCORD_SCOPE;


export async function GET({cookies, url}) {
    // fetch returnCode set in the URL parameters.
    const returnCode = url.searchParams.get('code');
    if (!returnCode) {
        return redirect(302, '/');
    }


    // initializing data object to be pushed to Discord's token endpoint.
    // the endpoint returns access & refresh tokens for the user.
    const dataObject = {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_REDIRECT_URI,
        code: returnCode,
        scope: DISCORD_SCOPE
    };

    // performing a Fetch request to Discord's token endpoint
    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const response = await request.json();

    // redirect to front page in case of error
    if (response.error) {
        return error(502, response.error);
    }

    await discordSetCookies(response.refresh_token, response.access_token, response.expires_in, cookies);

    return redirect(302, '/');
}
