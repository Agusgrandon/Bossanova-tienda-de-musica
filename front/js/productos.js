/* =============================================================
Productos desde la API. Filtrado y paginación.
==============================================================*/
const URL_API = "http://localhost:3000/api/productos";
const productosPorPagina = 12;

async function obtenerProductos(categoria, pagina) {
    const respuesta = await fetch(URL_API);

    if (!respuesta.ok) {
        throw new Error (`Error ${respuesta.status} al pedir los productos`);
    }

    const datos = await respuesta.json();
    // Provisorio: sacar cuando el back filtre con WHERE activo = 1
    const filtrados = datos.payload.filter(producto => producto.categoria === categoria && producto.activo);
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

function renderizar(productos) {
    contenedorCards.innerHTML = productos.map(producto => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <article class="card">
                <img src="assets/productos/${producto.imagen}" alt="${producto.nombre}" width="250" height="250">
                <div class="card-datos">
                    <span class="card-tipo">${producto.tipo}</span>
                    <h2 class="card-nombre">${producto.nombre}</h2>
                    ${producto.artista ? `<p class="card-artista">${producto.artista}</p>` : ""}
                    <p class="card-precio">$${Number(producto.precio).toLocaleString("es-AR")}</p>
                    <button type="button" class="boton" data-id="${producto.id}">Agregar</button>
                </div>
            </article>
        </div>
    `).join("");
}

async function cargar() {
    try {
        const respuesta = await obtenerProductos(categoriaActual, paginaActual);
        renderizar(respuesta.payload);
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

botonSiguiente.addEventListener("click", () => {
    paginaActual++;
    cargar();
    selectorCategorias.scrollIntoView({ behavior: "smooth" });
});

botonAnterior.addEventListener("click", () => {
    paginaActual--;
    cargar();
    selectorCategorias.scrollIntoView({ behavior: "smooth" });
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