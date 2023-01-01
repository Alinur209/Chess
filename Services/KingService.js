import Utiles from "../Utiles/utiles.js"
import Board from "../Board.js"
import Pieces from "../Pieces.js"


class KingService {
    static get_current_king = () => Pieces.pieces.find(piece => piece.name === "King" && piece.color === Board.moveOf)
    static get_opposite_king = () => Pieces.pieces.find(piece => piece.name === "King" && piece.color !== Board.moveOf)

    static serveKing(pieces) {
        if(!this.isSafeKing(pieces)) {
            Board.check()
        }else {
            Board.unCheck()
        }
    }

    static isSafeKing(pieces = Pieces.pieces) {
        const king = this.get_current_king()

        const is_safe = !pieces.some(piece => piece.moves.includes("K" + king.coordinates))
       
        pieces.forEach(piece => {
            if(piece.coordinates === king.coordinates) {
                piece.is_safe = is_safe
            }
        })

        return is_safe
    }

    static is_mate() {
        const current_king = this.get_current_king()

        if(!current_king.is_safe) {
            const may_king_be_protected = Pieces.pieces.some(piece => piece.name!=="King" && piece.color === current_king.color && Boolean(piece.moves.length))
            const may_king_escape = Boolean(current_king.moves.length)
            return !(Boolean(may_king_be_protected) || may_king_escape)
        }
    }
}

export default KingService