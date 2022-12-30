import Utiles from "../../Utiles/utiles.js";
import Board from "../Board.js";
import Piece from "../Piece.js";
import Pieces from "../Pieces.js";

class King extends Piece {
    range = {}
    is_safe = true
    attacking_stream = []

    defineMoves() {        
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])
        const x_index = Utiles.x_indexes.indexOf(x)
        let result = []

        this.range.all.forEach(coordinates => {
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
        // coordinates.length === 2
        if(!pieces) pieces = Pieces.pieces
        let result = true

        if(!this.is_safe) {
            for(let i in this.range) {
                if(i !== "all") {
                    this.range[i].forEach( coor => {
                        this.attacking_stream.forEach(att_coor => {
                            if(att_coor.includes(coor)) {
                                if(this.range[i].includes(coordinates)) {
                                    result = false
                                }
                            }
                        })
                    })
                }
            }
        }

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
                    if(piece.range.all.includes(coordinates)) {
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

        const range = {
            all: [],
            diagonals_pair_1: [Utiles.x_indexes[x_index - 1] + (y + 1),  Utiles.x_indexes[x_index + 1] + (y - 1)],
            diagonals_pair_2: [Utiles.x_indexes[x_index + 1] + (y + 1), Utiles.x_indexes[x_index - 1] + (y - 1),],
            horizontal: [x + (y + 1), x + (y - 1),],
            vertical: [Utiles.x_indexes[x_index - 1] + y, Utiles.x_indexes[x_index + 1] + y]
        }
        
        for(let i in range) {
            range[i] = [...range[i].filter(item => Number(item[1]) && Number(item[1]) < 9)]
        }

        range.all = [...range.diagonals_pair_1, ...range.diagonals_pair_2, ...range.horizontal, ...range.vertical]

        this.range = range
        return this.range
    }

    resetAttackers() {
        this.attacking_stream = []
    }

    pushAtackingMoves(attacking_moves) {
        // attacking_moves: rook moves, bishop moves

        this.attacking_stream.push(attacking_moves)
    }
}

export default King