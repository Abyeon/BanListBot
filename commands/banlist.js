const banHelper = require("../utils/banHelper");
const logger = require("../utils/logger");

module.exports = {
    name: 'banlist',
    description: 'Edits the banlist by adding or removing users',
    execute(client, channel, tags, message, args) {
        if (tags.badges.broadcaster != 1) return;

        if (args[0].toLowerCase() == "add") {
            try {
                banHelper.banUser(args[1]);
            } catch (err) {
                client.say(channel, err.message);
                return;
            }
    
            client.say(channel, `@${tags.username}, ${args[1]} has been successfully community banned.`);
        } else if (args[0].toLowerCase() == "remove") {
            try {
                banHelper.unbanUser(args[1]);
            } catch (err) {
                client.say(channel, err.message);
                return;
            }

            client.say(channel, `@${tags.username}, ${args[1]} has been successfully removed from the banlist.`);
        } else {
            client.say(channel, `@${tags.username}, incorrect arguments. Acceptable arguments are "add" and "remove".`);
        }
    }
};