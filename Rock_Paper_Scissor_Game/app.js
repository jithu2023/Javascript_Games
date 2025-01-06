let score = 0;
let lives = 5;

const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const resultElement = document.getElementById('result');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');

function playGame(playerChoice) {
    if (lives <= 0) return; // If lives are over, do nothing

    const userChoiceElement = document.getElementById('user-choice');
    const computerChoiceElement = document.getElementById('computer-choice');

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    userChoiceElement.textContent = playerChoice;
    computerChoiceElement.textContent = computerChoice;

    let resultMessage = '';
    
    if (playerChoice === computerChoice) {
        resultMessage = `It's a tie! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        score++;
        resultMessage = `You win! ${playerChoice} beats ${computerChoice}.`;
    } else {
        lives--;
        resultMessage = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }

    // Update score and lives
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    resultElement.textContent = resultMessage;

    // Check if game is over
    if (lives <= 0) {
        gameOverElement.style.display = 'block';
        finalScoreElement.textContent = score;
    }
}

document.getElementById('Rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

playAgainButton.addEventListener('click', () => {
    score = 0;
    lives = 5;
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    resultElement.textContent = '';
    gameOverElement.style.display = 'none';
    document.getElementById('user-choice').textContent = '';
    document.getElementById('computer-choice').textContent = '';
});
