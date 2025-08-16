let startTime = null;
let timerInterval = null;
let elapsedTime = 0;
let isRunning = false;

export const startTimer = () => {
  if (isRunning) return;

  startTime = Date.now() - elapsedTime;
  isRunning = true;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateTimerDisplay();
  }, 1000);
};

export const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning = false;
  return elapsedTime;
};

export const resetTimer = () => {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  isRunning = false;
  updateTimerDisplay(true);
};

export const getFormattedTime = () => {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const updateTimerDisplay = (reset = false) => {
  const timeElement = document.getElementById("time");
  if (timeElement) {
    timeElement.textContent = reset ? "00:00" : getFormattedTime();
  }
};
