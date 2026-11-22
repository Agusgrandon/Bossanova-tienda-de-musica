import { insertarNuevoUsuario } from "../models/user.models.js";

/*==========
POST USUARIO
==========*/
export const crearUsuario = async (req, res) => {

    try {
        const { nombre, email, password } = req.body;
        await insertarNuevoUsuario(nombre, email, password);

        res.status(201).render("createUser", {
            title: "Crear usuario",
            message: "Usuario creado exitosamente."
        });

    } catch (error) {
        // email repetido (columna UNIQUE)
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).render("createUser", {
                title: "Crear usuario",
                error: "Ese email ya está registrado."
            });
        }

        console.error("Error al crear usuario: ", error);
        res.status(500).render("createUser", {
            title: "Crear usuario",
            error: "Error interno del servidor."
        });
    }
}