const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
const help = [
    "```",
    "Here's the list of all available commands:",
    "• !ping",
    "• !help",
    "• !raid",
    "```",
];
const rhelp = [
    "```",
    "Here's the list of raid commands:",
    "• reserve [x] = reserve Titan",
    "• cancel [x] = cancel previously reserved Titan",
    "• whogot [x] = show who reserve Titan",
    "• list [x] = show a list of Titan reservation, 1 page consist of 10 titans",
    "• reserves [x] [NickName] = reserve Titan for others, [Raid Leader] only",
    "• help = show this message",
    "```",
];

//var http = require("http");
//var fs = require('fs');
//http.createServer(function(request, response) {
//    var url = request.url;
//    getStaticFileContent(response,'master/index.html','text/html');
//});

//function getStaticFileContent(response, filepath, contentType){
//    fs.readFile(filepath, function(error, data){
//        if(error){
//            response.writeHead(500,{'Content-Type':'text/plain'});
//            response.end('500 - Internal Server Error.');
//            break;
//        }
//        if(data){
//            response.writeHead(200,{'Content-Type':'text/html'});
//            response.end(data);
//            break;
//        }
//    });
//}
        
setInterval(function() {
    console.log('Prevent Sleep');
//    http.get("http://rebels-bot.herokuapp.com");
}, 600000); // every 10 minutes (600000)

var titan =  [];
var tithp = ['','1m','963k','1.14m','1.21m','2.56m','1.35m','1.278m','1.49m','1.56m','3.26m','2m','1.89m','2.2m','2.3m','4.8m','2.5m','2.34m','2.7m','2.8m','5.8m','3.57m','3.321m','3.81m','3.93m','8.1m','4.67m','4.311m','4.91m','5.03m','10.3m','6.2m','5.715m','6.5m','6.65m','13.606m','7.45m','6.84m','7.75m','7.9m','16.1m','9.6m','8.82m','10m','10.2m','20.8m','11.1m','10.17m','11.5m','11.7m','23.8m'];

client.on('ready', () => {
    client.user.setGame("!help");
    console.log('Ready');
  });

