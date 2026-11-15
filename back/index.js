import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl, validarId, validarProducto } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

const app = express();
const PORT = environments.port;

app.use(cors());
app.use(express.json());
app.use(loggerUrl);

/*=============================
Endpoints (URL + HTTP + LOGICA)
=============================*/
app.get("/", (req, res) =>{
    res.send("servidor funcionando :) ")
});

app.use("/api/productos", productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`);
});