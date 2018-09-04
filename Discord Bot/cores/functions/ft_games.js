const Discord = require('discord.js');
const config = require('../../ressources/bot/config.json');
const client = new Discord.Client()

const fs = require('fs');
const fileExists = require('file-exists');

async function confirm(message, channel, client, Discord)
{
	const emojis = ["✅", "❌", "1⃣", "2⃣", "▶", "⏩", "⏭", "◀", "⏪", "⏮"];
	const bot = 485185417218359306;
	const avatar_URL = "https://images-ext-1.discordapp.net/external/FIaC7yV2AByn8aWyW8ZcPUr5yOkRu-II0dHYOYhOYoI/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/485185417218359306/04142dbce9b70258baa3a0a0852a1153.png";
	let member = message.author;

	function confirm_tab()
	{
		const confirm = new Discord.RichEmbed()
			.setAuthor("Discord WereWolf - Game", avatar_URL)
			.setTimestamp()
			.setColor("#00b300")
			.addField("Voulez vous cree une nouvelle partie ?", ":one: - Oui\n:x: Non.", true)
			.setFooter("Date", avatar_URL);
		member.send(confirm)
		.then(async function(message)
		{
			await message.react(emojis[0]);
			await message.react(emojis[1]);

			const filtre = (reaction, user) => user.id != bot && (reaction.emoji.name === emojis[0] || reaction.emoji.name === emojis[1]);
			const collector = message.createReactionCollector(filtre);

					collector.on("collect", function(r)
					{
						if (r.emoji.name === emojis[0])
						{
							client.channels.get(channel).send(member + " Vien de cree une nouvelle partie, faite la commande `DWW.join` pour la rejoindre !")
						}
						else if (r.emoji.name === emojis[1])
						{
							
						}
					collector.stop();
					message.delete();
				});
			});
	};
	confirm_tab(member);
}

module.exports.confirm = confirm;