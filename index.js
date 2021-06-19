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
const onAnongiftpaidupgradeEvent = require('./events/onAnongiftpaidupgradeEvent.js');
const onCheerEvent = require('./events/onCheerEvent.js');
const onGiftpaidupgradeEvent = require('./events/onGiftpaidupgradeEvent.js');
const onMessageEvent = require('./events/onMessageEvent.js');

/* Setup Events */
client.on('anongiftpaidupgrade', async (channel, username, tags) => { await onAnongiftpaidupgradeEvent(channel, username, tags) });
client.on('cheer', async (channel, tags, message) => { await onCheerEvent(channel, tags, message) });
client.on('giftpaidupgrade', async (channel, username, sender, tags) => { await onGiftpaidupgradeEvent(channel, username, sender, tags) });
client.on('message', async (channel, tags, message, self) => { await onMessageEvent(client, channel, tags, message, self) });

/* Initialize Database */
if (!fs.existsSync('./database.json')) {
    fs.writeFileSync('./database.json', JSON.stringify({"bannedUsers":[]}), (err) => {
        console.log(err);
    });
}