const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const lives = document.querySelector('#lives');
const playAgainButton = document.querySelector('#play-again');

let result = 0;
let currentTime = 60;
let remainingLives = 3;
let timerId = null;
let countDownTimerId = null;
let hitPosition = null;

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    } else {
      remainingLives--;
      lives.textContent = remainingLives;
    }

    if (remainingLives === 0) {
      endGame();
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0 || remainingLives === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    endGame();
  }
}

function endGame() {
  alert('GAME OVER! Your final score is ' + result);
  playAgainButton.style.display = 'inline-block';
}

function startGame() {
  result = 0;
  remainingLives = 100;
  currentTime = 60;

  score.textContent = result;
  lives.textContent = remainingLives;
  timeLeft.textContent = currentTime;
  
  playAgainButton.style.display = 'none';
  clearInterval(countDownTimerId);
  clearInterval(timerId);

  moveMole();
  countDownTimerId = setInterval(countDown, 1000);
}

playAgainButton.addEventListener('click', startGame);

// Start the game for the first time
startGame();
