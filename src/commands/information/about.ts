import { ChatInputCommandInteraction } from 'discord.js';
import os from 'os';
import { ExtendedClient } from '../../library/structures/Bot';

module.exports = {
    data: {
        name: 'about',
        description: 'about xcbs',
        'integration_types': [1],
        'contexts': [0, 1, 2],
    },
    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
        const cpuModel = os.cpus()[0].model;
        const memoryUsage = Math.floor(process.memoryUsage.rss() / 1024 / 1024) + ' MB';
        const ping = Math.round(client.ws.ping) + 'ms';

        interaction.reply({ 
            content: `xcbs: made by [jay](<https://github.com/cascxdee>) programmed with typescript (because ts is great)\n- ping: ${ping}\n- cpu: ${cpuModel}\n- memory: ${memoryUsage}\n- node: ${process.version}` 
        });
    },
};