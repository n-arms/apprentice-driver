import { renderField } from "./render.js"
import { Field } from "./field.js"
import { Point } from "./point.js"

const canvas = document.getElementById("field-canvas")

if (canvas instanceof HTMLCanvasElement) {
    const dims = new Point(10.0, 10.0)
    const field = new Field(dims)
    renderField(canvas, field)
} else {
    console.log(`expected canvas to be an HTMLCanvasElement, found a ${typeof canvas} instead`)
}
