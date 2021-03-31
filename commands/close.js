const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
module.exports = {
  name: 'close',
  description: 'Close a ticket of User',
  usage: '@user',
  aliases: ['Done'],
  example: 'add @exampleUser',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // Empieza el comado aca
    if(!message.channel.name.startsWith('ticket-')) {
      if(config.useEmbeds) {
          const notTicket = new Discord.MessageEmbed()
              .setColor("#E74C3C")
              .setDescription(`:x: **This command can only be used within a ticket channel**`)
          return message.channel.send(notTicket);
      } else {
          return message.channel.send(`:x: **This command can only be used within a ticket channel**`)
    }
  }
    if (!args[0]) return message.channel.send("Provide a reason for closing the ticket");
    let reason = args.join(" ") || "No Reason Provided.";
    let name = message.channel.name;
    const transcriptChannel = client.channels.cache.get(config.TranscriptLog);

    const embed9 = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Axuze Tickets")
    .setDescription('Are you sure? Once confirmed, you cannot reverse this action!\nTo close ticket, type \`a/confirm\`. This will time out in 10 seconds and be cancelled.')
    .setFooter(`${config.name}`)
    .setTimestamp();
    message.channel.send({ embed: embed9 })
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'a/confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();

          if(config.useEmbeds) {
            const embed = new Discord.MessageEmbed()
              .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
              .setTitle("Ticket Closed")
              .setColor(config.colour)
              .addField("Username", message.author, true)
              .addField("Channel", message.channel.name, true)
              .addField("Reason", reason, false)
              .setTimestamp()
              .setFooter("Tickets | Axuze Community");
            client.channels.cache.get(config.logChannel).send({embed})
          } else {
            client.channels.cache.get(config.logChannel).send(`Ticket closed by **${message.author.tag} (${message.author.id})**`);
          }
          console.info(`${message.author.tag} closed a ticket (#${message.channel.name})`);

          message.channel.messages.fetch({ limit: 100 }).then( msgs => {
            let txt = '';

            msgs = msgs.sort( ( a, b ) => a.createdTimestamp - b.createdTimestamp );
            txt += `${message.guild.name}\n`;
            txt += `#${message.channel.name}\n`;
            txt += `${msgs.size} messages\n\n\n`;

            msgs.forEach( msg => {
                if ( msg.content ) {
                    txt += `----- ${msg.author.tag} at ${msg.createdAt}\n`;
                    txt += `${msg.content}\n`;
                    txt += `-----\n\n`;
                }
            });

            transcriptChannel.send( new Discord.MessageAttachment( Buffer.from( txt ), `${name}.txt` ) );
            
            const trn = new Discord.MessageEmbed()
            .setTitle('Trancripts')
            .addField("Channel", message.channel.name, true)
            .setTimestamp()
            .setFooter("Trancripts | Axuze Community")
            transcriptChannel.send(trn)


              message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
      });
    })
  }
};  