const logger = require("../utils/logger");
const permissionLevel = require("../utils/permissionLevel");

module.exports = {
    name: 'communityban',
    description: 'Bans a user from all communities in config',
    execute(client, channel, tags, message, args) {
        if (tags.badges.broadcaster != 1) return;

        client.ban(channel, args[0], args[1])
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            if (err == "already_banned") {
                client.say(channel, `@${tags.username}, that user is already banned!`);
            }
        })
    }
};