// rutas de los productos
import { Router } from "express";
import { validarId, validarProducto } from "../middlewares/middlewares.js";
import { activarProducto, crearProducto, eliminarProducto, modificarProducto, obtenerProductoId, obtenerProductos, obtenerProductosActivos } from "../controllers/product.controllers.js";

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
router.post("/", validarProducto, crearProducto);

/*=
PUT 
=*/
router.put("/:id", validarId, validarProducto, modificarProducto);

/*==================
DELETE (baja lógica)
==================*/
router.delete("/:id", validarId, eliminarProducto);

/*=============
PATCH (activar)
=============*/
router.patch("/:id/activar", validarId, activarProducto);

export default router;