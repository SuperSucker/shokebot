const Discord = require("discord.js");
const superagent = require("snekfetch");
     
        exports.run = async (client, message, args) => {
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply('Упомяните того, кого хотите погладить!');

            superagent.get('https://nekos.life/api/v2/img/pat')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(message.author.username + " погладил " + user.username)
              .setImage(response.body.url)
              .setColor(`#9aff57`)
              .setDescription(`${message.author} погладил ${user}`)
              .setFooter(`ого`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            })
          
        }