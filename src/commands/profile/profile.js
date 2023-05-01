const model = require('../../database/models/badge');
const Schema = require('../../database/models/profile');
const CreditsSchema = require("../../database/models/votecredits");

module.exports = async (client, interaction, args) => {

    const badgeFlags = {
        DEVELOPER: client.emotes.badges.developer,
        EVENT: client.emotes.badges.event,
        BOOSTER: client.emotes.badges.booster,
        BUGS: client.emotes.badges.bug,
        MANAGEMENT: client.emotes.badges.management,
        PREMIUM: client.emotes.badges.premium,
        SUPPORTER: client.emotes.badges.supporter,
        TEAM: client.emotes.badges.team,
        BOOSTER: client.emotes.badges.booster,
        PARTNER: client.emotes.badges.partner,
        VOTER: client.emotes.badges.voter,
        SUPPORT: client.emotes.badges.support,
        MODERATOR: client.emotes.badges.moderator,
        DESIGNER: client.emotes.badges.designer,
        MARKETING: client.emotes.badges.marketing,
        ACTIVE: client.emotes.badges.active,
        VIP: client.emotes.badges.vip
    }

    const flags = {
        ActiveDeveloper: "👨‍💻・Active Developer",
        BugHunterLevel1: "🐛・Discord Bug Hunter",
        BugHunterLevel2: "🐛・Discord Bug Hunter",
        CertifiedModerator: "👮‍♂️・Certified Moderator",
        HypeSquadOnlineHouse1: "🏠・House Bravery Member",
        HypeSquadOnlineHouse2: "🏠・House Brilliance Member",
        HypeSquadOnlineHouse3: "🏠・House Balance Member",
        HypeSquadEvents: "🏠・HypeSquad Events",
        PremiumEarlySupporter: "👑・Early Supporter",
        Partner: "👑・Partner",
        Quarantined: "🔒・Quarantined", // Not sure if this is still a thing
        Spammer: "🔒・Spammer", // Not sure if this one works
        Staff: "👨‍💼・Discord Staff",
        TeamPseudoUser: "👨‍💼・Discord Team",
        VerifiedBot: "🤖・Verified Bot",
        VerifiedDeveloper: "👨‍💻・(early)Verified Bot Developer",
    }

    const user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({ User: user.id }, async (err, data) => {
        if (data) {
            let Badges = await model.findOne({ User: user.id });

            let credits = 0;
            const creditData = await CreditsSchema.findOne({ User: user.id });

            if (Badges && Badges.FLAGS.includes("DEVELOPER")) {
                credits = "∞";
            }
            else if (creditData) {
                credits = creditData.Credits;
            }

            if (!Badges) Badges = { User: user.id };

            const userFlags = user.flags ? user.flags.toArray() : [];

            client.embed({
                title: `${client.user.username}・Профиль`,
                desc: '_____',
                thumbnail: user.avatarURL({ dynamic: true }),
                fields: [{
                    name: "👤┆Ник",
                    value: user.username,
                    inline: true
                },
                {
                    name: "📘┆Тэг",
                    value: user.discriminator,
                    inline: true
                },
                {
                    name: "🆔┆ID",
                    value: user.id,
                    inline: true
                },
                {
                    name: "👨‍👩‍👦┆Гендер",
                    value: `${data.Gender || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🔢┆Возраст",
                    value: `${data.Age || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🎂┆День рождение",
                    value: `${data.Birthday || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🎨┆Любимый цвет",
                    value: `${data.Color || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🐶┆Любимые животные",
                    value: `${data.Pets.join(', ') || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🍕┆Любимая еда",
                    value: `${data.Food.join(', ') || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🎶┆Любимые песни",
                    value: `${data.Songs.join(', ') || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🎤┆Любимые исполнители",
                    value: `${data.Artists.join(', ') || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🎬┆Любимые фильмы",
                    value: `${data.Movies.join(', ') || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "👨‍🎤┆Любимые актеры",
                    value: `${data.Actors.join(', ') || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🏴┆Город",
                    value: `${data.Orgin || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "🎮┆Хобби",
                    value: `${data.Hobbys.join(', ') || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "😛┆Статус",
                    value: `${data.Status || 'Не указано'}`,
                    inline: true
                },
                {
                    name: "📛┆Бейджики Бота",
                    value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Нету'}`,
                    inline: true
                },
                {
                    name: "🏷️┆Discord Бейджики",
                    value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Нету' || 'Нету'}`,
                    inline: true
                },
                {
                    name: "💳┆Dcredits",
                    value: `${credits || 'Нету'}`,
                    inline: true
                },
                {
                    name: "ℹ️┆Обо мне",
                    value: `${data.Aboutme || 'Не указано'}`,
                    inline: false
                },], type: 'editreply'
            }, interaction);
        }
        else {
            return client.errNormal({ error: "Профиль не был найден! Используйте команду /profile create", type:'editreply' }, interaction);
        }
    })
}

 