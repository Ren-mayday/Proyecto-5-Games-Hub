import "./styles/main.scss";
import "./router.js";

//! #✅PUNTO DE ENTRADA GENERAL DE LA APP
// Ejecuta al cargar
setViewportHeight();

// Actualiza cuando se redimensiona o se rota el dispositivo
window.addEventListener("resize", setViewportHeight);

console.log("hola");
