import Piece from "./Piece.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";

class Queen extends Piece {
    defineMoves(config) {
        const bishop = new Bishop(this.name, "", this.color, this.coordinates, 5)
        const rook = new Rook(this.name, "", this.color, this.coordinates, 5)

        bishop.defineMoves(config)
        rook.defineMoves(config)

        this.moves = [...bishop.moves, ...rook.moves]
        return this.moves
    }
}

export default Queen