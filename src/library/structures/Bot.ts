import { Client, Collection, GatewayIntentBits, ActivityType } from 'discord.js';
import { registerCommands } from '../../handlers/commandRegistry';
import { registerEvents } from '../../handlers/eventRegistry';
require('dotenv/config');

class ExtendedClient extends Client {
    commands: Collection<string, any>
    commandsArray: any[];

    public constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent
            ],
        });

        this.commands = new Collection();
        this.commandsArray = [];
    };

    /**
     * Starts the app
     */
    public async start() : Promise<any> {
        await this.login(process.env.DISCORD_TOKEN).then(() => console.log('Logged in.')).catch((e) => console.log(e));

        registerCommands(this);
        registerEvents(this);
    }
};

export { ExtendedClient };
