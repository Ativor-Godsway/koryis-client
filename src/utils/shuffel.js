// src/utils/shuffle.js

export function shuffleArray(array) {
  const copy = [...array]; // so we don't mutate the original
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
