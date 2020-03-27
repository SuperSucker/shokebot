const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    let argsUser
    if (member) argsUser = member.user
    else argsUser = message.author

    let statuses = {
        online: 'Онлайн',
        idle: 'Нет на месте',
        dnd: 'Не беспокоить',
        offline: 'Оффлайн'
    };
    
    let embed = new RichEmbed()
        .setAuthor(argsUser.username, argsUser.avatarURL)
        .setDescription(argsUser)
        .setThumbnail(argsUser.avatarURL)
        .addField('ID:', argsUser.id)
        .addField('Дата создания аккаунта:', new Date(argsUser.createdTimestamp))
        .addField('Зашёл на сервер в:', new Date(message.guild.member(argsUser).joinedTimestamp))
        .addField('Роли:', message.guild.member(argsUser).roles.filter(r => r.id != message.guild.id).map(role => role.name).join(', ') || 'Нет ролей')
        .setColor(message.guild.member(argsUser).displayHexColor)    
    message.channel.send(embed)
}