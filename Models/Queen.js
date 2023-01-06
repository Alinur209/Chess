import Piece from "./Piece.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";

class Queen extends Piece {
    defineMoves(config) {
        const bishop_moves = new Bishop("Bishop", "", this.color, this.coordinates, 5).defineMoves(config)
        const rook_moves = new Rook("Rook", "", this.color, this.coordinates, 5).defineMoves(config)

        this.moves = [...bishop_moves, ...rook_moves]
        return this.moves
    }
}

export default Queen