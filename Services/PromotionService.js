import Utiles from "../Utiles/utiles.js"
import Board from "../Board.js"
import Pieces from "../Pieces.js"
import Bishop from "../Models/Bishop.js"
import Knight from "../Models/Knight.js"
import Queen from "../Models/Queen.js"
import Rook from "../Models/Rook.js"
import KingService from "./KingService.js"


class PromotionService {

    static openModal(coordinates, color) {    
        const squares = Board.getSquares()
        squares.forEach(square => {
            if(square.getAttribute("coordinates") === coordinates) {
                const modal = Utiles.createElement("div", "modal")

                const color_index = color === "white" ? "w":"b"

                const knight = Utiles.createElement("img", "promotion_image")
                knight.setAttribute("figure", "Knight")
                knight.src = `../media/pieces/knight-${color_index}.png`

                const bishop = Utiles.createElement("img", "promotion_image")
                bishop.setAttribute("figure", "Bishop")
                bishop.src = `../media/pieces/bishop-${color_index}.png`

                const rook = Utiles.createElement("img", "promotion_image")
                rook.setAttribute("figure", "Rook")
                rook.src = `../media/pieces/rook-${color_index}.png`

                const queen = Utiles.createElement("img", "promotion_image")
                queen.setAttribute("figure", "Queen")
                queen.src = `../media/pieces/queen-${color_index}.png`

                modal.append(knight, bishop, rook, queen)
                square.appendChild(modal)

                modal.addEventListener("click", e => {
                    const promoted_target = e.target
                    let promoted_piece = null

                    switch(promoted_target.getAttribute('figure')) {
                        case "Knight":
                            promoted_piece = new Knight("Knight", promoted_target.src, color, coordinates, 3)
                            break
                        case "Bishop":
                            promoted_piece = new Bishop("Bishop", promoted_target.src, color, coordinates, 3)
                            break
                        case "Rook":
                            promoted_piece = new Rook("Rook", promoted_target.src, color, coordinates, 5)
                            break
                        case "Queen":
                            promoted_piece = new Queen("Queen", promoted_target.src, color, coordinates, 8)
                    } 
                    
                    new Promise((resolve, reject) => {

                        const pawn_index = Pieces.pieces.findIndex(item => item.coordinates === coordinates)
                        Pieces.pieces.splice(pawn_index, 1, promoted_piece)

                        const square = Board.getSquare(coordinates)
                        square.setAttribute("abs_coordinates", (promoted_piece.name === "Knight" ? "N":promoted_piece.name[0]) + coordinates)
                        square.setAttribute("piece_color", promoted_piece.color)
                        square.style.backgroundImage = `url(${promoted_piece.img})`
                        resolve(Pieces.pieces)
                    })
                    .then(pieces => {
                        pieces.forEach(piece => piece.name === "King" && piece.defineRange())
                        pieces.forEach(piece => piece.defineMoves())
                        KingService.serveKing(pieces)
                        
                    })
                    
                    modal.remove()
            })
            }
        })
    }

    static promote(pawn, to) {
        this.openModal(to, pawn.color)
    }
}

export default PromotionService