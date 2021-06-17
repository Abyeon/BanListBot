module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(client, channel, tags, message, args) {
        client.say(channel, 'Pong!');
    }
};