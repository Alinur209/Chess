import Board from "./Board.js";
import KingService from "./KingService.js";
import Pieces from "./Pieces.js";
import Pieces from "./Pieces.js";
import Pieces from "./Pieces.js";


class CastleService {
    current_king = KingService.get_current_king()

    white_king = {
        model: Pieces.find(piece => piece.name === "King" && piece.color === "white"),
        short: false,
        long: false
    }

    black_king = Pieces.find(piece => piece.name === "King" && piece.color === "black")

    short() {
        const squares = Board.getSquares()
        const pieces = Pieces.pieces

        let result = null
    }

    long() {
        let result = null
    }
}

export default CastleService