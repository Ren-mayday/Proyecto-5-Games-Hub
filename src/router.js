import { showHome } from "./views/homeView.js";
import { renderTicTacToe } from "./games/tictactoe/dom.js";
import { initializeGame } from "./games/tictactoe/game.js";

//! # ✅CONTROLA LA NAVEGACIÓN ENTRE JUEGOS

const root = document.getElementById("app");

const routes = {
  home: showHome,
  tictactoe: () => {
    const container = renderTicTacToe();
    initializeGame();
  },
  snake: () => console.log("Aquí iría el Snake"),
  memory: () => console.log("Aquí iría el Memory"),
};

// Función para cambiar la vista según la ruta
export const navigateTo = (route) => {
  root.innerHTML = ""; // Limpia la vista actual
  const view = routes[route]; // Busca la función asociada a la ruta
  view?.(); // Si existe, la ejecuta

  // Actualiza la URL sin recargar la página
  history.pushState({ route }, "", `#${route}`);
};

// Detecta si alguien usa el botón "atrás" o "adelante"
window.addEventListener("popstate", (event) => {
  const route = event.state?.route || "home";
  root.innerHTML = "";
  const view = routes[route];
  view?.();
});

// Detecta la URL al cargar por primera vez
window.addEventListener("DOMContentLoaded", () => {
  const hashRoute = window.location.hash.replace("#", "") || "home";
  root.innerHTML = "";
  const view = routes[hashRoute];
  view?.();
});
