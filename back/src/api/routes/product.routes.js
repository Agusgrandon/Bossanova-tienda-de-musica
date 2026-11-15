// rutas de los productos
import { Router } from "express";
import { validarId, validarProducto } from "../middlewares/middlewares.js";
import  connection from "../database/db.js";


const router = Router();


// Get, escucha peticiones 
router.get("/", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({ payload: rows });

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*==========
GET (por ID)
==========*/
router.get("/:id", validarId, async (req, res) => {

    try {
        const sql = ` SELECT * FROM productos WHERE productos.id = ?`
        const [rows] = await connection.query(sql, [req.id]); // reemplaza el placeholders
        // si no se encuentra el id
        if (rows.length === 0){
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            })
        }

        res.status(200).json({ payload: rows });

    } catch (error) {
        console.error("Error al obtener producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*==
POST 
==*/
router.post("/", validarProducto, async (req, res) => {

    try {
        const { nombre, artista, tipo, categoria, precio, imagen } = req.body;
        const sql = "INSERT INTO productos (nombre, artista, tipo, categoria, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)";
        await connection.query(sql, [nombre, artista, tipo, categoria, precio, imagen]);

        res.status(201).json({ 
            message: "Producto creado exitosamente.",
            productoId: rows.insertId
        });

    } catch (error) {
        console.error("Error al crear producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*=
PUT 
=*/
router.put("/:id", validarId, validarProducto, async (req, res) => {
   
    try {
        const { nombre, artista, tipo, categoria, precio, imagen } = req.body;

        const sql = "UPDATE productos SET nombre = ?, artista = ?, tipo = ?, categoria = ?, precio = ?, imagen = ?, activo = ? WHERE id = ?";

        const [result] = await connection.query(sql, [nombre, artista, tipo, categoria, precio, imagen, activo, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json({ message: "Producto modificado." });

    } catch (error) {
        console.error("Error al modificar producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*==================
DELETE (baja lógica)
==================*/
router.delete("/:id", validarId, async (req, res) => {
   
    try {
        const sql = "UPDATE productos SET activo = 0 WHERE id = ?";
        await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json({ message: `Producto con id ${id} dado de baja.` });

    } catch (error) {
        console.error("Error al dar de baja producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*=============
PATCH (activar)
=============*/
router.patch("/:id/activar", validarId, async (req, res) => {
    const id = req.params.id;

    try {
        const sql = "UPDATE productos SET activo = 1 WHERE id = ?";
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json({ message: "Producto activado." });

    } catch (error) {
        console.error("Error al activar producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

export default router;