import Board from "./Board.js";
import KingService from "./KingService.js";
import MovesManagerService from "./MovesManagerService.js";
import Pieces from "./Pieces.js";


class CastleService {

    static areSquaresFreeAndSafe(input_coordinates) {
        let free = false
        input_coordinates.forEach(coordinates => {
            if(Board.getSquare(coordinates).getAttribute("abs_coordinates").length === 2) {
                free = true
            }
        })

        let safe = true
        input_coordinates.forEach(coordinates => {
            Pieces.pieces.forEach(piece => {
                if(piece.color !== KingService.get_current_king().color) {
                    if(piece.moves.includes(coordinates)|| (piece.name === "Pawn" && piece.attack_range.includes(coordinates))) {
                        safe = false
                    }
                }
            })
        })

        return free && safe
    }

    static hasRookMoved(rook_coordinates) {
        return MovesManagerService.moves.some(move => move.includes("R" + rook_coordinates)) 
    }

    static short(color) {
        if(!KingService.get_current_king().has_moved) {
            const areSquaresFreeAndSafe = this.areSquaresFreeAndSafe(
                color === "white" ?
                    ["f1", "g2"]
                :
                    ["f8", "g8"]
            )
            
            const hasRookMoved = Pieces.pieces.find(piece => 
                piece.name === "Rook" && 
                piece.color === color&& 
                piece?.castle_index === "short").has_moved

            if(areSquaresFreeAndSafe && !hasRookMoved) {
                if(color === "white") {
                    return "g1"
                }else {
                    return "g8"
                }
            }
        }

        return false
    }

    static long(color) {
        if(!KingService.get_current_king().has_moved) {
            const areSquaresFreeAndSafe = this.areSquaresFreeAndSafe(
                color === "white" ?
                    ["b1", "c1", "d1"]
                :
                    ["b8", "c8", "d8"]
            )
            
            const hasRookMoved = Pieces.pieces.find(piece => 
                piece.name === "Rook" && 
                piece.color === color && 
                piece?.castle_index === "long").has_moved

            if(areSquaresFreeAndSafe && !hasRookMoved) {
                if(color === "white") {
                    return "c1"
                }else {
                    return "c8"
                }
            }
        }

        return false
    }

    static castle(type) {
        const color = KingService.get_current_king().color
        if(type === "short") {     
            const castle_rook = Pieces.pieces.find(piece => 
                piece.name === 'Rook' && 
                piece.color === color &&
                piece.castle_index === "short"
            )

            if(color === "white") {
                Pieces.move_piece(castle_rook, "f1")
            }else {
                Pieces.move_piece(castle_rook, "f8")
            }
        }else {
            const castle_rook = Pieces.pieces.find(piece => 
                piece.name === 'Rook' && 
                piece.color === color &&
                piece.castle_index === "long"
            )

            if(color === "white") {
                Pieces.move_piece(castle_rook, "d1")
            }else {
                Pieces.move_piece(castle_rook, "d8")
            }
        }
    } 

    static getMoves(color) {
        const short = this.short(color)
        const long = this.long(color)
        return [short, long].filter(item => item)
    }
}

export default CastleService