import { logger } from "./handlers/logger";
import type { Config } from "../@types/Config";
import { Client } from "discord.js";
import { handleMessage } from "./handlers/messages";
import { handleInteraction } from "./handlers/interactions";
const config = require("../config") as Config;

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    partials: ["MESSAGE", "CHANNEL"]
});

client.once("ready", () => {
    logger.info("Logged in as " + client.user?.tag);
});

client.on("messageCreate", (m) => { handleMessage(m); });
client.on("interactionCreate", (i) => { handleInteraction(i); });

client.login(config.token).catch(() => {
    logger.error("Failed to login. Is the token correct?");
    process.exit(1);
});

logger.info("=".repeat(55));