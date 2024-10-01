import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { ExtendedClient } from '../library/structures/Bot';
require('dotenv/config');

export async function registerCommands(client: ExtendedClient) {
    const commandFolders = readdirSync('./src/commands');

    for(const folder of commandFolders) {
        const commandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.ts'));

        for(const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            // @ts-ignore
            client.commands.set(command.data.name, command);
            // @ts-ignore
            client.commandsArray.push(command.data);
        };
    };

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: client.commandsArray });
        console.log('Commands registered.');
    } catch (error) {
        console.log(error)
    }
};

export default { registerCommands };
