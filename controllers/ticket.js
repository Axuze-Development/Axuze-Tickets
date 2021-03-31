const Discord = require('discord.js');
const config = require('../config.json');

/**
 * Soporte ticket
 */
const openTicket = async function (message, user) {
    let id = user.id.toString().substr(0, 4) + user.discriminator;
    let chan = `ticket-${user.username}`.toLowerCase();

    if (message.guild.channels.cache.find(channel => channel.name === chan)) {
        if (config.useEmbeds) {
            const err1 = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`:x: You already have an open ticket.`)
                .setFooter(`${config.name}`)
                .setTimestamp()
            return message.channel.send(err1).then((message) => {
                setTimeout(() => {
                    message.delete();
                }, 5000);
            });
        } else {
            return message.channel.send(`:x: You already have an open ticket.`)
        }

    };

    const ticketCreated = await message.guild.channels.create(chan, {
        type: 'text',
        topic: `${user} | Please be patient and do not tag the staff.`,
        parent: config.ticketsCat, 
        permissionOverwrites: [
            {
                allow: 'VIEW_CHANNEL',
                id: user.id
            },
            {
                deny: 'VIEW_CHANNEL',
                id: message.guild.id
            },
            {
                allow: 'VIEW_CHANNEL',
                id: '824458921480945704'
            }
        ]
      });

        if (config.tagHereOnly) {
            await ticketCreated.send(`@here, ${user} Has created a new ticket.\n`);
        } else {
            await ticketCreated.send(`<@&${config.supportRole}>, ${user} Has created a new ticket.\n`);
        };

        const embedTicketcreated = new Discord.MessageEmbed()
        .setTitle('**Axuze Tickets (Help)**')
        .setDescription(`Please explain what's the problem so staffs can help you.\n\nAlso be patient and don't tag the staff.`)
        .addField('Author', user)
        .setThumbnail('https://i.imgur.com/dzcjbQDh.jpg')
        .setFooter(`You can close this ticket by executing ${config.prefix}close`)
        .setTimestamp()
        .setColor("BLUE")
        ticketCreated.send(embedTicketcreated)        

        if (message.guild.channels.cache.find(channel => channel.name === chan)) {
            if (config.useEmbeds) {
                const err1 = new Discord.MessageEmbed()
                    .setColor("#2ECC71")
                    .setTitle("Tickets")
                    .setDescription(`:white_check_mark: Your ticket has been created in ${ticketCreated}`)
                    .setTimestamp()
                    .setFooter(`${config.name}`)
                return message.channel.send(err1).then((message) => {
                    setTimeout(() => {
                        message.delete();
                    }, 5000);
                });
            }
        }

            }

/**
 * Compras ticket
 */

            const purTicket = async function (message, user) {
                let id = user.id.toString().substr(0, 4) + user.discriminator;
                let chan = `ticket-buy-${user.username}`.toLowerCase();
            
                if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                    if (config.useEmbeds) {
                        const err1 = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`:x: You already have an open ticket.`)
                            .setFooter(`${config.name}`)
                            .setTimestamp()
                        return message.channel.send(err1).then((message) => {
                            setTimeout(() => {
                                message.delete();
                            }, 5000);
                        });
                    } else {
                        return message.channel.send(`:x: You already have an open ticket.`)
                    }
            
                };
            
                const ticketCreated = await message.guild.channels.create(chan, {
                    type: 'text',
                    topic: `${user} | Please be patient and do not tag the staff.`,
                    parent: config.ticketspurCat, 
                    permissionOverwrites: [
                        {
                            allow: 'VIEW_CHANNEL',
                            id: user.id
                        },
                        {
                            deny: 'VIEW_CHANNEL',
                            id: message.guild.id
                        },
                        {
                            allow: 'VIEW_CHANNEL',
                            id: '824458921480945704'
                        }
                    ]
                  });
            
                    if (config.tagHereOnly) {
                        await ticketCreated.send(`@here, ${user} Has created a new ticket.\n`);
                    } else {
                        await ticketCreated.send(`<@&${config.ownerRole}>, ${user} Has created a new ticket.\n`);
                    };
            
                    const embedTicketcreated = new Discord.MessageEmbed()
                    .setTitle('**Axuze Tickets (Buy)**')
                    .setDescription(`Please explain which product you want to buy and wait for <@&824458917677105153> and <@&826322663050838017> to help you!\n\nAlso be patient and don't tag the staff.`)
                    .addField('Author', user)
                    .setThumbnail('https://i.imgur.com/dzcjbQDh.jpg')
                    .setFooter(`You can close this ticket by executing ${config.prefix}close`)
                    .setTimestamp()
                    .setColor(config.colour)
                    ticketCreated.send(embedTicketcreated) 

            
                    if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                        if (config.useEmbeds) {
                            const err1 = new Discord.MessageEmbed()
                                .setColor("#2ECC71")
                                .setTitle("Tickets")
                                .setDescription(`:white_check_mark: Your ticket has been created in ${ticketCreated}`)
                                .setTimestamp()
                                .setFooter(`${config.name}`)
                            return message.channel.send(err1).then((message) => {
                                setTimeout(() => {
                                    message.delete();
                                }, 5000);
                            });
                        }
                    }
            
                        }    

