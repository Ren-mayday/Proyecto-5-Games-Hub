import { gameState } from "./gameState";
import { moveSnake } from "./snakeMovement";
import { checkCollisions } from "./collision";
import { checkFood, generateFood } from "./food";
import { drawGame } from "./renderer";
import { handleKeyPress } from "./inputHandler";
import { updateHighScore, getHighScore } from "./storage";
//! #PUNTO DE ENTRADA DEL JUEGO (INICIA TODO)

// Inicializar juego
export const initGame = (canvas, startBtn, gameOverModal) => {
  gameState.canvas = canvas;
  gameState.ctx = canvas.getContext("2d");
  gameState.startBtn = startBtn;
  gameState.modal = gameOverModal;

  // Eliminar listeners anteriores para evitar duplicados
  const replayButton = gameOverModal.querySelector(".modal-action-btn");
  replayButton.replaceWith(replayButton.cloneNode(true)); // Clonar el botón para eliminar listeners

  gameOverModal
    .querySelector(".modal-action-btn")
    .addEventListener("click", () => {
      resetGame(), gameOverModal.hide();
    });

  setupCanvas();
  window.addEventListener("resize", setupCanvas);

  // Mostrar puntuación
  displayHighScore();

  // Eventos de teclado
  document.addEventListener("keydown", handleKeyPress);

  drawGame();
};

const setupCanvas = () => {
  // Calcula el tamaño responsive
  const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.5);
  gameState.canvas.style.width = `${size}px`;
  gameState.canvas.style.height = `${size}px`;

  // Tamaño interno (lógica del juego)
  gameState.CELL_SIZE = size / gameState.GRID_SIZE;
  gameState.canvas.width = gameState.GRID_SIZE * gameState.CELL_SIZE;
  gameState.canvas.height = gameState.GRID_SIZE * gameState.CELL_SIZE;
};

const displayHighScore = () => {
  const highScore = getHighScore();
  const highScoreElement = document.getElementById("high-score-snake");
  if (highScoreElement) {
    highScoreElement.textContent = highScore;
  }
};

export const toggleGame = () => {
  if (gameState.isRunning) {
    pauseGame();
  } else {
    if (!gameState.snake || gameState.snake.length === 0) {
      resetGame();
    }
    startGame();
  }
  updateButtonText();
};

export const startGame = () => {
  if (!gameState.isRunning) {
    gameState.isRunning = true;
    gameState.gameLoopId = setInterval(gameLoop, gameState.speed);
  }
  updateButtonText();
};

const pauseGame = () => {
  clearInterval(gameState.gameLoopId);
  gameState.isRunning = false;
};

const gameLoop = () => {
  moveSnake();
  checkCollisions();
  const ateFood = checkFood();
  drawGame();
  updateScore();

  // Acelerar cada 50 puntos (solo si se comió comida)
  if (ateFood && gameState.score % 50 === 0) {
    gameState.speed = Math.max(100, gameState.speed - 20);
    if (gameState.isRunning) {
      clearInterval(gameState.gameLoopId);
      gameState.gameLoopId = setInterval(gameLoop, gameState.speed);
    }
  }
};

const resetGame = () => {
  if (gameState.gameLoopId) {
    clearInterval(gameState.gameLoopId);
    gameState.gameLoopId = null;
  }

  gameState.snake = [{ x: 10, y: 10 }];
  gameState.direction = "RIGHT";
  gameState.nextDirection = "RIGHT";
  gameState.score = 0;
  gameState.speed = 250;
  gameState.isRunning = false;
  gameState.foodEaten = false;

  generateFood();

  drawGame();
  updateScore();
  updateButtonText();

  const startBtn = document.getElementById("start-btn") || gameState.startBtn;
  if (startBtn) {
    startBtn.textContent = "Comenzar";
  }
};

const updateScore = () => {
  const scoreElement = document.getElementById("score-snake");
  if (scoreElement) {
    scoreElement.textContent = gameState.score;
  }
};

export const gameOver = () => {
  pauseGame();

  // Actualizar mejor puntuación
  const currentHighScore = getHighScore();
  if (gameState.score > currentHighScore) {
    updateHighScore(gameState.score);
    displayHighScore();
  }

  // Actualizar el contenido del modal
  const modalBody = gameState.modal.querySelector(".modal-body");
  modalBody.innerHTML = `
  <p>Tu puntuación: ${gameState.score}</p>
  <p>Mejor puntuación: ${Math.max(gameState.score, currentHighScore)}</p>
  `;

  gameState.modal.show();
};

// Función para actualizar el texto del botón
const updateButtonText = () => {
  if (!gameState.startBtn) return;

  if (!gameState.isRunning) {
    gameState.startBtn.textContent =
      gameState.snake.length > 1 ? "Continuar" : "Comenzar";
  } else {
    gameState.startBtn.textContent = "Pausar";
  }
};
