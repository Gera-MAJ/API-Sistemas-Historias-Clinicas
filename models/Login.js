const { Schema, model } = require("mongoose")

const LoginSchema = Schema({
    password: {
        type: String,
        require: true
    },
    user: {
        type: String, 
        require: true
    }
})

module.exports = model("Login", LoginSchema, "login")