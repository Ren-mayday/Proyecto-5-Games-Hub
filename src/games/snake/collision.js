import { gameState } from "./gameState";
import { gameOver } from "./game";
//! #COMPRUEBA COLISIONES (PAREDES Y LA SERPIENTE MISMA)

export const checkCollisions = () => {
  const head = gameState.snake[0];

  // Choque con paredes
  if (
    head.x < 0 ||
    head.x >= gameState.GRID_SIZE ||
    head.y < 0 ||
    head.y >= gameState.GRID_SIZE
  ) {
    gameOver();
    return;
  }

  // Choque consigo misma
  for (let i = 1; i < gameState.snake.length; i++) {
    if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) {
      gameOver();
      return;
    }
  }
};
