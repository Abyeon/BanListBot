# About

*This is a work in progress*

A simple Twitch chat bot for banning a user from multiple communities. Written in Javascript using <a href="https://nodejs.org/en/" target ="_blank">Node.js</a> and <a href="https://github.com/tmijs/tmi.js" target="_blank">TMI.js</a>

# Setup
## Clone the repository and install dependencies

```bash
$ git clone https://github.com/Abyeon/BanListBot.git
$ npm install
```

## Configure your bot

* Create a `config.json` file
* Copy the JSON from the `config.json.defaults` file to your new `config.json` file.
* Replace `your-username` with your bot account's username
* Replace `your-tmi-token` with your token for your bot. You may get this from <a href="https://twitchapps.com/tmi/" target="_blank">TMI.js</a>
* Add all channels you want your bot to monitor and manage in the `channels` array.

## Run the bot

```bash
$ node .
```

# Usage

## Commands
* `!banlist [add|remove] <username>` edits the banlist.
* `!banlist sync` syncs the current channel with the banlist.