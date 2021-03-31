const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();
const log = require(`leekslazylogger`);
const channelId = '782439086928953352';
const q = require('../questions.json')
module.exports = {
  name: 'apply',
  description: 'Start an application to give Support in Axure',
  usage: '<@member>',
  aliases: ['application'],
  example: 'apply @user',
  args: true,
  cooldown: config.cooldown,
  guildOnly: true,
  async execute(message, args) {
    const client = message.client;

    const applyErrChannel = new Discord.MessageEmbed()
        .setTitle(":lock: **Access Denied**")
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter("You can't apply in this channel! Contact staff for applications channel")
        .setColor("#D01C16")
        .setTimestamp()

    if (message.channel.id !== config.applyChannel) return message.channel.send(applyErrChannel)

    function EachEmbed (contentIndex) {
            const dmEmb = new Discord.MessageEmbed()
                            .setTitle(contentIndex)
                            .setColor(config.colour)
                            .setFooter("NO replying will cancel the application")
                            .setTimestamp()
            return dmEmb;                
    }    

    const answers = [];
    const question = Object.values(q)

          const startedApp = new Discord.MessageEmbed()
          .setTitle("⚜️ **Application Forwarded**")
          .setDescription('In applicant `DM` box')
          .addField('Status', 'Applying...')
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setThumbnail('https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif')
          .setFooter('Application has been started in Direct Messages (DM)...')
          .setColor(config.colour)
          .setTimestamp()
    message.channel.send(startedApp)


          const dmStartApp = new Discord.MessageEmbed()
          .setTitle("📥 **Let's begin the application**")
          .setDescription('> Answer the question below as sent')
          .setColor(config.colour)
    let appChannel = await message.author.send(dmStartApp);

    for(let index = 0; index < question.length; index++) {

      await message.author.send(EachEmbed(question[index]));
      let answer = await appChannel.channel.awaitMessages(answer => answer.author.id != client.user.id, {max: 1});
      answers[index] = (answer.map(answers => answers.content).join());

    }
      const Embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username + "'s Application", message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(`Tag: ${message.author.tag} | ID: ${message.author.id}`)
      .setColor(config.colour)


      question.forEach((q,i) => {
        Embed.addField(q,answers[i])

      })


      const appLogs = client.channels.cache.get(config.appsChannel);
      if (!appLogs) return console.error("[WARNING]: Log channel not set or invalid");
      await appLogs.send(Embed)

      const finishedApp = new Discord.MessageEmbed()
      .setTitle("✅ **Application Forwarded**")
      .setDescription('to `application-logs` of server.')
      .addField('Status', 'Applied!')
      .setThumbnail(`https://i.pinimg.com/originals/98/64/9a/98649add72e05e3cc1b8ae0e6f553c8e.gif`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('You will be notified soon.')
      .setColor(config.colour)
      message.channel.send(finishedApp)
      const appFinishDm = new Discord.MessageEmbed()
      .setTitle("✅ **Application has been sent!**")
      .setDescription('Please be patient while your application is reviewed by **Staff**')
      .setThumbnail(`https://i.pinimg.com/originals/98/64/9a/98649add72e05e3cc1b8ae0e6f553c8e.gif`)
      .setFooter('Good Luck!')
      .setColor(config.colour)
      message.author.send(appFinishDm)        
  }
}        