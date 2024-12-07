import {redirect, error} from "@sveltejs/kit";
import {discordRequest, type partialGuilds, validateToken} from "$lib/intern/functions/discord.server";
import TypeOrm from "$lib/database_src/db.server";
import {DC_Server} from "$lib/database_src/models/DC_Server";
import { In } from "typeorm";


export async function load({cookies, params}) {
    const auth = await validateToken(cookies.get("disco_access_token"), cookies.get("disco_refresh_token"), cookies);
    if (!auth.authorized) return redirect(302, "not authorized");

    const guilds = await discordRequest("/users/@me/guilds", "GET", {}, cookies.get("disco_access_token")?? "");
    if (!guilds.succes) return error(502, "not guilds");

    const db = await TypeOrm.getDb();
    if (!db) return { guilds: [] }; // Handle the case where DB connection is not available


    const serverRepository = db.getRepository(DC_Server)

    // Extract list of guild IDs from API response
    const guildIds = (guilds.response as partialGuilds[]).map(guild => guild.id);

    // Fetch only the guilds that are active and exist in the provided Discord API guild list
    const activeGuild = await serverRepository.findOne({
        where: {
            dcId: In(guildIds), // Filter using the 'In' clause
            id: params.serverId
        },
    });


    return {
        guilds: JSON.parse(JSON.stringify(activeGuild)) as DC_Server
    };

}
