import Utiles from "../Utiles/utiles.js";
import Board from "../Services/Board.js";
import Game from "../Game.js";
import KingService from "../Services/KingService.js";
import Piece from "./Piece.js";
import Pieces from "../Services/Pieces.js";

class Pawn extends Piece {
    attack_moves = []
    front_moves = []
    attack_range = []

    get_attack_moves() {
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])
        let result = []
        let attack_range = []
        let left_square = null
        let right_square = null
        const x_index = Utiles.x_indexes.indexOf(x)

        if(this.color === "white") {
            if(x_index === 0) {
                right_square = Board.getSquare(Utiles.x_indexes[x_index + 1] + (y + 1))    
            }else if(x_index === 7) {
                left_square = Board.getSquare(Utiles.x_indexes[x_index - 1] + (y + 1))     
            }else {
               left_square = Board.getSquare(Utiles.x_indexes[x_index - 1] + (y + 1))
               right_square = Board.getSquare(Utiles.x_indexes[x_index + 1] + (y + 1))
            }

            if(left_square?.getAttribute("coordinates")) {
                attack_range.push(left_square.getAttribute("coordinates"))   
            }

            if(right_square?.getAttribute("coordinates")) {
                attack_range.push(right_square.getAttribute("coordinates"))
            }

            if(left_square?.getAttribute("abs_coordinates").length === 3 && left_square.getAttribute("piece_color") !== this.color) {
                result.push(left_square.getAttribute("abs_coordinates"))
            }else if(left_square?.getAttribute("abs_coordinates").length === 3 && left_square.getAttribute("piece_color") === this.color) {
                if(left_square.getAttribute("abs_coordinates")[0] === "K") {
                    const king = KingService.get_opposite_king()
                    king.pushAtackingMoves(this.name[0] + this.coordinates)
                }
                Pieces.protectPiece(left_square)
            }
            if(right_square?.getAttribute("abs_coordinates").length === 3 && right_square.getAttribute("piece_color") !== this.color) {
                if(right_square.getAttribute("abs_coordinates")[0] === "K") {
                    const king = KingService.get_opposite_king()
                    king.pushAtackingMoves(this.name[0] + this.coordinates)
                }
                result.push(right_square.getAttribute("abs_coordinates"))
            } else if(right_square?.getAttribute("abs_coordinates").length === 3 && right_square.getAttribute("piece_color") === this.color) {
                Pieces.protectPiece(right_square)
            }
    
            
        }else {
            if(x_index === 0) { 
                right_square = Board.getSquare(Utiles.x_indexes[x_index + 1] + (y - 1))
            }else if(x_index === 7) { 
                right_square = Board.getSquare(Utiles.x_indexes[x_index - 1] + (y - 1))   
            }else {
                left_square = Board.getSquare(Utiles.x_indexes[x_index - 1] + (y - 1))
                right_square = Board.getSquare(Utiles.x_indexes[x_index + 1] + (y - 1))
            }

            if(left_square?.getAttribute("coordinates")) {
                attack_range.push(left_square.getAttribute("coordinates"))
            }

            if(right_square?.getAttribute("coordinates")){
                attack_range.push(right_square.getAttribute("coordinates"))
            }

            if(left_square?.getAttribute("abs_coordinates").length === 3 && left_square.getAttribute("piece_color") !== this.color) {
                if(right_square.getAttribute("abs_coordinates")[0] === "K") {
                    const king = KingService.get_opposite_king()
                    king.pushAtackingMoves(this.name[0] + this.coordinates)
                }
                result.push(left_square.getAttribute("abs_coordinates"))
            } else if(left_square?.getAttribute("abs_coordinates").length === 3 && left_square.getAttribute("piece_color") === this.color) {
                Pieces.protectPiece(left_square)
            }
            
            if(right_square?.getAttribute("abs_coordinates").length === 3 && right_square.getAttribute("piece_color") !== this.color) {
                if(right_square.getAttribute("abs_coordinates")[0] === "K") {
                    const king = KingService.get_opposite_king()
                    king.pushAtackingMoves(this.name[0] + this.coordinates)
                }
                result.push(right_square.getAttribute("abs_coordinates"))
            }else if(right_square?.getAttribute("abs_coordinates").length === 3 && right_square.getAttribute("piece_color") === this.color) {
                Pieces.protectPiece(right_square)
            }
        }

        this.attack_range = attack_range
        this.attack_moves = result
        return result
    }   

    get_front_moves() {
        const x = this.coordinates[0]
        const y = Number(this.coordinates[1])
        let result = []

        const is_initial_position = this.color === "white" ? y === 2 : y === 7

        if(this.color === "white") {
            const square = Board.getSquare(x + (y + 1))
            if(square?.getAttribute("abs_coordinates").length === 2) {
                result.push(square.getAttribute("abs_coordinates"))
                if(is_initial_position && Board.getSquare(x + (y + 2)).getAttribute('abs_coordinates').length === 2) {
                    result.push(x + (y + 2))
                }
            }
        }else {
            const square = Board.getSquare(x + ( y - 1))

            if(square?.getAttribute("abs_coordinates").length === 2) {
                result.push(square.getAttribute("abs_coordinates"))
                if(is_initial_position && Board.getSquare(x + (y - 2)).getAttribute('abs_coordinates').length === 2) {
                    result.push(x + (y - 2))
                }
            }
        }

        this.front_moves = result
        return result
    }

    defineMoves() {
        if(KingService.isSafeKing(Pieces.pieces) || KingService.get_current_king().color !== this.color) {
            this.get_attack_moves()
            this.get_front_moves()
            this.moves = [...this.attack_moves, ...this.front_moves]
            return this.moves
        }else {
            const ally_king = KingService.get_current_king()
            this.get_attack_moves()
            this.get_front_moves()
            const moves = [...this.attack_moves, ...this.front_moves].filter(move => ally_king.attacking_stream.flat().includes(move))

            this.moves = moves
            return moves
        }
    }
}

export default Pawn