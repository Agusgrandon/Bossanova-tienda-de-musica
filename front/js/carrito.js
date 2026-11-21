/*================================
Carrito: render desde localStorage
================================*/
const contenedorCarrito = document.getElementById("container-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const resumenCarrito = document.querySelector(".resumen-carrito");
const totalCarrito = document.getElementById("total-carrito");
const totalDialog = document.getElementById("total-dialog");

function formatearPrecio(numero) {
    return `$${numero.toLocaleString("es-AR")}`;
}

function renderizarCarrito() {
    const carrito = leerCarrito();

    contenedorCarrito.innerHTML = carrito.map(item => `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
            <article class="card">
                <img src="assets/productos/${item.imagen}" alt="${item.nombre}" width="250" height="250">
                <div class="card-datos">
                    <span class="card-tipo">${item.tipo}</span>
                    <h2 class="card-nombre">${item.nombre}</h2>
                    ${item.artista ? `<p class="card-artista">${item.artista}</p>` : ""}
                    <p class="card-precio">${formatearPrecio(item.precio)}</p>

                    <div class="item-cantidad">
                        <button class="boton boton-secundario" type="button" data-id="${item.id}" data-accion="restar" aria-label="Restar uno">−</button>
                        <span>${item.cantidad}</span>
                        <button class="boton boton-secundario" type="button" data-id="${item.id}" data-accion="sumar" aria-label="Sumar uno">+</button>
                    </div>

                    <p class="item-subtotal">Subtotal: <span>${formatearPrecio(item.precio * item.cantidad)}</span></p>
                    <button class="boton" type="button" data-id="${item.id}" data-accion="eliminar">Eliminar</button>
                </div>
            </article>
        </div>
    `).join("");

    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    totalCarrito.textContent = formatearPrecio(total);
    totalDialog.textContent = formatearPrecio(total);

    carritoVacio.hidden = carrito.length > 0;
    resumenCarrito.hidden = carrito.length === 0;
}

/*=======================
Sumar, restar y eliminar
=======================*/
contenedorCarrito.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    const accion = e.target.dataset.accion;
    if (!id) return;

    let carrito = leerCarrito();
    const item = carrito.find(item => item.id === id);

    if (accion === "sumar") {
        item.cantidad++;
    } else if (accion === "restar") {
        item.cantidad--;
    }
    if (accion === "eliminar" || item.cantidad < 1) {
        carrito = carrito.filter(item => item.id !== id);
    }

    guardarCarrito(carrito);
    renderizarCarrito();
});

/*==============
Finalizar compra
==============*/
const botonFinalizar = document.getElementById("boton-finalizar");
const dialogConfirmar = document.getElementById("dialog-confirmar");

botonFinalizar.addEventListener("click", () => {
    dialogConfirmar.returnValue = "";
    dialogConfirmar.showModal();
});

dialogConfirmar.addEventListener("close", () => {
    if (dialogConfirmar.returnValue !== "confirmar") return;
    window.location.href = "ticket.html";
});

// Sin nombre no carga el carrito
if (!localStorage.getItem("nombre-usuario")) {
    window.location.replace("index.html");
} else {
    renderizarCarrito();
}