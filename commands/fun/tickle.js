const Discord = require("discord.js");
const superagent = require("snekfetch");
     
        exports.run = async (client, message, args) => {
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply('Упомяни того, кого хочешь пощекотать!');

            superagent.get('https://nekos.life/api/v2/img/tickle')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(`${message.author.username} зашекотал ${user.username}`)
              .setImage(response.body.url)
              .setColor(`#ff4586`)
              .setDescription(`${message.author} расщекотал ${user}`)
              .setFooter(`._.`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            })
          
        }