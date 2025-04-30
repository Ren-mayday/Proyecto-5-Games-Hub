//! ESTADO CENTRAL DEL JUEGO (OBJ. gameState)

// Estado del juego (objeto que guarda toda la info.)
export const gameState = {
  snake: [{ x: 10, y: 10 }], // Posición de la cabeza de la serpiente (10, 10)
  food: { x: 5, y: 5 }, // Posición de la comida (5, 5)
  direction: "RIGHT",
  nextDirection: "RIGHT",
  score: 0,
  isRunning: false, // Juego activo
  gameLoopId: null, // ID del intervalo del bucle principal
  GRID_SIZE: 20, // Tamaño de la cuadrícula (20x20)
  CELL_SIZE: 0, // Tamaño de la celda se calcula dinámicamente
  canvas: null, // Canvas no asignado aún
  ctx: null, // Contexto no inicializado
  speed: 250, // 250ms
  startBtn: null,
  foodEaten: false,
  modal: null,
};
