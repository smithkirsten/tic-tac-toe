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
    //reset button
var gameBoard = document.getElementById('gameBoard');
var fullSquareError = document.getElementById('fullSquareError');
var turnPrompts = document.querySelectorAll('.turn-prompt');
var boxes = document.querySelectorAll('.box');

//eventListeners
    //load window?
playButton.addEventListener('click', function() {
    flipBanner();
    startGame();
    console.log("New Game Board: ", currentGame.board);
})
gameBoard.addEventListener('click', function(event) {
    var availableSquare = currentGame.checkAvailability(event.target.id);
    if (availableSquare) {
        playRound(availableSquare);
        displayBoard();
    } else {
        fullSquareAlert();
        //error handling function
    }
})

//functions

//function loadPage()

//fired when start game button clicked
function flipBanner() {
    console.log("flip banner")
    playButton.classList.add('hidden');
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
    console.log("that square is full! pick an empty square")
    fullSquareError.classList.remove('hidden');


}
function checkWinner() {
    if(player1.checkForWin(winStates)) {
        console.log("player 1 wins")
        player1.wins++;
        console.log("Player 1 Wins: ", player1.wins)
        //insert inner text into banner
        //return player to insert into banner as winner?
    } else if (player2.checkForWin(winStates)) {
        console.log("player 2 wins")
        player2.wins++;
        console.log("Player 2 Wins: ", player2.wins)
        //insert innerText into banner
        //return player to insert into banner as winner?
    } else {
        currentGame.checkDraw();
        currentGame.switchTurn(); //put into checkDraw?
    }
}
function displayBoard() {
    //position = index numner/box id
    console.log(currentGame.board);
    console.log("indv boxes: ", boxes);
    console.log("boxes[0]: ", boxes[0])
    for(var i = 0; i < currentGame.board.length; i++) {
        if(currentGame.board[i] === '*'){
            console.log("Boxes[i]: ", boxes[i]);
            boxes[i].innerText = '🌞';
        }else if (currentGame.board[i] === '!') {
            boxes[i].innerText = '🌙';
        } 
    }  
}

//how can I target the id of the box html
    //`<div class="box" id="${i}"></div>`
    //`<div class="box" id="${i}">🌙</div>`
    //`<div class="box" id="${i}">🌞</div>`


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