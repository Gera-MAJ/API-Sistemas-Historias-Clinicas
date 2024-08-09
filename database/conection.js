const moongose = require("mongoose")
const express = require("express")
const cors = require("cors")


//Crear un servidor de NODE
const app = express()

//Creo el puerto de la escucha
const puerto = 3900

//Configurar el cors
app.use(cors())


app.use(express.json()) //Esto convierte el body a json
app.use(express.urlencoded({extended: true}))//urlencoded es para el tipo de dato que mandan los form de html, con el extended hago que interprete los datos

//Crear servidor y escuchar peticiones http
app.listen(puerto, ()=> {
    console.log("El servidor está corriendo correctamente en el puerto: " + puerto);
})

//Acá creo la conexión a la base de datos usando moongose
const conexion = async() => {
    try{
        //colocar await para esperar la conexión con mongo db pero del local host
        // await moongose.connect("mongodb://127.0.0.1:27017/historias_clinicas")

        //Conexión a Mongo DB atlas. Colocar contraseña y la base de datos a la que se quiere acceder
        // await moongose.connect("mongodb+srv://jatipg:DBatlas*85*acceso@cluster0.pye64.mongodb.net/historias_clinicas?retryWrites=true&w=majority&appName=Cluster0")

        //Otra forma de intentar acceder a la base de datos de mongoDB atlas
        await moongose.connect("mongodb+srv://jatipg:DBatlas*85*acceso@cluster0.pye64.mongodb.net/historias_clinicas")

        .then(() => console.log('Connectado a la base de datos en localhost'))
        
    }catch(error){

        console.log(error)
        throw new Error("No se ha podido conectar a la base de datos")
        
    }
}

//Exporto la conexión a la base de datos
module.exports = {
    conexion
}

//Rutas funcionales
const route_paciente = require("../routes/paciente_routes")
const route_login = require("../routes/login_routes")


//Cargo la ruta
app.use("/api", route_paciente)

//Rutas del login
app.use("/login", route_login)

//Creo unas rutas de prueba
app.get('/', (req, res) =>{

    //Cuando querés enviar algo para que se vea en el http, tenes que enviar con el método send y entre comillas los datos de html
    return res.status(200).send(
        "<h2>API REST</h2> <p>Estas son las rutas para las consultas de los datos</p>"
    )
})

app.get('/prueba', (req, res) =>{

    return res.status(200).json([
        {
            nombre: "Gerardo",
            apellido: "Jatip",
            aplicacion: "Sistema de Historias Clínicas"
        },
        {
            nombre: "Leticia",
            apellido: "Araoz",
            aplicacion: "Sistema de Historias Clínicas"
        }
    ])
})





