const urlBase = "http://localhost:3000";
const createProductForm = document.getElementById("createProductForm");
const contenedorMensaje = document.getElementById("contenedor-mensaje");

function mostrarMensaje(tipo, mensaje) {
    contenedorMensaje.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}

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
}) 
createProductForm.addEventListener("submit", async event => {
event.preventDefault(); 
const formData = new FormData(event.target);
const formObj = Object.fromEntries(formData.entries());

try {
    const response = await fetch(`${urlBase}/api/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObj)
    });
    const data = await response.json();

    if (!response.ok) {
        return mostrarMensaje("error", data.message);
    }

    window.location.href = "/dashboard/principal";

} catch (error) {
    console.error("Error al crear producto: ", error);
    mostrarMensaje("error", "Error de conexion con el servidor");
}
})