const Discord = require('discord.js')
const config = require('../ressources/bot/config.json')

exports.run = (client, message, args) => 
{
	let title;
	let desc;
	
	if (!args[0])
	{
		const helpMSG = new Discord.RichEmbed()
			.setAuthor("Discord WereWolf - Help", client.user.avatarURL)
			.setTimestamp()
			.setTitle("Bienvenue dans l\'aide du bot Discord **Discord __WereWolf__**")
			.setDescription('Il a actuellement 1 commands')
			.setColor("#6600cc")
			.addField("Help", "Help", true)
			.setFooter("Date", client.user.avatarURL);

		message.author.send(helpMSG);
		message.delete(100);
		return ;
	}

	switch(args[0])
	{
		case "help":
			title = "__**Help**__"
			desc = "Cette commande est une commande d'aide."
		break;
		default:
			title = "Inconnu"
			desc = "La commande que vous avez précisez n'existe pas, pensez a vérifier les commandes disponible via la commande : `DWW.help`"
		break;
	}

	const helpMSG = new Discord.RichEmbed()
		.setAuthor("Discord WereWolf - Help", client.user.avatarURL)
		.setTimestamp()
		.setTitle("Bienvenue dans l\'aide du bot Discord **Discord __WereWolf__**")
		.setDescription('Il a actuellement 1 commands')
		.setColor("#6600cc")
		.addField(title, desc, true)
		.setFooter("Date", client.user.avatarURL);

	message.author.send(helpMSG);
	message.delete(100);
	return ;
}