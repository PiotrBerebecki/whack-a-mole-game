console.clear();

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('button');
let lastHole;
let isTimeUp = false;
let score = 0;

startButton.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', success));


function startGame() {
  score = 0;
  scoreBoard.textContent = score;
  isTimeUp = false;
  showHideMole();

  setTimeout(function() {
    isTimeUp = true;
  }, 10000);
}


function showHideMole() {
  const time = randomNumber(300, 1000);
  const hole = randomHole(holes);

  hole.classList.add('up');

  setTimeout(function() {
    hole.classList.remove('up');
    if (!isTimeUp) {
      showHideMole();
    }
  }, time);
}


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function randomHole(holes) {
  const idx = randomNumber(0, holes.length - 1);
  const hole = holes[idx];

  if (hole === lastHole) {
    console.log('Same hole as last time, trying again...');
    return randomHole(holes);
  }

  lastHole = holes[idx];
  return hole;
}


function success(e) {
  if (!e.isTrusted) { return; } // fake click

  score++;
  scoreBoard.textContent = score;

  this.classList.remove('up');
}
