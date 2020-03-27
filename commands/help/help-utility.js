const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setTitle('Список фан-команд')
        .addField('s!apply', 'принять предложение', true)
        .addField('s!maybe', 'возможное принятие предложения', true)
        .addField('s!deny', 'отклонить предложение', true)
        .addField('s!embed', 'сообщение в ембеде от лица бота')
        .addField('s!serverinfo', 'получить информацию о сервере')
        .addField('s!userinfo', 'получить информацию о пользователе')
        .setColor('#0876c9')    
    message.channel.send(embed)
}