import { Router } from "express";

import checkAuth from "../middlewares/checkAuth.js";
import { registrarUsuario, autenticarUsuario, obtenerPerfil, generarCambio, confirmarCuenta, validarCambio, cambiarPassword, editarPerfil } from "../controllers/usuariosControllers.js";
const router = Router();


//Public
router.post('/login', autenticarUsuario)
router.post('/', registrarUsuario)


router.get('/confirmar/:token', confirmarCuenta)

router.post('/olvide-password', generarCambio)

router.route('/olvide-password/:token')
    .get(validarCambio)
    .post(cambiarPassword)



//Private
router.route('/perfil')
    .get(checkAuth,obtenerPerfil)
router.put('/perfil/:id', checkAuth, editarPerfil)



export default router

