import { gameState } from "./gameState";
//! #MUEVE LA SERPIENTE

export const moveSnake = () => {
  gameState.direction = gameState.nextDirection;
  const head = { ...gameState.snake[0] };

  // Mover cabeza según dirección
  switch (gameState.direction) {
    case "UP":
      head.y -= 1;
      break;
    case "DOWN":
      head.y += 1;
      break;
    case "LEFT":
      head.x -= 1;
      break;
    case "RIGHT":
      head.x += 1;
      break;
  }

  gameState.snake.unshift(head);

  // Verificar si comió
  if (!gameState.foodEaten) {
    gameState.snake.pop();
  } else {
    gameState.foodEaten = false;
  }
};
