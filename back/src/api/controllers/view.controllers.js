import ProductModels from "../models/product.models.js";

/*=============
VISTA PRINCIPAL
=============*/
export const vistaPrincipal = async (req, res) => {
    try {
        const [rows] = await ProductModels.seleccionarProductos();

        res.render("index", {
            title: "Principal",
            discos: rows.filter(producto => producto.categoria === "discos"),
            hardware: rows.filter(producto => producto.categoria === "hardware")
        });
    } catch (error) {
        console.error("Error al obtener productos: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

/*=============
VISTA CONSULTAR
=============*/
export const vistaConsultar = (req, res) => {
    res.render("get", {
        title:"Consultar"
    });
}

/*=========
VISTA CREAR
=========*/
export const vistaCrear = (req, res) => {
    res.render("post", {
        title: "Crear",
        about: "Crear producto"
    });
}

/*=============
VISTA MODIFICAR
=============*/
export const vistaModificar = (req,res) => {
    res.render("put", {
        title: "Modificar",
        about: "Modificar producto"
    })
}

/*========
VISTA BAJA
========*/
export const vistaBaja = (req,res) => {
    res.render("delete", {
        title:"Baja/Alta",
        about:"Baja/Alta logica"
    })
}