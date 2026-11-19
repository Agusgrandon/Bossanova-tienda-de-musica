const botonMenu = document.getElementById("boton-menu");
const menuAdmin = document.getElementById("menu-admin");

botonMenu.addEventListener("click", () => {
    const abierto = menuAdmin.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
});