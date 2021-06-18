# About

A simple Twitch chat bot for banning a user from multiple communities. Written in Javascript using [TMI.js](https://github.com/tmijs/tmi.js)

# How to use

### Clone the repository and install dependencies

```bash
$ git clone https://github.com/Abyeon/BanListBot.git
$ npm install
```

### Set up your config

* Remove the `.defaults` from `config.json.defaults`
* Replace `your-username` with your bot accounts username
* Replace `your-tmi-token` with your token for your bot. You may get this from [TMI.js](https://twitchapps.com/tmi/)
* Add all channels you want your bot to monitor and manage in the `channels` array.

### Run

```bash
$ node .
```