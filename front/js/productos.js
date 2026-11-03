/*==============================================
DATOS DE PRUEBA BORRAR - CUANDO SE CONECTE LA BD
==============================================*/

const items = [
    { id: 1, nombre: "Bossanova", artista: "Pixies", tipo: "Vinilo", categoria: "Discos", precio: "85000.00", imagen: "bossanova.webp" },
    { id: 2, nombre: "Doolittle", artista: "Pixies", tipo: "CD", categoria: "Discos", precio: "38000.00", imagen: "doolittle.webp" },
    { id: 3, nombre: "Daydream Nation", artista: "Sonic Youth", tipo: "Vinilo", categoria: "Discos", precio: "110000.00", imagen: "daydream-nation.webp" },
    { id: 4, nombre: "Unknown Pleasures", artista: "Joy Division", tipo: "CD", categoria: "Discos", precio: "36000.00", imagen: "unknown-pleasures.webp" },
    { id: 5, nombre: "A Star Named Sun", artista: "Kinó", tipo: "Vinilo", categoria: "Discos", precio: "90000.00", imagen: "a-star-named-sun.webp" },
    { id: 6, nombre: "Okurimono", artista: "Hyakkei", tipo: "CD", categoria: "Discos", precio: "55000.00", imagen: "okurimono.webp" },
    { id: 7, nombre: "Seventeen Seconds", artista: "The Cure", tipo: "CD", categoria: "Discos", precio: "36000.00", imagen: "seventeen-seconds.webp" },
    { id: 8, nombre: "Oktubre", artista: "Patricio Rey y sus Redonditos de Ricota", tipo: "Vinilo", categoria: "Discos", precio: "55000.00", imagen: "oktubre.webp" },
    { id: 9, nombre: "Brighten the Corners", artista: "Pavement", tipo: "CD", categoria: "Discos", precio: "38000.00", imagen: "brighten-the-corners.webp" },
    { id: 10, nombre: "Wowee Zowee", artista: "Pavement", tipo: "CD", categoria: "Discos", precio: "38000.00", imagen: "wowee-zowee.webp" },
    { id: 11, nombre: "The Natural Bridge", artista: "Silver Jews", tipo: "CD", categoria: "Discos", precio: "40000.00", imagen: "the-natural-bridge.webp" },
    { id: 12, nombre: "American Water", artista: "Silver Jews", tipo: "CD", categoria: "Discos", precio: "40000.00", imagen: "american-water.webp" },
    { id: 13, nombre: "Three Cheers for Sweet Revenge", artista: "My Chemical Romance", tipo: "CD", categoria: "Discos", precio: "35000.00", imagen: "three-cheers.webp" },
    { id: 14, nombre: "Black Sunday", artista: "Cypress Hill", tipo: "Vinilo", categoria: "Discos", precio: "85000.00", imagen: "black-sunday.webp" },
    { id: 15, nombre: "The Low End Theory", artista: "A Tribe Called Quest", tipo: "Vinilo", categoria: "Discos", precio: "85000.00", imagen: "the-low-end-theory.webp" },
    { id: 16, nombre: "The Infamous", artista: "Mobb Deep", tipo: "CD", categoria: "Discos", precio: "36000.00", imagen: "the-infamous.webp" },
    { id: 17, nombre: "Da Storm", artista: "O.G.C.", tipo: "CD", categoria: "Discos", precio: "40000.00", imagen: "da-storm.webp" },
    { id: 18, nombre: "Illmatic", artista: "Nas", tipo: "Vinilo", categoria: "Discos", precio: "85000.00", imagen: "illmatic.webp" },
    { id: 19, nombre: "Enter the Wu-Tang (36 Chambers)", artista: "Wu-Tang Clan", tipo: "Vinilo", categoria: "Discos", precio: "90000.00", imagen: "enter-the-wu-tang.webp" },
    { id: 21, nombre: "Music to Driveby", artista: "Compton's Most Wanted", tipo: "CD", categoria: "Discos", precio: "40000.00", imagen: "music-to-driveby.webp" },
    { id: 23, nombre: "Mass of the Fermenting Dregs", artista: "Mass of the Fermenting Dregs", tipo: "CD", categoria: "Discos", precio: "55000.00", imagen: "mass-of-the-fermenting-dregs.webp" },
    { id: 24, nombre: "the book about my idle plot on a vague anxiety", artista: "toe", tipo: "CD", categoria: "Discos", precio: "55000.00", imagen: "the-book-about-my-idle-plot.webp" },
    { id: 25, nombre: "Audio-Technica ATH-M20x", artista: null, tipo: "Auriculares", categoria: "Hardware", precio: "150000.00", imagen: "ath-m20x.webp" },
    { id: 26, nombre: "KZ ZSN Pro", artista: null, tipo: "Auriculares", categoria: "Hardware", precio: "45000.00", imagen: "kz-zsn-pro.webp" },
    { id: 27, nombre: "Shure SRH940", artista: null, tipo: "Auriculares", categoria: "Hardware", precio: "450000.00", imagen: "shure-srh940.webp" },
    { id: 28, nombre: "Sennheiser HD 300", artista: null, tipo: "Auriculares", categoria: "Hardware", precio: "120000.00", imagen: "sennheiser-hd300.webp" },
    { id: 29, nombre: "Behringer Powerplay P1", artista: null, tipo: "Amplificador", categoria: "Hardware", precio: "90000.00", imagen: "behringer-p1.webp" },
    { id: 30, nombre: "Behringer MA400", artista: null, tipo: "Amplificador", categoria: "Hardware", precio: "70000.00", imagen: "behringer-ma400.webp" },
    { id: 31, nombre: "Samson QH4", artista: null, tipo: "Amplificador", categoria: "Hardware", precio: "150000.00", imagen: "samson-qh4.webp" },
    { id: 32, nombre: "Behringer PP400", artista: null, tipo: "Preamplificador", categoria: "Hardware", precio: "60000.00", imagen: "behringer-pp400.webp" },
    { id: 33, nombre: "Record Pro RP113", artista: null, tipo: "Preamplificador", categoria: "Hardware", precio: "80000.00", imagen: "record-pro-rp113.webp" },
    { id: 35, nombre: "NUX NAI-24", artista: null, tipo: "Placa de audio", categoria: "Hardware", precio: "150000.00", imagen: "nux-nai24.webp" },
    { id: 36, nombre: "Lexsen Pod8", artista: null, tipo: "Placa de audio", categoria: "Hardware", precio: "200000.00", imagen: "lexsen-pod8.webp" },
    { id: 37, nombre: "M-Audio M-Track Solo II", artista: null, tipo: "Placa de audio", categoria: "Hardware", precio: "140000.00", imagen: "m-track-solo-ii.webp" },
    { id: 38, nombre: "Wincofon W406", artista: null, tipo: "Tocadiscos", categoria: "Hardware", precio: "250000.00", imagen: "wincofon-w406.webp" },
    { id: 39, nombre: "Audio-Technica AT-LP60X", artista: null, tipo: "Tocadiscos", categoria: "Hardware", precio: "450000.00", imagen: "at-lp60x.webp" },
    { id: 40, nombre: "Gadnic Soundix6 Vintage", artista: null, tipo: "Tocadiscos", categoria: "Hardware", precio: "180000.00", imagen: "gadnic-soundix6.webp" },
    { id: 41, nombre: "Crosley Voyager", artista: null, tipo: "Reproductor de CD", categoria: "Hardware", precio: "200000.00", imagen: "crosley-voyager.webp" },
    { id: 42, nombre: "Crosley Cruiser", artista: null, tipo: "Reproductor de CD", categoria: "Hardware", precio: "200000.00", imagen: "crosley-cruiser.webp" },
    { id: 43, nombre: "SMSL PL150", artista: null, tipo: "Reproductor de CD", categoria: "Hardware", precio: "400000.00", imagen: "smsl-pl150.webp" },
    { id: 44, nombre: "JBL Flip 7", artista: null, tipo: "Parlante", categoria: "Hardware", precio: "180000.00", imagen: "jbl-flip7.webp" },
    { id: 45, nombre: "AIWA AW-T310", artista: null, tipo: "Parlante", categoria: "Hardware", precio: "60000.00", imagen: "aiwa-awt310.webp" },
    { id: 47, nombre: "Behringer MDX2600", artista: null, tipo: "Compresor", categoria: "Hardware", precio: "300000.00", imagen: "behringer-mdx2600.webp" },
    { id: 48, nombre: "Apogee DSP-46", artista: null, tipo: "Compresor", categoria: "Hardware", precio: "500000.00", imagen: "apogee-dsp46.webp" },
];

/* =============================================================
FUNCION DE PRUEBA. REEMPLAZAR POR FETCH A LA API CUANDO HAYA BD 
==============================================================*/

async function obtenerProductos(categoria, pagina) {
    const productosPorPagina = 12;
    const filtrados = items.filter(item => item.categoria === categoria);
    const inicio = (pagina - 1) * productosPorPagina;

    return {
        payload: filtrados.slice(inicio, inicio + productosPorPagina),
        total: filtrados.length
    };
}

const contenedorCards = document.getElementById("container-cards");
let categoriaActual = "Discos";
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
    const respuesta = await obtenerProductos(categoriaActual, paginaActual);
    renderizar(respuesta.payload);
}

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