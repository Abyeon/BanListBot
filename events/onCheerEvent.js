const logger = require('../utils/logger.js');

module.exports = async(channel, tags, message) => {
    logger(`${username} has cheered ${tags["bits"]} bits to ${channel.slice(1)}'s channel! \"${message}\"`, "INFO");
}