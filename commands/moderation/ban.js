const {RichEmbed} = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('У вас недостаточно прав на использование команды!')
    else if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('У меня нет прав на бан!')

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!member) return message.channel.send('Укажите существующего участника!');
    else if (member.hasPermission("BAN_MEMBERS")) return message.channel.send('Я не могу забанить этого участника, у него слишком много прав!');

    if(member.id === '425901434995998730') return;

    let reason = args.slice(1).join(' ');
    if(!reason) return message.channel.send('Нельзя банить без причины!');

    await member.ban(reason)
    await message.channel.send(`Успешно забанен <@${member.id}>\nПо причине: ${reason}`);
    
    let channel = message.guild.channels.find(c => c.name === 'действия-модерации')
        let embed = new RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription('Блокировка выдана')
            .addField('Участнику:', member.user.username, true)
            .addField('Модератором:', message.author.username, true)
            .addField('По причине:', reason)
            .setColor('#ff4545')
        channel.send(embed)
}
