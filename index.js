const {Client,GatewayIntentBits} = require("discord.js")

const colors = require("colors")

//requerimos vvariables de entorno
const {DISCORD_TOKEN,CLIENT_ID} = require("./config")

const dotenv= require("dotenv")
dotenv.config()

// const token = "MTA1NTA1NTQ2Njk0Nzk0ODU3NA.Gl7qpx.RaHuWJoxNoxg_pC169no7s-Sk5_9qs8Ob4gRsE"

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
    client.user.setStatus("idle")
    console.log(client.user.presence.status)


    const testchannel = client.channels.cache
    // console.log(testchannel)
    console.log(testchannel.find(channel => channel.name === "text"))
})

client.login(DISCORD_TOKEN)
