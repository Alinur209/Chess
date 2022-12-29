import Utiles from "../../Utiles/utiles.js";
import Board from "../Board.js";
import KingService from "../KingService.js";
import Piece from "../Piece.js";
import Pieces from "../Pieces.js";

class Rook extends Piece {

    defineMoves() {
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])

        const input_piece_color = this.color

        let top = []
        let bottom = []
        let right = []
        let left = []

        // BOTTOM, TOP

        for(let i = -y + 1; i <= 8; i++) {
            if( i === 0) {
                if(y <= 7) {
                    i = y + 1
                }else break
            }

            const abs_coordinates = Board.getAbsCoordinates(x + Math.abs(i)) 

            if(i >= y) {
                if(abs_coordinates.length === 2) {
                    top.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        top.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }

                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    bottom.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        bottom.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }


                    i = y
                }
            }

        }

        // LEFT, RIGHT
        const index = Utiles.x_indexes.indexOf(x)
        for(let i = -index + 1; i <= 7; i++) {

            if(i === 1) {  
                if(index <= 6) {
                    i = index + 1
                }else break
            } 

            const abs_coordinates = Board.getAbsCoordinates(Utiles.x_indexes[Math.abs(i)] + y) 

            if(i >= index) {
                if(abs_coordinates.length === 2) {
                    right.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        right.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }
 
                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    left.push(abs_coordinates)
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        left.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }
                    i = index
                }   
            }
        }

        if(KingService.isSafeKing() || KingService.get_current_king().color !== this.color) {
            this.moves = [...top, ...bottom, ...left, ...right]
            return this.moves
        }else {
            this.moves = []
            return []
        }
    }
}

export default Rook