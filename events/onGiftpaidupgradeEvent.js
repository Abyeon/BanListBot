const logger = require('../utils/logger.js');

module.exports = async(channel, username, sender, tags) => {
    logger(`${username} has continued the sub they recieved from ${sender} for ${channel.slice(1)}'s channel! \"${message}\"`, "INFO");
}