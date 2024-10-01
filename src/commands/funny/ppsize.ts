import { ChatInputCommandInteraction } from 'discord.js';
import { OPTION_TYPE } from '../../library/constants/constants';

module.exports = {
    data: {
        name: "ppsize",
        description: "it's in the name..",
        "integration_types": [1],
        "contexts": [0,1,2],
        options: [
            {
                name: "user",
                description: "The user.",
                type: OPTION_TYPE.USER,
                required: true
            },
        ]
    },
    async execute(interaction: ChatInputCommandInteraction) {
        const { options } = interaction;

        const target = await interaction.client.users.fetch(options.getUser("user").id);
        const length = Math.random() * 100 + 1

        enum Rating {
            UNRATEABLE = "Literally not even rateable, you should be embarassed.",
            AVERAGE = "Average",
            EXTREME = "Extreme"
        }

        let rate: string

        if(Math.round(length) <= 15) {
            rate = Rating.UNRATEABLE
        } else if (length <= 80) {
            rate = Rating.AVERAGE
        } else if (length >= 80) {
            rate = Rating.EXTREME
        }

        await interaction.reply({ content: `<@${target.id}> has a pp size of: ${Math.round(length)} cm!!\n> **Rating:** ${rate}` });
    },
};
