const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje error">${mensaje}</p>
    `;
}
getProductForm.addEventListener("submit", async (event) =>{
    event.preventDefault();
    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        return mostrarError("Ingresa un id valido");
    }

    try {
        const response = await fetch(`${urlBase}/api/productos/${idProd}`);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }

        const producto = data.payload[0];
        renderizarProducto(producto);
        
    } catch (error) {
        console.error("Error al obtener producto: ", error);
        mostrarError("Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <article class="card ${producto.activo ? "" : "card-inactiva"}">
                <img src="/assets/productos/${producto.imagen}" alt="${producto.nombre}" width="250" height="250">
                <div class="card-datos">
                    <span class="card-tipo">#${producto.id} · ${producto.tipo}</span>
                    <h2 class="card-nombre">${producto.nombre}</h2>
                    ${producto.artista ? `<p class="card-artista">${producto.artista}</p>` : ""}
                    <p class="card-precio">$${Number(producto.precio).toLocaleString("es-AR")}</p>
                    ${producto.activo ? "" : `<p class="card-tipo card-inactivo">Inactivo</p>`}
                </div>
            </article>
        </div>
    `;
}