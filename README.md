> **🚧 THIS BOT IS STILL IN DEVELOPMENT, IT DOESN'T HAVE FULL FUNCTIONALITY YET 🚧**<br>
> **🚧 IF YOU FIND A BUG, PLEASE REPORT IT 🚧**
# nodestats-bot
An advanced bot for your hosting to monitor nodes' stats.

## Setting up
> This bot should be installed on each of the nodes. (should work in Pterodactyl too, but not tested yet)
```sh
# Clone the repo
git clone https://github.com/nodestatsbot/node-bot.git

# Copy config file
cp config.example.js config.js
# Fill in all values in config.js

# Install dependencies
yarn

# Build typescript files  !!! THIS SHOULD BE EXECUTED AFTER EACH UPDATE !!!
yarn build

# Start the bot
yarn start
# OR
node .
```