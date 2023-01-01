import Utiles from "./Utiles/utiles.js"
import MovesManagerService from "./Services/MovesManagerService.js"
import Pieces from "./Pieces.js"

class Board {
    static getSquares = () => document.querySelectorAll(".square")
    static move = []
    static moveOf = "white"
    static eatenPieces = []

    static draw() {
        const board = document.getElementById("board")
        this.moveOf = "white"

        let isOdd = true
        let y_index = 8
        let x_index = 0

        for(let index = 0; index < 64; index++) {

            const square = Utiles.createElement("div", `square ${isOdd ? "odd":"even"}`)
                square.setAttribute('color', isOdd ? "white":"black")

                if((index + 1) === 1 || index % 8 === 0) { 
                    const yIndex = Utiles.createElement("span", "y_index", y_index)
                    square.append(yIndex)
                    y_index -= 1
                }

                if(index >= 56) {
                    const xIndex = Utiles.createElement("span", "x_index", Utiles.x_indexes[x_index])
                    square.append(xIndex)
                    x_index += 1
                }

                let coordinates = this.getCoordinates(index)
                square.setAttribute("coordinates", coordinates)
                square.setAttribute("abs_coordinates", coordinates)

            board.appendChild(square)

            if((index + 1) % 8 !== 0) {
                isOdd = !isOdd
            }
        }

        this.clickHandler()
    }

    static check() {
        const squares = Board.getSquares()
        squares.forEach(square => {
            if(square.getAttribute("piece_color") === this.moveOf && square.getAttribute("abs_coordinates")[0] === "K") {
                square.append(Utiles.createElement("div", "check_mark"))
            } 
        })
    }
    
    static unCheck() {
        const squares = Board.getSquares()
        squares.forEach(square => {
            if(square.getAttribute("piece_color") === this.moveOf && square.getAttribute("abs_coordinates")[0] === "K") {
                const check_mark = document.querySelector(".check_mark")
                if(check_mark) {
                    check_mark.remove()
                }
            } 
        })
    }

    static clickHandler() {
        const board = document.getElementById("board")

        board.addEventListener("click", e => {
            const coordinates = e.target.getAttribute("abs_coordinates") 
            
            if(coordinates) {
                const target_piece = Pieces.findPiece(coordinates?.slice(1,3))
                // FIRST CLICK
                if(coordinates.length === 3 && !this.move.length) {
    
                    if(target_piece.color === this.moveOf) {
                        this.move.push(target_piece)
                        this.showMoveMarks()
                    }
    
                // SECOND CLICK - MOVE || ATTACK
                }else if(this.move.length && this.move[0].moves.includes(coordinates)) {
    
                    // JUST MOVE
                    if(coordinates.length === 2) {
                        Pieces.move_piece(this.move[0], coordinates)
                        MovesManagerService.push_just_move(this.move[0], coordinates)
                    // ATTACK
                    }else if(coordinates.length === 3) {
                        this.eatenPieces.push(target_piece)
                        MovesManagerService.push_capture_move(this.move[0], target_piece)
                        Pieces.capture_piece(this.move[0], target_piece)
                    }
    
                    this.move = []
                    this.moveOf = this.moveOf === "white" ? "black": "white"
                    this.removeMoveMarks()
    
                // SECOND CLICK - SELECTING OTHER PIECE
                }else if(target_piece && target_piece.color === this.moveOf) {
                    this.move[0] = target_piece
                    this.removeMoveMarks()
                    this.showMoveMarks()
                }
            }
        })
    }


    static showMoveMarks() {
        const squares = this.getSquares()
        squares.forEach(square => {
            const target_abs_coordinates = square.getAttribute("abs_coordinates")
            
            if(this.move[0].moves.includes(target_abs_coordinates)) {
                if(target_abs_coordinates.length === 2) {
                    square.append(Utiles.createElement("div", "move_mark"))
                }else {
                    square.append(Utiles.createElement("div", "move_mark capture"))
                }
            }
        })
    }

    static removeMoveMarks() {
        const marks = document.querySelectorAll(".move_mark")
        marks.forEach(mark => mark.remove())
    }

    static cleanSquare(square) {
        square.removeAttribute("style")
        square.removeAttribute("piece_color")
        square.setAttribute("abs_coordinates", square.getAttribute("coordinates"))
    }


    static getSquare(coordinates) {
        // coordinates.length = 2
        return document.querySelector(`[coordinates=${coordinates}]`)
    }

    static getAbsCoordinates(coordinates) {
        // coordinates.length = 2,3
        return document.querySelector(`[coordinates=${coordinates}]`)?.getAttribute("abs_coordinates")
    }

    static getSquareWithPiece(abs_coordinates) {
        // coordinates.length = 2,3
        return document.querySelector(`[abs_coordinates=${abs_coordinates}]`)
    }

    static getX(index) {
        const n = String(index / 8)
        let result = null
    
            if(Number.isInteger(Number(n))) {
                result = 0
            }else if(n.includes(".125")) {
                result = 1
            }else if(n.includes(".25")){
                result = 2
            }else if(n.includes(".375")){
                result = 3
            }else if(n.includes(".5")){
                result = 4
            }else if(n.includes(".625")){
                result = 5
            }else if(n.includes(".75")){
                result = 6
            }else if(n.includes(".875")){
                result = 7
            }
    
        return Utiles.x_indexes[result]
    }

    static getY(index) {
        return Math.ceil(Math.abs(((index ) / 8) - 8))
    }

    static getCoordinates(index) {
        return this.getX(index) + this.getY(index)
    }

}

export default Board