import { Router } from "express";
import checkAuthAdmin from "../middlewares/checkAuthAdmin.js";
import {
  editarDestino,
  eliminarDestino,
  obtenerDestino,
  obtenerDestinos,
  registrarDestino,
} from "../controllers/destinosControllers.js";

const router = Router();

router.get("/", obtenerDestinos);

router.post("/nuevo-destino", registrarDestino);

router.route("/:id")
  .get(checkAuthAdmin,obtenerDestino)
  .put(checkAuthAdmin,editarDestino)
  .delete(checkAuthAdmin,eliminarDestino);

export default router;
