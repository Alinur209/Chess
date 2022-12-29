import Board from "./Board.js"
import Pieces from "./Pieces.js"

class Game {
    static revealTheWinner(player) {
        alert(player + " won!")
    }
    
    static restart() {
        
    }

    static setup() {
        Board.draw()
        Pieces.initPieces()
        Pieces.setPieces() 
    }
}

export default Game