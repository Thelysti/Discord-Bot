const Discord = require('discord.js');
const figlet = require('figlet');

module.exports = async (client, interaction, args) => {
    const msg = interaction.options.getString('text');

    if (msg.length > 2000) return client.errNormal({ error: "Пожалуйста, предоставьте текст короче 2000 символов!", type: 'editreply' }, interaction);

    figlet.text(msg, function (err, data) {

        if (err) {
            return client.errNormal({ error: "Что-то пошло не так!", type: 'editreply' }, interaction);
        }

        client.embed({
            title: '💬・Ascii',
            desc: `\`\`\` ${data} \`\`\``,
            type: 'editreply',
        }, interaction);
    })
}

 