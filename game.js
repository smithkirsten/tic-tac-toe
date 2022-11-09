class Game {
    constructor() {
       this.board; //keeps track of moves made  
       this.player1 = new Player(*);
       this.player2 = new Player(!);
       this.turn; //player 1 or player 2
    }
    updateBoard() {
        //adds player's move to the board
    }
    switchTurn() {
        if(this.turn === 'player1') {
            this.turn = 'player2';
        } else {
            this.turn = 'player1';
        }
    }
    checkForWin() {
        //compares this.board array to win conditions array for a match
        //return player1 or player2 or draw
        //do after every turn
    }
    reset() {
      //remove all pieces from board  
    }
}