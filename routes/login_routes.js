const { Router } = require("express")
const router = Router()

const login_controller = require("../controller/login_controller")

router.get("/user", login_controller.login)

router.post("/post_user", login_controller.guardar_usuario)

//Editar usuario

router.put("/edit_user/:_id", login_controller.edit_user)

module.exports = router