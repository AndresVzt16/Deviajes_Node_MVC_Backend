import { Router } from "express";
import { crearViaje, editarViaje, eliminarViaje, verViajes } from "../controllers/viajeControllers.js";

const router = Router()
router.get('/', verViajes)

router.post('/crear-viaje', crearViaje)

router.route('/:id')
    .put(editarViaje)
    .delete(eliminarViaje)

export default router