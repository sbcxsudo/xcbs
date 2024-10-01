import { ExtendedClient } from "../../library/structures/Bot";

module.exports = {
    name: 'ready',
    once: true,
    async execute(client: ExtendedClient) { 
        console.log(`${client.user.username} is online.`);
    },
};