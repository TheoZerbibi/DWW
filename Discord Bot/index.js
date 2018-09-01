const Discord = require('discord.js')
const fs = require('fs')
const fileExists = require('file-exists')
const config = require('./ressources/bot/config.json')

const client = new Discord.Client()

client.on('ready', () =>
{
	client.user.setGame('DWW.help')
	console.log(`setGame OK`)
});

client.on("ready", function ()
{
	console.log(`===========================================\nTous les systèmes sont opérationnels. Nous sommes connectés à ${client.channels.size} channels sur ${client.guilds.size} serveurs, pour un total de ${client.users.size} utilisateurs.\n`);
});

client.on('message', message =>
{

	if (message.author.bot)
		return ;
	if (message.content.indexOf(config.prefix) !== 0)
		return ;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (message.channel.type === 'dm' && command != 'help')
		return ;
	if (command == 'boot')
	{
		if (message.member.id !== "205067571127386113")
		{
			message.delete(100);
			message.reply("Vous ne disposez pas de la permission.")
				.then(message => {
					client.user.lastMessage.delete(5000);
				})
				.catch(error => console.log(error));
		}
		message.delete(100)
		message.channel.sendMessage('**Arrêt du bot !**');
		function reboot ()
		{
			process.exit(1);
		}
		setTimeout(reboot, 1000);
	}

	try
	{
		if (!message.guild.roles.find("name", "Maitre du Jeux"))
		{
			message.delete(100);
			message.guild.createRole({
				name: 'Maitre du Jeux',
				color: '#818386',
				permissions:
				[
					'SEND_MESSAGES',
					'MANAGE_MESSAGES'
				]
		})

		message.channel.send("**Il semble que c'est la premiere fois que vous faisait appel a moi !\n\n```\n- Le role 'Maitre du Jeux' a bien était créé.\n- Inialisation des donnée effectué.\n\nTous les systèmes sont opérationnels```\n\nJ'ai bien était initialiser, merci de refaire la commande !**")
			.then(message => {
				client.user.lastMessage.delete(20000);
			})
			.catch(error => console.log(error));
		return ;
		}

		let commandFile = require(`./commands/${command}.js`);
		fileExists(`./commands/${command}.js`).then(exists =>
		{
			if (exists) commandFile.run(client, message, args)
		})
	} 
	catch(err)
	{
		if (command != 'boot')
		{
			message.delete(1000); 
			message.channel.send('Commande inconnue ou corrompue. Si la commande que vous avez entré existe bel et bien, informez un membre du staff du problème.')
				.then(message =>
				{
					client.user.lastMessage.delete(5000);
				})
				.catch(error => console.log(error));
		}
	}
})

client.login(config.token)