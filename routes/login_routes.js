const { Router } = require("express")
const router = Router()
const User = require("../models/Login");

const login_controller = require("../controller/login_controller")



router.get("/user", login_controller.login)
router.post('/login', login_controller.login); // Definir la ruta login
router.post('/post_user', login_controller.guardar_usuario);
router.put('/edit_user/:_id', login_controller.edit_user);




router.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;
  
    try {
      const user = await User.findOne({ usuario });
      if (!user || user.contraseña !== contraseña) {
        return res.status(401).json({ message: 'Usuario y/o Contraseña inválidos' });
      }
      res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
  });
  
  module.exports = router;