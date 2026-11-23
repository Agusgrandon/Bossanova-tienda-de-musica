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
router.post("/login", (req, res) =>{
    try{

        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Todos los campos son necesarios"
            });
        }

    } catch (error){
        console.log("Error en el login ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
})

export default router;