import Utiles from "../Utiles/utiles.js"
import Board from "./Board.js"
import Pieces from "./Pieces.js"


class KingService {
    static get_current_king = () => Pieces.pieces.find(piece => piece.name === "King" && piece.color === Board.moveOf)

    static serveKing(pieces) {
        if(!this.isSafeKing(pieces)) {
            Board.check()
        }else {
            Board.unCheck()
        }
    }

    static isSafeKing(pieces = Pieces.pieces) {
        const king = this.get_current_king()

        pieces.forEach(piece => {
            if(piece.coordinates === king.coordinates) {
                piece.isSafe = false
            }else {
                piece.isSafe = true
            }
        })

        return !pieces.some(piece => piece.moves.includes("K" + king.coordinates))
    }
}

export default KingService