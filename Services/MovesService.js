import Pieces from "./Pieces.js"
import Utiles from "../Utiles/utiles.js"
import KingService from "./KingService.js"
import MocBoardService from "./MocBoardService.js"


class MovesService {
    static Rook(coordinates, {type, Board}) {
        // Type - Board type: Game or Moc
        // Board - Board or MocBoard
        
        console.log("Rook", coordinates)

        const x = coordinates[0]
        const y = Number(coordinates[1])
        const input_piece = Pieces.findPiece(coordinates)
        const input_piece_color = input_piece.color

        let top = []
        let bottom = []
        let right = []
        let left = []

        if(type === "game" && input_piece.castle_index) {
            input_piece.define_castle_index()
        }

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
                    if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                        top.push(abs_coordinates)
                    } else {
                        break
                    }
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...top, (this.name[0] + this.coordinates)])
                        }

                        if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                            top.push(abs_coordinates)
                        }else {
                            break
                        }
                    }else if(type === "Game"){
                        Pieces.protectPiece(target_piece)
                    }

                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                        bottom.push(abs_coordinates)
                    } else {
                        break
                    }
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...bottom, (this.name[0] + this.coordinates)])
                        }

                        if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                            bottom.push(abs_coordinates)
                        } else {
                            break
                        }
                    }else {
                        Pieces.protectPiece(target_piece)
                    }


                    i = y
                }
            }
        }

        console.log(top, bottom)
        
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
                    if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                        right.push(abs_coordinates)
                    } else {
                        break
                    }
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...right, (this.name[0] + this.coordinates)])
                        }

                        if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                            right.push(abs_coordinates)
                        }else {
                            break
                        }
                    }else {
                        Pieces.protectPiece(target_piece)
                    }
 
                    break
                }
            }else {
                if(abs_coordinates.length === 2) {
                    if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                        left.push(abs_coordinates)
                    } 
                }else {
                    const target_piece = Board.getSquareWithPiece(abs_coordinates)

                    if(input_piece_color !== target_piece.getAttribute("piece_color")) {
                        if(abs_coordinates[0] === "K") {
                            const king = KingService.get_opposite_king()
                            king.pushAtackingMoves([...left, (this.name[0] + this.coordinates)])
                        }

                        if(MocBoardService.isSafeMove(input_piece, abs_coordinates)) {
                            left.push(abs_coordinates)
                        }else {
                            break
                        }
                    }else {
                        Pieces.protectPiece(target_piece)
                    }
                    i = index
                }   
            }
        }

        const moves = [...top, ...bottom, ...left, ...right]
        
        if(type === "Game") {
            if(KingService.isSafeKing() || KingService.get_current_king().color !== this.color) {
                return moves
            }else {
                const ally_king = KingService.get_current_king()
                const moves = moves
                .filter(move => ally_king.attacking_stream.flat().includes(move))
    
                return moves
            }
        }else {
            return moves
        }
    }

    static Bishop(coordinates, {type, Board}) {
        return []
    }

    static Knight(coordinates, {type, Board}) {
        return []
    }

    static Pawn(coordinates, {type, Board}) {
        console.log("Pawn", coordinates, 'boardType: ', type)
        return []
    }

    static Queen(coordinates, {type, Board}) {
        return []
    }

    static King(coordinates, {type, Board}) {
        return []
    }
    
}

export default MovesService