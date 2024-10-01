import { ActionRowBuilder, ChatInputCommandInteraction, ComponentType, inlineCode, StringSelectMenuBuilder, userMention } from 'discord.js';
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
        const { options } = interaction;

        const time = options.getString('time')
        const reminderContent = options.getString('content');
        const hide = options.getBoolean('hidden') ?? false;
        const timeInMs = ms(time);
        
        if (!timeInMs) {
            return interaction.reply({ content: 'Invalid time format. Please use formats like 30s, 1m, 7d, etc.', ephemeral: true });
        }

        const formattedTime = ms(timeInMs, { long: true });

        const menu = new StringSelectMenuBuilder().setCustomId('remind-method').setPlaceholder('Remind me by..').addOptions(
            { label: 'DM me', value: 'dm-me' },
            { label: 'In channel', value: 'in-channel' }
        )

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)

        interaction.reply({ content: 'how would you like to be reminded?', components: [row], ephemeral: hide, fetchReply: true }).then(r => {
            r.createMessageComponentCollector({ componentType: ComponentType.StringSelect }).on('collect', i => {
                if(i.user.id !== '697541992770437130') return;

                const choice = i.values[0];

                const reminderDate = new Date(Date.now() + timeInMs);

                switch (choice) {
                    case 'dm-me':
                        interaction.editReply({ content: `done, reminder set for ${inlineCode(formattedTime)}`, components: [] });

                        schedule.scheduleJob(reminderDate, async () => {
                            const user = await client.users.fetch('697541992770437130');
                            user.send({ content: `Reminder: ${reminderContent}` });
                        });
                        break;
                    case 'in-channel':
                        interaction.editReply({ content: `done, reminder set for ${inlineCode(formattedTime)}`, components: [] });

                        schedule.scheduleJob(reminderDate, () => {
                            interaction.followUp({ content: `${userMention('697541992770437130')}, reminder: ${reminderContent}` });
                        });
                        break;
                };
            });
        });
    },
};
