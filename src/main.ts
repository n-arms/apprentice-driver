import { renderField, robotCoords } from "./render.js"
import { Field, FixedController } from "./field.js"
import { Point } from "./point.js"

const canvas = document.getElementById("field-canvas");

if (canvas instanceof HTMLCanvasElement) {
    const dims = new Point(20.0, 20.0);
    const field = new Field(dims, new FixedController(10, 5));

    let last = Date.now();

    const render = () => {
        const current = Date.now();
        const ellapsed = current - last;
        last = current;

        field.tick(ellapsed / 1000);
        renderField(canvas, field);

        window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
} else {
    throw new Error(`expected canvas to be an HTMLCanvasElement, found a ${typeof canvas} instead`);
}
