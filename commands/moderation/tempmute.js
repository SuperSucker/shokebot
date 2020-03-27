const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
       if(message.guild === null)return;
       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('У вас недостаточно прав на мут!');
  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Укажите существующего пользователя!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("У него слишком много прав, не могу дать ему мут!");
  let muterole = message.guild.roles.find(r => r.name === 'Muted');
  
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  
  let mutetime = args[1];
  if(!mutetime) return message.reply("Укажите время заглушения!");

  await(tomute.addRole(muterole.id));
  let channel = message.guild.channels.find(c => c.name === 'действия-модерации');
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`${tomute} был заглушен модератором ${message.author}`)
    .addField('На время:', `${ms(ms(mutetime))}`)
    .setColor('#fff34f')
channel.send(embed)
  message.reply(`<@${tomute.id}> был заглушен на ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`Заглушение убрано у ${tomute}`)
    .setColor('#8cff69')
  channel.send(embed)
  }, ms(mutetime));


}
