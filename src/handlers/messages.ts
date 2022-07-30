import { Message, MessageActionRow, MessageButton } from "discord.js";
import prettyms from "pretty-ms";
import si from "systeminformation";
import utils from "node-os-utils";
import { Config } from "../../@types/Config";
import { logger } from "./logger";
const config = require("../../config") as Config;

export const handleMessage = async (message: Message): Promise<void> => {
    if (
        message.author.bot ||
        message.channel.type === "DM" ||
        !message.content.startsWith(config.prefix)
    ) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (!command) return;

    if (["all", config.node.toLowerCase()].includes(command)) {
        switch (args[0]?.toLowerCase()) {
            case "cpu":
                break;
            case "ram":
                break;
            case "disk":
                break;
            case "network":
                break;
            default:
                logger.info(`${message.author.tag} (${message.author.id}) used "${command}${args[0] ? ` ${args[0]}` : ""}" command.`);

                const msg = await message.reply(`Getting node info...`);

                const cpu = await utils.cpu.usage();
                const ram = await si.mem();
                const disk = await si.fsSize();
                const disk_used = disk[0].used;
                const disk_total = disk[0].size;
                // const disk_used = disk.reduce((acc, cur) => acc + cur.used, 0);
                // const disk_total = disk.reduce((acc, cur) => acc + cur.size, 0);

                await msg.edit({
                    content: null,
                    embeds: [{
                        title: "Node info | " + config.node,
                        description: [
                            "```",
                            `CPU: ${cpu.toFixed(2)}%`,
                            `RAM: ${bytesToSize(ram.active)}/${bytesToSize(ram.total)}`,
                            `Disk: ${bytesToSize(disk_used)}/${bytesToSize(disk_total)}`,
                            `Uptime: ${prettyms(si.time().uptime * 1000)}`,
                            "```"
                        ].join("\n")
                    }],
                    components: [
                        new MessageActionRow().addComponents(
                            new MessageButton().setCustomId("deleteReply").setLabel("🗑️").setStyle("DANGER")
                        )
                    ]
                });
                break;
        };
    };
};

function bytesToSize(bytes: number, roundTo = 2): string {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0B";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
    if (i === 0) return `${bytes}${sizes[i]}`;
    return `${(bytes / Math.pow(1024, i)).toFixed(roundTo)}${sizes[i]}`;
};