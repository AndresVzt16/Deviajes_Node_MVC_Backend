import { Router } from "express";

import {
  registrarAdministrador,
  autenticarAdministrador,
  obtenerPerfil,
  generarCambio,
  confirmarCuenta,
  validarCambio,
  cambiarPassword,
  editarPerfil,
} from "../controllers/administradorControllers.js";
import checkAuthAdmin from "../middlewares/checkAuthAdmin.js";
const router = Router();

//Public
router.post("/login", autenticarAdministrador);
router.post("/", registrarAdministrador);

router.get("/confirmar/:token", confirmarCuenta);

router.post("/olvide-password", generarCambio);

router.route("/olvide-password/:token")
  .get(validarCambio)
  .post(cambiarPassword);

//Private
router.route("/perfil")
    .get(checkAuthAdmin, obtenerPerfil);
router.put("/perfil/:id", checkAuthAdmin, editarPerfil);

export default router;
