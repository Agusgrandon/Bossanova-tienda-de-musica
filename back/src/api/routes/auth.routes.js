import { Router } from "express";
import connection from "../database/db.js";

const router = Router();

/*=========
VISTA LOGIN
=========*/
router.get("/login", (req,res) => {
    res.render("login", {
        title: "Login"
    });
});

export default router;