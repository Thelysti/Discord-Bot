const Discord = require('discord.js');

/** 
 * Easy to send errors because im lazy to do the same things :p
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */

const Schema = require("../../database/models/functions");

module.exports = (client) => {
    client.templateEmbed = function () {
        return new Discord.EmbedBuilder()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.avatarURL({ size: 1024 })
            })
            .setColor(client.config.colors.normal)
            .setFooter({
                text: client.config.discord.footer,
                iconURL: client.user.avatarURL({ size: 1024 })
            })
            .setTimestamp();
    }

    //----------------------------------------------------------------//
    //                        ERROR MESSAGES                          //
    //----------------------------------------------------------------//

    // Normal error 
    client.errNormal = async function ({
        embed: embed = client.templateEmbed(),
        error: error,
        type: type,
        content: content,
        components: components
    }, interaction) {
        embed.setTitle(`${client.emotes.normal.error}・Ошибка!`)
        embed.setDescription(`Что-то пошло не так!`)
        embed.addFields( 
            { name: "💬┆Комментарий к ошибке", value: `\`\`\`${error}\`\`\``},
        )
        embed.setColor(client.config.colors.error)

        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    // Missing args
    client.errUsage = async function ({
        embed: embed = client.templateEmbed(),
        usage: usage,
        type: type,
        content: content,
        components: components
    }, interaction) {
        embed.setTitle(`${client.emotes.normal.error}・Ошибка!`)
        embed.setDescription(`Вы не привели правильных аргументов`)
        embed.addFields(
            { name: "💬┆Требуемые аргументы", value: `\`\`\`${usage}\`\`\``},    
        )
        embed.setColor(client.config.colors.error)

        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    // Missing perms

    client.errMissingPerms = async function ({
        embed: embed = client.templateEmbed(),
        perms: perms,
        type: type,
        content: content,
        components: components
    }, interaction) {
        embed.setTitle(`${client.emotes.normal.error}・Ошибка!`)
        embed.setDescription(`У вас нет нужных разрешений`)
        embed.addFields(
            { name: "🔑┆Требуемое разрешение", value: `\`\`\`${perms}\`\`\``},
        )
        embed.setColor(client.config.colors.error)

        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    // No bot perms

    client.errNoPerms = async function ({
        embed: embed = client.templateEmbed(),
        perms: perms,
        type: type,
        content: content,
        components: components
    }, interaction) {
        embed.setTitle(`${client.emotes.normal.error}・Ошибка!`)
        embed.setDescription(`У меня нет нужных разрешений`)
        embed.addFields(
            { name: "🔑┆Требуемое разрешение", value: `\`\`\`${perms}\`\`\``},
        )
        embed.setColor(client.config.colors.error)

        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    // Wait error

    client.errWait = async function ({
        embed: embed = client.templateEmbed(),
        time: time,
        type: type,
        content: content,
        components: components
    }, interaction) {
        embed.setTitle(`${client.emotes.normal.error}・Ошибка!`)
        embed.setDescription(`Ты уже делал это однажды`)
        embed.addFields(
            { name: "⏰┆Попробуйте еще раз на", value: `<t:${time}:f>`},
        )
        embed.setColor(client.config.colors.error)

        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    //----------------------------------------------------------------//
    //                        SUCCES MESSAGES                         //
    //----------------------------------------------------------------//

    // Normal succes
    client.succNormal = async function ({
        embed: embed = client.templateEmbed(),
        text: text,
        fields: fields,
        type: type,
        content: content,
        components: components
    }, interaction) {
        embed.setTitle(`${client.emotes.normal.check}・Успех!`)
        embed.setDescription(`${text}`)
        embed.setColor(client.config.colors.succes)

        if (fields) embed.addFields(fields);

        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    //----------------------------------------------------------------//
    //                        BASIC MESSAGES                          //
    //----------------------------------------------------------------//

    // Default
    client.embed = async function ({
        embed: embed = client.templateEmbed(),
        title: title,
        desc: desc,
        color: color,
        image: image,
        author: author,
        url: url,
        footer: footer,
        thumbnail: thumbnail,
        fields: fields,
        content: content,
        components: components,
        type: type
    }, interaction) {
        if (interaction.guild == undefined) interaction.guild = { id: "0" };
        const functiondata = await Schema.findOne({ Guild: interaction.guild.id })

        if (title) embed.setTitle(title);
        if (desc && desc.length >= 2048) embed.setDescription(desc.substr(0, 2044) + "...");
        else if (desc) embed.setDescription(desc);
        if (image) embed.setImage(image);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (fields) embed.addFields(fields);
        if (author) embed.setAuthor(author);
        if (url) embed.setURL(url);
        if (footer) embed.setFooter({ text: footer });
        if (color) embed.setColor(color);
        if (functiondata && functiondata.Color && !color) embed.setColor(functiondata.Color)
        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    client.simpleEmbed = async function ({
        title: title,
        desc: desc,
        color: color,
        image: image,
        author: author,
        thumbnail: thumbnail,
        fields: fields,
        url: url,
        content: content,
        components: components,
        type: type
    }, interaction) {
        const functiondata = await Schema.findOne({ Guild: interaction.guild.id })

        let embed = new Discord.EmbedBuilder()
            .setColor(client.config.colors.normal)

        if (title) embed.setTitle(title);
        if (desc && desc.length >= 2048) embed.setDescription(desc.substr(0, 2044) + "...");
        else if (desc) embed.setDescription(desc);
        if (image) embed.setImage(image);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (fields) embed.addFields(fields);
        if (author) embed.setAuthor(author[0], author[1]);
        if (url) embed.setURL(url);
        if (color) embed.setColor(color);
        if (functiondata && functiondata.Color && !color) embed.setColor(functiondata.Color)

        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }

    client.sendEmbed = async function ({
        embeds: embeds,
        content: content,
        components: components,
        type: type
    }, interaction) {
        if (type && type.toLowerCase() == "edit") {
            return await interaction.edit({
                embeds: embeds,
                content: content,
                components: components,
                fetchReply: true
            }).catch(e => { });
        }
        else if (type && type.toLowerCase() == "editreply") {
            return await interaction.editReply({
                embeds: embeds,
                content: content,
                components: components,
                fetchReply: true
            }).catch(e => { });
        }
        else if (type && type.toLowerCase() == "reply") {
            return await interaction.reply({
                embeds: embeds,
                content: content,
                components: components,
                fetchReply: true
            }).catch(e => { });
        }
        else if (type && type.toLowerCase() == "update") {
            return await interaction.update({
                embeds: embeds,
                content: content,
                components: components,
                fetchReply: true
            }).catch(e => { });
        }
        else if (type && type.toLowerCase() == "ephemeraledit") {
            return await interaction.editReply({
                embeds: embeds,
                content: content,
                components: components,
                fetchReply: true,
                ephemeral: true
            }).catch(e => { });
        }
        else if (type && type.toLowerCase() == "ephemeral") {
            return await interaction.reply({
                embeds: embeds,
                content: content,
                components: components,
                fetchReply: true,
                ephemeral: true
            }).catch(e => { });
        }
        else {
            return await interaction.send({
                embeds: embeds,
                content: content,
                components: components,
                fetchReply: true
            }).catch(e => { });
        }
    }
}

 