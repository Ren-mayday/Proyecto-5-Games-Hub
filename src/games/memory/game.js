import { EMOJIS } from "./constants";
import {
  renderBoardGame,
  renderCards,
  updateScore,
  showVictoryMessage,
} from "./dom";
import { startTimer, stopTimer, resetTimer } from "./timer";
import { saveGameResult } from "./storage";

let state = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  matchedCards: [],
  isProcessing: false,
};

export const startMemoryGame = () => {
  resetTimer();
  const cards = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

  renderBoardGame();

  state = {
    cards,
    flippedCards: [],
    matchedPairs: 0,
    matchedCards: [],
    isProcessing: false,
  };

  renderCards(state.cards);
  const cardsDOM = document.querySelectorAll(".card");
  cardsDOM.forEach((card) => {
    card.addEventListener("click", () => {
      const index = parseInt(card.dataset.index);
      flipCard(index);
    });
  });

  return state;
};

export const gameState = () => state;

export const flipCard = (cardIndex) => {
  if (
    state.isProcessing ||
    state.flippedCards.length >= 2 ||
    state.flippedCards.includes(cardIndex) ||
    state.matchedCards.includes(cardIndex)
  )
    return;

  if (state.flippedCards.length === 0) {
    startTimer();
  }

  const cardElement = document.querySelector(`[data-index="${cardIndex}"]`);
  cardElement.classList.add("flipped");

  state.flippedCards.push(cardIndex);

  if (state.flippedCards.length === 2) {
    state.isProcessing = true;
    setTimeout(checkForMatch, 800);
  }
};

const checkForMatch = () => {
  const [firstIndex, secondIndex] = state.flippedCards;
  const firstCard = state.cards[firstIndex];
  const secondCard = state.cards[secondIndex];
  const isMatch = firstCard === secondCard;

  if (isMatch) {
    state.matchedPairs++;
    state.matchedCards.push(firstIndex, secondIndex);
    updateScore(state.matchedPairs);

    if (state.matchedPairs === EMOJIS.length) {
      const finalTime = stopTimer();
      saveGameResult(finalTime, EMOJIS.length);
      showVictoryMessage(finalTime);
    }
  } else {
    const cards = document.querySelectorAll(".card");
    setTimeout(() => {
      cards[firstIndex].classList.remove("flipped");
      cards[secondIndex].classList.remove("flipped");
    }, 800);
  }

  state.flippedCards = [];
  state.isProcessing = false;
};
