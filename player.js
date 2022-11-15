class Player {
    constructor(token, id) {
        this.id = id;
        this.token = token;
        this.wins = 0;
        this.positions = [];
    }
    increaseWin() {
        this.wins++
    }
    takeTurn(game, position) {
        game.board[position].replace(this.token);
    }
    updatePosition(position) {
        this.positions.push(position);
    }
    checkForWin(checklist) {
        var possibleWin = [];
        for(var i = 0; i < checklist.length; i++) {
            possibleWin = checklist[i];
            if(this.positions.includes(possibleWin[0]) && this.positions.includes(possibleWin[1]) && this.positions.includes(possibleWin[2])) {
                return true;
            }
        }
        return false;
    }
    resetPositions() {
        this.positions = [];
    }
}