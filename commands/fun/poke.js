const Discord = require("discord.js");
const superagent = require("snekfetch");
     
        exports.run = async (client, message, args) => {
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply('Упомяните того, кого хотите тыкнуть!');

            superagent.get('https://nekos.life/api/v2/img/poke')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(`${message.author.username} тыкнул ${user.username}`)
              .setImage(response.body.url)
              .setColor(`#ff5454`)
              .setDescription((user.toString() + " был затыкан " + message.author.toString()))
              .setFooter(`Покойся С Миром`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            })
          
        }