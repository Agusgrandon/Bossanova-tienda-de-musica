/*===================
Ticket de la compra
===================*/
const nombre = localStorage.getItem("nombre-usuario");
const carrito = leerCarrito();
const fecha = new Date().toLocaleDateString("es-AR");
const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

function detalleProducto(item) {
    return `${item.nombre}${item.artista ? ` - ${item.artista}` : ""} (${item.tipo})`;
}

function detallePrecio(item) {
    return `${item.cantidad} x ${formatearPrecio(item.precio)} = ${formatearPrecio(item.precio * item.cantidad)}`;
}

function renderizarTicket() {
    document.getElementById("ticket-nombre").textContent = nombre;
    document.getElementById("ticket-fecha").textContent = fecha;
    document.getElementById("ticket-total").textContent = formatearPrecio(total);

    document.getElementById("ticket-productos").innerHTML = carrito.map(item => `
        <li>
            <p>${detalleProducto(item)}</p>
            <p>${detallePrecio(item)}</p>
        </li>
    `).join("");
}

/*==============
Descargar en PDF
==============*/
function imprimirTicket() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Posición vertical: aumenta después de cada texto para que no se superpongan
    let y = 20;

    doc.setFontSize(24);
    doc.text("Bossanova", 20, y);
    y += 15;

    doc.setFontSize(12);
    doc.text(`Cliente: ${nombre}`, 20, y);
    y += 7;
    doc.text(`Fecha: ${fecha}`, 20, y);
    y += 15;

    carrito.forEach(item => {
        // Si no entra en la hoja, sigue en una nueva
        if (y > 260) {
            doc.addPage();
            y = 20;
        }

        doc.text(detalleProducto(item), 20, y);
        y += 7;
        doc.text(detallePrecio(item), 25, y);
        y += 10;
    });

    y += 5;
    doc.setFontSize(16);
    doc.text(`Total: ${formatearPrecio(total)}`, 20, y);

    doc.save(`ticket-${nombre}.pdf`);
}

document.getElementById("boton-descargar").addEventListener("click", imprimirTicket);

/*========================
Salir: reinicia el sistema
========================*/
document.getElementById("boton-salir").addEventListener("click", () => {
    localStorage.removeItem("nombre-usuario");
    localStorage.removeItem(CLAVE_CARRITO);
    window.location.replace("index.html");
});

// Redirección al index si no hay productos
if (!nombre || carrito.length === 0) {
    window.location.replace("index.html");
} else {
    renderizarTicket();
}