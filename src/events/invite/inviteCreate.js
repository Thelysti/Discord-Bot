const discord = require('discord.js');

module.exports = async (client, invite) => {
    const logsChannel = await client.getLogs(invite.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `📨・Приглашение создано`,
        desc: `Приглашение было создано`,
        fields: [
            {
                name: `> Код`,
                value: `- ${invite.code}`
            },
            {
                name: `> Приглашает`,
                value: `- ${invite.inviter} (${invite.inviter.tag})`
            }
        ]
    }, logsChannel).catch(() => { })
};