const fs = require('fs');
const logger = require('./logger');

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

module.exports = {
    banUser(username) {
        const db = require('../database.json');

        let index = db.bannedUsers.indexOf(username.toLowerCase());
        let unbanIndex = db.unbannedUsers.indexOf(username.toLowerCase());

        if (index == -1) {
            db.bannedUsers.push(username.toLowerCase());
        } else {
            throw new Error(`${username} is already community banned.`);
        }

        if (unbanIndex > -1) {
            db.unbannedUsers.splice(unbanIndex, 1);
        }

        fs.writeFileSync('database.json', JSON.stringify(db), (err) => {
            if (err) throw err;
        });

        // Ban user from all channels
    },
    unbanUser(username) {
        const db = require('../database.json');

        let index = db.bannedUsers.indexOf(username.toLowerCase());
        let unbanIndex = db.unbannedUsers.indexOf(username.toLowerCase());

        if (index > -1) {
            db.bannedUsers.splice(index, 1);
        } else {
            throw new Error(`${username} is not community banned.`);
        }

        if (unbanIndex == -1) {
            db.unbannedUsers.push(username.toLowerCase());
        }

        fs.writeFileSync('database.json', JSON.stringify(db), (err) => {
            if (err) throw err;
        });

        // Go through all channels and unban
    }
}