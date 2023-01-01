import Utiles from "../Utiles/utiles.js";
import Board from "../Board.js";
import KingService from "../Services/KingService.js";
import Piece from "./Piece.js";
import Pieces from "../Pieces.js";
import MocMoveService from "../Services/MocBoardService.js";

class Rook extends Piece {
    has_moved = false
    castle_index = null

    define_castle_index(){
        if(this.color === "white") {
            if(this.coordinates === "h1") {
                this.castle_index = "short"
            }else if(this.coordinates === "a1") {
                this.castle_index = "long"
            }
        }else {
            if(this.coordinates === "h8") {
                this.castle_index = "short"
            }else if(this.coordinates === "a8") {
                this.castle_index = "long"
            }
        }
    }

    defineMoves() {
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])

        const input_piece_color = this.color

        if(!this.castle_index) {
            this.define_castle_index()
        }

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
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...top, (this.name[0] + this.coordinates)])
                        }
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
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...bottom, (this.name[0] + this.coordinates)])
                        }
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
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...right, (this.name[0] + this.coordinates)])
                        }
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
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...left, (this.name[0] + this.coordinates)])
                        }
                        left.push(abs_coordinates)
                    }else {
                        Pieces.protectPiece(target_piece)
                    }
                    i = index
                }   
            }
        }

        MocMoveService.generateBoard(Pieces.pieces)

        if(KingService.isSafeKing() || KingService.get_current_king().color !== this.color) {
            this.moves = [...top, ...bottom, ...left, ...right]
            return this.moves
        }else {
            const ally_king = KingService.get_current_king()
            const moves = [...top, ...bottom, ...left, ...right].filter(move => ally_king.attacking_stream.flat().includes(move))

            this.moves = moves
            return moves
        }
    }
}

export default Rook