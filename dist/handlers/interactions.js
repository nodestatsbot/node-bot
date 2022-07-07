"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInteraction = void 0;
const handleInteraction = async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "deleteReply") {
            await interaction.deferReply({ ephemeral: true });
            const message = interaction.message;
            const ref = await message.fetchReference().catch(() => null);
            if (!ref) {
                if (interaction.member?.permissions.has("MANAGE_MESSAGES")) {
                    await message.delete().catch(() => null);
                    await interaction.editReply("✅ Deleted.");
                    return;
                }
                ;
            }
            else {
                if (interaction.user.id === ref.author.id) {
                    await message.delete().catch(() => null);
                    await interaction.editReply("✅ Deleted.");
                    return;
                }
                ;
            }
            ;
            await interaction.editReply("❌ You can't use this!");
        }
        ;
    }
    ;
};
exports.handleInteraction = handleInteraction;
