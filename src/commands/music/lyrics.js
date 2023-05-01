const Discord = require('discord.js');
const lyricsFinder = require("lyrics-finder");

module.exports = async (client, interaction, args) => {
    let search = "";

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

        if (!interaction.options.getString('song')) {
            search = player.queue.current.title;
        }
        else {
            search = interaction.options.getString('song');
        }

        let lyrics = "";

        try {
            lyrics = await lyricsFinder(search, "");
            if (!lyrics) lyrics = `No lyrics found for ${search} :x:`;
        } catch (error) {
            lyrics = `No lyrics found for ${search} :x:`;
        }

        client.embed({
            title: `${client.emotes.normal.music}・Lyrics For ${search}`,
            desc: lyrics,
            type: 'editreply'
        }, interaction)
}

 