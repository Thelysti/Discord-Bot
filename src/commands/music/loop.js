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

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";

    client.succNormal({
        text: `Цикл - **${trackRepeat}** для текущей песни`,
        type: 'editreply'
    }, interaction);
}

 