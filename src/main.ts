import { renderField, robotCoords } from "./render.js"
import { Field, FixedController, CodeController } from "./field.js"
import { Point } from "./point.js"

const canvas = document.getElementById("field-canvas");
const codeArea = document.getElementById("code-text-area");
const updateCodeButton = document.getElementById("update-code-button");
const codeErrorArea = document.getElementById("code-error-text-area");

if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(`expected canvas to be an HTMLCanvasElement, found a ${typeof canvas} instead`);
} else if (!(codeArea instanceof HTMLTextAreaElement)) {
    throw new Error(`expected code area to be an HTMLTextAreaElement, found a ${typeof codeArea} instead`);
} else if (!(updateCodeButton instanceof HTMLButtonElement)) {
    throw new Error(`expected code update button to be an HTMLButtonElement, found a ${typeof updateCodeButton} instead`);
} else if (!(codeErrorArea instanceof HTMLTextAreaElement)) {
    throw new Error(`expected code error area to be an HTMLTextAreaElement, found a ${typeof codeErrorArea} instead`);
} else {
    const dims = new Point(20.0, 20.0);
    const controller = new CodeController(codeArea, codeErrorArea);
    const field = new Field(dims, controller);

    updateCodeButton.addEventListener("click", () => controller.updated = false);


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
}
