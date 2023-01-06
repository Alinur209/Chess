import Utiles from "../Utiles/utiles.js";
import Board from "../Services/Board.js";
import KingService from "../Services/KingService.js";
import Piece from "./Piece.js";
import Pieces from "../Services/Pieces.js";
import MocBoardService from "../Services/MocBoardService.js";

class Bishop extends Piece {

defineMoves({type, Board}) { 
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
                    if(type === "Moc") {
                        topRight.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates)) {
                        topRight.push(abs_coordinates)
                    }else break
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Game" && abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...topRight, (this.name[0] + this.coordinates)])
                        }

                        if(type === "Moc") {
                            topRight.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            topRight.push(abs_coordinates)
                        }else break 
                        
                    }else {
                        type === "Game" && Pieces.protectPiece(target_piece)
                    }

                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    if(type === "Moc") {
                        bottomRight.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates)) {
                        bottomRight.push(abs_coordinates)
                    }else break
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Game" && abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...bottomRight, (this.name[0] + this.coordinates)])
                        }

                        if(type === "Moc") {
                            bottomRight.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            bottomRight.push(abs_coordinates)
                        }else break 

                    }else {
                        type === "Game" && Pieces.protectPiece(target_piece)
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
                    if(type === "Moc") {
                        topLeft.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates)) {
                        topLeft.push(abs_coordinates)
                    }else break
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Game" && abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...topLeft, (this.name[0] + this.coordinates)])
                        }


                        if(type === "Moc") {
                            topLeft.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            topLeft.push(abs_coordinates)
                        }else break 

                    }else {
                        type === "Game" && Pieces.protectPiece(target_piece)
                    }

                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    if(type === "Moc") {
                        bottomLeft.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates)) {
                        bottomLeft.push(abs_coordinates)
                    }else break
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)
                    
                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Game" && abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...bottomLeft, (this.name[0] + this.coordinates)])

                        }
                        if(type === "Moc") {
                            bottomLeft.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            bottomLeft.push(abs_coordinates)
                        }else break 
                    }else {
                        type === "Game" &&  Pieces.protectPiece(target_piece)
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

        if(type === "Game") {
            if(KingService.isSafeKing(Pieces.pieces) || KingService.get_current_king().color !== this.color) {
                this.moves = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight]
                return this.moves
            }else {
                const ally_king = KingService.get_current_king()
                const moves = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight].filter(move => ally_king.attacking_stream.flat().includes(move))
    
                this.moves = moves
                return moves
            }
        }else {
            this.moves = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight]
        }
    }
}

export default Bishop