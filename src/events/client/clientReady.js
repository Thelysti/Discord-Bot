const Discord = require('discord.js');
const chalk = require('chalk');
const { random } = require('mathjs');

module.exports = async (client) => {
  const startLogs = new Discord.WebhookClient({
    id: client.webhooks.startLogs.id,
    token: client.webhooks.startLogs.token,
  });

  console.log(`\u001b[0m`);
  console.log(chalk.blue(chalk.bold(`Bot`)), (chalk.white(`>>`)), chalk.green(`Started on`), chalk.red(`${client.guilds.cache.size}`), chalk.green(`servers!`))

  let embed = new Discord.EmbedBuilder()
    .setTitle(`🆙・Finishing Bot`)
    .setDescription(`A bot just became ready`)
    .setColor(client.config.colors.normal)
  startLogs.send({
    username: 'Bot Logs',
    embeds: [embed],
  });

  setInterval(async function() {
    const totalGuilds = client.guilds.cache.size
    let statuttext;
    if (process.env.DISCORD_STATUS) {
      statuttext = process.env.DISCORD_STATUS.split(', ');
    } else {
      statuttext = [
        `・❓┆/help`,
        //`・💻┆${totalGuilds} servers`,
        `・👑┆Создатель: Лусти`
        //`・📨┆discord.gg/corwindev`,
        //`・🎉┆400+ commands`,
        //`・🏷️┆Version ${require(`${process.cwd()}/package.json`).version}`
      ];
    }
    const randomText = statuttext[Math.floor(Math.random() * statuttext.length)];
    client.user.setPresence({ activities: [{ name: randomText, type: Discord.ActivityType.Playing }], status: 'online' });
  }, 50000)

  client.player.init(client.user.id);
}

