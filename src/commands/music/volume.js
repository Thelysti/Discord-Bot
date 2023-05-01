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

    let amount = interaction.options.getNumber('amount');

    if (!amount) return client.simpleEmbed({
        desc: `${client.emotes.normal.volume}┆Текущая громкость **${player.volume}%**`,
        type: 'editreply'
    }, interaction);

    if (isNaN(amount) || amount === 'Infinity') return client.errNormal({
        text: `Пожалуйста, введите действительный номер!`,
        type: 'editreply'
    }, interaction);

    if (Math.round(parseInt(amount)) < 1 || Math.round(parseInt(amount)) > 1000) return client.errNormal({
        text: "Объем не может превышать 1000%",
        type: 'editreply'
    }, interaction);

    player.setVolume(parseInt(amount))

    client.succNormal({
        text: `Громкость поставлена на **${amount}%**`,
        type: 'editreply'
    }, interaction);
}

 