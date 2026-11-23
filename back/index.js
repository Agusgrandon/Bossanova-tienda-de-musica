import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes, authRoutes, userRoutes} from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js"
import session from "express-session";

const app = express();
const { port, session_key } = environments;
const PORT = port;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

/*=============================
Middlewares
=============================*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerUrl);
app.use(express.static(join(__dirname, "src/public")));
app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

/*=============================
Endpoints (URL + HTTP + LOGICA)
=============================*/
app.get("/", (req, res) =>{
    res.send("servidor funcionando :) ")
});

app.use("/", authRoutes)
app.use("/api/usuarios", userRoutes)
app.use("/api/productos", productRoutes);

app.use("/dashboard", viewRoutes);

app.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`);
});