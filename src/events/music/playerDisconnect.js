const Discord = require('discord.js');

module.exports = (client, player, track) => {
    console.log(player)
    player.destroy();

    const channel = client.channels.cache.get(player.textChannel);
    client.errNormal({
        error: "Музыка прекратилась. Я отключаюсь от канала"
    }, channel)
};