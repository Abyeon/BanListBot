const logger = require("../utils/logger");

module.exports = {
    name: 'ping',
    description: 'Ping!',
    async execute(client, channel, tags, message, args) {
        let latency = -1;
        try {
            latency = await client.ping();
        } catch {}

        if (latency != -1) client.say(channel, `/me Pong! Latency is ${latency} seconds.`);
    }
};