// rutas de los productos
import { Router } from "express";
import { requireLogin, validarId, validarProducto } from "../middlewares/middlewares.js";
import { activarProducto, crearProducto, darDeBajaProducto, modificarProducto, obtenerProductoId, obtenerProductos, obtenerProductosActivos } from "../controllers/product.controllers.js";

const router = Router();

/*=====================
GET TODOS LOS PRODUCTOS
=====================*/
router.get("/", obtenerProductos);

/*================
GET (solo activos)
================*/
router.get("/activos", obtenerProductosActivos);

/*==========
GET (por ID)
==========*/
router.get("/:id", validarId, obtenerProductoId);

/*==
POST 
==*/
router.post("/", requireLogin, validarProducto, crearProducto);

/*=
PUT 
=*/
router.put("/:id", requireLogin, validarId, validarProducto, modificarProducto);

/*==================
DELETE (baja lógica)
==================*/
router.delete("/:id", requireLogin, validarId, darDeBajaProducto);

/*=============
PATCH (activar)
=============*/
router.patch("/:id/activar", requireLogin, validarId, activarProducto);

export default router;