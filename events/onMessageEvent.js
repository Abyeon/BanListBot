const { prefix } = require('../config.json');
const fs = require('fs');
const logger = require('../utils/logger.js');

const commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log("Loading commands");

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
    console.log(`Name: \"${command.name}\" Description: \"${command.description}\"`);
}

module.exports = async(client, ...eventParams) => {
    let [channel, tags, message, self] = eventParams;

    logger(`[${channel} - ${tags['display-name']}]: ${message}`, "CHAT");

    if (self || !message.startsWith(prefix)) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (!commands.has(command)) return;

    try {
        commands.get(command).execute(client, channel, tags, message, args);
    } catch (error) {
        console.error(error);
    }
}