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