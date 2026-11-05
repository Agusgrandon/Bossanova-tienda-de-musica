import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

/*=====================
Validación de productos
=====================*/
function validarProducto(req, res, next) {
    const { nombre, artista, tipo, categoria, precio, imagen } = req.body;

    // Validación de categoría.
    if (!["discos", "hardware"].includes(categoria)) {
        return res.status(400).json({ message: "Categoria inválida." });
    }

    // Validación de nombre, tipo e imagen.
    if (!nombre?.trim() || !tipo?.trim() || !imagen?.trim()) {
        return res.status(400).json({ message: "Nombre, tipo e imagen no pueden estar vacíos." });
    }

    // Validación de precio.
    if (!(Number(precio) > 0)) {
        return res.status(400).json({ message: "El precio debe ser mayor a 0." });
    }

    // Artista: null si es hardware o si viene vacío.
    req.body.artista = (categoria === "hardware" || !artista?.trim()) ? null : artista.trim();

    next();
}

/*==============
Validación de id
==============*/
function validarId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ message: "El id debe ser un número entero positivo." });
    }

    next();
}

/*=============================
Endpoints (URL + HTTP + LOGICA)
=============================*/
app.get("/", (req, res) =>{
    res.send("sdbfjkhsbdcfkjscdksjfhdc")
});


// Get, escucha peticiones 
app.get("/api/productos", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");
        res.status(200).json({ payload: rows });

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*==========
GET (por ID)
==========*/
app.get("/api/productos/:id", validarId, async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await connection.query("SELECT * FROM productos WHERE id = ?", [id]);
        res.status(200).json({ payload: rows });

    } catch (error) {
        console.error("Error al obtener producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*==
POST 
==*/
app.post("/api/productos", validarProducto, async (req, res) => {
    const { nombre, artista, tipo, categoria, precio, imagen } = req.body;

    try {
        const sql = "INSERT INTO productos (nombre, artista, tipo, categoria, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)";
        await connection.query(sql, [nombre, artista, tipo, categoria, precio, imagen]);

        res.status(201).json({ message: "Producto creado." });

    } catch (error) {
        console.error("Error al crear producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*=
PUT 
=*/
app.put("/api/productos/:id", validarId, validarProducto, async (req, res) => {
    const id = req.params.id;
    const { nombre, artista, tipo, categoria, precio, imagen } = req.body;

    try {
        const sql = "UPDATE productos SET nombre = ?, artista = ?, tipo = ?, categoria = ?, precio = ?, imagen = ? WHERE id = ?";
        const [result] = await connection.query(sql, [nombre, artista, tipo, categoria, precio, imagen, id]);

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
app.delete("/api/productos/:id", validarId, async (req, res) => {
    const id = req.params.id;

    try {
        const sql = "UPDATE productos SET activo = 0 WHERE id = ?";
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json({ message: "Producto dado de baja." });

    } catch (error) {
        console.error("Error al dar de baja producto: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

/*=============
PATCH (activar)
=============*/
app.patch("/api/productos/:id/activar", validarId, async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`);
});