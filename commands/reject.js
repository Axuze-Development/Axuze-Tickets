const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();
const log = require(`leekslazylogger`);
const channelId = '782439086928953352'
module.exports = {
  name: 'reject',
  description: 'Start an application to give Support in Axure',
  usage: '<@member>',
  aliases: ['rejected'],
  example: 'reject @user <message>',
  args: true,
  cooldown: config.cooldown,
  guildOnly: true,
  async execute(message, args) {
    const client = message.client;

    const errNopermsReview = new Discord.MessageEmbed()
    .setTitle(':lock: **Access Denied!**')
    .setFooter('Reviewer Role is required to review applications!')
    .setColor("#D01C16")
    .setTimestamp()

    if (!message.member.roles.cache.some(r => r.id === config.reviewer_id)) return message.channel.send(errNopermsReview);

    if (!args[0]) return message.channel.send("Usage: a/reject [MEMBER] [RESPONSE MESSAGE]");
    let dUser =
     message.guild.member(message.mentions.users.first())

     if (!dUser) return message.channel.send("`Mention someone to reject`");

     let dMessage = args.join(" ").slice(22);

     const noResMsg = new Discord.MessageEmbed()
     .setTitle(":x: **Error**")
     .setDescription('Please write a response message')
     .setFooter('Usage: a/reject [MENTION] [RESPONSE MESSAGE')
     .setColor("#D01C16")
     .setTimestamp()

     if (dMessage.length < 1) return message.reply(noResMsg);

     const rejectUser = new Discord.MessageEmbed()
     .setTitle('**Hey there**')
     .setDescription('You got a response from application is [`' + message.guild.name + '`]')
     .addField('Status:', 'Rejected')
     .addField('Rejected By:', `${message.author}`)
     .addField('Reponse Message:', `${dMessage}`)
     .setColor(config.colour)
     .setTimestamp()

     dUser.send(rejectUser)

     const rejectedConfirm = new Discord.MessageEmbed()
     .setTitle('**Application Rejected**')
     .setDescription(`You can check your inbox, ${dUser}`)
     .setColor(config.colour)
     .setTimestamp()

     message.channel.send(rejectedConfirm)


  }
}      