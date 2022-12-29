function setEatenPieces() {
    const black_profile__eaten_list = document.querySelector(".oponent_profile__eaten_list")
    const white_profile__eaten_list = document.querySelector(".player_profile__eaten_list")

    black_profile__eaten_list.innerHTML = ''
    white_profile__eaten_list.innerHTML = ''

    eatenPieces.sort((a,b) => b.value - a.value)
    eatenPieces.forEach(piece => {
        const eatenPieceView = createElement("li", "eaten_piece")
        const eaten_img = createElement("img", "eaten_img")
        eaten_img.src = piece.img
        eatenPieceView.append(eaten_img)

        if(piece.color === "white") {
            black_profile__eaten_list.appendChild(eatenPieceView)
        }else if(piece.color === "black") {
            white_profile__eaten_list.appendChild(eatenPieceView)
        }
    })

    const valueDiff = eatenPieces.reduce((prev, piece) => piece.color === "white" ? prev - piece.value: prev + piece.value, 0)

    if(valueDiff > 0) {
        const score = createElement("li", "score", `+${Math.abs(valueDiff)}`)
        white_profile__eaten_list.appendChild(score)
    }else {
        if(valueDiff !== 0) {
            const score = createElement("li", "score", `+${Math.abs(valueDiff)}`)
            black_profile__eaten_list.appendChild(score)
        }
    }
}
