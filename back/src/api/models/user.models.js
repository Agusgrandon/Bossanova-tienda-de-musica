import connection from "../database/db.js";

export const insertarNuevoUsuario = (nombre, email, password) => {
    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [nombre, email, password]);
}
