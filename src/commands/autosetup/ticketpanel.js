const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);
            const button = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket')
                .setLabel("Создать")
                .setStyle(Discord.ButtonStyle.Primary)
                .setEmoji('🎫')

            const row = new Discord.ActionRowBuilder()
                .addComponents(button)

            client.embed({
                title: "Билеты",
                desc: "Нажмите на 🎫 чтобы открыть билет",
                components: [row]
            }, channel)

            client.succNormal({
                text: `Панель управления билетами была успешно настроена!`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Сначала запустите настройку билета!`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 