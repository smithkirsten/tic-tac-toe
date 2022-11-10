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
var playButton = document.querySelector('.play-button');
    //reset button
var grid = document.querySelector('.grid');
var turnPrompts = document.querySelectorAll('.turn-prompt');

//eventListeners
    //load window
playButton.addEventListener('click', function() {
    flipBanner();
    startGame();
    console.log("New Game Board: ", currentGame.board);
})
grid.addEventListener('click', function(event) {
    var availableSquare = currentGame.checkAvailability(event.target.id);
    if (availableSquare) {
        playRound(availableSquare);
    } else {
        console.log("pick an empty square")
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
    if(currentGame.turn === 1) {
        player1.updatePosition(position)
    } else {
        player2.updatePosition(position)
    }
    currentGame.updateBoard(position);
    displayBoard();
    checkWinner();
}
function checkWinner() { //not curently able to find winner
    // console.log("Player 1 Positions: ", player1.positions)
    // console.log("Player 1 Wins? ", player1.checkForWin(winStates))
    // console.log("Player 2 Positions: ", player2.positions)
    // console.log("Player 2 Wins? ", player2.checkForWin(winStates))
    if(player1.checkForWin(winStates)) {
        console.log("player 1 wins")
        player1.wins++;
        console.log("Player 1 Wins: ", player1.wins)
        //insert inner text into banner
        //return value?
    } else if (player2.checkForWin(winStates)) {
        console.log("player 2 wins")
        player2.wins++;
        console.log("Player 2 Wins: ", player2.wins)
        //insert innerText into banner
        //return value?
    } else {
        currentGame.checkDraw();
        currentGame.switchTurn(); //put into checkDraw?
    }
}
function displayBoard() {
    console.log(currentGame.board);
}





// var winner = currentGame.checkForWin(currentGame.updateBoard(position), winStates);
//     if(winner === 'player1') {
//         console.log('player 1 wins!')
//         return 'player 1 wins!'
//     } else if(winner === 'player2') {
//         console.log('player 2 wins!')
//         return 'player 2 wins!'
//     } else if(winner === 'draw') {
//         console.log('draw!')
//         return 'draw!'
//     }
//     console.log('switch turn!')
//     currentGame.switchTurn();
//     return true;



















//Game Sequence:
    //push start game
        //instantiates game
        //randomize who takes a turn first
    //player . takeTurn
    //updateBoard
    //checkForWin
    //switchTurn
    //prompt turn


//DOM sequence
    //load window
        //empty board
        //let's play button in banner
    //Event: click button (take turn)
        //flip banner to present whose turn it is
    //event: click grid
        //what square was clicked?
        //which player has turn true?
        //insert token (or remove hidden?)in square
        //prompt turn


//extras: Let's Play button that 