const discord = require('discord.js');

module.exports = async (client, invite) => {
    const logsChannel = await client.getLogs(invite.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `📨・Приглашение удалено`,
        desc: `Приглашение было удалено`,
        fields: [
            {
                name: `> Код`,
                value: `- ${invite.code}`
            }
        ]
    }, logsChannel).catch(() => { })
};