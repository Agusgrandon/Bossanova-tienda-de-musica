/*=============================
Rutas de autenticacion 
=============================*/
import { Router } from "express";
import connection from "../database/db.js";
const router = Router();

/*=============================
Vista del login
=============================*/
router.get("/login", (req, res) =>{
    res.render("login", {
        title: "Login usuario",
        about: "Login usuario admin"
    });
});

/*=============================
Endpoint que atendera las peticiones POST a /login
=============================*/
router.post("/login", async (req, res) =>{
    try{

        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Todos los campos son necesarios"
            });
        }

        const sql = "SELECT * FROM usuarios where email = ? AND password = ?";
        const [rows] = await connection.query(sql, [email, password]);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Credenciales incorrectas"
            })
        }

        // Guardamos el usuario
        const user = rows[0];

        // Guardamos la sesion
        req.session.user = {
            id: user.id,
            name: user.nombre,
            email: user.email
        }

        // Creada la sesion, redirigimos a la vista del dashboard
        res.redirect("/dashboard/principal");

    } catch (error){
        console.log("Error en el login ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
})

export default router;