const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Информация Создателя`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Ник Создателя",
            value: `The_Lusty`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `The_Lusty#1558`,
            inline: true,
        },
        {
            name: "🏢┆Организация",
            value: `Thelysti's Corporation`,
            inline: true,
        },
        {
            name: "🌐┆Вебсайт",
            value: `[N/A]`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 