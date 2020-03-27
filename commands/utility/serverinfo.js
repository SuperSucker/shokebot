const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let guild = message.guild;

    let verifLevels = ["Отсутствует", "Низкий", "Средний", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

    let region = {
        "brazil": ":flag_br: Бразилия",
		"eu-central": ":flag_eu: Центральная Европа",
        "singapore": ":flag_sg: Сингапур",
        "us-central": ":flag_us: Центральные США",
        "sydney": ":flag_au: Сидней",
        "us-east": ":flag_us: Восточные США",
        "us-south": ":flag_us: Южные США",
        "us-west": ":flag_us: Западеые штаты Америки",
        "eu-west": ":flag_eu: Западная Европа",
        "vip-us-east": ":flag_us: Восток США",
        "london": ":flag_gb: Лондон",
        "amsterdam": ":flag_nl: Амстердам",
        "hongkong": ":flag_hk: Гонконг",
        "russia": ":flag_ru: Россия",
        "southafrica": ":flag_za:  Южная Африка"
    };

    let embed = new RichEmbed()
        .setAuthor(guild.name, guild.iconURL)
        .setDescription('Информация о сервере __' + guild.name + '__')
        .addField('Овнер:', `${guild.owner} (${guild.owner.id})`)
        .addField('Всего участников:', guild.members.size, true)
        .addField('Участники без ботов:', guild.members.filter(m => !m.user.bot).size, true)
        .addField('Регион:', region[guild.region], true)
        .addField('Уровень проверки:', verifLevels[guild.verificationLevel], true)
        .setColor('#3289a8')
        .setFooter('Дата создания')
        .setTimestamp(new Date(guild.createdTimestamp))
    message.channel.send(embed)
}