import { showHome } from "./views/homeView.js";
// Tic Tac Toe
import { renderTicTacToe } from "./games/tictactoe/dom.js";
import { initializeGame } from "./games/tictactoe/game.js";
//Snake
import { createSnakeGameElements } from "./games/snake/dom.js";
// Memory Game
import { renderBoardGame } from "./games/memory/dom.js";
import { startMemoryGame } from "./games/memory/game.js";

//! # ✅CONTROLA LA NAVEGACIÓN ENTRE JUEGOS

const root = document.getElementById("app");

const routes = {
  home: showHome,
  tictactoe: () => {
    renderTicTacToe();
    initializeGame();
  },
  snake: () => {
    createSnakeGameElements();
  },
  memory: () => {
    renderBoardGame();
    startMemoryGame();
  },
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
