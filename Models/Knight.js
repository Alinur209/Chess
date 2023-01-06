import Utiles from "../Utiles/utiles.js";
import Board from "../Services/Board.js";
import KingService from "../Services/KingService.js";
import Piece from "./Piece.js";
import Pieces from "../Services/Pieces.js";
import MocBoardService from "../Services/MocBoardService.js";

class Knight extends Piece {

    defineMoves({type, Board}) {
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

        const result = [...range_1, ...range_2].filter(item => item && Number(item.slice(1)) >= 1 && Number(item.slice(1)) <= 8 ).map(item => {
            const abs_coordinates = Board.getAbsCoordinates(item)

            if(abs_coordinates?.length === 2) {
                if(type === "Moc") {
                    return item
                }else if(MocBoardService.isSafeMove(this, abs_coordinates)) {
                    return item
                }
            }else if(abs_coordinates?.length === 3){

                if(type === "Game" && abs_coordinates[0] === "K") {
                    const king = KingService.get_opposite_king()
                    king.pushAtackingMoves(["N" + this.coordinates])
                }

                if(type === "Moc") {
                    return item
                }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                    return item
                } 
    
                const target_square = Board.getSquareWithPiece(abs_coordinates)

                if(this.color !== target_square.getAttribute("piece_color")) {
                    return abs_coordinates
                }else {
                    type==="Game" && Pieces.protectPiece(target_square)
                }
            }
        })

        if(type === "Game") {
            if(KingService.isSafeKing(Pieces.pieces) || KingService.get_current_king().color !== this.color) {
                this.moves = result
                return this.moves
            }else {
                const ally_king = KingService.get_current_king()
                const moves = result.filter(move => ally_king.attacking_stream.flat().includes(move))
                this.moves = moves
                return moves
            }
        }else {
            this.moves = result
            return this.moves
        }
    }
}

export default Knight