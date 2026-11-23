import { Router } from "express";
import { crearUsuario } from "../controllers/user.controllers.js";
import { requireLogin, validarUsuario } from "../middlewares/middlewares.js";

const router = Router();

router.post("/", requireLogin, validarUsuario, crearUsuario);

export default router;