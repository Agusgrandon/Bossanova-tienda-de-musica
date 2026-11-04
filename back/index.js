import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";

const app = express();
const PORT = environments.port;

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

app.listen(PORT, () =>{
    console.log(`Servidor http://localhost:${PORT}`);
});