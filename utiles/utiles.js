
class Utiles {
    static x_indexes = ["a", "b", "c", "d", "e", "f", "g", "h"]

    static createElement(tag, className, content) {
        const element = document.createElement(tag)
        element.className = className
        element.textContent = content
        return element
    }
}

export default Utiles