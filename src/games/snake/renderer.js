import { gameState } from "./gameState";

export const drawGame = () => {
  const { ctx, CELL_SIZE, snake, food } = gameState;

  // Limpiar canvas
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, gameState.canvas.width, gameState.canvas.height);

  // Dibujar serpiente
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#2c3e50" : "#3498db"; // Cabeza más oscura
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Borde para mejor visibilidad
    ctx.strokeStyle = "#ecf0f1";
    ctx.strokeRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });

  // Dibujar comida
  ctx.fillStyle = "#e74c3c";
  ctx.beginPath();
  ctx.arc(
    food.x * CELL_SIZE + CELL_SIZE / 2,
    food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
};
