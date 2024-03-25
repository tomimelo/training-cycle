export function getRandomNumber(max = 0) {
  return Math.round(Math.random() * max)
}

export function pickRandom(values) {
  return values[getRandomNumber(values.length - 1)]
}