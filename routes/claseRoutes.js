import { Router } from "express";
import { crearClase, editarClase, eliminarClase, verClases } from "../controllers/clasesControllers.js";
import checkAuthAdmin from "../middlewares/checkAuthAdmin.js";

const router = Router()

router.get('/', verClases)

router.post('/crear-clase',checkAuthAdmin, crearClase)

router.route('/:id')
    .put(checkAuthAdmin, editarClase)
    .delete(checkAuthAdmin, eliminarClase)

export default router