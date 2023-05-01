const Discord = require('discord.js');

const Schema = require('../../database/models/afk');

module.exports = async (client, interaction, args) => {
    const rawboard = await Schema.find({ Guild: interaction.guild.id })

    if (rawboard.length < 1) return client.errNormal({ 
        error: "Данные не найдены!",
        type: 'editreply'
    }, interaction);

    const lb = rawboard.map(e => `<@!${e.User}> - **Причина** ${e.Message}`);

    await client.createLeaderboard(`🚫・Пользователи AFK - ${interaction.guild.name}`, lb, interaction);
}

 