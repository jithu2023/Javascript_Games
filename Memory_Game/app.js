document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' },
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' },
    ];
  
    cardArray.sort(() => 0.5 - Math.random());
  
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const timeDisplay = document.querySelector('#time');
    const gameOverElement = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const playAgainButton = document.getElementById('play-again');
  
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let timeRemaining = 60;
    let timer;
  
    // Create the game board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      }
    }
  
    // Check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const [optionOneId, optionTwoId] = cardsChosenId;
  
      if (optionOneId === optionTwoId) {
        alert('You clicked the same card!');
      } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!');
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
      } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('Try again!');
      }
  
      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = cardsWon.length;
  
      if (cardsWon.length === cardArray.length / 2) {
        clearInterval(timer);
        endGame();
      }
    }
  
    // Flip a card
    function flipCard() {
      const cardId = this.getAttribute('data-id');
      if (!cardsChosenId.includes(cardId)) {
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
  
        if (cardsChosen.length === 2) {
          setTimeout(checkForMatch, 500);
        }
      }
    }
  
    // Timer countdown
    function startTimer() {
      timer = setInterval(() => {
        timeRemaining--;
        timeDisplay.textContent = timeRemaining;
  
        if (timeRemaining === 0) {
          clearInterval(timer);
          endGame();
        }
      }, 1000);
    }
  
    // End the game
    function endGame() {
      grid.innerHTML = '';
      gameOverElement.classList.add('active');
      finalScoreElement.textContent = cardsWon.length;
    }
  
    // Reset the game
    function resetGame() {
      cardsChosen = [];
      cardsChosenId = [];
      cardsWon = [];
      timeRemaining = 60;
      resultDisplay.textContent = '0';
      timeDisplay.textContent = '60';
      grid.innerHTML = '';
      gameOverElement.classList.remove('active');
      cardArray.sort(() => 0.5 - Math.random());
      createBoard();
      startTimer();
    }
  
    playAgainButton.addEventListener('click', resetGame);
  
    // Start the game
    createBoard();
    startTimer();
  });
  