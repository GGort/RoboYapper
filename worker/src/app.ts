import { Client, Events, GatewayIntentBits } from "discord.js";
import TypeOrm from "./database_src/db.server";

// Get Database connection
const db = TypeOrm.getDb();
if (!db) {
  console.error("Missing database connection");
  process.exit(1);
}

// Get token or Error if no token is given
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("Missing Discord token");
  process.exit(2);
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
(async () => await client.login(token))();
