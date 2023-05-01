const Discord = require('discord.js');

const voiceSchema = require("../../database/models/voice");

module.exports = async (client, interaction, args) => {
  interaction.guild.channels.create({
    name: "Custom voice",
    type: Discord.ChannelType.GuildCategory,
  }).then((cat) => {
    interaction.guild.channels.create({
      name: "➕ Create Voice",
      type: Discord.ChannelType.GuildVoice,
      parent: cat.id,
      permissionOverwrites: [
        {
          deny: [Discord.PermissionsBitField.FLAGS.SPEAK],
          id: interaction.guild.id
        },
      ],
    }).then((ch) => {
      saveChannelSettings(interaction.guild.id, cat.id, ch.id, "{emoji} {channel name}");

      client.succNormal({
        text: `Custom voice has been set up successfully!`,
        fields: [{
          name: `📘┆Channel`,
          value: `${ch} (${ch.name})`
        }],
        type: 'editreply'
      }, interaction);
    })
  })

  function saveChannelSettings(guildId, categoryId, channelId, channelName) {
    voiceSchema.findOne({ Guild: guildId }, (err, data) => {
      if (data) {
        data.Category = categoryId;
        data.Channel = channelId;
        data.ChannelName = channelName;
        data.save();
      } else {
        new voiceSchema({
          Guild: guildId,
          Category: categoryId,
          Channel: channelId,
          ChannelName: channelName
        }).save();
      }
    });
  }
}