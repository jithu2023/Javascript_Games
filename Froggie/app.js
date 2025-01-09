const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const grid = document.querySelector('.grid');
const playAgainButton = document.querySelector('#play-again-button');

let currentIndex = 76; // Starting position for the frog
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 60;  // Set the initial timer to 60 seconds
let score = 0;  // Initialize score

function createGrid() {
    grid.innerHTML = ''; // Clear the grid before recreating
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
    }

    // Adding specific blocks
    const squares = document.querySelectorAll('.grid div');
    squares[4].classList.add('ending-block'); // Red ending block
    squares[76].classList.add('starting-block', 'frog'); // Starting position

    // Add obstacles
    for (let i = 9; i < 18; i++) squares[i].classList.add('log-left', `l${(i % 5) + 1}`);
    for (let i = 18; i < 27; i++) squares[i].classList.add('log-right', `l${(i % 5) + 1}`);
    for (let i = 45; i < 54; i++) squares[i].classList.add('car-left', `c${(i % 3) + 1}`);
    for (let i = 54; i < 63; i++) squares[i].classList.add('car-right', `c${(i % 3) + 1}`);
}

function moveFrog(e) {
    const squares = document.querySelectorAll('.grid div');
    squares[currentIndex].classList.remove('frog');

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex += 1;
            break;
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width;
            break;
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width;
            break;
    }
    squares[currentIndex].classList.add('frog');
}

function autoMoveElements() {
    if (currentTime <= 0) {
        lose(); // If time reaches 0 or below, trigger lose function
        return; // Stop further execution to avoid negative values
    }

    currentTime--;
    timeLeftDisplay.textContent = currentTime;

    const squares = document.querySelectorAll('.grid div');

    // Move logs and cars
    moveLogs(squares);
    moveCars(squares);
}

function moveLogs(squares) {
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');

    logsLeft.forEach(log => {
        moveElement(log, ['l1', 'l2', 'l3', 'l4', 'l5'], true);
    });
    logsRight.forEach(log => {
        moveElement(log, ['l1', 'l2', 'l3', 'l4', 'l5'], false);
    });
}

function moveCars(squares) {
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');

    carsLeft.forEach(car => {
        moveElement(car, ['c1', 'c2', 'c3'], true);
    });
    carsRight.forEach(car => {
        moveElement(car, ['c1', 'c2', 'c3'], false);
    });
}

function moveElement(element, classes, forward) {
    for (let i = 0; i < classes.length; i++) {
        if (element.classList.contains(classes[i])) {
            element.classList.remove(classes[i]);
            const nextClass = forward
                ? classes[(i + 1) % classes.length]
                : classes[(i - 1 + classes.length) % classes.length];
            element.classList.add(nextClass);
            break;
        }
    }
}

function checkOutcomes() {
    lose();
    win();
}

function lose() {
    const squares = document.querySelectorAll('.grid div');
    if (
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5')
    ) {
        resultDisplay.textContent = `You Lose! Score: ${score}`;
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup', moveFrog);
        playAgainButton.style.display = 'inline-block';  // Show "Play Again" button
    } else if (currentTime <= 0) {
        resultDisplay.textContent = `You Lose! Time's up! Score: ${score}`;
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup', moveFrog);
        playAgainButton.style.display = 'inline-block';  // Show "Play Again" button
    }
}

function win() {
    const squares = document.querySelectorAll('.grid div');
    if (squares[currentIndex].classList.contains('ending-block')) {
        score += 10;  // Increase score when the frog reaches the goal
        resultDisplay.textContent = `You Win! Score: ${score}`;
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup', moveFrog);
        playAgainButton.style.display = 'inline-block';  // Show "Play Again" button
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup', moveFrog);
        timerId = null;
        outcomeTimerId = null;
    } else {
        currentTime = 60;  // Set the time back to 60 seconds when starting a new game
        score = 0;  // Reset the score when starting a new game
        timeLeftDisplay.textContent = currentTime;
        resultDisplay.textContent = '---';
        playAgainButton.style.display = 'none';  // Hide "Play Again" button when the game starts
        createGrid();  // Recreate the grid for a new game
        timerId = setInterval(autoMoveElements, 1000);
        outcomeTimerId = setInterval(checkOutcomes, 50);
        document.addEventListener('keyup', moveFrog);
    }
});

playAgainButton.addEventListener('click', () => {
    // Reset everything when clicking "Play Again"
    currentTime = 60;  // Reset the timer to 60 seconds
    score = 0;  // Reset the score
    timeLeftDisplay.textContent = currentTime;
    resultDisplay.textContent = '---';  // Clear result display
    playAgainButton.style.display = 'none';  // Hide the button when playing again

    // Reset the grid and other game variables
    currentIndex = 76;  // Reset frog's position
    createGrid();  // Recreate the grid

    // Restart the game
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutcomes, 50);
    document.addEventListener('keyup', moveFrog);
});

createGrid();
