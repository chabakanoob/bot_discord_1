const {Client,GatewayIntentBits} = require("discord.js")

const colors = require("colors")

//requerimos vvariables de entorno
const {DISCORD_TOKEN,TOKEN_SHREK,CLIENT_ID,MALSONANTE, ID_SHREK} = require("./config")

const {crear_conexion, usar_conexion} = require("./mysql")

const dotenv = require("dotenv")

dotenv.config()

let miconex = crear_conexion("root","1234")

console.log(miconex)

usar_conexion(miconex)

miconex.query("SHOW DATABASES;", async (error,results,fields)=>{ 

    await results.forEach( x=>{
        console.log(x.Database)

        if (x.Database  == "work_ramen"){
            miconex.query("USE work_ramen;")

            console.log("\nmostrando nombres de usuario\n\n")

            miconex.query("SELECT * FROM USUARIO;", async (error2,results2,fields2) =>{

                await results2.forEach( y =>{
                    console.log(y.nombre)
                } )

            })
        }

    } ) 


 })


console.log("holas")

// let x = miconex.connect()

// console.log(x)




// console.log(DISCORD_TOKEN,TOKEN_SHREK)
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

client.login(process.env.TOKEN_SHREK)




client.once("ready", ()=>{
    console.log(`bot ${client.user.tag} encendido`.blue)
    client.user.setStatus("idle")
    // console.log(client.user.presence.status)

    // console.log("CANALES !!",client.channels.info)
    client.setMaxListeners(5) 





    // "once solo se ejecuta una vez"
    const testchannel = client.channels.cache
    // console.log(testchannel)
    // console.log(testchannel.find(channel => channel.name === "text"))

    client.application.commands.set([
        {
            name:"ping",
            description:"pong...",
            options:[]
        }
    ])
})



client.on("messageCreate",async (msg) =>{


    if (msg.author.bot){
        return //de esta manera salimos de este evento ya que no interesa contestar a elk mismo bot
    }

    let canal = client.channels.cache.find( x => x.name == "pordioseros" )

    // console.log(canal) AAAAAAA BBBBB CCCCCC

    console.log("servidor : ",msg.guild.name)

    console.log("canal :",msg.channel.name)
    
    console.log("mensajero de dios : ",msg.author.username)

    console.log("contenido :\n",msg.content,"\n\n")

    console.log("miembro : ",msg.member.id,msg.member.user.username)

    // console.log(msg.channel)
    // if (msg.content == "ping"){
    //     await msg.reply("pong")
    // }

    if (msg.content == "hola"){
        await msg.reply("hola bienvenido !")
        await msg.channel.send(`que tal, ${msg.author} ?`)
    }

    if (msg.content.includes("!test")){

        await msg.channel.send( `me gusta verte testear,señor ${msg.author} `)
    }

    if (msg.content === "!social"){
        await msg.channel.send("https://www.instagram.com/cerdo/")
        await msg.channel.send("https://www.facebook.com/kkk")
    }

    let argumentos = msg.content.split(" ")

    if (argumentos[0] == "!decir" ){
        msg.reply(argumentos.slice(1).join(" "))
        msg.reply("https://www.youtube.com/watch?v=LzoZrLJIeAs")
    }

    if (msg.content == msg.content.toUpperCase()){
        msg.channel.send("NO ME VALEN MAYUSCULAS FORRO !")
    }

    //controlar palabras malsonantes

    // if ( MALSONANTE.indexOf(msg.content) != -1 ) {
    //     msg.delete()
    //     msg.channel.send("LA CONCHA DE TU HERMANA FORRO SORETE HIJO DE MIL PUTAS !")
    // }

    MALSONANTE.forEach( word => { if (msg.content.includes(word)) { 
        msg.delete()
        msg.channel.send("No se permiten palabras malsonantes, sorete !")

        // msg.channel.send("https://www.youtube.com/watch?v=Ei5FBPK2Yxk&t=21s")

        // return true
     } } ) 

    

})

client.on("interactionCreate", async inter  =>{
    if (inter.isCommand() && inter.commandName === "ping"){
        await inter.reply("pong!")
    }
})


