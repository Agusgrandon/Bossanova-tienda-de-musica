/*=============================
Rutas de autenticacion 
=============================*/

import { Router } from "express";
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

export default router;