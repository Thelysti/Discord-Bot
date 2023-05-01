const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    if (data) {
        const ticketCategory = interaction.guild.channels.cache.get(data.Category);
        if (ticketCategory == undefined) {
            return client.errNormal({
                error: "Выполните настройку билетов!",
                type: 'editreply'
            }, interaction)
        }

        if (interaction.channel.parentId == ticketCategory.id) {
            let name = interaction.options.getString('name');
            interaction.channel.edit({ name: name });

            return client.simpleEmbed({
                desc: `Название билета было изменено на ${name}`,
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
}

 