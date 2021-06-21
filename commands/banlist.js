const banHelper = require("../utils/banHelper");
const logger = require("../utils/logger");

module.exports = {
    name: 'banlist',
    description: 'Edits the banlist by adding or removing users',
    execute(client, channel, tags, message, args) {
        if (tags.badges.broadcaster != 1) return;

        switch (args[0].toLowerCase()) {
            case "add": // Add a user to the ban list
                if (args.length < 2) {
                    client.say(channel, `@${tags.username}, not enough arguments!`);
                    return;
                }

                try {
                    banHelper.banUser(args[1]);
                } catch (err) {
                    client.say(channel, err.message);
                    return;
                }
                
                client.ban(channel, args[1]).catch(err => {
                    logger(`${args[1]} : ${err}`, "ERROR");
                });
    
                client.say(channel, `@${tags.username}, ${args[1]} has been successfully community banned.`);
                break;
            case "remove": // Remove a user from the ban list
                if (args.length < 2) {
                    client.say(channel, `@${tags.username}, not enough arguments!`);
                    return;
                }

                try {
                    banHelper.unbanUser(args[1]);
                } catch (err) {
                    client.say(channel, err.message);
                    return;
                }

                client.unban(channel, args[1]).catch(err => {
                    logger(`${args[1]} : ${err}`, "ERROR");
                });
    
                client.say(channel, `@${tags.username}, ${args[1]} has been successfully removed from the banlist.`);
                break;
            case "sync": // Sync bans / unbans from the ban list
                const db = require('../banlist.json');

                db.bannedUsers.forEach(user => {
                    client.ban(channel, user).catch(err => {
                        logger(`${user} : ${err}`, "ERROR");
                    });
                });

                db.unbannedUsers.forEach(user => {
                    client.unban(channel, user).catch(err => {
                        logger(`${user} : ${err}`, "ERROR");
                    });
                });

                break;
            default:
                client.say(channel, `@${tags.username}, incorrect arguments. Acceptable arguments are "add" and "remove".`);
                break;
        }
    }
};