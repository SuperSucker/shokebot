const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setTitle('Список комманд для модераторов')
        .addField('s!ban', 'забанить пользователя')
        .addField('s!prune', 'очистка чата')
        .addField('s!tempmute', 'временно ограничить доступ к чату')
        .addField('s!warn', 'выдать предупреждение')
        .setColor('#0876c9')    
    message.channel.send(embed)
}