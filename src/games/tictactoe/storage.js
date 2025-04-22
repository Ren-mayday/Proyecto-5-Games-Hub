import { initialScores } from "./constants.js";

const STORAGE_KEY = "ticTacToeScores";

// Función para recibir puntuaciones
export const saveScoresToStorage = (currentScores) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentScores));
};

// Función para carga de puntuaciones
export const loadScoresFromStorage = () => {
  try {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    return savedScores ? JSON.parse(savedScores) : { ...initialScores };
  } catch (error) {
    console.error("Error loading scores:", error);
    return { ...initialScores };
  }
};

// Función para reinicio completo
export const resetStorageScores = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialScores));
  return { ...initialScores };
};
