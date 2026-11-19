const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorForm = document.getElementById("contenedor-form");
const getProductForm = document.getElementById("getProductForm");

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}
// Buscar producto por id
getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();
    contenedorForm.innerHTML = "";

    try {
        const response = await fetch(`${urlBase}/api/productos/${idProd}`);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarMensaje("error", data.message);
        }

        const producto = data.payload[0];

        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener producto: ", error);
        return mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

// Card con botón Modificar
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
                    <button type="button" class="boton" id="btn-modificar">Modificar</button>
                </div>
            </article>
        </div>
    `;

    document.getElementById("btn-modificar").addEventListener("click", () => {
        renderizarFormularioPut(producto);
    });
}

// Form precargado con los datos actuales
function renderizarFormularioPut(producto) {
    const esHardware = producto.categoria === "hardware";

    contenedorForm.innerHTML = `
        <form class="formulario" id="modifyProductForm">

            <label for="categoriaProducto">Categoria</label>
            <select name="categoria" id="categoriaProducto" required>
                <option value="discos" ${esHardware ? "" : "selected"}>Discos</option>
                <option value="hardware" ${esHardware ? "selected" : ""}>Hardware</option>
            </select>

            <label for="tipoProducto">Tipo</label>
            <input type="text" name="tipo" id="tipoProducto" value="${producto.tipo}" required>

            <label for="imagenProducto">Imagen</label>
            <input type="text" name="imagen" id="imagenProducto" value="${producto.imagen}" required>

            <label for="nombreProducto">Nombre</label>
            <input type="text" name="nombre" id="nombreProducto" value="${producto.nombre}" required>

            <label for="artistaProducto" ${esHardware ? "hidden" : ""}>Artista</label>
            <input type="text" name="artista" id="artistaProducto" value="${producto.artista ?? ""}" ${esHardware ? "hidden" : ""}>

            <label for="precioProducto">Precio</label>
            <input type="number" name="precio" id="precioProducto" min="1" value="${producto.precio}" required>

            <button type="submit" class="boton">Guardar cambios</button>
        </form>
    `;

    // Ocultar artista si cambia a hardware
    const selectCategoria = document.getElementById("categoriaProducto");
    const inputArtista = document.getElementById("artistaProducto");
    const labelArtista = document.querySelector('label[for="artistaProducto"]');

    selectCategoria.addEventListener("change", () => {
        const hardwareSeleccionado = selectCategoria.value === "hardware";
        labelArtista.hidden = hardwareSeleccionado;
        inputArtista.hidden = hardwareSeleccionado;

        if (hardwareSeleccionado) {
            inputArtista.value = "";
        }
    });

    // Enviar el PUT
    document.getElementById("modifyProductForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const formObj = Object.fromEntries(new FormData(event.target).entries());

        try {
            const response = await fetch(`${urlBase}/api/productos/${producto.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formObj)
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                window.location.href = "/dashboard/principal";
            }
        } catch (error) {
            console.error("Error al modificar producto: ", error);
        }
    });
}