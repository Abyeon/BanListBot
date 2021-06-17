const logger = require('../utils/logger.js');

module.exports = async(channel, username, self) => {
    logger(`${username} has continued their anonymously gifted sub to ${channel.slice(1)}'s channel!`, "INFO");
}