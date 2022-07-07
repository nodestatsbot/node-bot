import { Interaction, Message, Permissions } from "discord.js";

export const handleInteraction = async (interaction: Interaction): Promise<void> => {
    if (interaction.isButton()) {
        if (interaction.customId === "deleteReply") {
            await interaction.deferReply({ ephemeral: true });

            const message = interaction.message as Message;
            const ref = await message.fetchReference().catch(() => null);

            if (!ref) {
                if ((interaction.member?.permissions as Readonly<Permissions>).has("MANAGE_MESSAGES")) {
                    await message.delete().catch(() => null);
                    await interaction.editReply("✅ Deleted.");
                    return;
                };
            } else {
                if (interaction.user.id === ref.author.id) {
                    await message.delete().catch(() => null);
                    await interaction.editReply("✅ Deleted.");
                    return;
                };
            };

            await interaction.editReply("❌ You can't use this!");
        };
    };
};