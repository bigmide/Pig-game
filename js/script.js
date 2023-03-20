'use strict';

// Select Elements
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
const player1MainScore = document.getElementById('score--0');
const player2MainScore = document.getElementById('score--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//Set initial conditions
diceImg.classList.add('hidden');
player1MainScore.textContent = 0;
player2MainScore.textContent = 0;

let currPlayer, currentScore, score, playing;

const init = function () {
  playing = true;
  currentScore = 0;
  currPlayer = 0;
  score = [0, 0];

  player1MainScore.textContent = 0;
  player2MainScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;

  diceImg.classList.add('hidden');

  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currPlayer}`).textContent = currentScore;
  currPlayer = currPlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  if (playing) {
    diceImg.classList.remove('hidden');
    let diceGen = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `./img/dice-${diceGen}.png`;

    if (diceGen !== 1) {
      currentScore += diceGen;
      document.getElementById(`current--${currPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    score[currPlayer] += currentScore;

    document.getElementById(`score--${currPlayer}`).textContent =
      score[currPlayer];

    if (score[currPlayer] >= 100) {
      document
        .querySelector(`.player--${currPlayer}`)
        .classList.add('player--winner');
      document.querySelector('.dice').classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
