import Pieces from "../Pieces.js"

class Piece {
    constructor(name, img, color, coordinates, value) {
        this.name = name
        this.img = img
        this.color = color
        this.coordinates = coordinates
        this.value = value
        this.moves = []
    }
    
    is_protected = false
}

export default Piece

