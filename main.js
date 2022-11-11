//global variables:
var winStates = [ //pass into checklist
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
    //board
    //[0,1,2,
     //3,4,5,
     //6,7,8]

//querySelectors
var playButton = document.getElementById('playButton');
var turnPrompts = document.querySelectorAll('.turn-prompt');
var fullSquareError = document.getElementById('fullSquareError');
var winnerDisplay = document.getElementById('winnerDisplay');
var winner = document.getElementById('winnerDisplay');
var player1Wins = document.getElementById('player1Wins');
var player2Wins = document.getElementById('player2Wins');


var gameBoard = document.getElementById('gameBoard');
var boxes = document.querySelectorAll('.box');


//eventListeners
playButton.addEventListener('click', function() {
    startGame();
    flipBanner();
})
gameBoard.addEventListener('click', function(event) {
    var availableSquare = currentGame.checkAvailability(event.target.id);
    console.log("check availability on this board: ", currentGame.board);
    if (availableSquare) {
        playRound(availableSquare);
        displayBoard();
    } else {
        fullSquareAlert();
    }
})

//functions

//fired when start game button clicked
function flipBanner() {
    playButton.classList.add('hidden');
    fullSquareError.classList.add('hidden');

    displayTurn();
}
function displayTurn() {
    if (currentGame.turn === 1) {
        turnPrompts[0].innerText = 'Mave your move, Sun!'
    } else {
        turnPrompts[0].innerText = 'Make your move, Moon!'
    }
    for( var i = 0; i < turnPrompts.length; i++) {
        turnPrompts[i].classList.remove('hidden');
    }
}
function startGame() {
    var startingTurn = Math.floor(Math.random() * 2)
    player1 = new Player('*', 1);
    player2 = new Player('!', 2);
    currentGame = new Game (player1, player2, startingTurn + 1);
}
//when square clicked
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
function fullSquareAlert() {
    fullSquareError.classList.remove('hidden');
}
function checkWinner() {
    if(player1.checkForWin(winStates)) {
        player1.wins++;
        console.log("Player 1 Wins: ", player1.wins)
        callGame(1);
        return;
    } else if (player2.checkForWin(winStates)) {
        console.log("player 2 wins")
        player2.wins++;
        console.log("Player 2 Wins: ", player2.wins)
        callGame(2);
        return;
    } else if (currentGame.checkDraw()){
        callGame('draw');
        console.log('draw');
        return;
    }
    currentGame.switchTurn(); //put into checkDraw?
    displayTurn();
}
function displayBoard() {
    //position = index numner/box id
    for(var i = 0; i < currentGame.board.length; i++) {
        if(currentGame.board[i] === '*'){
            console.log("Boxes[i]: ", boxes[i]);
            boxes[i].innerText = '🌞';
        }else if (currentGame.board[i] === '!') {
            boxes[i].innerText = '🌙';
        } 
    }  
}
//when winner declared
function callGame(winner) {
    if(winner === 1) {
        winnerDisplay.innerText = '🌞The Day Wins!🌞';
        player1Wins.innerText = `${player1.wins} Wins`;
    } else if (winner === 2) {
        winnerDisplay.innerText = '🌙The Night Wins!🌙';
        player2Wins.innerText = `${player2.wins} Wins`;
    } else {
        winnerDisplay.innerText = '🌞It\'s a draw🌙';
    }
    displayWinner();
    disableGrid();
    setTimeout(resetGameSection, 2000);
}
function disableGrid() {
    for(var i = 0; i < boxes.length;i++) {
        boxes[i].disabled = true;
    }   
}
function displayWinner() {
    winnerDisplay.classList.remove('hidden');
    playButton.classList.add('hidden');
    for( var i = 0; i < turnPrompts.length; i++) {
        turnPrompts[i].classList.add('hidden');
    }
}
function resetGameSection() {
    winnerDisplay.classList.add('hidden');
    playButton.classList.add('hidden')
    fullSquareError.classList.add('hidden');
    for(var i = 0; i < turnPrompts.length; i++) {
        turnPrompts[i].classList.remove('hidden');
    }
    currentGame.reset();
    player1.resetPositions();
    player2.resetPositions();
    for(var i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
        boxes[i].disabled = false;
    }
    currentGame.switchTurn();
}
//wait several seconds and auto-reset game board
    //can an alert pop up with a count down? and when it disappears the board clears on DOM?








//Game Sequence:
    //push start game
        //instantiates game
        //randomize who takes a turn first
    //player . takeTurn
    //updateBoard
    //checkForWin
    //switchTurn


//DOM sequence
    //load window
        //empty board
        //let's play button in banner
    //Event: click button (start game)
        //flip banner to present whose turn it is & instructions to play
    //event: click grid
        //what square was clicked?
        //which player has turn true?
        //insert token (or remove hidden?)in square
        //prompt turn

        //if winner is declared:
            //display winner in banner
            //freeze game board (no clicks register)
            //wins is displayed on player sections
            //auto re-load after several seconds
            //reset game board
    


//extras: Let's Play button that 