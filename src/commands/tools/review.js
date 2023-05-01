const Discord = require('discord.js');

const Schema = require("../../database/models/reviewChannels");

module.exports = async (client, interaction, args) => {
    const stars = interaction.options.getNumber('stars');
    const message = interaction.options.getString('message') || 'Not given';

    if (stars < 1 || stars > 5) return client.errNormal({
        error: `Звёздочек должно быть минимум 1 или максимум 5.`,
        type: 'editreply'
    }, interaction)

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            const channel = interaction.member.guild.channels.cache.get(data.Channel);
            if (!channel) return  client.errNormal({
                error: `Канал для оценивания не указан! Используйте \`reviewchannel\``,
                type: 'editreply'
            }, interaction);
            
            let totalStars = "";
            for (let i = 0; i < stars; i++) {
                totalStars += ":star:";
            }

            client.succNormal({
                text: "Ваша оценка была успешно отправлена!",
                fields: [
                    {
                        name: `⭐┇Звёзд`,
                        value: `${stars}`,
                        inline: true
                    },
                    {
                        name: `📘┇Канал`,
                        value: `<#${data.Channel}>`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);

            client.embed({
                title: `Оценил・${interaction.user.tag}`,
                desc: `Была написана новая оценка!`,
                fields: [
                    {
                        name: "Звёзд",
                        value: `${totalStars}`,
                        inline: true,
                    },
                    {
                        name: "Примечание",
                        value: `${message}`,
                        inline: true,
                    },
                ]
            }, channel)

        }
        else {
            client.errNormal({
                error: `Канал для оценивания не указан! Используйте \`reviewchannel\``,
                type: 'editreply'
            }, interaction)
        }
    })
}

 