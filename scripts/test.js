// ...existing code...
const startElement = document.querySelector('.start-button');
const restartElement = document.querySelector('.restart-button');

let count = 0;
let digitsCache = null; // cache loaded digits so fetch runs once

// Start Game
startElement.addEventListener('click', () => {
  init();
});

restartElement.addEventListener('click', () => {
  count = 0;
  init();
});

async function init() {
  const counterElement = document.querySelector('.counter');
  const inputElement = document.querySelector('.input-box');
  const headerElement = document.querySelector('.header-text');
  const gameoverImageElement = document.querySelector('.gameover-image');

  startElement.classList.add('start-button-hidden');
  counterElement.classList.remove('counter-hidden');
  inputElement.classList.remove('input-box-hidden');
  headerElement.classList.add('header-text-started');
  headerElement.classList.remove('header-text-gameover');
  headerElement.innerHTML = 'Go!';
  gameoverImageElement.classList.add('gameover-image-hidden');
  restartElement.classList.add('restart-button-hidden');
  inputElement.value = '';
  inputElement.disabled = false;
  counterElement.innerHTML = count;

  if (!digitsCache) digitsCache = await loadEDigits();
  const digits = digitsCache;
  const inputDigits = [];

  // replace any previous handler instead of adding another listener
  inputElement.onkeydown = (event) => {
    const key = event.key;

    // prevent Backspace (and Delete) from removing input
    if (key === 'Backspace' || key === 'Delete') {
      event.preventDefault();
      return;
    }

    // ignore non-printable keys (Shift, Arrow keys, Ctrl, Alt, etc.)
    if (key.length !== 1) return;

    if (checkDigit(key, digits, inputDigits)) addCounter(key);
    else gameOver();
  };

  // focus the input so typing starts immediately
  inputElement.focus();

  function addCounter(key) {
    if (key !== '.') count++;
    counterElement.innerHTML = count;
  }

  function gameOver() {
    counterElement.classList.add('counter-hidden');
    gameoverImageElement.classList.remove('gameover-image-hidden');
    headerElement.innerHTML = 'Game Over';
    headerElement.classList.remove('header-text-started');
    headerElement.classList.add('header-text-gameover');
    inputElement.disabled = true;
    restartElement.classList.remove('restart-button-hidden');
  }

  function checkDigit(digit, digitsArr, inputArr) {
    inputArr.push(digit);
    const currentIndex = inputArr.length - 1; // last pushed index
    return inputArr[currentIndex] === digitsArr[currentIndex];
  }
}

async function loadEDigits() {
  // Fetch the file
  const response = await fetch('assets/e.txt');
  const text = await response.text();

  // Split into an array of individual characters
  const eArray = text.split('');

  return eArray;
}
