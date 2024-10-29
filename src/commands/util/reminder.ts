import { ChatInputCommandInteraction, inlineCode, time } from 'discord.js';
import ms from 'ms';
import schedule from 'node-schedule';

import { OPTION_TYPE } from '../../library/constants/constants';
import { ExtendedClient } from '../../library/structures/Bot';

module.exports = {
    data: {
        name: "reminder",
        description: "add a reminder",
        "integration_types": [1],
        "contexts": [0,1,2],
        options: [
            {
                name: 'time',
                description: 'the time (30s, 1m, 7d, etc)',
                type: OPTION_TYPE.STRING,
                required: true
            },
            {
                name: 'content',
                description: 'reminder content',
                type: OPTION_TYPE.STRING,
                required: true
            },
            {
                name: 'hidden',
                description: 'hide this reminder',
                type: OPTION_TYPE.BOOLEAN,
            }
        ]
    },
    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
        const { options, createdTimestamp } = interaction;

        const reminderTime = options.getString('time')
        const reminderContent = options.getString('content');
        const hide = options.getBoolean('hidden') ?? false;
        const timeInMs = ms(reminderTime);
        
        if (!timeInMs) {
            return interaction.reply({ content: 'Invalid time format. Please use formats like 30s, 1m, 7d, etc.', ephemeral: true });
        }

        const formattedTime = ms(timeInMs, { long: true });
        const reminderDate = new Date(Date.now() + timeInMs);

        interaction.reply({ content: `done, reminder set for ${inlineCode(formattedTime)}`, ephemeral: hide });

        schedule.scheduleJob(reminderDate, () => {
            client.users.fetch("697541992770437130").then(u => u.send({ content: `Reminder\n> ${reminderContent}` }));
        });
    },
};
