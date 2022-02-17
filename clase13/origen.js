const getNum0to255 = () => Math.floor(Math.random() *256);

class color {
    get () {
        const color = `rgb(${getNum0to255()},${getNum0to255()},${getNum0to255()})`
    }
}

const Color = new color()

color.get()