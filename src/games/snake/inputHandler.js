import { gameState } from "./gameState";
import { DIRECTIONS } from "./constants";
//! #ESCUCHAR TECLAS O CONTROLES

export const handleKeyPress = (e) => {
  if (!gameState.isRunning) return;
  switch (e.key) {
    case "ArrowUp":
      if (gameState.direction !== DIRECTIONS.DOWN)
        gameState.nextDirection = DIRECTIONS.UP;
      break;
    case "ArrowDown":
      if (gameState.direction !== DIRECTIONS.UP)
        gameState.nextDirection = DIRECTIONS.DOWN;
      break;
    case "ArrowLeft":
      if (gameState.direction !== DIRECTIONS.RIGHT)
        gameState.nextDirection = DIRECTIONS.LEFT;
      break;
    case "ArrowRight":
      if (gameState.direction !== DIRECTIONS.LEFT)
        gameState.nextDirection = DIRECTIONS.RIGHT;
      break;
  }
};

export const handleDirection = (newDirection) => {
  if (!gameState.isRunning) return;

  const normalizedDirection = newDirection.toUpperCase();

  if (gameState.direction === "UP" && newDirection === "down") return;
  if (gameState.direction === "DOWN" && newDirection === "up") return;
  if (gameState.direction === "LEFT" && newDirection === "right") return;
  if (gameState.direction === "RIGHT" && newDirection === "left") return;

  gameState.nextDirection = normalizedDirection;
};
