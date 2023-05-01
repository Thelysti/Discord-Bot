const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with the bot'),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('Bot-helppanel')
                    .setPlaceholder('❌┆Ничего не выбрано')
                            .addOptions([
                                 {
                                    label: `Команды`,
                                    description: `Покажет все команды бота!`,
                                    emoji: "💻",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Пригласить`,
                                    description: `Пригласить бота на свой сервер.`,
                                    emoji: "📨",
                                    value: "invite-Bothelp",
                                },
                                {
                                    label: `Сервер поддержки`,
                                    description: `Присоединиться на сервер с разработчиками`,
                                    emoji: "❓",
                                    value: "support-Bothelp",
                                },
                                {
                                    label: `Списки изменений`,
                                    description: `Показать списки изменений бота`,
                                    emoji: "📃",
                                    value: "changelogs-Bothelp",
                                },
                    ]),
            );

        return client.embed({
            title: `❓・Панель помощи`,
            desc: `Добро пожаловать в панель помощи бота! Мы сделали небольшой обзор, чтобы помочь вам! Сделайте выбор в меню ниже`,
            image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
            fields: [
                {
                    name: `❌┆Меню не работает?`,
                    value: `Попробуйте повторно отправить команду. Если вы не получите никакой реакции, обязательно сообщите об ошибке!`
                },
                {
                    name: `🪲┆Нашли ошибку?`,
                    value: `Сообщите об этом с помощью \`/report bug\``
                },
                {
                    name: `🔗┆Ссылки`,
                    value: `[Вебсайт](N/A) | [Пригласить](${client.config.discord.botInvite}) | [Проголосовать](N/A)`
                },
            ],
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};

 