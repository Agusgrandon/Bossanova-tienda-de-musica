import connection from "../database/db.js";

export const insertarNuevoUsuario = (nombre, email, password) => {
    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [nombre, email, password]);
}

/*==========
BUSCAR USUARIO
==========*/
export const buscarUsuario = async (email, password) => {

    const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

    const [rows] = await connection.query(sql, [email, password]);

    return rows[0];
};