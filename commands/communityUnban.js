const banHelper = require("../utils/banHelper");
const logger = require("../utils/logger");

module.exports = {
    name: 'communityunban',
    description: 'Unbans a user from all communities in config',
    execute(client, channel, tags, message, args) {
        if (tags.badges.broadcaster != 1) return;

        try {
            banHelper.unbanUser(args[0]);
        } catch (err) {
            client.say(channel, err.message);
            return;
        }

        client.say(channel, `@${tags.username}, ${args[0]} has been successfully removed from the banlist.`);
    }
};