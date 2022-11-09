class Player {
    constructor(token) {
        this.id; //randomize number
        this.token = token;
        this.wins = 0;
        this.turn;
    }
    increaseWin() {
        this.wins++
    }
    takeTurn(game, position) {
        game.board[position].replace(this.token);
    }
}