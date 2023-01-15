const mysql = require("mysql")

module.exports = {
    crear_conexion : ( user,passwd ) => {
        let conexion = mysql.createConnection( {
            host : "localhost",
            user : user,
            password : passwd
        } )
        return conexion
    },

    usar_conexion : ( conex ) => {

        console.log("usar\n\n", conex )

         let conexion = conex.connect ( (error) => {
            if (error){
                console.log("error con conexion a bd",error)
            }else{
                console.log("conectado con exito !") 
            }
        })

        return conexion
    }
}