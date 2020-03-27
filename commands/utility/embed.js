const { RichEmbed } = require('discord.js'); 

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('У вас недостаточно прав для использования этой команды!');

    let color = args[0];
    let content = args.slice(1).join(' ');

    if(!color) return message.channel.send('Укажите цвет ембеду!');
    if(!content) return message.channel.send('Ембед пустой будет? Или ты что-нибудь напишешь?');

    let embed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(color)
        .setDescription(content)
    message.channel.send(embed)
}