const logger = require('../utils/logger.js');
const fs = require('fs');

function findObj(obj, array) {
    array.forEach(obj => {
        if (obj.name == obj) {
            return obj;
        }
    });

    return null;
}

module.exports = async(channel, username, reason, tags) => {
    logger(`${username} has been banned from ${channel.substring(1, channel.length)}'s channel.`, "INFO");
    
    let tempData;

    fs.readFile('database.json', (err, data) => {
        if (err) throw err;
        let database = JSON.parse(data);

        if (findObj(channel, database.channels) == null) {
            database.channels.push(channel);
        }

        let banlist = findObj(channel, database.channels);
        console.log(banlist);
        tempData = database.channels[database.channels.indexOf(banlist)].bannedUsers.push(username);

        // fs.writeFileSync('database.json', JSON.stringify(database, null, 2), (err) => {
        //     if (err) throw err;
        // })
    });

    fs.writeFile('database.json', JSON.stringify(tempData, null, 2), (err) => {
        if (err) throw err;
    });
}