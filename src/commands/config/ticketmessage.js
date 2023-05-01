const Discord = require('discord.js');

const Schema = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const type = interaction.options.getString('type');
    const message = interaction.options.getString('message');

    if (type == "open") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.openTicket = "Спасибо за создание билета! \nСлужба поддержки свяжется с вами в ближайшее время \n\n🔒 - Закрыть билет \n✋ - Взять билет \n📝 - Сохранить диалог \n🔔 - Отправить уведомление";
                data.save();

                client.succNormal({
                    text: `Сообщение о тикете было установлено успешно`,
                    fields: [
                        {
                            name: `📘┆Тип сообщения`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Сообщение`,
                            value: `${data.openTicket}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Данные сообщения о тикете не найдены!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.openTicket = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    openTicket: message
                }).save();
            }
        })

        client.succNormal({
            text: `Сообщение о тикете было установлено успешно`,
            fields: [
                {
                    name: `📘┆Тип сообщения`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Сообщение`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
    else if (type == "close") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.dmMessage = "Вот расшифровка вашего билета, пожалуйста, сохраните ее, если вы когда-нибудь захотите к ней обратиться!";
                data.save();

                client.succNormal({
                    text: `Сообщение о тикете было установлено успешно`,
                    fields: [
                        {
                            name: `📘┆Тип сообщения`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Сообщение`,
                            value: `${data.dmMessage}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Данные сообщения о тикете не найдены!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.dmMessage = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    dmMessage: message
                }).save();
            }
        })

        client.succNormal({
            text: `Сообщение о тикете было установлено успешно`,
            fields: [
                {
                    name: `📘┆Тип сообщения`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Сообщение`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}

 