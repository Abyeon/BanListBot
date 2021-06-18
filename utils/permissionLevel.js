const permissions = ['broadcaster', 'mod', 'sub', 'vip', 'turbo', 'bits'];

module.exports = (tags, required, callback) => {
    let userPerms = [];

    console.log(tags.badges);

    if (tags.badges.broadcaster == 1 && required == 0) callback(true);
    if (tags.mod == 1 && required == 1) callback(true);
    if (tags.badges.subscriber == 1 && required == 2) callback(true);
    if (tags.badges.vip == 1 && required == 3) callback(true);
    if (tags.badges.turbo == 1 && required == 4) callback(true);
    if (tags.badges.bits > 0 && required == 5) callback(true);

    callback(false);
}