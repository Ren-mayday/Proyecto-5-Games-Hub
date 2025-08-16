const STORAGE_KEY = "memoryGameScores";

export const saveGameResult = (time, pairs) => {
  const results = getGameResults();
  results.push({
    date: new Date().toISOString(),
    time: time,
    pairs: pairs,
    formattedTime: formatTime(time),
  });

  // Ordenar por tiempo (mejores puntuaciones primero)
  results.sort((a, b) => a.time - b.time);

  // Mantener solo las 10 mejores puntuaciones
  const topResults = results.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topResults));
};

export const getGameResults = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearGameResults = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

export const displayHighScores = () => {
  const results = getGameResults();
  if (results.length === 0) return "<p>No hay resultados guardados</p>";

  return `
    <div class="high-scores">
      <h3>Top 5 Mejores Tiempos</h3>
      <ol>
        ${results
          .slice(0, 5)
          .map(
            (result) => `
          <li>
            ${result.pairs} pares - ${result.formattedTime}
            <small>${new Date(result.date).toLocaleDateString()}</small>
          </li>
        `
          )
          .join("")}
      </ol>
    </div>
  `;
};
