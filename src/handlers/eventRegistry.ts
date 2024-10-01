import { readdirSync } from 'fs';
import { ExtendedClient } from '../library/structures/Bot';

export async function registerEvents(client: ExtendedClient) {
    const eventsFolder = readdirSync('./src/events/');

    for(const folder of eventsFolder) {
        const eventFiles = readdirSync(`./src/events/${folder}`).filter(file => file.endsWith('.ts'));

        for(const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client));
        };
    };
};

export default { registerEvents };
