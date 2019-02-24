const w : number = window.innerWidth
const h : number = window.innerHeight
const nodes : number = 5
const lines : number = 4
const scGap : number = 0.05
const scDiv : number = 0.51
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const foreColor : string = "#673AB7"
const backColor : string = "#212121"

const maxScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.max(0, scale - i / n)
}

const divideScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.min(1 / n, maxScale(scale, i, n)) * n
}

const scaleFactor : Function = (scale : number) : number => {
    return Math.floor(scale / scDiv)
}

const mirrorValue : Function = (scale : number, a : number, b : number) : number => {
    return (1 - scaleFactor(scale)) / a + (scaleFactor(scale)) / b
}

const updateValue : Function = (scale : number, dir : number, a : number, b : number) : number => {
    return mirrorValue(scale, a, b) * dir * scGap
}

const drawLRENode : Function = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const gap : number = h / (nodes + 1)
    const size : number = gap / sizeFactor
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    const yGap : number = (size) / (lines)
    var y : number = 0
    context.strokeStyle = foreColor
    context.lineCap = 'round'
    context.lineWidth = Math.min(w, h) / strokeFactor
    context.save()
    context.translate(w / 2, gap * (i + 1))
    for (var j = 0; j < lines; j++) {
        const sc : number = divideScale(sc1, j, lines)
        y += sc * size
        for (var k = 0; k < 2; k++) {
            context.save()
            context.translate(0, y * (1 - 2 * k))
            for (var e = 0; e < 2; e++) {
                context.save()
                context.rotate(Math.PI/2 * (1 - 2 * e))
                context.beginPath()
                context.moveTo(0, 0)
                context.lineTo(0, -size / 2)
                context.stroke()
                context.restore()
            }
            context.restore()
        }
    }
    context.restore()
}

class LadderRotExpandStage {
    canvas : HTMLCanvasElement
    context : CanvasRenderingContext2D
    
    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : LadderRotExpandStage = new LadderRotExpandStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
