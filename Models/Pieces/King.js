import Utiles from "../../Utiles/utiles.js";
import Board from "../Board.js";
import Piece from "../Piece.js";
import Pieces from "../Pieces.js";

class King extends Piece {
    range = []
    is_safe = true
    attackers = []
    
    defineMoves() {        
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])
        const x_index = Utiles.x_indexes.indexOf(x)
        let result = []

        this.range.forEach(coordinates => {
            const abs_coordinates = Board.getAbsCoordinates(coordinates)

            if(abs_coordinates.length === 3) {
                const target_piece = Board.getSquareWithPiece(abs_coordinates)
                if(target_piece.getAttribute("piece_color") !== this.color) {
                    if(!Pieces.findPiece(target_piece.getAttribute("coordinates")).is_protected) {
                        result.push(abs_coordinates)
                    }
                }else {
                    Pieces.protectPiece(target_piece)
                }
            }else {
                if(this.isSafeSquare(abs_coordinates)) {
                    result.push(abs_coordinates)
                }
            }
        })

        this.moves = result
        return this.moves
    }

    isSafeSquare(coordinates, pieces) {
        if(!pieces) pieces = Pieces.pieces
        // coordinates.length === 2

        let result = true
        pieces.forEach(piece => {
            if(piece.color !== this.color) {
                if(piece.name !== "Pawn" && piece.name !== "King") {
                    if(piece.moves.includes(coordinates)) {
                        result = false
                    }
                }else if(piece.name === "Pawn") {
                    if(piece.attack_range.includes(coordinates)) {
                        result = false
                    }
                }else if(piece.name === "King") {
                    if(piece.range.includes(coordinates)) {
                        result = false
                    }
                }
            }
        })

        return result
    }

    defineRange() {
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])
        const x_index = Utiles.x_indexes.indexOf(x)

        this.range = [
            x + (y + 1),
            x + (y - 1),
            Utiles.x_indexes[x_index - 1] + y,
            Utiles.x_indexes[x_index + 1] + y,
            Utiles.x_indexes[x_index - 1] + (y + 1),
            Utiles.x_indexes[x_index + 1] + (y + 1),
            Utiles.x_indexes[x_index - 1] + (y - 1),
            Utiles.x_indexes[x_index + 1] + (y - 1),
        ].filter(item => {
            if(Number(item[1]) && Number(item[1]) < 9) {
                return item
            }
        })

        return this.range
    }
}

export default King