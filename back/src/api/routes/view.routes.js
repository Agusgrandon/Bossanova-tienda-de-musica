import { Router } from "express";
import { vistaPrincipal, vistaConsultar, vistaCrear, vistaModificar, vistaBaja, vistaCreateUser } from "../controllers/view.controllers.js";

const router = Router();

/*=============
VISTA PRINCIPAL 
=============*/
router.get("/principal", vistaPrincipal);

/*=============
VISTA CONSULTAR 
=============*/
router.get("/consultar", vistaConsultar);

/*=========
VISTA CREAR
=========*/
router.get("/crear", vistaCrear);

/*=============
VISTA MODIFICAR 
=============*/
router.get("/modificar", vistaModificar);

/*========
VISTA BAJA
========*/
router.get("/baja", vistaBaja);

/*=================
VISTA CREAR USUARIO 
=================*/
router.get("/crearUsuario", vistaCreateUser);

export default router;