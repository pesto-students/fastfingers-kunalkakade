import defaultData from '../data/dictionary.json';
import animalData from '../data/animals.json';
import cityData from '../data/city.json';
import namesData from '../data/Names.json';

const easyWords = [];
const mediumWords = [];
const hardWords = [];

export function getWord(category) {
  let data;
  switch (category) {
    case "PersonName":
      data = namesData;
      break;
    case "Animals":
      data = animalData;
      break;
    case "Cities":
      data = cityData;
      break;
    default:
      data = defaultData;
  }
  for (let word of data) {
    if (word.length <= 4) {
      easyWords.push(word);
    } else if (word.length <= 8) {
      mediumWords.push(word);
    } else {
      hardWords.push(word);
    }
  }
  const words = {easy: easyWords, medium: mediumWords, hard: hardWords};
  return words
}

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


export const messages = ["let see if you can do this ...", "This one is bit tricky...", "all the best...", "I didnt think you will finish this one...", "The next one is going to kill you"];