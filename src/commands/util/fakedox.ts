import { bold, ChatInputCommandInteraction } from 'discord.js';
import { OPTION_TYPE } from '../../library/constants/constants';

module.exports = {
    data: {
        name: "dox",
        description: "sends a fake dox this is not real and uses false info",
        "integration_types": [1],
        "contexts": [0,1,2],
        options: [
            {
                name: "user",
                description: "user to (fake) dox",
                type: OPTION_TYPE.USER,
                required: true
            }
        ]
    },
    async execute(interaction: ChatInputCommandInteraction) {
        const { options } = interaction;

        const user = options.getUser("user");

        interaction.reply({ content: `Information grabbed from: ${bold(user.username)}\n- **Name:** ${user.username}\n- **ID:** ${user.id}\n- **Email:** ||someemail||@gmail.com\n- **Password:** ||somefakepassword||\n- **MFA:** ||truefalse||\n- **IP:** ||192.81.81.81||\n- **Country:** ||probablyamerican||\n- **Address:** ||500 discord drive, Discord, RM69 420||\n- **Flags:** ${user.flags.toArray().join('\n')}\n-# !! this is FAKE nothing here is actually real. !!`, ephemeral: true });
    },
};