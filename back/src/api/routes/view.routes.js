import { Router } from "express";
import { vistaPrincipal, vistaConsultar, vistaCrear, vistaModificar, vistaBaja, vistaCreateUser } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

/*=============
VISTA PRINCIPAL 
=============*/
router.get("/principal", requireLogin, vistaPrincipal);

/*=============
VISTA CONSULTAR 
=============*/
router.get("/consultar", requireLogin, vistaConsultar);

/*=========
VISTA CREAR
=========*/
router.get("/crear", requireLogin, vistaCrear);

/*=============
VISTA MODIFICAR 
=============*/
router.get("/modificar", requireLogin, vistaModificar);

/*========
VISTA BAJA
========*/
router.get("/baja", requireLogin, vistaBaja);

/*=================
VISTA CREAR USUARIO 
=================*/
router.get("/crearUsuario", requireLogin, vistaCreateUser);

export default router;