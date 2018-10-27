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

client.on('message',message => {
   var sender = message.author.username;
   var urlw = "https://raw.githubusercontent.com/nandakho/SmithyBot/master/WeaponRecipe/"
   var urlf = "https://raw.githubusercontent.com/nandakho/SmithyBot/master/FoodRecipe/"
   if (message.author.equals(client.user)) return;
   
   if (!message.content.startsWith(prefix)) return;

   var args = message.content.substring(prefix.length).split(" ");

   switch (args[0].toLowerCase()) {
       case 'food':
           if(args[1]){
               request(urlf+args[1],function(err,resp,body){
                   var $ = cheerio.load(body);
                   var fwrec = $.text();
                   message.channel.sendMessage(frec);
                })
                break;
            } else {
                message.channel.sendMessage('Usage: r!food <#FoodID>');
                break;
            }
       case 'weapon':
           if(args[1]){
               request(urlw+args[1],function(err,resp,body){
                   var $ = cheerio.load(body);
                   var wrec = $.text();
                   message.channel.sendMessage(wrec);
                })
                break;
            } else {
                message.channel.sendMessage('Usage: r!weapon <#WeaponID>');
                break;
            }
       case 'help':
           message.channel.sendMessage(help);
           break;
       case 'attack':
       if(Number.isInteger(parseInt(args[1]))) {
           if(Number.isInteger(parseInt(args[2]))) {
               var eHPH = args[1];
               var eHPD = args[2];
               var eHP1 = parseInt(eHPD)+12000;
               var eHP2 = parseInt(eHPD)/eHP1;
               var eHP3 = 1-eHP2;
               var eHPF = parseInt(eHPH)/eHP3;
               var eHPA = Math.round(eHPF*100)/100;
               message.channel.sendMessage('eHP: '+eHPA);
               break;
           } else {
               if(args[2]) {
                   message.channel.sendMessage('**'+args[2]+'** is not a valid value!')
                   break;
               } else {
                   message.channel.sendMessage('Please define **Defense** value!');
                   break;
               }
           }
        } else {
            if(args[1]) {
                message.channel.sendMessage('**'+args[1]+'** is not a valid value!')
                break;
               } else {
                   message.channel.sendMessage('Please define **HP** and **Defense** value!')
                   break;
               }
            }
       default:
       message.channel.sendMessage("Command not found! Please use **r!help** to seek help.");
   }
});

client.login(process.env.bot_token)
