"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./handlers/logger");
const discord_js_1 = require("discord.js");
const messages_1 = require("./handlers/messages");
const interactions_1 = require("./handlers/interactions");
const config = require("../config");
const client = new discord_js_1.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    partials: ["MESSAGE", "CHANNEL"]
});
client.once("ready", () => {
    logger_1.logger.info("Logged in as " + client.user?.tag);
});
client.on("messageCreate", (m) => { (0, messages_1.handleMessage)(m); });
client.on("interactionCreate", (i) => { (0, interactions_1.handleInteraction)(i); });
client.login(config.token).catch(() => {
    logger_1.logger.error("Failed to login. Is the token correct?");
    process.exit(1);
});
logger_1.logger.info("=".repeat(55));
