import Utiles from "../Utiles/utiles.js";
// import Board from "../Services/Board.js";
import KingService from "../Services/KingService.js";
import Piece from "./Piece.js";
import Pieces from "../Services/Pieces.js";
import MocBoardService from "../Services/MocBoardService.js";

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

    defineMoves({type, Board}) {
        
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
            
            if(abs_coordinates === "e2") {
                console.log(type, this, abs_coordinates)
            }

            if(i >= y) {
                if(abs_coordinates.length === 2) {
                    if(type === "Moc") {
                        top.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates)) {
                        top.push(abs_coordinates)
                    }else break
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Moc") {
                            top.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            top.push(abs_coordinates)
                        }else break 
                        
                        if(type === "Game" && abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...top, (this.name[0] + this.coordinates)])
                        }

                    }else {
                        type === "Game" && Pieces.protectPiece(target_piece)
                    }

                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    if(type === "Moc") {
                        bottom.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                        bottom.push(abs_coordinates)
                    }else break

                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Moc") {
                            bottom.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            bottom.push(abs_coordinates)
                        }else break
                        
                        if(type === "Game" && abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...bottom, (this.name[0] + this.coordinates)])
                        }
                    }else {
                        type === "Game" && Pieces.protectPiece(target_piece)
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
                    if(type === "Moc") {
                        right.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                        right.push(abs_coordinates)
                    }else break
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Game" && abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...right, (this.name[0] + this.coordinates)])
                        }
                        if(type === "Moc") {
                            right.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            right.push(abs_coordinates)
                        }else break

                    }else {
                        type === "Game" && Pieces.protectPiece(target_piece)
                    }
                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    if(type === "Moc") {
                        left.push(abs_coordinates)
                    }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                        left.push(abs_coordinates)
                    }else break
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(type === "Moc") {
                            left.push(abs_coordinates)
                        }else if(MocBoardService.isSafeMove(this, abs_coordinates) ) {
                            left.push(abs_coordinates)
                        }else break

                        if(type === "Game" &&abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...left, (this.name[0] + this.coordinates)])
                        }

                    }else {
                        type === "Game" && Pieces.protectPiece(target_piece)
                    }
                    i = index
                }   
            }
        }



        if(type === "Game") {
            if(KingService.isSafeKing() || KingService.get_current_king().color !== this.color) {
                this.moves = [...top, ...bottom, ...left, ...right]
                return this.moves
            }else {
                const ally_king = KingService.get_current_king()
                const moves = [...top, ...bottom, ...left, ...right].filter(move => ally_king.attacking_stream.flat().includes(move))
    
                this.moves = moves
                return moves
            }
        }else {

            const moves = [...top, ...bottom, ...left, ...right]
            this.moves = moves
            // console.log(this)
        }
    }
}

export default Rook