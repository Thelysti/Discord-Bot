const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.errNormal({
        error: `Розыгрыш, к сожалению, закончился! Ты больше не можешь участвовать.`
    }, member).catch(() => { });
};