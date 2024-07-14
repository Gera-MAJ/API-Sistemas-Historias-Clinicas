const validator = require("validator")
const Usuario = require("../models/Login")

const login = (req, res) =>{
    return res.status(200).json({
        status: "succes",
        mensaje: "estás accediendo a los datos del login"
    })
}

const guardar_usuario = (req, res) =>{

    //Tomar todos los parámetros que se tienen que guardar
    const parametros = req.body;

    //Validar los datos con validator. Utilizo try y catch para atrapar errores, ya que las validaciones tienden a dar errores
    try{

        let validar_user = !validator.isEmpty(parametros.user)

        let validar_password = !validator.isEmpty(parametros.password) && validator.isStrongPassword(parametros.password, {minLength: 5}) //con esto puedo validar las constraseñas, pero tienen que estar el isEmpty y el isStrongPassword

        console.log(validar_password)


        if(!validar_user || !validar_password){
            throw new Error("No se ha podido validar los datos")
        }else{
            
            //Crear el objeto para guardar que está en el schema
            const usuario = new Usuario(parametros);//Este guarda todo el método

            //Guardar el artículo en la base de datos
            usuario.save()

            //Devolver el resultado 
            return res.status(200).json({
            status: "Succes",
            mensaje: "Usuario guardado correctamente",
            usuario
        })
        }

        
        
    }catch(error){
        res.status(404).json({
            status: "Error",
            mensaje: "La validación del dato es incorrecta"
        })
    }
}

const edit_user = async(req, res) => {
    //tomar los valores que vienen por la url
    const id_user = req.params._id

    //Tomar los valores que vienen del body
    const user_editado = req.body

    //Validar los datos
    console.log(id_user, user_editado)

    try{

        let validar_usuario = !validator.isEmpty(id_user)

        let validar_body = !validator.isEmpty(user_editado.user)

        console.log(validar_body, validar_usuario)

        if (validar_body == false || validar_usuario ==false){
            return res.status(404).json({
                status: "Error",
                mensaje: "No se pudo validar los datos"
            })
        }

    }catch (error){
        return res.status(400).json({
            status: "Error",
            mensaje: "El dato es incorrecto"
        })
    }

    //Ejecutar la edición

    const usuario_editado = await Usuario.findOneAndUpdate({_id: id_user}, user_editado, {new: true})

    if(usuario_editado == ""){
        return res.status(404).json({
            status: "Error",
            mensaje: "No se pudo encontrar el usuario"
        })

    }else{
        return res.status(200).json({
            status: "Succes",
            mensaje: "Los datos fueron editados correctamente",
            usuario_editado
        })
    }

}

module.exports = {
    login,
    guardar_usuario,
    edit_user
}