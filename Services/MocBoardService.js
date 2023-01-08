import Bishop from "../Models/Bishop.js";
import King from "../Models/King.js";
import Knight from "../Models/Knight.js";
import Pawn from "../Models/Pawn.js";
import Queen from "../Models/Queen.js";
import Rook from "../Models/Rook.js";
import Utiles from "../Utiles/utiles.js";
import Board from "./Board.js";
import KingService from "./KingService.js";
import Pieces from "./Pieces.js";


class MocBoardService {
    static moc_board = []
    static moc_pieces = []

    static getSquare(coordinates) {
        const item = this.moc_board.find(item => item.coordinates === coordinates)
        const element = Utiles.createElement("div")
        element.setAttribute("abs_coordinates", item.abs_coordinates)
        element.setAttribute("piece_color", item.piece_color)
        return element 
    }
    
    static getAbsCoordinates(coordinates) {
        return this.moc_board.find(item => item.coordinates === coordinates).abs_coordinates
    }

    static getSquareWithPiece(abs_coordinates) {
        const item = this.moc_board.find(item => item.abs_coordinates === abs_coordinates)
        const element = Utiles.createElement("div")
        element.setAttribute("piece_color", item.piece_color)
        return element 
    }

    static generateMocBoard() {
        const moc_board = []
        const squares = Board.getSquares() 
        
        squares.forEach(square => {
            moc_board.push({
                coordinates: square.getAttribute("coordinates"),
                abs_coordinates: square.getAttribute("abs_coordinates"),
                piece_color: square.getAttribute("piece_color") || null,
                name: Utiles.recognizeName(square.getAttribute("abs_coordinates"))
            })
        })

        this.moc_board = moc_board
    }

    static generateMocPieces() {
        const moc_pieces = []

        Pieces.pieces.forEach(piece => {
            switch(piece.name) {
                case "Rook":
                    moc_pieces.push(new Rook("Rook",
                        piece.img,
                        piece.color,
                        piece.coordinates,
                        piece.value
                    ))
                    break
                case "Bishop":
                    moc_pieces.push(new Bishop("Bishop",
                        piece.img,
                        piece.color,
                        piece.coordinates,
                        piece.value
                    ))
                    break
                case "Queen":
                        moc_pieces.push(new Queen("Queen",
                        piece.img,
                        piece.color,
                        piece.coordinates,
                        piece.value
                    ))
                    break

                case "Knight":
                        moc_pieces.push(new Knight("Knight",
                        piece.img,
                        piece.color,
                        piece.coordinates,
                        piece.value
                    ))
                    break
                case "Pawn":
                        moc_pieces.push(new Pawn("Pawn",
                        piece.img,
                        piece.color,
                        piece.coordinates,
                        piece.value
                    ))
                    break
                case 'King':
                        moc_pieces.push(new King("Pawn",
                        piece.img,
                        piece.color,
                        piece.coordinates,
                        piece.value
                    ))
                    break
            }
        })

        this.moc_pieces = moc_pieces
    }

    static make_moc_move(piece, move) {

        this.moc_board.forEach(item => {
            if(item.coordinates === piece.coordinates) {
                item.abs_coordinates = item.coordinates
                item.name = null
                item.piece_color = null
            }
            
            if(item.coordinates === move) {
                item.abs_coordinates = piece.name !== "Knight" ? 
                piece.name[0] + item.coordinates : "N" + item.coordinates

                item.piece_color = piece.color
                item.name = piece.name
            }
        })

        // Alter pieces

        const new_moc_pieces = []
        this.moc_pieces.forEach(game_piece => {
            if(game_piece.coordinates === piece.coordinates) {
                game_piece.coordinates = move.length === 2 ? move:move.slice(1)
            }

            new_moc_pieces.push(game_piece)
        })

        this.moc_pieces = new_moc_pieces
        return this.moc_pieces
    }

    static isSafeMove(piece, move) {
        let result = true

            const current_king = KingService.get_current_king()

            if(piece.color === current_king.color) {
                this.generateMocBoard()
                this.generateMocPieces()

                const new_moc_pieces = this.make_moc_move(piece, move)
                
                new_moc_pieces.forEach(piece => {   
                    if(piece.color !== current_king.color) {
                        piece.defineMoves({type: "Moc", Board: this})
                    }
                })

                if(this.moc_pieces.some(item => {
                    if(
                        item.moves.includes("K" + current_king.coordinates) && 
                        (item.name === "Knight" ? "N":item.name[0]) + item.coordinates !== move
                    ) {
                        return true
                    }
                })) {
                    result = false
                }
            }

        return result
    }
}

export default MocBoardService