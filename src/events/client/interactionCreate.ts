import { CommandInteraction, InteractionType } from 'discord.js';
import { ExtendedClient } from '../../library/structures/Bot';

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: CommandInteraction, client: ExtendedClient) {
        if(interaction.type == InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                return console.log(error);
            };
        };
    },
};
