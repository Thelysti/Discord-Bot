module.exports = (client) => {
    client.createChannelSetup = async function (Schema, channel, interaction) {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channel.id;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Channel: channel.id
                }).save();
            }
        });

        client.succNormal({
            text: `Канал настроен успешно!`,
            fields: [
                {
                    name: `📘┆канал`,
                    value: `${channel} (${channel.id})`
                }
            ],
            type: 'editreply'
        }, interaction);
    }

    client.createRoleSetup = async function (Schema, role, interaction) {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Role = role.id;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Role: role.id
                }).save();
            }
        });

        client.succNormal({
            text: `Роль была настроена успешно!`,
            fields: [
                {
                    name: `📘┆Роль`,
                    value: `${role} (${role.id})`
                }
            ],
            type: 'editreply'
        }, interaction);
    }
}