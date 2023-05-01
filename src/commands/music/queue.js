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

    let count = 0;
    let status;

    if (player.queue.length == 0) {
        status = "Больше никакой музыки в очереди";
    }
    else {
        status = player.queue.map((track) => {
            count += 1;
            return (`**[#${count}]**┆${track.title.length >= 45 ? `${track.title.slice(0, 45)}...` : track.title} (Запросил <@!${track.requester.id}>)`);
        }).join("\n");
    }

    if (player.queue.current.thumbnail) thumbnail = player.queue.current.thumbnail;
    else thumbnail = interaction.guild.iconURL({ size: 1024 });

    client.embed({
        title: `${client.emotes.normal.music}・Очередь песен - ${interaction.guild.name}`,
        desc: status,
        thumbnail: thumbnail,
        fields: [
            {
                name: `${client.emotes.normal.music} Текущая песня:`,
                value: `${player.queue.current.title} (Запросил <@!${player.queue.current.requester.id}>)`
            }
        ],
        type: 'editreply'
    }, interaction)
}

 