const Discord = require('discord.js');

module.exports = (client, giveaway, winners) => {
    winners.forEach((member) => {
        client.embed({
            title: `🎉・Розыгрыш окончен`,
            desc: `Поздравляем ${member.user.username}! Ты выиграл(а) в данном розыгрыше!`,
            fields: [
                {
                    name: `🎁┆Приз`,
                    value: `${giveaway.prize}`,
                    inline: true
                },
                {
                    name: `🥳┆Розыгрыш`,
                    value: `[Жми сюда](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id})`,
                    inline: true
                }
            ]
        
        }, member).catch(() => { });
    });
};