const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id })

    if (ticketData) {
        if (interaction.user.id !== ticketData.creator) {
            const perms = await client.checkUserPerms({
                flags: [Discord.PermissionsBitField.Flags.ManageMessages],
                perms: [Discord.PermissionsBitField.Flags.ManageMessages]
            }, interaction)
        
            if (perms == false) return;

            if (data) {
                if (ticketData.claimed == "" || ticketData.claimed == undefined || ticketData.claimed == "None") {
                    client.errNormal({
                        text: "Тикет никто не разбирает!",
                        type: 'ephemeral'
                    }, interaction)
                }
                else {
                    if (ticketData.claimed == interaction.user.id) {
                        const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                        if (ticketCategory == undefined) {
                            return client.errNormal({
                                error: "Выполните настройку!",
                                type: 'editreply'
                            }, interaction);
                        }

                        if (interaction.channel.parentId == ticketCategory.id) {

                            ticketData.claimed = "None";
                            ticketData.save();

                            return client.simpleEmbed({
                                desc: `Теперь этот билет может разбирать новый саппорт!`,
                                type: 'editreply'
                            }, interaction)

                        }
                        else {
                            client.errNormal({
                                error: "Это не билет!",
                                type: 'editreply'
                            }, interaction)
                        }
                    }
                    else {
                        client.errNormal({
                            error: "Вы не разбираете данный билет!",
                            type: 'editreply'
                        }, interaction)
                    }
                }
            }
            else {
                return client.errNormal({
                    error: "Выполните настройку билетов!",
                    type: 'editreply'
                }, interaction)
            }
        }
    }
}

 