client.on('message',message => {
    var sender = message.author.username;
    var sendrl = message.member.roles.find('name','RaidLeader');
    if (message.author.equals(client.user)) return;
    
    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case 'ping':
            message.channel.sendMessage('Pong!');
            break;
        case 'help':
            message.channel.sendMessage(help);
            break;
        case 'raid':
            if(args[1]) {
                switch(args[1].toLowerCase()){
                    case 'help':
                        message.channel.sendMessage(rhelp);
                        break;
                    case 'reserve':
                        if(args[2]>=1 && args[2]<=50 && titan[args[2]]==undefined) {
                            message.channel.sendMessage('**'+sender+'**'+' reserved titan '+args[2]);
                            titan[args[2]]=sender;
                            break;
                        } else {
                            if(titan[args[2]]!==undefined) {
                                message.channel.sendMessage('Titan '+args[2]+' is reserved by **'+titan[args[2]]+'**');
                                break;
                            } else {
                                if(args[2]) {
                                    message.channel.sendMessage('Titan '+args[2]+' is invalid, valid range **1-50**');
                                    break;
                            } else {
                                message.channel.sendMessage('Please include the level to reserve');
                                break;
                            }
                        }
                        }
                    case 'cancel':
                        if(args[2]>=1 && args[2]<=50 && sendrl) {
                            message.channel.sendMessage('**[Raid Leader] '+sender+'**'+' set Titan **'+args[2]+'** to Free!');
                            titan[args[2]]=undefined;
                            break;
                        }
                        if(args[2]>=1 && args[2]<=50 && titan[args[2]]==sender) {
                            message.channel.sendMessage('**'+sender+'**'+' canceled Titan **'+args[2]+'** reservation! Quick grab it now!');
                            titan[args[2]]=undefined;
                            break;
                        } else {
                            if(titan[args[2]]!==sender && (titan[args[2]]!==undefined)) {
                                message.channel.sendMessage('Titan '+args[2]+' is reserved by **'+titan[args[2]]+'**');
                                break;
                            } else {
                                if(args[2]>=1 && args[2]<=50 && titan && titan[args[2]]==undefined) {
                                    message.channel.sendMessage('Titan '+args[2]+' is still **free**');
                                    break;
                            } else {
                                if(args[2]) {
                                        message.channel.sendMessage('Titan '+args[2]+' is invalid, valid range **1-50**');
                                        break;
                                } else {
                                message.channel.sendMessage('Please include the level to cancel reservation');
                                break;
                            }
                        }
                        }
                        }
                    case 'whogot':
                        if(args[2]>=1 && args[2]<=50 && titan[args[2]]==undefined) {
                        message.channel.sendMessage('Titan '+[args[2]]+' is still **free**');
                        break;
                        } else {
                            if (args[2]>=1 && args[2]<=50) {
                                message.channel.sendMessage('**'+titan[args[2]]+'**'+' got titan '+[args[2]]);
                                break;
                            } else { 
                                message.channel.sendMessage('Invalid titan, valid range **1-50**');
                                break;
                            }
                        } 
                    case 'list':
                        if(!args[2]||args[2]>5||args[2]<1) {
                            message.channel.sendMessage('Invalid page, valid range **1-5**')
                            break;
                        }
                            if(args[2]>=1 && args[2]<=5) {
                                var tpnum1 = titan[args[2]*10-9]
                                var tpnum2 = titan[args[2]*10-8]
                                var tpnum3 = titan[args[2]*10-7]
                                var tpnum4 = titan[args[2]*10-6]
                                var tpnum5 = titan[args[2]*10-5]
                                var tpnum6 = titan[args[2]*10-4]
                                var tpnum7 = titan[args[2]*10-3]
                                var tpnum8 = titan[args[2]*10-2]
                                var tpnum9 = titan[args[2]*10-1]
                                var tpnum10 = titan[args[2]*10]
                                var tonum1 = 'Titan '+(args[2]*10-9)+' • Dark • HP: ' + tithp[args[2]*10-9]
                                var tonum2 = 'Titan '+(args[2]*10-8)+' • Water • HP: ' + tithp[args[2]*10-8]
                                var tonum3 = 'Titan '+(args[2]*10-7)+' • Wood • HP: ' + tithp[args[2]*10-7]
                                var tonum4 = 'Titan '+(args[2]*10-6)+' • Light • HP: ' + tithp[args[2]*10-6]
                                var tonum5 = 'Titan '+(args[2]*10-5)+' • Fire • HP: ' + tithp[args[2]*10-5]
                                var tonum6 = 'Titan '+(args[2]*10-4)+' • Dark • HP: ' + tithp[args[2]*10-4]
                                var tonum7 = 'Titan '+(args[2]*10-3)+' • Water • HP: ' + tithp[args[2]*10-3]
                                var tonum8 = 'Titan '+(args[2]*10-2)+' • Wood • HP: ' + tithp[args[2]*10-2]
                                var tonum9 = 'Titan '+(args[2]*10-1)+' • Light • HP: ' + tithp[args[2]*10-1]
                                var tonum10 = 'Titan '+(args[2]*10)+' • Fire • HP: ' + tithp[args[2]*10]
                                var pnum = 'Page '+args[2]+' of 5'
                                if(tpnum1==undefined) tpnum1='Free'
                                if(tpnum2==undefined) tpnum2='Free'
                                if(tpnum3==undefined) tpnum3='Free'
                                if(tpnum4==undefined) tpnum4='Free'
                                if(tpnum5==undefined) tpnum5='Free'
                                if(tpnum6==undefined) tpnum6='Free'
                                if(tpnum7==undefined) tpnum7='Free'
                                if(tpnum8==undefined) tpnum8='Free'
                                if(tpnum9==undefined) tpnum9='Free'
                                if(tpnum10==undefined) tpnum10='Free'
                                var rlist = new Discord.RichEmbed()
                                .setTitle(pnum)
                                .addField(tonum1,tpnum1)
                                .addField(tonum2,tpnum2)
                                .addField(tonum3,tpnum3)
                                .addField(tonum4,tpnum4)
                                .addField(tonum5,tpnum5)
                                .addField(tonum6,tpnum6)
                                .addField(tonum7,tpnum7)
                                .addField(tonum8,tpnum8)
                                .addField(tonum9,tpnum9)
                                .addField(tonum10,tpnum10)
                                message.channel.sendEmbed(rlist);
                                break;
                            }
                        message.channel.sendMessage('Invalid page, valid range **1-20**')
                        break;
                    case 'reserves':
                        if(!sendrl) {
                            message.channel.sendMessage('Only **[Raid Leader]** can use this command!');
                            break;
                        }
                        if(args[2]>=1 && args[2]<=50 && titan[args[2]]==undefined && sendrl && args[3]) {
                            message.channel.sendMessage('**[Raid Leader] '+sender+'**'+' reserved titan '+args[2]+' for **'+args[3]+'**');
                            titan[args[2]]=args[3];
                            break;
                        } else {
                            if(titan[args[2]]!==undefined) {
                                message.channel.sendMessage('Titan '+args[2]+' is reserved by **'+titan[args[2]]+'**');
                                break;
                            } else {
                                if(args[2]) {
                                    message.channel.sendMessage('Titan '+args[2]+' is invalid, valid range **1-50**');
                                    break;
                            } else {
                                message.channel.sendMessage('Invalid syntax');
                                break;
                            }
                        }
                        }
                    case 'reset':
                        if(!sendrl) {
                            message.channel.sendMessage('Only **[Raid Leader]** can use this command!');
                            break;
                        }
                        titan[0]=undefined;
                        titan[1]=undefined;
                        titan[2]=undefined;
                        titan[3]=undefined;
                        titan[4]=undefined;
                        titan[5]=undefined;
                        titan[6]=undefined;
                        titan[7]=undefined;
                        titan[8]=undefined;
                        titan[9]=undefined;
                        titan[10]=undefined;
                        titan[11]=undefined;
                        titan[12]=undefined;
                        titan[13]=undefined;
                        titan[14]=undefined;
                        titan[15]=undefined;
                        titan[16]=undefined;
                        titan[17]=undefined;
                        titan[18]=undefined;
                        titan[19]=undefined;
                        titan[20]=undefined;
                        titan[21]=undefined;
                        titan[22]=undefined;
                        titan[23]=undefined;
                        titan[24]=undefined;
                        titan[25]=undefined;
                        titan[26]=undefined;
                        titan[27]=undefined;
                        titan[28]=undefined;
                        titan[29]=undefined;
                        titan[30]=undefined;
                        titan[31]=undefined;
                        titan[32]=undefined;
                        titan[33]=undefined;
                        titan[34]=undefined;
                        titan[35]=undefined;
                        titan[36]=undefined;
                        titan[37]=undefined;
                        titan[38]=undefined;
                        titan[39]=undefined;
                        titan[40]=undefined;
                        titan[41]=undefined;
                        titan[42]=undefined;
                        titan[43]=undefined;
                        titan[44]=undefined;
                        titan[45]=undefined;
                        titan[46]=undefined;
                        titan[47]=undefined;
                        titan[48]=undefined;
                        titan[49]=undefined;
                        titan[50]=undefined;
                        titan[51]=undefined;
                        message.channel.sendMessage('**[Raid Leader]** '+sender+' resets all reservation! All Titans are **free** now!');
                        break;                        
                    default:
                        message.channel.sendMessage('Use **!raid help** for command help');
                        break;
                }
            } else {
                message.channel.sendMessage('Use **!raid help** for command help');
                break;
            }
            break;
        default:
        message.channel.sendMessage("Command not found! Please use **!help** to seek help.");
    }
});

client.login(process.env.bot_token)
