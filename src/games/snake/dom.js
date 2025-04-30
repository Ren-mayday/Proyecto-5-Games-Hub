import { createTitle } from "../../components/title";
import { createButton } from "../../components/button";
import { navigateTo } from "../../router";
import { initGame } from "./game.js";
import { toggleGame } from "./game.js";
import { createModal } from "../../components/modal";
import { handleDirection } from "./inputHandler";

export const createSnakeGameElements = () => {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const container = document.createElement("main");
  container.id = "game-container";
  container.classList.add("game-container");

  // Modal de game over (pero no mostarlo de momento)
  const gameOverModal = createModal({
    id: "game-over-modal",
    title: "Game Over!",
    showCloseButton: false,
    actionButtonText: "Jugar de nuevo",
  });

  // Elementos UI reutilizables (título, botón)
  const title = createTitle("Snake", 1, "title-snake");
  const backButton = createButton(
    "← Volver a Home",
    () => navigateTo("home"),
    "btn-back"
  );

  const canvas = document.createElement("canvas");
  canvas.id = "game-canvas";

  const startBtn = createButton("Comenzar", () => toggleGame(), "start-btn");

  const scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score-snake-display";
  scoreDisplay.innerHTML = `
  <p class="score-text">
  Puntuación: <span id="score-snake">0</span>
  </p>
  <p class="score-text">
  Mejor puntuación: <span id="high-score-snake">0</span>
  </p>`;

  //controles para pantalla táctil
  const controls = document.createElement("div");
  controls.id = "touch-controls";

  const dPad = document.createElement("div");
  dPad.classList.add("d-pad");

  const upBtn = createButton(
    "⬆️",
    () => handleDirection("up"),
    "control-btn up"
  );
  const leftBtn = createButton(
    "⬅️",
    () => handleDirection("left"),
    "control-btn left"
  );
  const downBtn = createButton(
    "⬇️",
    () => handleDirection("down"),
    "control-btn down"
  );
  const rightBtn = createButton(
    "➡️",
    () => handleDirection("right"),
    "control-btn right"
  );

  dPad.append(upBtn, leftBtn, downBtn, rightBtn);
  controls.appendChild(dPad);

  container.append(backButton, title, scoreDisplay, canvas, startBtn, controls);
  root.appendChild(container);
  root.appendChild(gameOverModal);

  initGame(canvas, startBtn, gameOverModal);
};
