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

// Middleware de validación de productos
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

// endpoints (URL + HTTP + LOGICA)
app.get("/", (req, res) =>{
    res.send("sdbfjkhsbdcfkjscdksjfhdc")
});


//get, escucha peticiones 
app.get("/api/productos", async (req, res) =>{
    const [rows] = await connection.query("SELECT * FROM productos");
    //console.log(rows);
    res.status(200).json({
        payload: rows
    })
})

// GET product by id
app.get("/api/productos/:id", async (req, res) => {

    // Gracias al objeto req, extraigo el valor numero de la url
    const id = req.params.id;

    const [rows] = await connection.query(`SELECT * FROM productos WHERE productos.id = ${id}`);

    // console.log(rows);
    res.status(200).json({
        payload: rows
    })
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
app.put("/api/productos/:id", validarProducto, async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`);
});