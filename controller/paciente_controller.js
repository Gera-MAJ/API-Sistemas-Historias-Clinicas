const validator = require("validator")
const paciente_model = require("../models/Paciente")
const fs = require("fs")
const path = require("path")

const probando = (req, res) =>{
    return res.status(200).json({
        mensaje: "Soy el mensaje desde el probando"
    })
}

const crear_pacienteNuevo = (req, res) => {
    
    //tomo los valores que vienen en el body
    const parametros = req.body

    
    try{
        //validar los datos que vienen del body
        const validar_nombre = validator.isEmpty(parametros.Nombres)
        const validar_apellido = validator.isEmpty(parametros.Apellidos)
        const validar_edad = validator.isEmpty(parametros.Edad)

        console.log(validar_apellido, validar_edad, validar_nombre)

        if(validar_nombre == true || validar_apellido == true || validar_edad == true){
            throw new Error("Los datos enviados, son formato incorrecto")
        }

        //Tengo que crear el nuevo paciente a ingresar
        const paciente = new paciente_model(parametros)

        //Ahora guardo el paciente
        paciente.save()

        //Ahora devuelvo el valor
        return res.status(200).json({
            status: "Success",
            mensaje: "Se ha guardado correctamente el paciente",
            paciente
        })

    }catch(error){
        return res.status(404).json({
            status: "Error",
            mensaje: "No se han podido validar los datos"
        })
    }
}

const listar_pacientes = async (req, res) =>{

    //Esto es algo que se ve en la parte de moongose, como sacar todos los datos. Esta en la parte de https://mongoosejs.com/docs/api/model.html#Model.find()
    const consulta = await paciente_model.find({})
                                        .sort({DNI: -1})//Con el metodo sort establecemos como queremos que aparezcan los datos y el limit para definir un número de pacientes a mostrar

    if(consulta == '' && filtrado == ''){
        return res.status(404).send({
            status: "error",
            mensaje: "No se encontraron pacientes"
        })
    }else{
        return res.status(200).send({
            status: "succes",
            consulta
        })
    }
}

const encontrar_paciente = async (req, res) =>{

    const dni_paciente = req.params.dni
    
    const consulta = await paciente_model.findOne({DNI: dni_paciente})//findOne es el método de moongose para encontrar un solo valor del array de objetos

    if(dni_paciente == undefined && consulta =="" || consulta == null){

        return res.status(404).send({
            status: "error",
            mensaje: "No se encontró el paciente"
        })
    }else{
        
        return res.status(200).send({
            status: "succes",
            mensaje: "Paciente encontrado",
            consulta
        })
    }
}

const borrar_paciente = async (req, res) =>{
    
    const dni_paciente = req.params.dni

    try{
        const validar_dni = !validator.isEmpty(dni_paciente)

        if(!validar_dni){
            return res.status(404).json({
                status: "error",
                mensaje: "El valor enviado es incorrecto"
            })
        }else{
            const paciente_para_borrar = await paciente_model.findOneAndDelete({DNI: dni_paciente})
            
            if(paciente_para_borrar != null && paciente_para_borrar != ""){
                return res.status(200).json({
                    status: "succes",
                    mensaje: "Se ha borrado el paciente",
                    paciente_para_borrar
                })
            }else{
                return res.status(404).json({
                    status: "error",
                    mensaje: "El paciente no existe"
                })
            }
        }

    }catch(error){
        return res.status(404).json({
            status: "error",
            mensaje: "No se puede procesar su request"
        })
    }
}

