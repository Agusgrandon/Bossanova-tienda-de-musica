import ProductModels from "../models/product.models.js";

/*==========
GET TODOS LOS PRODUCTOS
==========*/
export const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await ProductModels.seleccionarProductos();

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
}

/*==========
GET (por ID)
==========*/
export const obtenerProductoId = async (req, res) => {

    try {

        const [rows] = await ProductModels.seleccionarPorId(req.id); // reemplaza el placeholders
        // si no se encuentra el id
        if (rows.length === 0){
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({ payload: rows });

    } catch (error) {
        console.error("Error al obtener producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

/*==
POST 
==*/
export const crearProducto = async (req, res) => {

    try {
        const { nombre, artista, tipo, categoria, precio, imagen } = req.body;
        const [rows] = await ProductModels.crearProducto(nombre, artista, tipo, categoria, precio, imagen);

        res.status(201).json({ 
            message: "Producto creado exitosamente.",
            productoId: rows.insertId
        });

    } catch (error) {
        console.error("Error al crear producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

/*=
PUT 
=*/
export const modificarProducto = async (req, res) => {
   
    try {
        const id = req.id;

        const { nombre, artista, tipo, categoria, precio, imagen } = req.body;

        const [result] = await ProductModels.modificarProducto(nombre, artista, tipo, categoria, precio, imagen, id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json({ message: "Producto modificado." });

    } catch (error) {
        console.error("Error al modificar producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

/*=========
BAJA LÓGICA
=========*/
export const eliminarProducto = async (req, res) => {
    const id = req.id;

    try {
        const [result] = await ProductModels.cambiarEstado(id, 0);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json({ message: `Producto con id ${id} dado de baja.` });

    } catch (error) {
        console.error("Error al dar de baja producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

/*==============
ACTIVAR PRODUCTO
==============*/
export const activarProducto = async (req, res) => {
    const id = req.id;

    try {
        const [result] = await ProductModels.cambiarEstado(id, 1);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json({ message: "Producto activado." });

    } catch (error) {
        console.error("Error al activar producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}
