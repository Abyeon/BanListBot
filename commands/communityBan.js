const banHelper = require("../utils/banHelper");
const logger = require("../utils/logger");
const permissionLevel = require("../utils/permissionLevel");

module.exports = {
    name: 'communityban',
    description: 'Bans a user from all communities in config',
    execute(client, channel, tags, message, args) {
        if (tags.badges.broadcaster != 1) return;

        try {
            banHelper.banUser(args[0]);
        } catch (err) {
            client.say(channel, err.message);
            return;
        }

        client.say(channel, `@${tags.username}, ${args[0]} has been successfully community banned.`);
    }
};