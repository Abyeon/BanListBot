const logger = require('../utils/logger.js');
const fs = require('fs');

fs.writeFileIfNotExist = function(fname, contents, options, callback) {
    if (typeof options === "function") {
        // it appears that it was called without the options argument
        callback = options;
        options = {};
    }
    options = options || {};
    // force wx flag so file will be created only if it does not already exist
    options.flag = 'wx';
    fs.writeFile(fname, contents, options, function(err) {
        var existed = false;
        if (err && err.code === 'EEXIST') {
           // This just means the file already existed.  We
           // will not treat that as an error, so kill the error code
           err = null;
           existed = true;
        }
        if (typeof callback === "function") {
           callback(err, existed);
        }
    });
}

module.exports = async(channel, username, reason, tags) => {
    logger(`${username} has been banned from ${channel.substring(1, channel.length)}'s channel.`, "INFO");

    let temp = {"channels":[]};

    fs.writeFileIfNotExist('database.json', JSON.stringify(temp), function(err, existed) {
        if (err) {
            console.log(err);
        } else {
            if (!existed) {
                exists = false;
            }
        }
    });

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

    fs.writeFileSync('database.json', JSON.stringify(db), (err) => {
        if (err) throw err;
    });
}