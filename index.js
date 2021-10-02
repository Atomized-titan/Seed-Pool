
// const mySecret = process.env['TOKEN']
require('dotenv').config();
const { Command } = require('discord-akairo');
const GrandMotherCrow = require('./core/client.js');
const client = new GrandMotherCrow();
const keepAlive = require("./server");



keepAlive();

client.login(process.env.TOKEN);




client.on("guildCreate", guild => {
    const channels = guild.channels.cache.filter(channel => channel.type == "text");

    channels.first().send("Yo thanks for adding me. I'm Seed Bot").catch(e => console.log(e));
});

