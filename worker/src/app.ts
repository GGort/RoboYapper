import { Client, Events, GatewayIntentBits } from "discord.js";
import TypeOrm from "./database_src/db.server";
import { DC_Server } from "./database_src/models/DC_Server";

// Get Database connection
const dbGlobal = TypeOrm.getDb();
if (!dbGlobal) {
  console.error("Missing database connection");
  process.exit(1);
}

// Get token or Error if no token is given
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("Missing Discord token");
  process.exit(2);
}

async function syncGuildsOnStartup(client: Client) {
  const db = await TypeOrm.getDb();
  if (!db) {
    console.error("Missing database connection");
    return;
  }

  const serverRepository = db.getRepository(DC_Server);
  const currentGuilds = client.guilds.cache
    .map((guild) => {
      if (!guild.id) {
        console.warn(`Guild without ID found: ${guild.name}`);
        return null;
      }
      return {
        dcId: guild.id,
        name: guild.name,
        active: true,
        icon: guild.icon ?? "",
        banner: guild.banner ?? "",
      };
    })
    .filter((guild) => guild !== null);

  // Mark all servers as inactive initially
  await serverRepository.update({}, { active: false });

  // Use upsert to insert or update current guilds
  await serverRepository.upsert(currentGuilds, ["dcId"]);
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  // Sync guilds when the bot starts
  await syncGuildsOnStartup(client);
});

client.on(Events.GuildCreate, async (guild) => {
  let server = new DC_Server();
  server.dcId = guild.id;
  server.name = guild.name;
  server.active = true;
  server.icon = guild.icon ?? "";
  server.banner = guild.banner ?? "";

  const db = await TypeOrm.getDb();
  if (!db) return false;

  db.getRepository(DC_Server).save(server);
});

client.on(Events.GuildDelete, async (guild) => {
  const db = await TypeOrm.getDb();
  if (!db) return false;

  const serverRepository = db.getRepository(DC_Server);

  // Find the server by its ID
  const server = await serverRepository.findOne({ where: { dcId: guild.id } });

  if (server) {
    // Set the server's active status to false
    server.active = false;

    // Save the updated server entity back to the database
    await serverRepository.save(server);
  }
});

// Log in to Discord with your client's token
(async () => await client.login(token))();
