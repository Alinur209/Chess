import Board from "./Board.js"
import Pieces from "./Pieces.js"

class Game {
    static revealTheWinner(player) {
        setTimeout(() => {
            const board = document.getElementById("board")
            board.innerHTML = ''
            Pieces.pieces = []
            this.restart()
        }, 3000);
    }
    
    static restart() {
        this.setup()
    }

    static setup() {
        Board.draw()
        Pieces.initPieces()
        Pieces.setPieces() 
    }
}

export default Game