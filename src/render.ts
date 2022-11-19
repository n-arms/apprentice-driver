import { Field } from "./field.js"

type RenderError = 
    | "CanvasAPIUnsupported";

export function renderField(canvas: HTMLCanvasElement, field: Field): RenderError | void {
    const ctx = canvas.getContext("2d");
    if (!ctx) return "CanvasAPIUnsupported";

    const size = Math.min(canvas.width, canvas.height);

    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, size, size);

}

