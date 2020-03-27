const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setTitle('Помощь по командам')
        .addField('Список фан команд', 's!help-fun')
        .addField('Команды модерации:', 's!help-mod')
        .addField('Утилиты:', 's!help-utility')
        .setColor('#0876c9')
    message.channel.send(embed)       
}