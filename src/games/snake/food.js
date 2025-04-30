import { gameState } from "./gameState";

//! #GENERA Y MUEVE LA COMIDA

const isFoodOnSnake = (food) => {
  return gameState.snake.some(
    (segment) => segment.x === food.x && segment.y === food.y
  );
};

export const generateFood = () => {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * gameState.GRID_SIZE),
      y: Math.floor(Math.random() * gameState.GRID_SIZE),
    };
  } while (isFoodOnSnake(newFood));

  gameState.food = newFood;
};

export const checkFood = () => {
  const head = gameState.snake[0];
  if (head.x === gameState.food.x && head.y === gameState.food.y) {
    gameState.foodEaten = true;
    gameState.score += 10;
    generateFood();
    return true;
  }
  return false;
};
