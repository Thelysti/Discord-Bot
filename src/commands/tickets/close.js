const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");
const ticketMessageConfig = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id });

    let type = 'reply';
    if (interaction.isCommand()) type = 'editreply';

    if (ticketData) {
        if (ticketData.resolved == true) return client.errNormal({
            error: "Билет уже закрыт!",
            type: 'ephemeraledit'
        }, interaction);

        if (data) {
            const ticketCategory = interaction.guild.channels.cache.get(data.Category);
            const logsChannel = interaction.guild.channels.cache.get(data.Logs);

            if (ticketCategory == undefined) {
                return client.errNormal({
                    error: "Выполните настройку!",
                    type: type
                }, interaction);
            }

            if (interaction.guild.channels.cache.find(c => c.id === ticketCategory.id)) {
                client.users.fetch(ticketData.creator).then(async usr => {
                    interaction.channel.permissionOverwrites.edit(usr, {
                        ViewChannel: false,
                        SendMessages: false,
                        AttachFiles: false,
                        ReadMessageHistory: false,
                        AddReactions: false
                    });

                    try {
                        var closeMessageTicket = "Вот весь диалог вашего билета, пожалуйста, сохраните его, если вы когда-нибудь захотите к ней обратиться!";
                        let ticketMessageData = await ticketMessageConfig.findOne({ Guild: interaction.guild.id });
                        if (ticketMessageData) {
                            closeMessageTicket = ticketMessageData.dmMessage;
                        }

                        client.embed({
                            desc: closeMessageTicket,
                            fields: [
                                {
                                    name: "👤┆Закрыл",
                                    value: `${interaction.user}`,
                                    inline: true
                                },
                                {
                                    name: "📄┆ID билета",
                                    value: `${ticketData.TicketID}`,
                                    inline: true
                                },
                                {
                                    name: "💬┆Сервер",
                                    value: `${interaction.guild.name}`,
                                    inline: true
                                }
                            ]
                        }, usr)
                        client.transcript(interaction, usr).catch(() => { });
                    }
                    catch (err) { }
                })

                if (logsChannel) {
                    client.embed({
                        title: `🔒・Билет закрыт`,
                        desc: `Билет закрыт`,
                        color: client.config.colors.error,
                        fields: [
                            {
                                name: "📘┆ID Билета",
                                value: `${ticketData.TicketID}`,
                            },
                            {
                                name: "👤┆Закрыл его",
                                value: `${interaction.user.tag} (${interaction.user.id})`,
                            },
                            {
                                name: "👤┆Создатель",
                                value: `<@!${ticketData.creator}>`,
                            },
                            {
                                name: "✋┆Разбирал",
                                value: `<@!${ticketData.creator}>`,
                            },
                            {
                                name: "⏰┆Дата",
                                value: `<t:${(Date.now() / 1000).toFixed(0)}:F>`,
                            }
                        ]
                    }, logsChannel)
                    client.transcript(interaction, logsChannel);
                }

                ticketData.resolved = true;
                ticketData.save();

                interaction.channel.edit({ name: `билет-рассмотрен` });
                client.simpleEmbed({
                    desc: `Билет закрыл <@!${interaction.user.id}>`,
                    type: type
                }, interaction)

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_transcriptTicket')
                            .setEmoji('📝')
                            .setStyle(Discord.ButtonStyle.Primary),

                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_openTicket')
                            .setEmoji('🔓')
                            .setStyle(Discord.ButtonStyle.Primary),

                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_deleteTicket')
                            .setEmoji('⛔')
                            .setStyle(Discord.ButtonStyle.Danger),
                    );

                client.embed({
                    title: "🔒・Закрыть",
                    desc: `📝 - Сохранить диалог \n🔓 - Открыть заново \n⛔ - Удалить билет`,
                    components: [row],
                }, interaction.channel)
            }
            else {
                return client.errNormal({
                    error: "Выполните настройку билетов!",
                    type: type
                }, interaction);

            }
        }
        else {
            return client.errNormal({
                error: "Выполните настройку билетов!",
                type: type
            }, interaction)
        }
    }
}

 