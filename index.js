const {Client,GatewayIntentBits} = require("discord.js")

const colors = require("colors")

const token = "MTA1NTA1NTQ2Njk0Nzk0ODU3NA.Gl7qpx.RaHuWJoxNoxg_pC169no7s-Sk5_9qs8Ob4gRsE"

const client = new Client( {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
    ]
} )

client.once("ready", ()=>{
    console.log(`bot ${client.user.tag} encendido`.blue)
})

client.login(token)