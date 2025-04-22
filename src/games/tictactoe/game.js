import {
  saveScoresToStorage,
  loadScoresFromStorage,
  resetStorageScores,
} from "./storage.js";
import {
  updateStatusUI,
  showWinner,
  showDraw,
  clearBoardUI,
  updateScoreUI,
  updateCellUI,
  getCells,
  getResetButton,
} from "./dom.js";
import { winningConditions, initialScores } from "./constants.js";

//! #LÓGICA DEL JUEGO TRES EN RAYA

// Estado del juego
let currentPlayer = "X"; //Indica qué jugador tiene el turno, por defecto se empieza por el jugador X
let gameState = ["", "", "", "", "", "", "", "", ""]; // Array que representa el tablero con 9 posiciones
let gameActive = true; // Juego en curso = true, juegoo terminado = false
let scores = loadScoresFromStorage();

// Función principal al hacer click en una celda
function handleCellClick(index) {
  // Si la juego no está activo o la celda ya está ocupada, no hace nada (return)
  if (!gameActive || gameState[index] !== "") return;

  // Marca la celda (en la posición index) con el símbolo del jugador actual (X u O).
  gameState[index] = currentPlayer;
  updateCellUI(index, currentPlayer, gameState);

  // Verifica si hay un ganador
  checkWinner();
}

// Lógica para verificar el ganador
function checkWinner() {
  // Revisa todas las combinaciones ganadoras
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      scores[currentPlayer]++; // Incrementa el marcador
      saveScoresToStorage(scores); // ← Guarda en localStorage
      showWinner(currentPlayer); // Muestra mensaje de ganador
      updateScoreUI(scores); // Actualiza los mensajes en pantalla
      return;
    }
  }

  // Verifica empate (si no quedan celdas vacías)
  if (!gameState.includes("")) {
    gameActive = false;
    showDraw();
  } else {
    // Cambia de jugador
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusUI(currentPlayer);
  }
}

// Reinicia el juego (pero mantiene los puntajes)
function resetGame() {
  gameActive = true; // 1. Reactva el juego
  currentPlayer = "X"; // 2. Vuelve a empezar con el jugador X
  gameState = ["", "", "", "", "", "", "", "", ""]; // 3. Limpia el tablero
  clearBoardUI(); // 4. Boora las X/O de la pantalla
  updateStatusUI(currentPlayer); // 5. Actualiza el mensaje de turno
}

export const initializeGame = () => {
  // 1. Cargar puntuaciones desde localStorage
  scores = loadScoresFromStorage();

  // 2. Actualizar la interfaz con las puntuaciones cargadas
  updateScoreUI(scores);

  // 3. Configurar event listeners para las celdas del tablero
  getCells().forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });

  // 4. Configurar evento para el botón de reinicio de tablero
  getResetButton().addEventListener("click", resetGame);

  // 5. Configurar evento para el botón de reinicio de puntuaciones
  document.querySelector(".reset-button").addEventListener("click", () => {
    scores = resetStorageScores(); // Reinicia storage y devuelve nuevos scores
    updateScoreUI(scores); // Actualiza la UI
    resetGame(); // ← También reinicia tablero
  });

  // 6. Actualizar la UI con el estado inicial del juego
  updateStatusUI(currentPlayer);
};
