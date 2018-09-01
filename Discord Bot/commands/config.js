const Discord = require('discord.js')
const config = require('../ressources/bot/config.json')

exports.run = (client, message, args) => 
{
	if (!message.member.roles.find(r => ["Maitre du Jeux"].includes(r.name)))
		{
			message.delete(100);
			message.channel.send("Vous n'avez pas les permissions, demmandez a une personne qui possede le role `Maitre du Jeux`.")
				.then(message => {
					client.user.lastMessage.delete(10000);
				})
				.catch(error => console.log(error));
			return ;
		}

		
}