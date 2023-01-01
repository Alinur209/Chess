import Piece from "./Piece.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";

class Queen extends Piece {
    defineMoves() {
        const bishop_moves = new Bishop(this.name, "", this.color, this.coordinates, 5).defineMoves()
        const rook_moves = new Rook(this.name, "", this.color, this.coordinates, 5).defineMoves()

        this.moves = [...bishop_moves, ...rook_moves]
        return this.moves
    }
}

export default Queen