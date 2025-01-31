import { Router } from "express";
import { buscarBoleto, crearBoleto, eliminarBoleto, obtenerBoletos, verBoletos } from "../controllers/boletosControllers.js";
import checkAuthAdmin from "../middlewares/checkAuthAdmin.js";
import checkAuth from "../middlewares/checkAuth.js";


const router = Router()

router.get('/mis-boletos', checkAuth,verBoletos)
router.get('/boletos', checkAuthAdmin,obtenerBoletos)

router.post('/crear-boleto',checkAuth, crearBoleto)
router.post('/buscar-boleto',checkAuthAdmin, buscarBoleto)

router.route('/:id')
    .delete(checkAuthAdmin, eliminarBoleto)
    

export default router