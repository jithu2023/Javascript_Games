
function playGame(playerChoice) {
    const userChoiceElement = document.getElementById('user-choice');
    const computerChoiceElement = document.getElementById('computer-choice');
    const resultElement = document.getElementById('result');

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log(computerChoice)

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
    } else {
        resultElement.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }
}

document.getElementById('Rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
