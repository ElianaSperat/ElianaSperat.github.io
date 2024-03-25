// Abrir modal al hacer clic en el botón
document.getElementById("abrir-modal").onclick = function() {
    document.getElementById("miModal").style.display = "block";
}

// Cerrar modal al hacer clic en la "x" o en el botón de cerrar
document.getElementsByClassName("cerrar-modal")[0].onclick = function() {
    document.getElementById("miModal").style.display = "none";
}
document.getElementById("cerrar-modal").onclick = function() {
    document.getElementById("miModal").style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido de la ventana modal
window.onclick = function(event) {
    if (event.target == document.getElementById("miModal")) {
        document.getElementById("miModal").style.display = "none";
    }
}
