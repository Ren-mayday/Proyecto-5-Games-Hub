const HIGH_SCORE_KEY = "snake_high_score";

export const getHighScore = () => {
  return localStorage.getItem(HIGH_SCORE_KEY) || 0;
};

export const updateHighScore = (score) => {
  localStorage.setItem(HIGH_SCORE_KEY, score);
};
