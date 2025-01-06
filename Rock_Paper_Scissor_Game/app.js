let score = 0;
let life = 5;

function playGame(playerChoice) {
    const userChoiceElement = document.getElementById('user-choice');
    const computerChoiceElement = document.getElementById('computer-choice');
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const lifeElement = document.getElementById('life');
    const gameOverElement = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log(computerChoice);

    userChoiceElement.textContent = playerChoice;
    computerChoiceElement.textContent = computerChoice;

    if (playerChoice === computerChoice) {
        resultElement.textContent = `It's a tie! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultElement.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
        score++;
    } else {
        resultElement.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
        life--;
    }

    scoreElement.textContent = score;
    lifeElement.textContent = life;

    if (life <= 0) {
        gameOverElement.style.display = 'block';
        finalScoreElement.textContent = score;
        disableButtons();
    }
}

function disableButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => button.disabled = true);
}

document.getElementById('Rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
