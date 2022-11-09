//global variables:
var winStates = [ //pass into checklist
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var currentGame;
var player1;
var player2;
    //board
    //[0,1,2,
     //3,4,5,
     //6,7,8]

//querySelectors
    //start button
    //reset button
    //grid

//eventListeners
    //load window
    //click start
    //click grid

//functions

function startGame() {
    var startingTurn = Math.floor(Math.random() * 2)
    player1 = new Player('*');
    player2 = new Player('!');
    currentGame = new Game (player1, player2, startingTurn + 1);
    //return currentGame.turn; ?
}
//fired when grid square clicked
function takeTurn(position) {
    var winner = currentGame.checkForWin(currentGame.updateBoard(position), winStates);
    if(winner === 'player1') {
        console.log('player 1 wins!')
        return 'player 1 wins!'
    } else if(winner === 'player2') {
        console.log('player 2 wins!')
        return 'player 2 wins!'
    } else if(winner === 'draw') {
        console.log('draw!')
        return 'draw!'
    }
    console.log('switch turn!')
    currentGame.switchTurn();
}

function determineWinner() {

}








// startGame();
// console.log("Turn 1: Player ", currentGame.turn);
// console.log(takeTurn(0));
// console.log("board: ", currentGame.board);
// console.log("Turn 2, Player : ", currentGame.turn);
// console.log(takeTurn(7));
// console.log(currentGame.board);
// console.log("Turn 3, Player: ", currentGame.turn);
// console.log(takeTurn(1));
// console.log(currentGame.board);
// console.log("Turn 4, Player: ", currentGame.turn);
// console.log(takeTurn(6));
// console.log(currentGame.board);
// console.log("Turn 5, Player: ", currentGame.turn);
// console.log(takeTurn(2));
// console.log(currentGame.board);
// console.log("Turn 6, Player: ", currentGame.turn);
// console.log(takeTurn(4));
// console.log(currentGame.board);
// console.log("Turn 7, Player: ", currentGame.turn);
// console.log(takeTurn(5));
// console.log(currentGame.board);
// console.log("Turn 8, Player: ", currentGame.turn);
// console.log(takeTurn(3));
// console.log(currentGame.board);
// console.log("Turn 9, Player: ", currentGame.turn);
// console.log(takeTurn(8));
// console.log(currentGame.board);
// console.log("Turn 10, Player: ", currentGame.turn);





















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