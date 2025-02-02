'use strict';

//***********Selecting elements***********
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//***********Initial conditons***********
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//***********Functions***********
const diceRoll = function () {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    // Display dice and show the rolled number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;

    if (randomNumber === 1) {
      // Reset current score for active player
      resetCurrentScore();

      // Switch players
      switchPlayer();
    } else {
      // Add random number to current score
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
};

const holdButton = function () {
  if (playing) {
    // Adding current score to the total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switching the player and reset the current score
      resetCurrentScore();
      switchPlayer();
    }
  }
};

const newButton = function () {
  init();
};

const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const resetCurrentScore = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

//***********Buttons***********
// Rolling the dice button
btnRoll.addEventListener('click', diceRoll);

// Hold button
btnHold.addEventListener('click', holdButton);

// New game button
btnNew.addEventListener('click', newButton);
