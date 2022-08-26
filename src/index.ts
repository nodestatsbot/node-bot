import { logger } from "./handlers/logger";
import type { Config } from "../@types/Config";
import { Client, GatewayIntentBits, Options, Partials } from "discord.js";
import { handleMessage } from "./handlers/messages";
import { handleInteraction } from "./handlers/interactions";
import { inspect } from "util";
const config = require("../config") as Config;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel],
    makeCache: Options.cacheWithLimits({
        MessageManager: 0,
        UserManager: 0,
        GuildMemberManager: 0,
        ThreadMemberManager: 0
    })
});

client.once("ready", () => {
    logger.info("Logged in as " + client.user?.tag);
});

client.on("messageCreate", (m) => { handleMessage(m); });
client.on("interactionCreate", (i) => { handleInteraction(i); });

client.login(config.token).catch((e) => {
    logger.error("Failed to login. Is the token correct? Error:\n" + inspect(e));
    process.exit(1);
});

logger.info("=".repeat(55));