import Utiles from "./Utiles/utiles.js"
import Board from "./Board.js"
import CastleService from "./Services/CastleService.js"
import Game from "./Game.js"
import KingService from "./Services/KingService.js"
import Bishop from "./Models/Bishop.js"
import King from "./Models/King.js"
import Knight from "./Models/Knight.js"
import Pawn from "./Models/Pawn.js"
import Queen from "./Models/Queen.js"
import Rook from "./Models/Rook.js"
import PromotionService from "./Services/PromotionService.js"

class Pieces {      
    static pieces = []

    static initPieces() {
        // PAWNS
        for(let i = 0; i < 8; i++) {
            this.pieces.push(new Pawn("Pawn", "..//media/pieces/pawn-b.png", "black", Utiles.x_indexes[i] + 7, 1))
            this.pieces.push(new Pawn("Pawn", "../media/pieces/pawn-w.png", "white", Utiles.x_indexes[i] + 2, 1))
        }

        this.pieces.push(
            // KNIGHT
            new Knight("Knight", "../media/pieces/knight-b.png", "black", Utiles.x_indexes[6] + 8, 3),
            new Knight("Knight", "../media/pieces/knight-b.png", "black", Utiles.x_indexes[1] + 8, 3),
            new Knight("Knight", "../media/pieces/knight-w.png", "white", Utiles.x_indexes[6] + 1, 3),
            new Knight("Knight", "../media/pieces/knight-w.png", "white", Utiles.x_indexes[1] + 1, 3),

            //BISHOP
            new Bishop("Bishop", "../media/pieces/bishop-b.png", "black", Utiles.x_indexes[5] + 8, 3),
            new Bishop("Bishop", "../media/pieces/bishop-b.png", "black", Utiles.x_indexes[2] + 8, 3),
            new Bishop("Bishop", "../media/pieces/bishop-w.png", "white", Utiles.x_indexes[5] + 1, 3),
            new Bishop("Bishop", "../media/pieces/bishop-w.png", "white", Utiles.x_indexes[2] + 1, 3),

            // ROOK
            new Rook("Rook", "../media/pieces/rook-b.png", "black", Utiles.x_indexes[0] + 8, 5),
            new Rook("Rook", "../media/pieces/rook-b.png", "black", Utiles.x_indexes[7] + 8, 5),
            new Rook("Rook", "../media/pieces/rook-w.png", "white", Utiles.x_indexes[0] + 1, 5),
            new Rook("Rook", "../media/pieces/rook-w.png", "white", Utiles.x_indexes[7] + 1, 5),
            
            // QUEEN
            new Queen("Queen", "../media/pieces/queen-b.png", "black", Utiles.x_indexes[3] + 8, 8),
            new Queen("Queen", "../media/pieces/queen-w.png", "white", Utiles.x_indexes[3] + 1, 8),

            // KING
            new King("King", "../media/pieces/king-w.png", "white", Utiles.x_indexes[4] + 1, null),
            new King("King", "../media/pieces/king-b.png", "black", Utiles.x_indexes[4] + 8, null),
        )
    }

    static setPieces() {
        const squares = Board.getSquares()
        squares.forEach(square => {
            this.pieces.forEach(piece => {
                if(square.getAttribute("coordinates") === piece.coordinates) {
                    square.style.backgroundImage = `url(${piece.img})`
                    square.style.cursor = "pointer"
                    square.setAttribute("abs_coordinates", piece.name !== "Knight" ? piece.name[0] + piece.coordinates : "N" + piece.coordinates)
                    square.setAttribute("piece_color", piece.color) 
                }
            })
        })

        this.defineMoves()
    }

    static protectPiece(input_piece) {
        this.pieces.forEach(piece => {
            if(piece.coordinates === input_piece.getAttribute("coordinates")) {
                piece.is_protected = true
            }
        })
    }

    static findPiece(coordinates) {
        return this.pieces.find(piece => piece.coordinates === coordinates)
    }

    static move_piece(input_piece, to) {
        const input_piece_color = input_piece.color

        if(input_piece.name === "Rook") {
            input_piece.has_moved = true
        }else if(input_piece.name === "King") {
            input_piece.has_moved = true
        }

       if(
            input_piece.name === "King" && 
            (input_piece_color === "white" ? 
                to === "g1" ||  to === "c1"
            : 
                to === "g8" ||  to === "c8"
            )
       ) {      
            CastleService.castle(to === "g1" ||  to === "g8" ? "short" : "long")
       }

        const piece_square = Board.getSquare(input_piece.coordinates)
        Board.cleanSquare(piece_square)

        this.pieces.forEach(piece => {
            if(piece.coordinates === input_piece.coordinates) {
                piece.is_protected = false
                piece.coordinates = to
            }   
        })

        if(input_piece.name === "Pawn" && (Number(to[1]) === 8 || Number(to[1]) === 1)) {
            PromotionService.promote(input_piece, to)
        } 

        const squares = Board.getSquares()
        squares.forEach(square => {
            if(square.getAttribute("coordinates") === to) {
                square.style.backgroundImage = `url(${input_piece.img})`
                square.style.cursor = "pointer"
                square.setAttribute("abs_coordinates", input_piece.name !== "Knight" ? input_piece.name[0] + input_piece.coordinates : "N" + input_piece.coordinates)
                square.setAttribute("piece_color", input_piece.color) 
            }
        })

        this.defineMoves()
    }

    static remove_piece(piece) {
        this.pieces = [...this.pieces].filter(item => item.coordinates !== piece.coordinates)
    }

    static capture_piece(attacking_piece, target_piece) {
        this.remove_piece(target_piece)
        this.move_piece(attacking_piece, target_piece.coordinates)
    }

    static defineMoves() {
        new Promise(resolve => {
            this.pieces.forEach(piece => piece.name === "King" && piece.defineRange() &&  piece.resetAttackers())
            this.pieces.forEach(piece => piece.defineMoves())
            resolve(this.pieces)
        })
        .then(pieces => {
            KingService.serveKing(pieces)
            this.pieces.forEach(piece => piece.name === "King" && piece.defineRange())
            this.pieces.forEach(piece => piece.defineMoves())
        })
        .finally(() => {
            if(KingService.is_mate()) {
                Game.revealTheWinner(KingService.get_opposite_king().color)
            }
        })
    }

}

export default Pieces