/**
 * Rewards ticket
 */                    
                        const bugTicket = async function (message, user) {
                            let id = user.id.toString().substr(0, 4) + user.discriminator;
                            let chan = `ticket-rewards-${user.username}`.toLowerCase();
                        
                            if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                                if (config.useEmbeds) {
                                    const err1 = new Discord.MessageEmbed()
                                        .setColor("#E74C3C")
                                        .setDescription(`:x: You already have an open ticket.`)
                                        .setFooter(`${config.name}`)
                                        .setTimestamp()
                                    return message.channel.send(err1).then((message) => {
                                        setTimeout(() => {
                                            message.delete();
                                        }, 5000);
                                    });
                                } else {
                                    return message.channel.send(`:x: You already have an open ticket.`)
                                }
                        
                            };
                        
                            const ticketCreated = await message.guild.channels.create(chan, {
                                type: 'text',
                                topic: `${user} | Please be patient and do not tag the staff.`,
                                parent: config.ticketsbugCat, 
                                permissionOverwrites: [
                                    {
                                        allow: 'VIEW_CHANNEL',
                                        id: user.id
                                    },
                                    {
                                        deny: 'VIEW_CHANNEL',
                                        id: message.guild.id
                                    },
                                    {
                                        allow: 'VIEW_CHANNEL',
                                        id: '824683419019116595'
                                    }
                                ]
                              });
                        
                                if (config.tagHereOnly) {
                                    await ticketCreated.send(`@here, ${user} Has created a new ticket.\n`);
                                } else {
                                    await ticketCreated.send(`<@&${config.supportRole}>, ${user} Has created a new ticket.\n`);
                                };
                        
                                const embedTicketcreated = new Discord.MessageEmbed()
                                .setTitle('**Axuze Tickets (Rewards)**')
                                .setDescription(`Please explain what reward you want so the staff can help you.\nAlso be patient and don't tag the staff.`)
                                .addField('Author', user)
                                .setThumbnail('https://i.imgur.com/dzcjbQDh.jpg')
                                .setFooter(`You can close this ticket by executing ${config.prefix}`)
                                .setTimestamp()
                                .setColor("BLUE")
                                ticketCreated.send(embedTicketcreated)        
                        
                                if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                                    if (config.useEmbeds) {
                                        const err1 = new Discord.MessageEmbed()
                                            .setColor("#2ECC71")
                                            .setTitle("Tickets")
                                            .setDescription(`:white_check_mark: Your ticket has been created in ${ticketCreated}`)
                                            .setTimestamp()
                                            .setFooter(`${config.name}`)
                                        return message.channel.send(err1).then((message) => {
                                            setTimeout(() => {
                                                message.delete();
                                            }, 5000);
                                        });
                                    }
                                }
                        
                                    }              
    
/**
 * Close a ticket
 */
const closeTicket = function (message) {
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
    else {
        try {
            message.channel.delete()
        } catch(error) {
            log.error(log.colour.red(error));
        }
    }
}

module.exports = {
    openTicket,
    purTicket,
    bugTicket,
    closeTicket
}