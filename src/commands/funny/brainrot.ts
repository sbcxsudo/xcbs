import { ChatInputCommandInteraction } from 'discord.js';

module.exports = {
    data: {
        name: "brainrot",
        description: "sends brainrot",
        "integration_types": [1],
        "contexts": [0,1,2],
    },
    async execute(interaction: ChatInputCommandInteraction) {
        const phrases = [
            'what the sigma',
            'l rizz',
            'chat is this prime minister serious?',
            'no aura',
            'skibidi',
            'goofy ahh',
            'cappaholic',
            'yappaholic',
            'ceo of ohio',
            'put the fries in the bag lil bro',
            'fanum tax',
            'gyatt!',
            'locked in',
            'kai cenat',
            'forgor :skull:',
            'taking an L',
            'the opps',
            'duke dennis',
            'mid',
            'aura',
            'goated',
        ];

        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

        await interaction.reply({ content: `${randomPhrase}` });
    },
};