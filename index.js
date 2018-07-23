let _proto = require('./lib/prototypes/_load');
const auth = require('./apps.auth');

const Discord = require('discord.js');
const client  = new Discord.Client();

const GoogleImages = require('google-images');

// Auth --------------
const google = new GoogleImages(auth.google.cse, auth.google.api);
client.login(auth.discord.token);
// End Auth ----------

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('message', msg => {
    if (msg.isMentioned(client.user.id) === false)
        return;

    const regex   = /<@\d+>.*find (.*)/gm;
    const command = regex.exec(msg.content);
    if (command === null) return;

    let term = command[1];
    console.log(`${msg.author.tag} searched for: ${term}`);

    google.search(term).then(images => {
        if (images.length === 0)
            msg.reply(`wow you searched for something so far outta this world I couldn't even find it! :O`);
        
        let image = images.random().url;

        msg.reply(`heres your image for (${term}): ${image}`);
    }).catch(err => {
        console.log(err);
    });
});
  
