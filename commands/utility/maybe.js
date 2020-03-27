const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('Недостаточно прав!\n**Нужно**: `Управление Сервером`.')

    let msgid = args[0]
    if(!msgid) return message.channel.send('Нету ID Предложения или оно недействительное!')
       
    if(!args[1]) return message.channel.send('Где ваш комментарий?')
  
    message.channel.fetchMessage(msgid)
    .catch(error => {
      if (error.code == 10008) {
        return;
      }
      })
    .then(msg => {
          let embed = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL)
            .setDescription('Возможное принятие предложения.')
            .addField('Предложение:', msg.content)
            .addField('Комментарий модератора - ' + message.author.username, args.slice(1).join(' '))
            .setColor('#eeff00')
        msg.channel.send(embed)
        message.channel.send('Предложение рассмотрено!')
         msg.delete();
         message.delete();
      let dmembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription('Ваше предложение возможно будет принято!')
        .addField('Предложение:', msg.content)
        .addField('Комментарий от модератора - ' + message.author.username, args.slice(1).join(' '))
        .setColor('#eeff00')
      msg.author.send(dmembed)
    })

}