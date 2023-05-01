const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.succNormal({
        text: `Вы присоединились к этому [розыгрышу](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id}) , вход был одобрен.`
    }, member).catch(() => { });
};