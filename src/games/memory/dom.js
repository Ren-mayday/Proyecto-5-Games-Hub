import { createTitle } from "../../components/title";
import { createButton } from "../../components/button";
import { createModal } from "../../components/modal";
import { displayHighScores } from "./storage";
import { startMemoryGame } from "./game";

export const renderBoardGame = () => {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const header = document.createElement("header");
  const heading = createTitle("Memory Game", 1, "memory-title");

  const controlsDiv = document.createElement("div");
  controlsDiv.className = "game-controls";

  const scoreContainer = document.createElement("div");
  scoreContainer.className = "score";
  scoreContainer.innerHTML = 'Pares: <span id="score">0</span>';

  const restartBtn = createButton(
    "Reiniciar",
    () => {
      window.location.reload();
    },
    "restart"
  );

  const timeContainer = document.createElement("div");
  timeContainer.className = "timer";
  timeContainer.innerHTML = 'Tiempo: <time id="time">00:00</time>';

  controlsDiv.append(scoreContainer, restartBtn, timeContainer);
  header.append(heading, controlsDiv);

  const main = document.createElement("main");
  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  gameContainer.className = "memory-game";

  main.appendChild(gameContainer);
  app.append(header, main);

  return gameContainer;
};

export const renderCards = (cards) => {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-front";
    front.textContent = "❓";

    const back = document.createElement("div");
    back.className = "card-back";
    back.textContent = emoji;

    inner.append(front, back);
    card.append(inner);
    gameContainer.appendChild(card);
  });
};

export const updateScore = (pairsFound) => {
  const scoreElement = document.getElementById("score");
  if (scoreElement) scoreElement.textContent = pairsFound;
};

export const showVictoryMessage = (finalTime) => {
  const modal = createModal({
    title: "🏆 ¡Ganaste!",
    content: `
      <p>Tiempo: ${formatTime(finalTime)}</p>
      ${displayHighScores()}
    `,
    actionButtonText: "Jugar otra vez",
    onAction: () => startMemoryGame(),
  });

  modal.show();
};

const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};
