const express = require("express")
const router = express.Router()
const multer = require("multer")
const Paciente_controller = require("../controller/paciente_controller")
const Paciente = require('../models/Paciente'); //by Leti


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
router.get("/obtener-paciente", Paciente_controller.listar_pacientes)
router.get("/pacientes", Paciente_controller.listar_pacientes)
router.get("/encontrar-paciente/:dni", Paciente_controller.encontrar_paciente)//Cuando colocas los : puntos, estás diciendo que ese parametro es obligatorio, si no querés hacerlo obligatorio, se tiene que colocar un ? luego del nombre del parámetro

//Rutas para borrar
router.delete("/eliminar-paciente/:dni", Paciente_controller.borrar_paciente)

//Ruta para editar
router.put("/editar-paciente/:_id", Paciente_controller.editar_paciente)

//Ruta para subir imagen
router.post("/subir-imagen/:_id", [subidas.single("genograma")], Paciente_controller.subir_imagen)///se coloca single para que suba un solo archivo

//Ruta para que se muestre una imagen que yo pida
router.get("/imagen/:fichero", Paciente_controller.mostrar_imagen)

//Ruta que busca un paciente con el nombre, apellido o dni
router.get("/buscar/:busqueda", Paciente_controller.buscador)

//Acá van las rutas para la consulta
router.post("/paciente/agregar-consulta/:_id", Paciente_controller.agregar_consulta)
router.put("/paciente/editar-consulta/:_id/consulta/:_idConsulta", Paciente_controller.editar_consulta)
router.get("/paciente/consultas/:_id", Paciente_controller.listar_consultas)
router.delete("/paciente/borrar-consulta/:_id/consulta/:_idConsulta", Paciente_controller.borrar_consulta)

//Rutas para el FUM
router.post("/paciente/agregar-fum/:_id", Paciente_controller.agregar_fum)
router.put("/paciente/editar-fum/:_id/fum/:_idFum", Paciente_controller.editar_fum)
router.get("/paciente/fums/:_id", Paciente_controller.listar_fums)
router.delete("/paciente/borrar-fum/:_id/fum/:_idFum", Paciente_controller.borrar_fum)

// Ruta para obtener todos los pacientes (leti)
router.get('/obtener-pacientes', async (req, res) => {
    try {
      const pacientes = await Paciente.find();
      res.json(pacientes);
    } catch (err) {
      res.status(400).json({ message: 'Error al obtener pacientes', error: err.message });
    }
  });


// Ruta para eliminar un paciente por dni (leti)
router.delete('/eliminar-paciente/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    const resultado = await Paciente.findByDniAndDelete(dni);
    if (!resultado) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    res.json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
});
  
  module.exports = router;

