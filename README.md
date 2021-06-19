# About

*This is a work in progress*

A simple Twitch chat bot for banning a user from multiple communities. Written in Javascript using <a href="https://nodejs.org/en/" target ="_blank">Node.js</a> and <a href="https://github.com/tmijs/tmi.js" target="_blank">TMI.js</a>

# Setup
## Clone the repository and install dependencies

```bash
$ git clone https://github.com/Abyeon/BanListBot.git
$ npm install
```

## Set up your config

* Remove the `.defaults` from `config.json.defaults`
* Replace `your-username` with your bot account's twitch username
* Replace `your-tmi-token` with your token for your bot. You may get this from <a href="https://twitchapps.com/tmi/" target="_blank">TMI.js</a>
* Add all channels you want your bot to monitor and manage in the `channels` array.

## Run the bot

```bash
$ node .
```

# Usage

## Commands
* `!communityban` bans a user from all monitored channels
* `!communityunban` unbans a user from all monitored channels
* `!ban` bans a user in the current channel
* `!unban` unbans a user the current channel