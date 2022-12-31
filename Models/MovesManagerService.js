

class MovesManagerService {
    static moves = []

    static push_just_move(piece, to) {
        switch(piece.name) {
            case "Pawn":
                this.moves.push(to)
                break
            case "Knight":
                this.moves.push('N' + to)
                break
            default:
                this.moves.push(piece.name[0] + to)
        }
    }

    static push_capture_move(attacking_piece, target_piece) {
        let attacker = null
        let target = null

        switch(attacking_piece.name) {
            case "Pawn":
                attacker = attacking_piece.coordinates
                break
            case "Knight":
                attacker = 'N' + attacking_piece.coordinates
                break
            default:
                attacker = attacking_piece.name[0] + attacking_piece.coordinates
        }

        switch(target_piece.name) {
            case "Pawn":
                target = target_piece.coordinates
                break
            case "Knight":
                target = 'N' + target_piece.coordinates
                break
            default:
                target = target_piece.name[0] + target_piece.coordinates
        }

        this.moves.push(attacker + "x" + target)
    }
}

export default MovesManagerService