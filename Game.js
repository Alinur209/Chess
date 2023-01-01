import Board from "./Board.js"
import Pieces from "./Pieces.js"

class Game {
    static revealTheWinner(player) {
        setTimeout(() => {
            alert(player + " won!")
            document.getElementById("board").innerHTML = ''
            Pieces.pieces = []
            this.restart()
        }, 500)
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