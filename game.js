class Game {
    constructor(player1, player2, turn) {
       this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //keeps track of moves made  
       this.player1 = player1;
       this.player2 = player2;
       this.turn = turn;
    }
    updateBoard(position) { //adds player's move to the board
        //event.target 
        if(this.turn === 1) {
            this.board[position] = '*';
            return 'player1';
        } else {
            this.board[position] = '!';
            return 'player2';
        }
    }
    switchTurn() {
        if(this.turn === 1) {
            this.turn = 2;
        } else {
            this.turn = 1;
        }
    }
    checkForWin(player, checklist) {
        var positions = [];
        var possibleWin = []; //dont actually need this. can iterate through wins array
        for(var i = 0; i < this.board.length; i++) {
            if(this.board[i] === this[player].token) {
                positions.push(i);
            }
        }
        for(i = 0; i < checklist.length; i++) {
            possibleWin = checklist[i];
            if(positions.includes(possibleWin[0]) && positions.includes(possibleWin[1]) && positions.includes(possibleWin[2])) {
                return player;
            }
        }
        for(i = 0; i < this.board.length; i++) {
            if(this.board[i] !== NaN) { 
                console.log("no winner!")
                return;
            }
                return 'draw';
        }
    }
    reset() {
      this.board = [];
      //randomize which player goes first? 
    }
}