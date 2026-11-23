const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};

/*=====================
Validación de productos
=====================*/
function validarProducto(req, res, next) {
    const { nombre, artista, tipo, categoria, precio, imagen } = req.body;

    // Validación de categoría
    if (!["discos", "hardware"].includes(categoria)) {
        return res.status(400).json({ message: "Categoria inválida." });
    }

    // Validación de nombre, tipo e imagen
    if (!nombre?.trim() || !tipo?.trim() || !imagen?.trim()) {
        return res.status(400).json({ message: "Nombre, tipo e imagen no pueden estar vacíos." });
    }

    // Validación de precio
    if (!(Number(precio) > 0)) {
        return res.status(400).json({ message: "El precio debe ser mayor a 0." });
    }

    // Validación de artista cuando se escoge categoría 'discos'
    if (categoria === "discos" && !artista?.trim()) {
        return res.status(400).json({ message: "Los discos necesitan artista." });
    }

    // Artista: null si es hardware o si viene vacío
    req.body.artista = (categoria === "hardware" || !artista?.trim()) ? null : artista.trim();

    //Guarda los valores sin espacios
    req.body.nombre = nombre.trim();
    req.body.tipo = tipo.trim();
    req.body.imagen = imagen.trim();

    next();
}

/*==============
Validación de id
==============*/
function validarId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ message: "El id debe ser un número entero positivo." });
    }

    req.id = id;
    next();
}

/*====================
Validación de usuarios
====================*/
function validarUsuario(req, res, next) {
    const { nombre, email, password } = req.body;

    if (!nombre?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).render("createUser", {
            title: "Crear usuario",
            error: "Todos los campos son obligatorios."
        });
    }

    // Guarda nombre y email sin espacios
    req.body.nombre = nombre.trim();
    req.body.email = email.trim();

    next();
}

/*==============
Login - proteger las rutas
==============*/
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

export{    
    loggerUrl,
    validarProducto,
    validarId,
    validarUsuario,
    requireLogin
}

