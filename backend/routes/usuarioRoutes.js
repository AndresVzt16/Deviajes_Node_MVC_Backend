import { Router } from "express";

import { registrarUsuario } from "../controllers/usuariosControllers.js";
const router = Router();

router.post('/', registrarUsuario)


export default router
