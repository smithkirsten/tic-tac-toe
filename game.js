class Game {
    constructor() {
       this.board; //keeps track of moves made  
       this.turn; //player 1 or player 2
    }
    updateBoard() {
        //adds player's move to the boar
    }
    switchTurn() {
        if(this.turn === 'player1') {
            this.turn = 'player2'
        } else {
            this.turn = 'player1'
        }
    }
    checkForWin() {
        //compares this.board array to win conditions array for a match
        //return player1 or player2 or draw
    }
    reset() {
        
    }
}