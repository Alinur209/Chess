import Board from "../Board.js"


class MocMoveService {
    static board = []

    static findByCoordinates(abs_coordinates) {
        const item = this.board.find(item => item.abs_coordinates === abs_coordinates)
        return item
    }

    static generateBoard(pieces) {
        this.board = []
        const squares = Board.getSquares()
        squares.forEach(square => {
            this.board.push(
                {
                    coordinates: square.getAttribute("coordinates"),
                    abs_coordinates: square.getAttribute("abs_coordinates"),
                    piece_color: square.getAttribute("piece_color") || null
                }    
            )
        })

        console.log({pieces, moc_board: this.board})
    }
}

export default MocMoveService 