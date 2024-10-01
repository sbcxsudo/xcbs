import { ChatInputCommandInteraction } from 'discord.js';
import { ExtendedClient } from '../../library/structures/Bot';

module.exports = {
    data: {
        name: 'imagine_scamming',
        description: 'this gets those scammers off your back trust me',
        'integration_types': [1],
        'contexts': [0, 1, 2],
    },
    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
        interaction.reply({ content: '# [nahh](https://cdn.discordapp.com/attachments/1288901885633232960/1289030271886168176/LMFAOO.mp4?ex=66f7567d&is=66f604fd&hm=10a588d42cf38503941d021c8d34d690af1e7153c1776498ecb39bdbd3a52c9b&) this dumbfuck thought he could scam me thats CRAZY :sob::pray:' });
    },
};
