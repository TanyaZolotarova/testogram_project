export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomEl(arr) {
  return arr[getRandomNumber(0, arr.length - 1)]
}
