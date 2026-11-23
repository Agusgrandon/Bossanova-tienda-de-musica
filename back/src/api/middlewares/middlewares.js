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

    // Artista: null si es hardware o si viene vacío
    req.body.artista = (categoria === "hardware" || !artista?.trim()) ? null : artista.trim();

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
    requireLogin
}

