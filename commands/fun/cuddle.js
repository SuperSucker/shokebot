const Discord = require("discord.js");
const superagent = require("snekfetch");
     
        exports.run = async (client, message, args) => {
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply('Упомяни того, кого хочешь обнять.');

            superagent.get('https://nekos.life/api/v2/img/cuddle')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(user.username + " только что обнялся с " + message.author.username)
              .setImage(response.body.url)
              .setColor(`#ff80f4`)
              .setDescription((user.toString() + " был обнят " + message.author.toString()))
              .setFooter(`это так мило ❤️`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            })
          
        }