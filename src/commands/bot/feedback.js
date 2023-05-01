const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "1062353797864763453",
    token: "xI8OiRwQZCZphUOZdMtvPPkF0s_Ha6KKX_DBtMeKehOTLpShMOD-5jtqcMLgFT5GFDoE",
});

module.exports = async (client, interaction, args) => {
    const feedback = interaction.options.getString('feedback');

    const embed = new Discord.EmbedBuilder()
        .setTitle(`📝・New feedback!`)
        .addFields(
            { name: "User", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        )
        .setDescription(`${feedback}`)
        .setColor(client.config.colors.normal)
    webhookClient.send({
        username: 'Bot Feedback',
        embeds: [embed],
    });

    client.succNormal({ 
        text: `Feedback successfully sent to the developers`,
        type: 'editreply'
    }, interaction);
}

 