const logger = require('../utils/logger.js');
const fs = require('fs');

module.exports = async(channel, username, reason, tags) => {
    logger(`${username} has been banned from ${channel.substring(1, channel.length)}'s channel.`, "INFO");
    
    const db = require('../database.json');
    let index = -1;
    
    for (var i = 0; i < db.channels.length; i++) {
        if (db.channels[i].name == channel.slice(1)) index = i;
    }

    if (index == -1) {
        db.channels.push({"name":channel.slice(1), "bannedViewers": []});
        index = db.channels.length - 1;
    }

    db.channels[index].bannedViewers.push(username);

    fs.writeFile('database.json', JSON.stringify(db), (err) => {
        if (err) throw err;
    });
}