import { createButton } from "../components/button.js";
import { createTitle } from "../components/title.js";
import { navigateTo } from "../router.js";

//!# 🏠PÁGINA PRINCIPAL

export const showHome = () => {
  const root = document.getElementById("app");

  const container = document.createElement("main");
  container.id = "home";
  container.classList.add("home");

  // --- Home wrapper ---
  const wrapper = document.createElement("div");
  wrapper.classList.add("home-wrapper");

  // Crear header
  const header = document.createElement("header");
  header.id = "home-header";

  const title = createTitle("Bienvenido a Rencel's Game Hub", 1, "main-title-home");
  const subtitle = createTitle("Elige un juego para comenzar", 2, "subtitle-home");

  header.append(title, subtitle);

  // Crear sección de juegos
  const gameSection = document.createElement("section");
  gameSection.id = "game-section";
  gameSection.classList.add("games");
  gameSection.setAttribute("aria-label", "Selección de juegos");

  const hiddenTitle = createTitle("Selección de juegos disponibles", 3, "visually-hidden");
  hiddenTitle.id = "games-title";

  const gameList = document.createElement("ul");
  gameList.className = "game-list";

  const games = [
    { text: "Tres en raya", route: "tictactoe", className: "btn-tictactoe" },
    { text: "Snake", route: "snake", className: "btn-snake" },
    { text: "Memory Game", route: "memory", className: "btn-memory" },
  ];

  games.forEach((game) => {
    const li = document.createElement("li");
    const button = createButton(game.text, () => navigateTo(game.route), game.className);
    li.appendChild(button);
    gameList.appendChild(li);
  });

  gameSection.append(hiddenTitle, gameList);

  // Crear footer
  const footer = document.createElement("footer");
  footer.id = "home-footer";
  footer.innerHTML = `
    <p>
      Coded by Rencel Dayrit Cube ©️ 
      <a href="https://github.com/Ren-mayday/" target="_blank" rel="noopener noreferrer">
        Github
      </a>
    </p>
  `;

  // --- Añadir todo dentro del wrapper ---
  wrapper.append(header, gameSection, footer);

  // Añadir wrapper al contenedor principal
  container.appendChild(wrapper);

  // Renderizar en el root
  root.appendChild(container);
};
