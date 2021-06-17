const fs = require('fs');

module.exports = (message, logLevel) => {
    const date = new Date();

    let h = `${date.getHours()}`.padStart(2, '0');
    let m = `${date.getMinutes()}`.padStart(2, '0');
    let s = `${date.getSeconds()}`.padStart(2, '0');

    messageFinal = `[${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}-${h}:${m}:${s}] [${logLevel}] ${message}`

    console.log(messageFinal);

    // TODO: Save log to a file
}