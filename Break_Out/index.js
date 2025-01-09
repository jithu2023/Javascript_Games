const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const levelDisplay = document.querySelector('#level');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;
let level = 1;

// Block Class
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.topLeft = [xAxis, yAxis + blockHeight];
  }
}

// All Blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// Draw Blocks
function addBlocks() {
  blocks.forEach(block => {
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('block');
    blockDiv.style.left = block.bottomLeft[0] + 'px';
    blockDiv.style.bottom = block.bottomLeft[1] + 'px';
    grid.appendChild(blockDiv);
  });
}

// Add User Paddle
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);

// Add Ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);

// Draw User Paddle
function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

// Draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Move User Paddle
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener('keydown', moveUser);

// Move Ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, 30);

// Check for Collisions
function checkForCollisions() {
  // Check for Block Collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[i].classList.remove('block');
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      // Level Up
      if (score % 4 === 0) {
        level++;
        levelDisplay.innerHTML = level;
        increaseDifficulty();
      }

      if (blocks.length === 0) {
        scoreDisplay.innerHTML = 'You Win!';
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
      }
    }
  }

  // Check for Wall Hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0) {
    xDirection *= -1;
  }
  if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
    yDirection *= -1;
  }

  // Check for User Paddle Collision
  if (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
  ) {
    yDirection *= -1;
  }

  // Game Over
  if (ballCurrentPosition[1] <= 0) {
    gameOver();
  }
}

// Change Ball Direction
function changeDirection() {
  xDirection *= -1;
  yDirection *= -1;
}

// Increase Difficulty (faster ball speed)
function increaseDifficulty() {
  xDirection *= 1.2;
  yDirection *= 1.2;
}

// Game Over Function
function gameOver() {
  clearInterval(timerId);
  scoreDisplay.innerHTML = 'You lose!';
  levelDisplay.innerHTML = `Level: ${level}`;
  document.removeEventListener('keydown', moveUser);
  showPlayAgainButton();
}

// Display Play Again Button
function showPlayAgainButton() {
  const playAgainBtn = document.createElement('button');
  playAgainBtn.innerHTML = 'Play Again';
  playAgainBtn.classList.add('play-again-btn');
  document.body.appendChild(playAgainBtn);

  playAgainBtn.addEventListener('click', () => {
    window.location.reload();
  });

  const luckMessage = document.createElement('div');
  luckMessage.innerHTML = 'Better Luck Next Time!';
  document.body.appendChild(luckMessage);
}

// Initialize Game
addBlocks();
drawUser();
drawBall();
levelDisplay.innerHTML = level;
