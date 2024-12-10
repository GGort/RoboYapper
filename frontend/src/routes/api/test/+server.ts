import {json} from '@sveltejs/kit'

import {validateToken} from "$lib/intern/functions/discord.server";

export async function GET({cookies}) {
    return json({r: await validateToken(cookies.get('disco_access_token'), cookies.get('disco_refresh_token'), cookies)});
}
