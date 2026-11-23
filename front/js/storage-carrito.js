/*=====================================================
Carrito en localStorage (productos.html y carrito.html)
=====================================================*/
const CLAVE_CARRITO = "carrito";

function leerCarrito() {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) ?? [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function formatearPrecio(numero) {
    return `$${numero.toLocaleString("es-AR")}`;
}