const w : number = window.innerWidth
const h : number = window.innerHeight
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
