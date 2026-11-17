import connection from "../database/db.js";

/*==========
GET TODOS LOS PRODUCTOS
==========*/
const seleccionarProductos = () =>{
    return connection.query("SELECT * FROM productos");

}

/*==========
GET (por ID)
==========*/
const seleccionarPorId = (id) => {
        const sql = ` SELECT * FROM productos WHERE productos.id = ?`
        return connection.query(sql, [id]);
}

/*==
POST 
==*/
const crearProducto = (nombre, artista, tipo, categoria, precio, imagen) =>{
        const sql = "INSERT INTO productos (nombre, artista, tipo, categoria, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)";
        return connection.query(sql, [nombre, artista, tipo, categoria, precio, imagen]);
}

/*=
PUT 
=*/
const modificarProducto = (nombre, artista, tipo, categoria, precio, imagen, id) =>{
        const sql = "UPDATE productos SET nombre = ?, artista = ?, tipo = ?, categoria = ?, precio = ?, imagen = ? WHERE id = ?";
        return connection.query(sql, [nombre, artista, tipo, categoria, precio, imagen, id]);
}

/*============================
BAJA LÓGICA / ACTIVAR PRODUCTO
============================*/
const cambiarEstado = (id, activo) => {
        const sql = "UPDATE productos SET activo = ? WHERE id = ?";
        return connection.query(sql, [activo, id]);
}

export default{
    seleccionarProductos,
    seleccionarPorId,
    crearProducto,
    modificarProducto,
    cambiarEstado
}


