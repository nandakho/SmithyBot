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
              if(Number.isInteger(parseInt(args[3]))) {
                 var eCLV = parseInt(args[1]);
                 var eATK = parseInt(args[2]);
                 var eRBT = parseInt(args[3]);
                 var eBNS = 1+(parseInt(eRBT/10)*0.3);
                 var eBATK = Math.floor((eCLV+(eCLV*Math.floor(eCLV/7)))*(1+(eATK*0.01))*(1+(eRBT*0.1))*eBNS);
                 message.channel.sendMessage('Base Attack: '+eBATK);
                 break;
                } else {
                    if(args[3]) {
                        message.channel.sendMessage('**'+args[3]+'** is not a valid value!')
                        break;
                    } else {
                        message.channel.sendMessage('Please define <**Rebirth**> value!')
                        break;
                    }
                }
           } else {
                if(args[2]) {
                    message.channel.sendMessage('**'+args[2]+'** is not a valid value!')
                    break;
                } else {
                    message.channel.sendMessage('Please define <**Attack Level**> value!');
                    break;
                }
            }
        } else {
            if(args[1]) {
                message.channel.sendMessage('**'+args[1]+'** is not a valid value!')
                break;
               } else {
                   message.channel.sendMessage('Please define <**Level**> <**Attack Level**> <**Rebirth**> value!')
                   message.channel.sendMessage('Example: r!attack **999** **999** and **15** value!')
                   break;
               }
            }
       default:
       message.channel.sendMessage("Command not found! Please use **r!help** to seek help.");
       break;
   }
});

client.login(process.env.bot_token)
