const startElement = document.querySelector('.start-button');
const counterElement = document.querySelector('.counter');
const inputElement = document.querySelector('.input-box');
const headerElement = document.querySelector('.header-text');

// Start Game
startElement.addEventListener('click', () => {
  startElement.classList.add('button-started');
  counterElement.classList.add('counter-started');
  inputElement.classList.add('input-box-started');
  headerElement.classList.add('header-text-started');
  headerElement.innerHTML = 'Go!';

  init();
});

async function init() {
  const digits = await loadEDigits();
  const inputDigits = [];

  inputElement.addEventListener('keydown', (event) => {
    const key = event.key;
    // ignore non-printable keys (Shift, Backspace, Enter, Arrow keys, etc.)
    if (key.length !== 1) return;

    if (checkDigit(key, digits, inputDigits)) addCounter();
    else gameOver();
  });

  function addCounter() {
    const count = inputDigits.length;
    counterElement.innerHTML = count;
  }

  function gameOver() {
    counterElement.innerHTML = '-1';
  }

  function checkDigit(digit, digitsArr, inputArr) {
    inputArr.push(digit);
    const currentIndex = inputArr.length - 1; // last pushed index
    return inputArr[currentIndex] === digitsArr[currentIndex];
  }
}

async function loadEDigits() {
  // Fetch the file (must be hosted in your project folder)
  const response = await fetch('assets/e.txt'); // adjust path if needed
  const text = await response.text();

  // Clean: remove unwanted characters but keep digits and the dot
  const clean = text.replace(/[^\d.]/g, '');

  // Split into an array of individual characters
  const eArray = clean.split('');

  return eArray;
}
