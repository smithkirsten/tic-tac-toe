class Game {
    constructor(player1, player2, turn) {
       this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
       this.player1 = player1;
       this.player2 = player2;
       this.turn = turn;
    }
    checkAvailability(position) {
        if(isNaN(this.board[position])) { 
            return false;
        }
        return position;
    }
    updateBoard(position) {
        if(this.turn === 1) {
            this.board[position] = '*'; 
        } else {
            this.board[position] = '!'; 
        }
    }
    switchTurn() {
        if(this.turn === 1) {
            this.turn = 2;
        } else {
            this.turn = 1;
        }
    }
    checkDraw() {
        for(var i = 0; i < this.board.length; i++) {
            if(!isNaN(this.board[i])) {
                return false;
            }
        }
        return true;
    }
    reset() {
      this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
}