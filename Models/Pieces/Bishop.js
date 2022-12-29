import Utiles from "../../Utiles/utiles.js";
import Board from "../Board.js";
import KingService from "../KingService.js";
import Piece from "../Piece.js";
import Pieces from "../Pieces.js";

class Bishop extends Piece {

    defineMoves() {
        const input_x = this.coordinates[0]
        const input_y = Number(this.coordinates[1])
        const input_piece_color = this.color
        const x_index = Utiles.x_indexes.indexOf(input_x)

        let topLeft = []
        let topRight = []
        let bottomLeft = []
        let bottomRight = []
        
        // RIGHT DIAGONALS 

        let x, y
        for(x = x_index + 1, y = -input_y + 1; x <= 7 && y <= 8; x++, y++) {
            if(y === 0) {
                y = input_y + 1
                x = x_index + 1
            }
            
            const abs_coordinates = Board.getAbsCoordinates(Utiles.x_indexes[x] + Math.abs(y)) 

            if(y >= input_y) {
                if(abs_coordinates.length === 2) {
                    topRight.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        topRight.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }

                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    bottomRight.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        bottomRight.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }

                    y = input_y
                    x = x_index
                }
            }


            if(x === 7 && y < input_y && input_y < 8) {
                x = x_index
                y = input_y
            }

        }

        // LEFT DIAGONALS

        let i, j
        for(i = -x_index + 1, j = -input_y + 1; i < 1 && j <= 8; i++, j++) {

            if(j === 0) {
                i = -x_index + 1
                j = input_y + 1
            }

            const abs_coordinates = Board.getAbsCoordinates(Utiles.x_indexes[Math.abs(i)] + Math.abs(j)) 

            if(j >= input_y) {
                if(abs_coordinates.length === 2) {
                    topLeft.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        topLeft.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }

                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    bottomLeft.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        bottomLeft.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }

                    j = input_y
                    i = -x_index
                }
            }

            if(i === 0 && j < input_y && input_y < 8) {
                i = -x_index 
                j = input_y 
            }

        }
            
        if(KingService.isSafeKing(Pieces.pieces) || KingService.get_current_king().color !== this.color) {
            this.moves = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight]
            return this.moves
        }else {
            this.moves = []
            return []
        }
    }
}

export default Bishop