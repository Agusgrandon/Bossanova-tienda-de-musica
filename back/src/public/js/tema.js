const temaGuardado = localStorage.getItem("tema");
const temaPreferido = temaGuardado ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = temaPreferido;

document.addEventListener("DOMContentLoaded", () => {
    const botonTema = document.getElementById("boton-tema");

    botonTema.addEventListener("click", () => {
        const temaActual = document.documentElement.dataset.theme;
        const temaNuevo = temaActual === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = temaNuevo;
        localStorage.setItem("tema", temaNuevo);
    });
});
