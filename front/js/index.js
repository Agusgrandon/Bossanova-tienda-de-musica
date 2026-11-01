const form = document.getElementById("form-nombre");
const input = document.getElementById("nombre");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valor = input.value.trim();
    if (!valor) {
        input.setCustomValidity("Escriba su nombre");
        input.reportValidity();
        return;
    }

    localStorage.setItem("nombre-usuario", valor);
    window.location.href = "productos.html";
});

input.addEventListener("input", () => {
    input.setCustomValidity("");
});