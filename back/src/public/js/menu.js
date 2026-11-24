const botonMenu = document.getElementById("boton-menu");
const menuAdmin = document.getElementById("menu-admin");

// Verificación de que el boton exista porque en login no está y da error en la consola
if (botonMenu) {
    botonMenu.addEventListener("click", () => {
        const abierto = menuAdmin.classList.toggle("abierto");
        botonMenu.setAttribute("aria-expanded", abierto);
    });
}