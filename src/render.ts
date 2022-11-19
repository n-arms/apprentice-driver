import { Field } from "./field.js"
import { Point, transform } from "./point.js"
import { Robot } from "./robot.js"

type RenderError = 
    | "CanvasAPIUnsupported";


export function renderField(canvas: HTMLCanvasElement, field: Field): RenderError | void {
    const ctx = canvas.getContext("2d");
    if (!ctx) return "CanvasAPIUnsupported";

    const size = Math.min(canvas.width, canvas.height);

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, size, size);


    const { a, b, c, d, centre, radius } = robotCoords(field.robot);

    const canvasRadius = radius * size / field.dimensions.x;
    const toCanvas = (point: Point) => transform(
        field.dimensions.scale(-1/2),
        field.dimensions.scale(1/2),
        new Point(0, 0),
        new Point(size, size),
        point
    );


    ctx.fillStyle = "#444444";

    ctx.beginPath();
    ctx.moveTo(...unpack(toCanvas(a)));
    ctx.lineTo(...unpack(toCanvas(b)));
    ctx.lineTo(...unpack(toCanvas(c)));
    ctx.lineTo(...unpack(toCanvas(d)));
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(...unpack(toCanvas(centre)), canvasRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

}

function unpack(point: Point): [number, number] {
    return [point.x, point.y];
}

export function robotCoords(robot: Robot): {a: Point, b: Point, c: Point, d: Point, centre: Point, radius: number} {
    const halfHeight = robot.turningRadius;
    const halfWidth = robot.turningRadius / 2;
    const aR = new Point(-halfWidth, halfHeight);
    const bR = new Point(halfWidth, halfHeight);
    const cR = new Point(halfWidth, -halfHeight);
    const dR = new Point(-halfWidth, -halfHeight);
    const centreR = new Point(halfWidth, 0);
    
    const a = robot.position.add(aR.rotate(robot.angle)).scale(1/100);
    const b = robot.position.add(bR.rotate(robot.angle)).scale(1/100);
    const c = robot.position.add(cR.rotate(robot.angle)).scale(1/100);
    const d = robot.position.add(dR.rotate(robot.angle)).scale(1/100);
    const centre = robot.position.add(centreR.rotate(robot.angle)).scale(1/100);

    const radius = halfHeight / 100;

    return { a, b, c, d, centre, radius };
}
