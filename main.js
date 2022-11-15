var winStates = [ 
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
];
var currentGame;
var player1;
var player2;
var startingPlayer;

var sunMoonImg = document.querySelector('.sun-moon');
var playButton = document.getElementById('playButton');
var resetGameButton = document.getElementById('resetGameButton');
var turnPrompts = document.querySelectorAll('.turn-prompt');
var fullSquareError = document.getElementById('fullSquareError');
var winnerDisplay = document.getElementById('winnerDisplay');
var winner = document.getElementById('winnerDisplay');
var player1Wins = document.getElementById('player1Wins');
var player2Wins = document.getElementById('player2Wins');
var gameBoard = document.getElementById('gameBoard');
var boxes = document.querySelectorAll('.box');

window.addEventListener('load', function () {
    disableGrid();
    if(localStorage.length > 0) {
        startGame();
        retrieveWins();
        flipBanner();
        displayPlayerWins();
        enableGrid();
    }
})
playButton.addEventListener('click', function() {
    startGame();
    flipBanner();
    enableGrid();
})
gameBoard.addEventListener('click', function(event) {
    var availableSquare = currentGame.checkAvailability(event.target.id);
    if (availableSquare) {
        playRound(availableSquare);
        displayBoard();
    } else {
        fullSquareAlert();
    }
})
resetGameButton.addEventListener('click', resetGame);

function flipBanner() {
    playButton.classList.add('hidden');
    fullSquareError.classList.add('hidden');
    sunMoonImg.classList.add('hidden');
    displayTurn();
}
function displayTurn() {
    if (currentGame.turn === 1) {
        turnPrompts[0].innerText = 'Make your move, Sun!'
    } else {
        turnPrompts[0].innerText = 'Make your move, Moon!'
    }
    for( var i = 0; i < turnPrompts.length; i++) {
        turnPrompts[i].classList.remove('hidden');
    }
}
function startGame() {
    player1 = new Player('*', 1);
    player2 = new Player('!', 2);
    startingPlayer = Math.floor(Math.random() * 2) + 1;
    currentGame = new Game (player1, player2, startingPlayer);
}
function displayBoard() {
    for(var i = 0; i < currentGame.board.length; i++) {
        if(currentGame.board[i] === '*'){
            boxes[i].innerHTML = '<img class="game-token" src="./assets/23.svg" alt="Sun Token">';
        }else if (currentGame.board[i] === '!') {
            boxes[i].innerHTML = '<img class="game-token" src="./assets/8.svg" alt="Moon Token">';
        } 
    }  
}
function displayWinner() {
    winnerDisplay.classList.remove('hidden');
    playButton.classList.add('hidden');
    hideTurnPrompts();
}
function displayPlayerWins() {
    player1Wins.innerText = `${player1.wins} Wins`;
    player2Wins.innerText = `${player2.wins} Wins`;
}
function displayTurnPrompts() {
    for(var i = 0; i < turnPrompts.length; i++) {
        turnPrompts[i].classList.remove('hidden');
    }  
}
function hideTurnPrompts() {
    for(var i = 0; i < turnPrompts.length; i++) {
        turnPrompts[i].classList.add('hidden');
    } 
}
function fullSquareAlert() {
    fullSquareError.classList.remove('hidden');
}
function disableGrid() {
    gameBoard.classList.add('disabled'); 
    for(var i = 0; i < boxes.length;i++) {
        boxes[i].disabled = true;
        boxes[i].classList.add('disabled');
    } 
}
function enableGrid() {
    gameBoard.classList.remove('disabled'); 
    for(var i = 0; i < boxes.length;i++) {
        boxes[i].disabled = false;
        boxes[i].classList.remove('disabled');
    } 
}
function clearBoardDisplay() {
    for(var i = 0; i < currentGame.board.length; i++) {
            boxes[i].innerText = '';
    }
}
function playRound(position) {
    fullSquareError.classList.add('hidden');
    if(currentGame.turn === 1) {
        player1.updatePosition(position)
    } else {
        player2.updatePosition(position)
    }
    currentGame.updateBoard(position);
    checkWinner();
}
function checkWinner() {
    if(player1.checkForWin(winStates)) {
        player1.wins++;
        storeWins();
        callGame(1);
        return;
    } else if (player2.checkForWin(winStates)) {
        player2.wins++;
        storeWins();
        callGame(2);
        return;
    } else if (currentGame.checkDraw()){
        callGame('draw');
        return;
    }
    currentGame.switchTurn();
    displayTurn();
}
function callGame(winner) {
    if(winner === 1) {
        winnerDisplay.innerText = '🌞The Day Wins!🌞';
        document.body.classList.add('day-theme');
        document.body.classList.remove('night-theme');
        
    } else if (winner === 2) {
        winnerDisplay.innerText = '🌙The Night Wins!🌙';
        document.body.classList.add('night-theme');
        document.body.classList.remove('day-theme');
    } else {
        winnerDisplay.innerText = '🌞It\'s a draw🌙';
        document.body.classList.remove('day-theme');
        document.body.classList.remove('night-theme');
    }
    disableGrid();
    displayWinner();
    displayPlayerWins(); 
    setTimeout(resetGameSection, 2000);
}
function resetGameSection() {
    winnerDisplay.classList.add('hidden');
    playButton.classList.add('hidden')
    fullSquareError.classList.add('hidden');
    displayTurnPrompts();
    currentGame.reset();
    player1.resetPositions();
    player2.resetPositions();
    if(currentGame.turn === startingPlayer) {
        currentGame.switchTurn();
        startingPlayer = currentGame.turn;
    }
    clearBoardDisplay();
    displayTurn();
    enableGrid();
}
function storeWins() {
    localStorage.setItem('sunWins', player1.wins);
    localStorage.setItem('moonWins', player2.wins);
}
function retrieveWins() {
    player1.wins = localStorage.getItem('sunWins');
    player2.wins = localStorage.getItem('moonWins');
}
function resetGame() {
    document.body.classList.remove('day-theme');
    document.body.classList.remove('night-theme');
    localStorage.clear();
    clearBoardDisplay();
    disableGrid();
    startGame();
    hideTurnPrompts();
    playButton.classList.remove('hidden');
    sunMoonImg.classList.remove('hidden');
    displayPlayerWins();
}