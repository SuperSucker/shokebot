const Discord = require("discord.js");
const superagent = require("snekfetch");
     
        exports.run = async (client, message, args) => {
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply('Упомяните того, кому хотите дать леща!');

            superagent.get('https://nekos.life/api/v2/img/slap')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(`${message.author.username} ударил ${user.username}`)
              .setImage(response.body.url)
              .setColor(`#e69900`)
              .setDescription(`${user} получил по мордасам от ${message.author}`)
              .setFooter(`Это должно быть больно`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            })
          
        }