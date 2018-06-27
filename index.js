const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const cheerio = require('cheerio');
const prefix = 'r!';
const help = [
   "```",
   "Here's the list of all available commands:",
   "• r!food",
   "• r!weapon",
   "• r!attack",
   "• r!help",
   "```",
];

client.on('ready', () => {
   client.user.setGame("r!help");
   console.log('Ready');
 });

var url = "http://smithstory.wikia.com/wiki/Recipes"
request(url,function(err,resp,body){
    var $ = cheerio.load(body);
    var ch1 = $('.mw-collapsible-content .article-table sortable jquery-tablesorter');
    var chAT = ch1.text();
    console.log(chAT);
})

client.on('message',message => {
   var sender = message.author.username;
   var sendrl = message.member.roles.find('name','RaidLeader');
   if (message.author.equals(client.user)) return;
   
   if (!message.content.startsWith(prefix)) return;

   var args = message.content.substring(prefix.length).split(" ");

   switch (args[0].toLowerCase()) {
       case 'food':
           message.channel.sendMessage('To be added!');
           break;
       case 'weapon':
           message.channel.sendMessage('To be added!');
           break;
       case 'help':
           message.channel.sendMessage(help);
           break;
       case 'attack':
       if(Number.isInteger(parseInt(args[1]))) {
           if(Number.isInteger(parseInt(args[2]))) {
               message.channel.sendMessage('To be added!');
               break;
           } else {
               if(args[2]) {
                   message.channel.sendMessage('**'+args[2]+'** is not a valid value!')
                   break;
               } else {
                   message.channel.sendMessage('Please define a **valid** value!');
                   break;
               }
           }
        } else {
            if(args[1]) {
                message.channel.sendMessage('**'+args[1]+'** is not a valid value!')
                break;
               } else {
                   message.channel.sendMessage('Please define a **valid** value!')
                   break;
               }
            }
       default:
       message.channel.sendMessage("Command not found! Please use **!help** to seek help.");
   }
});

client.login(process.env.bot_token)
