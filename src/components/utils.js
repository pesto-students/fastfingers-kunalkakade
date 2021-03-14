import data from '../data/dictionary.json';

const easyWords = [];
const mediumWords = [];
const hardWords = [];

for (let word of data) {
  if (word.length <= 4) {
    easyWords.push(word);
  } else if (word.length <= 8) {
    mediumWords.push(word);
  } else {
    hardWords.push(word);
  }
}


export const words = { easy: easyWords, medium: mediumWords, hard: hardWords };

export const LEVEL = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
}

export function renderTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}