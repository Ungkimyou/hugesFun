const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
  client.on('ready', () => {const config = require("./config.json");
    console.log(`Logged in as ${client.user.tag} on ${client.guilds.size} Servers ..`);
    client.user.setActivity(`${config.prefix}help for help`, { type: 'WATCHING' })
   //client.user.setActivity(`TESTS`
  });
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  
 if(command === `${prefix}ping`) {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
 }
 if(command ===`${prefix}say`) {
   message.channel.send(args.join(" "))
}
 if(command ===`${prefix}avatar`) {
   message.channel.send(`${message.author.avatarURL}`).then(msg => msg.delete(11000));
 }
  if(command === `${prefix}embed`) {
 if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.reply("you don't have permssion **MANAGE MESSAGE** to use this !");   
    let embed = args.join(" ");
    let embedsay = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(embed)
    message.channel.send(embedsay)
    message.delete();
  
  }
  
   if(message === `${prefix}serverinfo`) {
     
   let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor('RANDOM')
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    return message.channel.send(serverembed);
  }
  if(command === `${prefix}help`) {
    let embedsay = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`${config.prefix}command 📄`, message.author.avatarURL)
    .addField("__ **MOD** __", "^*^") 
    .addField("** __InFo__ **", "`command here`")
    message.channel.send(embedsay)
}
});

   
client.login(config.token);