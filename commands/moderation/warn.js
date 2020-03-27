const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('У вас недостаточно прав для варна!');
    
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]));
    if(member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('У него слишком много прав, я не могу дать ему варн!');
    
    let reason = args.slice(1).join(' ')

    if(!reason) return message.channel.send('Нельзя варнить без причины!');

    message.channel.send(`${member} был заварнен модератором ${message.author}`)
    let channel = message.guild.channels.find(c => c.name === 'действия-модерации')

    let embed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription('Предупреждение выдано')
        .addField('Участник:', member, true)
        .addField('Модератором:', message.author.username, true)
        .addField('По причине:', reason)
        .setColor('#ffea4d')
    channel.send(embed)

    let dmembed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription('Выдано предупреждение с сервера __' + message.guild.name + '__')
        .setThumbnail(message.guild.iconURL)
        .addField('По причине:', reason)
        .setTimestamp()
        .setColor('#ff4d4d')
    member.send(dmembed)
}