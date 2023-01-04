
class Utiles {
    static x_indexes = ["a", "b", "c", "d", "e", "f", "g", "h"]

    static recognizeName(abs_coordinates) {
        switch(abs_coordinates[0]) {
            case "P":
                return "Pawn"
            case "N":
                return "Knight"
            case "B":
                return "Bishop"
            case "R":
                return "Rook"
            case "Q":
                return "Queen"
            case "K":
                return "king"
            default:
                return null
        }
    } 

    static createElement(tag, className, content) {
        const element = document.createElement(tag)
        element.className = className
        element.textContent = content
        return element
    }
}
export default Utiles