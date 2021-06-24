const fs = require('fs');
const tmi = require('tmi.js');
const logger = require('./utils/logger.js');

// Import Config
const config = require('./config.json');

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: config.username,
        password: config.token
    },
    channels: config.channels
});

client.connect();


// TODO: Import events smoothly like with commands. Not totally sure how to do this yet.
/* Import Events */
const onMessageEvent = require('./events/onMessageEvent.js');
const onBanEvent = require('./events/onBanEvent.js');

/* Setup Events */
client.on('message', async (channel, tags, message, self) => { await onMessageEvent(client, channel, tags, message, self) });
client.on('ban', async (channel, username, reason, tags) => { await onBanEvent(channel, username, reason, tags) });

/* Initialize Database */
if (!fs.existsSync('./banlist.json')) {
    fs.writeFileSync('./banlist.json', JSON.stringify({"bannedUsers":[],"unbannedUsers":[]}), (err) => {
        console.log(err);
    });
}