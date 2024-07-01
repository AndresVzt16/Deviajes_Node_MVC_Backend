import { Router } from "express";

import { registrarUsuario, editarUsuario, autenticarUsuario, obtenerPerfil } from "../controllers/usuariosControllers.js";
const router = Router();


//Public
router.post('/login', autenticarUsuario)
router.post('/', registrarUsuario)

router.post('/olvide-password', generarCambio)

router.route('/olvide-password/:token')
    .get(validarToken)

//Private
router.post('/perfil',obtenerPerfil)



export default router
