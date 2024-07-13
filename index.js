const { conexion } = require("./database/conection")

//Iniciar la app
console.log("Aplicación arrancada")

//Ahora conectar a la base de datos, para esto iniciamos la conexión
conexion()
