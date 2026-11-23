const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
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

    if (!idProd) {
        return mostrarMensaje("error", "Ingresa un id valido");
    }

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

// Card con botón Dar de baja (si está activo) o Activar (si está inactivo)
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
                    <button type="button" class="boton" id="btn-estado">${producto.activo ? "Dar de baja" : "Activar"}</button>
                </div>
            </article>
        </div>
    `;

    const accion = producto.activo ? "dar de baja" : "activar";

    // Confirmación con confirm()
    document.getElementById("btn-estado").addEventListener("click", () => {
        const confirmacion = confirm(`¿Seguro que querés ${accion} "${producto.nombre}"?`);

        if (!confirmacion) {
            alert("Acción cancelada");
        } else if (producto.activo) {
            darDeBajaProducto(producto.id);
        } else {
            activarProducto(producto.id);
        }
    });
}

// Baja lógica
async function darDeBajaProducto(id) {
    try {
        const response = await fetch(`${urlBase}/api/productos/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        alert(data.message);
        getProductForm.requestSubmit();
    } catch (error) {
        console.error("Error al dar de baja producto: ", error);
    }
}

// Activar: PATCH
async function activarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/api/productos/${id}/activar`, {
            method: "PATCH"
        });
        const data = await response.json();
        alert(data.message);
        getProductForm.requestSubmit();
    } catch (error) {
        console.error("Error al activar producto: ", error);
    }
}