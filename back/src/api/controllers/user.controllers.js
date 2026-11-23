import { buscarUsuario, insertarNuevoUsuario } from "../models/user.models.js";

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

/*==========
GET LOGIN
==========*/
export const mostrarLogin = (req, res) => {

    res.render("login", {
        title: "Login usuario",
        about: "Login usuario admin"
    });

};

/*==========
POST LOGIN
==========*/
export const iniciarSesion = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validamos que los campos estén completos
        if (!email || !password) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Todos los campos son necesarios"
            });
        }

        // Buscamos el usuario en la base de datos
        const user = await buscarUsuario(email, password);

        // Si no encontramos coincidencias
        if (!user) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Credenciales incorrectas"
            });
        }

        // Guardamos el usuario en la sesión
        req.session.user = {
            id: user.id,
            name: user.nombre,
            email: user.email
        };

        // Redirigimos al dashboard
        res.redirect("/dashboard/principal");

    } catch (error) {

        console.error("Error en el login: ", error);

        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};

/*==========
POST SALIR
==========*/
export const cerrarSesion = (req, res) => {

    req.session.destroy((error) => {

        if (error) {
            console.error("Error al destruir la sesión: ", error);

            return res.status(500).json({
                message: "Error al cerrar la sesión"
            });
        }

        // Redirigimos al login
        res.redirect("/login");

    });

};