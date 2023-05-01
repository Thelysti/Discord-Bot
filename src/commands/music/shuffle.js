const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);
    
    const channel = interaction.member.voice.channel;
        if (!channel) return client.errNormal({
            error: `Вы не подключены к голосовому каналу!`,
            type: 'editreply'
        }, interaction);

        if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
            error: `Вы не подключены к тому же голосовому каналу!`,
            type: 'editreply'
        }, interaction);

        if (!player || !player.queue.current) return client.errNormal({
            error: "На этом сервере не воспроизводятся песни",
            type: 'editreply'
        }, interaction);

    if (player.queue.size === 0) return client.errNormal({
        error: "Недостаточно песен для перетасовки",
        type: 'editreply'
    }, interaction);

    player.queue.shuffle()

    client.succNormal({
        text: `Перетасовал очередь!`,
        type: 'editreply'
    }, interaction);
}

 