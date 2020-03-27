const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
    client.user.setPresence({status: 'dnd', game:{name: `${client.users.size} участников`, type: 3}})
    console.log('I am here!')
})

const fs = require('fs');
const Enmap = require('enmap');

client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/moderation/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/moderation/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Загружаю команду модерации: ${commandName}`);
    client.commands.set(commandName, props);
  });
});

fs.readdir("./commands/utility/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/utility/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Загружаю утилиту: ${commandName}`);
      client.commands.set(commandName, props);
    });
});

fs.readdir("./commands/fun/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/fun/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Загружаю фан команду: ${commandName}`);
      client.commands.set(commandName, props);
    });
});

fs.readdir("./commands/help/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/help/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Загружаю команду помощи: ${commandName}`);
    client.commands.set(commandName, props);
  });
});


client.on('messageDelete', async (message) => {
  if(!message.content) return;
  let channel = message.guild.channels.find(c => c.name === 'лог-сообщений')

  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`Сообщение от участника ${message.author} было удалено`)
    .addField('В сообщении было:', message.content)
    .setFooter('Время')
    .setTimestamp()
    .setColor('#e02f2f')
  channel.send(embed)
})

client.on('messageUpdate', async (before, after) => {
  if(!before.content) return;
  let channel = before.guild.channels.find(c => c.name === 'лог-сообщений')

  let embed = new Discord.RichEmbed()
    .setAuthor(before.author.tag, before.author.avatarURL)
    .setDescription(`${before} отредактировал своё сообщение`)
    .addField('До редактирования:', before.content)
    .addField('После редактирования:', after.content)
    .setColor('#fff540')
    .setFooter('Время')
    .setTimestamp()
  channel.send(embed)
})

client.on('guildMemberAdd', async (member) => {
  let channel = member.guild.channels.find(c => c.name === 'вход-и-выход')

  let embed = new Discord.RichEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setDescription(`${member} присоединился к серверу`)
    .addField('Дата создания аккаунта:', new Date(member.user.createdAt))
    .setColor('#59ff4a')
  channel.send(embed)
})

client.on('guildMemberRemove', async (member) => {
  let channel = member.guild.channels.find(c => c.name === 'вход-и-выход')

  let embed = new Discord.RichEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setDescription(`${member} вышел с сервера`)
    .setColor('#fc4242')
    .setFooter('Время')
    .setTimestamp()
  channel.send(embed)
})


client.login(config.token)
