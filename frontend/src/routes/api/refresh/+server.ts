import {error, json} from "@sveltejs/kit";
import {discordRefresh, discordSetCookies} from "$lib/intern/functions/discord.server";



export async function GET({cookies}) {
    const disco_refresh_token = cookies.get("disco_refresh_token");
    if (!disco_refresh_token) {
        return error(400, "No refresh token");
    }

    const {succes, response} = await discordRefresh(disco_refresh_token);
    if (!succes) return error(500, response.error);

    // redirect user to front page with cookies set
    await discordSetCookies(response.refresh_token, response.access_token, response.expires_in, cookies);

    return json({succes: true});
}
