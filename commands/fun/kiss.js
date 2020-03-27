const Discord = require("discord.js");
const superagent = require("snekfetch");
     
        exports.run = async (client, message, args) => {
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply('Упомяни того, кого хочешь поцеловать.');

            superagent.get('https://nekos.life/api/v2/img/kiss')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(user.username + " только что был поцелован " + message.author.username)
              .setImage(response.body.url)
              .setColor(`#7dffeb`)
              .setDescription(`${message.author} только что поцеловал ${user}`)
              .setFooter(`это так мило ❤️`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            })
          
        }