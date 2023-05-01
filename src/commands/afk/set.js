const Discord = require('discord.js');

const Schema = require('../../database/models/afk');

module.exports = async (client, interaction, args) => {
    const reason = interaction.options.getString('reason') || `Не указана`;

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            return client.errNormal({ 
                error: `Вы уже в AFK!`,
                type: 'editreply' 
            }, interaction);
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Message: reason
            }).save();

            if (!interaction.member.displayName.includes(`[AFK] `)) {
                interaction.member.setNickname(`[AFK] ` + interaction.member.displayName).catch(e => { });
            }

            client.succNormal({ 
                text: `Ваша учетная запись AFK была успешно настроена`,
                type: 'ephemeraledit'
            }, interaction);

            client.embed({ 
                desc: `${interaction.user} сейчас в AFK! \n\n**Причина:** ${reason}` 
            }, interaction.channel)
        }
    })
}

 