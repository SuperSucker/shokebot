const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setTitle('Список фан-команд')
        .addField('s!cuddle', 'обнять пользователя')
        .addField('s!kiss', 'поцеловать пользователя')
        .addField('s!pat', 'приласкать пользователя')
        .addField('s!poke', 'тыкнуть пользователя')
        .addField('s!slap', 'шлёпнуть пользователя')
        .addField('s!tickle', 'пощекотать пользователя')
        .setColor('#0876c9')    
    message.channel.send(embed)
}