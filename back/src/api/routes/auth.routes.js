/*====================
Rutas de autenticacion 
====================*/
import { Router } from "express";
import { cerrarSesion, iniciarSesion, mostrarLogin } from "../controllers/user.controllers.js";
const router = Router();

/*===========
Mostrar login
===========*/
router.get("/login", mostrarLogin);

/*============
Iniciar sesion
============*/
router.post("/login", iniciarSesion);

/*===========
Cerrar sesion
===========*/
router.post("/logout", cerrarSesion);

export default router;