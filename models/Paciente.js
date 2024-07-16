const { Schema, model } = require("mongoose")

//Creo el modelo del paciente en la base de datos
const PacienteSchema = Schema({
    Apellidos: {
        //Require, nos indica si el dato se tiene que pasar si o si. 
        type: String,
        require: true
    },
    Nombres: {
        type: String,
        require: true
    },
    Edad: {
        type: Number,
        require: true
    },
    Fecha_de_Nacimiento: {
        type: Date,
        require: false,
        default: Date.now
    },
    DNI: {
        type: Number,
        require: false,
        default: "00000000"
    },
    Domicilio: {
        type: String,
        require: false,
        default: ""
    },
    Localidad: {
        type: String,
        require: false,
        default: ""
    },
    Telefono: {
        type: Number,
        require: false,
        default: "3810222222"
    },
    Ocupacion: {
        type: String,
        require: false,
        default: ""
    },
    Estado_Civil: {
        type: String,
        require: false,
        default: ""
    },
    Licencia: {
        type: String,
        require: false,
        default: ""
    },
    Responsable: {
        type: String,
        require: false,
        default: ""
    },
    Obra_Social: {
        type: String,
        require: false,
        default: ""
    },
    Num_de_Afiliado: {
        type: Number,
        require: false,
        default: "000000"
    },
    Diagnostico:{
        type: String,
        require: false,
        default: ""
    },
    Consulta:[ 
        {
            fecha: {
                type: Date,
                require: false,
                default: Date.now
            },
            descripcion: {
                type: String,
                require: false
            }
        },
        
    ],
    Sintomatologia_Actual: {
        type: String,
        require: false,
        default: ""
    },
    Antecedentes_Perspnales:{
        type: String,
        require: false,
        default: ""
    },
    Habitos_Toxicos: {
        type: String,
        require: false,
        default: ""
    },
    Antecedentes_Quirurgicos: {
        type: String,
        require: false,
        default: ""
    },
    Antecedentes_Clinicos: {
        type: String,
        require: false,
        default: ""
    },
    Antecedentes_de_Internacion: {
        type: String,
        require: false,
        default: ""
    },
    Tratamientos_Previos: {
        type: String,
        require: false,
        default: ""
    },
    Medicacion_Actual: {
        type: String,
        require: false,
        default: ""
    },
    FUM: [
        {
            fecha: {
                type: Date,
                require: false
            }
        }
    ],
    Genograma: {
        type: String,
        default: "default.png"
    },
    Antecedentes_de_Conducta_Suicida: {
        type: String,
        require: false,
        default: ""
    },
    Dinamica_Familiar: {
        type: String,
        require: false,
        default: ""
    },
    Antecedentes_Familiares: {
        type: String,
        require: false,
        default: ""
    },
    Hobbies: {
        type: String,
        require: false,
        default: ""
    },
    Actividades: {
        type: String,
        require: false,
        default: ""
    },
    Examen_Mental: {
        type: String,
        require: false,
        default: ""
    },
    Expectativas_del_Tratamiento: {
        type: String,
        require: false,
        default: ""
    },
    Conducta_Terapeutica: {
        type: String,
        require: false,
        default: ""
    },
    Estudios_Complementarios: {
        type: String,
        require: false,
        default: ""
    },
    Evaluacion_Neurocognitiva: {
        type: String,
        require: false,
        default: ""
    },
    Tipo_de_Psicoterapia: {
        type: String,
        require: false,
        default: ""
    },
    Tratamiento_Farmacologico: {
        type: String,
        require: false,
        default: ""
    },
    Otras_Indicaciones: {
        type: String,
        require: false,
        default: ""
    },
    Evaluaciones: {
        type: String,
        require: false,
        default: ""
    },
    Ciclos: {
        type: String,
        require: false,
        default: ""
    },
    Otros: {
        type: String,
        require: false,
        default: ""
    }
})

//Cuando mando el model, tengo en la primera parte, como debo llamar a este modelo, luego de donde saco el modelo y en el tercera parte, como es el nombre que lo va a identificar en la base de datos
module.exports = model("Paciente", PacienteSchema, "pacientes")