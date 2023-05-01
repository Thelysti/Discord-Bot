const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `Вы не в голосовом канале!`,
        type: 'editreply'
    }, interaction);

    if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
        error: `Вы не том голосовом канале!`,
        type: 'editreply'
    }, interaction);

    if (!player || !player.queue.current) return client.errNormal({
        error: "На этом сервере не воспроизводятся песни",
        type: 'editreply'
    }, interaction);

    if (player.queue.size <= 1) return client.errNormal({
        error: `В очереди есть только одна песня!`,
        type: 'editreply'
    }, interaction);

    player.queue.clear()

    client.succNormal({
        text: "Очередь только что была **удалена**!",
        type: 'editreply'
    }, interaction);
}

 