const editar_paciente = async(req, res) =>{

    //Recibir el indicador del paciente a borrar
    const id_paciente = req.params._id

    //Recibir los datos que vienen del boby
    const parametros_para_editar = req.body

    console.log(typeof parametros_para_editar)

    //Validar los datos
    try{
        const validar_id = !validator.isEmpty(id_paciente)

        const validar_parametros = !validator.isEmpty(parametros_para_editar.Nombres) && !validator.isEmpty(parametros_para_editar.Apellidos) && !validator.isEmpty(parametros_para_editar.Edad) && !validator.isEmpty(parametros_para_editar.DNI)//Recordar que se tiene que pasar cada campo del array de objetos, no puede determinar de todo el objeto completo

        console.log(validar_parametros, validar_id)

        if(validar_id == false || validar_parametros == false){
            return res.status(400).json({
                status: "error",
                mensaje: "No se pudo validar el dato"
            })

        }else{
            //Enviar los datos a editar. No hace falta especificar los datos, el modelo los detecta directamente con moongose
            const paciente_editado = await paciente_model.findOneAndUpdate({_id: id_paciente}, parametros_para_editar, {new: true})

            console.log(paciente_editado)

            if (!paciente_editado){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se pudo actualizar el paciente"
                })
            }

            //Devolver una respuesta
            return res.status(200).json({
                status: "succes",
                mensaje: "entraste en editar",
                paciente_editado
            })
        }

    }catch (error){
        return res.status(404).json({
            status: "error",
            mensaje: "No se puede procesar su request"
        })
    }    
}

const subir_imagen = async(req, res) =>{

    //configurar multer

    //recoger el fichero de imagen subido
    console.log(req.file)

    if (!req.file && !req.files){
        return res.status(404).json({
            status: "error",
            mensaje: "Petición inválida"
        })
    } 
   
    //nombre del archivo
    const nombre = req.file.originalname

    console.log(nombre)

    //Extensión del archivo
    const nombre_separado = nombre.split("\.")
    const extension = nombre_separado[1]

    console.log(extension)

    //Comprobar extensión correcta

    if(extension != "png" && extension != "jpg" && 
        extension != "jpeg" && extension != "gif"){

        //fs se usa para borrar el archivo incorrecto y es una función nativa de node    
        fs.unlink(req.file.path, (error) =>{
            return res.status(400).json({
                status: "error",
                mensaje: "La imagen es inválida"
            })
        })

    }else{

        //Recibir el indicador del paciente a borrar
        const id_paciente = req.params._id

        //Enviar los datos a editar. No hace falta especificar los datos, el modelo los detecta directamente con moongose
        const paciente_editado = await paciente_model.findOneAndUpdate({_id: id_paciente}, {Genograma: req.file.filename}, {new: true})

        console.log(paciente_editado)

        if (!paciente_editado){
            return res.status(400).json({
                status: "error",
                mensaje: "No se pudo actualizar el paciente"
            })
        }

        //Devolver una respuesta
        return res.status(200).json({
            status: "succes",
            mensaje: "entraste en editar",
            paciente_editado,
            fichero: req.file
        })

    }   
}

const mostrar_imagen = async(req, res) => {

    //Recibir el indicador de la imagen que se quiere pedir
    const fichero = req.params.fichero
    //Ahora debo crear la ruta física de la imagen
    const ruta_fisica = "./imagenes/genogramas/"+fichero
    
    //Ahora usamos file sistema de node, para consultar si existe la imagen dentro de nuestro repositorio
    fs.stat(ruta_fisica, (error, existe) => {
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica))//usamos esta forma para devolver la imagen a la petición
        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe",
                existe,
                fichero,
                ruta_fisica
            })
        }
    })
}

const buscador = async(req, res) =>{
    //Sacar el string de busqueda
    const busqueda = req.params.busqueda
    //Find OR, que solo funciona con string y la palabra igual que en la base de datos
    const paciente_encontrado = await paciente_model.find({"$or": [
        {"Nombres": {"$regex": busqueda, "$options": "i"}},
        {"Apellidos": {"$regex": busqueda, "$options": "i"}},
    ]})

    if(!paciente_encontrado || paciente_encontrado.length <= 0){
        return res.status(404).json({
            status: "error",
            mensaje: "No se encontró ningún paciente"
        })
    }

    return res.status(200).json({
        status: "success",
        paciente_encontrado
    })

}

module.exports = {
    probando,
    crear_pacienteNuevo,
    listar_pacientes,
    encontrar_paciente,
    borrar_paciente,
    editar_paciente,
    subir_imagen,
    mostrar_imagen,
    buscador
}