import { Router } from "express";
import { crearBoleto, eliminarBoleto, verBoletos } from "../controllers/boletosControllers.js";
import checkAuthAdmin from "../middlewares/checkAuthAdmin.js";
import checkAuth from "../middlewares/checkAuth.js";


const router = Router()

router.get('/', checkAuth,verBoletos)

router.post('/crear-boleto',checkAuth, crearBoleto)

router.route('/:id')
    .delete(checkAuthAdmin, eliminarBoleto)
    

export default router