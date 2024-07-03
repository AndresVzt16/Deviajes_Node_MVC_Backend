import { Router } from "express";
import { registrarAerolinea, editarAerolinea, getAerolineas } from "../controllers/aerolineasControllers.js";

const router = Router();

router.get('/', getAerolineas);

router.post('/regAerolineas', registrarAerolinea);

router.put('/editAerolineas/:id', editarAerolinea);

export default router;