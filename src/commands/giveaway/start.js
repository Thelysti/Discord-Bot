const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const gchannel = interaction.options.getChannel('channel');
    const duration = interaction.options.getString('duration');
    const winnerCount = interaction.options.getNumber('winners');
    const prize = interaction.options.getString('prize');

    client.giveawaysManager.start(gchannel, {
        duration: ms(duration),
        prize: `${client.emotes.normal.gift} - ${prize}`,
        lastChance: {
            enabled: true,
            content: `${client.emotes.normal.error} **ПОСЛЕДНИЙ ШАНС, ЧТОБЫ ПРИСОЕДИНИТЬСЯ !** ${client.emotes.normal.error}`,
            threshold: 60000,
            embedColor: '#FF0000'
        },
        pauseOptions: {
            isPaused: false,
            content: '⚠️ **ЭТОТ РОЗЫГРЫШ ПРИОСТАНОВЛЕН !** ⚠️',
            unPauseAfter: null,
            embedColor: '#FFFF00'
        },
        winnerCount: parseInt(winnerCount),
        hostedBy: interaction.user,
        thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
        messages: {
            giveaway: `${client.emotes.normal.party} **РОЗЫГРЫШ** ${client.emotes.normal.party}`,
            giveawayEnded: `${client.emotes.normal.party} **РОЗЫГРЫШ ОКОНЧЕН** ${client.emotes.normal.party}`,
            drawing: `${client.emotes.normal.clock} - Заканчивается: **{timestamp}**!`,
            inviteToParticipate: "Нажмите на 🥳 чтобы учавствовать в розыгрыше! \n",
            winMessage: "Поздравляем {winners}! Вы выиграли: **{this.prize}** !",
            embedFooter: "Розыгрыш!",
            embedColor: client.config.colors.normal,
            noWinner: "Розыгрыш отменен, недостаточно участников. \n",
            hostedBy: `${client.emotes.normal.party} - Организатор: {this.hostedBy}`,
            winners: `🏆 - Победитель(ей)`,
            endedAt: "Закончится:",
            units: {
                seconds: "секунд",
                minutes: "минут",
                hours: "часов",
                days: "дней",
                pluralS: false
            },
        },

    }).then((gData) => {
        client.succNormal({ 
            text: `Розыгрыш начался в ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
}

 