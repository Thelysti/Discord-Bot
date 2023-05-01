const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);

    const levels = {
        0: 0.0,
        1: 0.50,
        2: 1.0,
        3: 2.0,
    };

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `Вы не на голосовом канале!`,
        type: 'editreply'
    }, interaction);

    if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
        error: `Вы не на том голосовом канале!`,
        type: 'editreply'
    }, interaction);

    if (!player || !player.queue.current) return client.errNormal({
        error: "На этом сервере не воспроизводятся песни",
        type: 'editreply'
    }, interaction);

    let level = interaction.options.getString('level');

    const bands = new Array(3)
        .fill(null)
        .map((_, i) =>
            ({ band: i, gain: levels[level] })
        );

    player.setEQ(...bands);

    client.succNormal({
        text: `Уровень усиления басов отрегулирован до  **уровня: ${level}**`,
        type: 'editreply'
    }, interaction);
}

 