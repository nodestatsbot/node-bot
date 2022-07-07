"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = void 0;
const discord_js_1 = require("discord.js");
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const systeminformation_1 = __importDefault(require("systeminformation"));
const node_os_utils_1 = __importDefault(require("node-os-utils"));
const logger_1 = require("./logger");
const config = require("../../config");
const handleMessage = async (message) => {
    if (message.author.bot ||
        message.channel.type === "DM" ||
        !message.content.startsWith(config.prefix))
        return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (!command)
        return;
    if (["all", config.node].includes(command)) {
        logger_1.logger.info(`${message.author.tag} (${message.author.id}) used ${command} command.`);
        const msg = await message.reply(`Getting node info...`);
        const cpu = await node_os_utils_1.default.cpu.usage();
        const ram = await systeminformation_1.default.mem();
        const disk = await systeminformation_1.default.fsSize();
        const disk_used = disk.reduce((acc, cur) => acc + cur.used, 0);
        const disk_total = disk.reduce((acc, cur) => acc + cur.size, 0);
        await msg.edit({
            content: null,
            embeds: [{
                    title: "Node info | " + config.node,
                    description: [
                        "```",
                        `CPU: ${cpu.toFixed(2)}%`,
                        `RAM: ${bytesToSize(ram.active)}/${bytesToSize(ram.total)}`,
                        `Disk: ${bytesToSize(disk_used)}/${bytesToSize(disk_total)}`,
                        `Uptime: ${(0, pretty_ms_1.default)(parseInt(systeminformation_1.default.time().uptime) * 1000)}`,
                        "```"
                    ].join("\n")
                }],
            components: [
                new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton().setCustomId("deleteReply").setLabel("🗑️").setStyle("DANGER"))
            ]
        });
    }
    ;
};
exports.handleMessage = handleMessage;
function bytesToSize(bytes, roundTo = 2) {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0)
        return "0B";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
    if (i === 0)
        return `${bytes}${sizes[i]}`;
    return `${(bytes / Math.pow(1024, i)).toFixed(roundTo)}${sizes[i]}`;
}
;
