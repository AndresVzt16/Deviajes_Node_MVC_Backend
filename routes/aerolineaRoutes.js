import { Router } from "express";
import checkAuthAdmin from "../middlewares/checkAuthAdmin.js";
import {
  editarAerolinea,
  eliminarAerolinea,
  obtenerAerolinea,
  obtenerAerolineas,
  registrarAerolinea,
} from "../controllers/aerolineasControllers.js";

const router = Router();

router.get("/",checkAuthAdmin, obtenerAerolineas);

router.post("/nueva-aerolinea",checkAuthAdmin, registrarAerolinea);

router.route("/:id")
  .get(checkAuthAdmin,obtenerAerolinea)
  .put(checkAuthAdmin,editarAerolinea)
  .delete(checkAuthAdmin,eliminarAerolinea);

export default router;
