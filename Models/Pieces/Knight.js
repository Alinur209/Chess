import Utiles from "../../Utiles/utiles.js";
import Board from "../Board.js";
import KingService from "../KingService.js";
import Piece from "../Piece.js";
import Pieces from "../Pieces.js";

class Knight extends Piece {

    defineMoves() {
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])
        const x_index = Utiles.x_indexes.indexOf(x) 

        // TOP, BOTTOM

        const range_1 = [
            Utiles.x_indexes[x_index - 1] + (y + 2),
            Utiles.x_indexes[x_index + 1] + (y + 2),
            Utiles.x_indexes[x_index + 1] + (y - 2),
            Utiles.x_indexes[x_index - 1] + (y - 2),
        ]

        // LEFT, RIGHT

        const range_2 = [
            Utiles.x_indexes[x_index - 2] + (y + 1),
            Utiles.x_indexes[x_index - 2] + (y - 1),
            Utiles.x_indexes[x_index + 2] + (y + 1),
            Utiles.x_indexes[x_index + 2] + (y - 1),
        ]

        const result = [...range_1, ...range_2].map(item => {
            const abs_coordinates = Board.getAbsCoordinates(item)

            if(abs_coordinates?.length === 2) {
                return item
            }else if(abs_coordinates?.length === 3){

                if(abs_coordinates[0] === "K") {
                    const king = KingService.get_opposite_king()
                    king.pushAtackingMoves("N" + this.coordinates)
                }
    
                const target_square = Board.getSquareWithPiece(abs_coordinates)

                if(this.color !== target_square.getAttribute("piece_color")) {

                    return abs_coordinates
                }else {
                    Pieces.protectPiece(target_square)
                }
            }
        }).filter(item => item)

        if(KingService.isSafeKing(Pieces.pieces) || KingService.get_current_king().color !== this.color) {
            this.moves = result
            return this.moves
        }else {
            const ally_king = KingService.get_current_king()
            const moves = result.filter(move => ally_king.attacking_stream.flat().includes(move))
            this.moves = moves
            return moves
        }
    }
}

export default Knight