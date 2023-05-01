const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {
    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            return client.errNormal({ error: "У вас уже имеется созданный профиль", type: "editreply" }, interaction);
        }
        else {
            new Schema({
                User: interaction.user.id
            }).save();

            client.succNormal({ text: "Профиль создан! Чтобы посмотреть свой профиль, используйте команду \`profile\`", type: "editreply" }, interaction);
        }
    })
}

 