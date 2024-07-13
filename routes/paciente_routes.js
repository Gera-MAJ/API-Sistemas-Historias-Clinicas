const express = require("express")
const router = express.Router()
const multer = require("multer")
const Paciente_controller = require("../controller/paciente_controller")


//Crear el almacenamiento de imágenes con multer
const almacenamiento = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./imagenes/genogramas/")
    },
    filename: function(req, file, cb){
        cb(null, "genograma" + Date.now() + file.originalname)
    }
})

const subidas = multer({storage: almacenamiento})//así le indico a multer cual es el almacenamienteo

//Rutas de prueba
router.get("/ruta-de-prueba", Paciente_controller.probando)

//Rutas para crear y mandar a la base de datos
router.post("/crear-paciente-nuevo", Paciente_controller.crear_pacienteNuevo)

//rutas para recibir datos
router.get("/pacientes", Paciente_controller.listar_pacientes)
router.get("/encontrar-paciente/:dni", Paciente_controller.encontrar_paciente)//Cuando colocas los : puntos, estás diciendo que ese parametro es obligatorio, si no querés hacerlo obligatorio, se tiene que colocar un ? luego del nombre del parámetro

//Rutas para borrar
router.delete("/borrar-paciente/:dni", Paciente_controller.borrar_paciente)

//Ruta para editar
router.put("/editar-paciente/:_id", Paciente_controller.editar_paciente)

//Ruta para subir imagen
router.post("/subir-imagen/:_id", [subidas.single("genograma")], Paciente_controller.subir_imagen)///se coloca single para que suba un solo archivo

//Ruta para que se muestre una imagen que yo pida
router.get("/imagen/:fichero", Paciente_controller.mostrar_imagen)

//Ruta que busca un paciente con el nombre, apellido o dni
router.get("/buscar/:busqueda", Paciente_controller.buscador)

module.exports = router