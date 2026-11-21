/* ===========================================
Productos desde la API. Filtrado y paginación.
============================================*/
const URL_API = "http://localhost:3000/api/productos/activos";
const productosPorPagina = 12;

async function obtenerProductos(categoria, pagina) {
    const respuesta = await fetch(URL_API);

    if (!respuesta.ok) {
        throw new Error (`Error ${respuesta.status} al pedir los productos`);
    }

    const datos = await respuesta.json();
    const filtrados = datos.payload.filter(producto => producto.categoria === categoria);
    const inicio = (pagina - 1) * productosPorPagina;

    return {
        payload: filtrados.slice(inicio, inicio + productosPorPagina),
        total: filtrados.length
    };
}

const contenedorCards = document.getElementById("container-cards");
const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const contadorPaginas = document.getElementById("contador-paginas");
let categoriaActual = "discos";
let paginaActual= 1;
let productosPagina = [];

function renderizar(productos) {
    const carrito = leerCarrito();

    contenedorCards.innerHTML = productos.map(producto => {
        const enCarrito = carrito.some(item => item.id === producto.id);

        return `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <article class="card">
                    <img src="assets/productos/${producto.imagen}" alt="${producto.nombre}" width="250" height="250">
                    <div class="card-datos">
                        <span class="card-tipo">${producto.tipo}</span>
                        <h2 class="card-nombre">${producto.nombre}</h2>
                        ${producto.artista ? `<p class="card-artista">${producto.artista}</p>` : ""}
                        <p class="card-precio">$${Number(producto.precio).toLocaleString("es-AR")}</p>
                        <button type="button" class="boton ${enCarrito ? "boton-secundario" : ""}" data-id="${producto.id}">
                            ${enCarrito ? "Quitar" : "Agregar"}
                        </button>
                    </div>
                </article>
            </div>
        `;
    }).join("");
}

async function cargar() {
    try {
        const respuesta = await obtenerProductos(categoriaActual, paginaActual);
        productosPagina = respuesta.payload;
        renderizar(productosPagina);
        const totalPaginas = Math.max(1, Math.ceil(respuesta.total / productosPorPagina));
        contadorPaginas.textContent = `Página ${paginaActual} de ${totalPaginas}`;
        
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual === totalPaginas;
    } catch (error){
        console.error(error);
        contenedorCards.innerHTML = `<p>No se pudieron cargar los productos. Intentá de nuevo más tarde.</p>`;
    }
}

const botonesCategoria = document.querySelectorAll("[data-categoria]");

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", () => {
        categoriaActual = boton.dataset.categoria;
        paginaActual = 1;

        botonesCategoria.forEach(otro => {
            otro.setAttribute("aria-pressed", otro === boton);
        });

        cargar();
    });
});

const selectorCategorias = document.querySelector(".selector-categorias");

botonSiguiente.addEventListener("click", async () => {
    paginaActual++;
    await cargar();
    selectorCategorias.scrollIntoView({ behavior: "smooth" });
});

botonAnterior.addEventListener("click", async () => {
    paginaActual--;
    await cargar();
    selectorCategorias.scrollIntoView({ behavior: "smooth" });
});

contenedorCards.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    const carrito = leerCarrito();
    const enCarrito = carrito.some(item => item.id === id);

    if (enCarrito) {
        guardarCarrito(carrito.filter(item => item.id !== id));
    } else {
        const producto = productosPagina.find(p => p.id === id);
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            artista: producto.artista,
            tipo: producto.tipo,
            imagen: producto.imagen,
            precio: Number(producto.precio),
            cantidad: 1
        });
        guardarCarrito(carrito);
    }

    renderizar(productosPagina);
});

/*===============
Saludo al usuario 
===============*/
const nombre = localStorage.getItem("nombre-usuario");

if (!nombre) {
    window.location.replace("index.html");
} else {
    document.getElementById("nombre-usuario").textContent = nombre;
    cargar();
}