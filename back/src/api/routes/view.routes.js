import { Router } from "express";
import { vistaPrincipal } from "../controllers/view.controllers.js";

const router = Router();

/*=============
VISTA PRINCIPAL 
=============*/
router.get("/principal/", vistaPrincipal);

export default router;
