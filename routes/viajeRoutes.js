import { Router } from "express";
import { crearViaje, editarViaje, eliminarViaje, verViaje, verViajes } from "../controllers/viajeControllers.js";


const router = Router()
router.get('/', verViajes)

router.post('/crear-viaje', crearViaje)

router.route('/:id')
    .get(verViaje)
    .put(editarViaje)
    .delete(eliminarViaje)

export default router