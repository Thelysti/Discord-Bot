const Discord = require('discord.js');

module.exports = (client, player, track) => {
    player.destroy(player.guild.id);

    const channel = client.channels.cache.get(player.textChannel);
    client.errNormal({
        error: "Очередь пуста, покидаю голосовой канал"
    }, channel)
};