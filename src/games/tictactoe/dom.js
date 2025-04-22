import { createTitle } from "../../components/title";
import { createButton } from "../../components/button";
import { navigateTo } from "../../router";
import { resetStorageScores } from "./storage";

export const renderTicTacToe = () => {
  const root = document.getElementById("app");
  const container = document.createElement("main");
  container.classList.add("tictactoe-view");

  // Elementos UI (title, button, etc.)
  const title = createTitle("Tres en raya", 1, "title-tictactoe");
  const backButton = createButton(
    "← Volver a Home",
    () => navigateTo("home"),
    "btn-back"
  );

  // Score Display
  const scoreDisplay = document.createElement("div");
  scoreDisplay.className = "score-display";

  const scoreX = document.createElement("div");
  scoreX.className = "score-item";
  scoreX.innerHTML = `<span class="player x">X</span>: <span id="score-x">0</span>`;

  const scoreO = document.createElement("div");
  scoreO.className = "score-item";
  scoreO.innerHTML = `<span class="player o">O</span>: <span id="score-o">0</span>`;

  scoreDisplay.append(scoreX, scoreO);

  // Botón reinicio de puntuación
  const resetScoresBtn = createButton(
    "Reiniciar Puntuación",
    () => {
      scores = resetStorageScores();
      updateScoreUI(scores);
      clearBoardUI();
    },
    "reset-button" // ← Esta clase es la que game.js usa para seleccionar este botón
  );

  // Botón reinicio solo del juego (no de puntuaciones)
  const resetGameBtn = createButton(
    "Reiniciar Juego",
    null,
    "reset-game-button"
  );

  // Game Status
  const gameStatus = document.createElement("div");
  gameStatus.className = "game-status";
  gameStatus.textContent = "Turno de X";

  // Board
  const board = document.createElement("section");
  board.className = "board";
  board.setAttribute("aria-label", "Tablero de juego Tres en Raya");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
  }

  container.append(
    backButton,
    title,
    scoreDisplay,
    resetScoresBtn,
    gameStatus,
    board,
    resetGameBtn
  );

  root.innerHTML = "";
  root.appendChild(container);
};

// Funciones de acceso al DOM
export const getGameStatus = () => document.querySelector(".game-status");
export const getCells = () => document.querySelectorAll(".cell");
export const getResetButton = () =>
  document.querySelector(".reset-game-button");

export const updateCellUI = (index, currentPlayer, gameState) => {
  const cell = document.querySelector(`[data-index="${index}"]`);
  if (cell) {
    cell.textContent = gameState[index];
    cell.classList.add(`player-${currentPlayer.toLowerCase()}`);
  }
};

export const updateStatusUI = (currentPlayer) => {
  const status = getGameStatus();
  status.textContent = `Turno de: ${currentPlayer}`;
};

export const showWinner = (winner) => {
  const status = getGameStatus();
  status.textContent = `¡${winner} ha ganado! 🎉`;
};

export const showDraw = () => {
  const status = getGameStatus();
  status.textContent = "¡Empate!";
};

export const clearBoardUI = () => {
  getCells().forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-x", "player-o");
  });
};

export const updateScoreUI = (scores) => {
  document.getElementById("score-x").textContent = scores.X;
  document.getElementById("score-o").textContent = scores.O;
};
