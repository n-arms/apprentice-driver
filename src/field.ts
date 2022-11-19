import { Point } from "./point.js"
import { Robot } from "./robot.js"

interface Controller {
    speeds: () => { left: number, right: number }
}

export class FixedController {
    leftConstant: number;
    rightConstant: number;

    constructor(left: number, right: number) {
        this.leftConstant = left;
        this.rightConstant = right;
    }

    speeds(): { left: number, right: number} {
        return { left: this.leftConstant, right: this.rightConstant };
    }
}

export class CodeController {
    updated: boolean;
    codeSource: HTMLTextAreaElement;
    errorField: HTMLTextAreaElement;
    code: () => { left: number, right: number };
    rawCode: string;

    constructor(codeSource: HTMLTextAreaElement, errorField: HTMLTextAreaElement) {
        this.codeSource = codeSource;
        this.errorField = errorField;
        this.updated = true;
        this.rawCode = codeSource.value;
        this.code = compileControllerCode(this.rawCode, errorField);
    }

    speeds(): { left: number, right: number } {
        if (!this.updated) {
            this.rawCode = this.codeSource.value;
            this.code = compileControllerCode(this.rawCode, this.errorField);
        }
        this.updated = true;
        return this.code();
    }
}

const explainCode = `
Try writing a main function that returns an array containg the speed of the left and right motors. For example:

function main() {
    return [10, 10];
}`;

function compileControllerCode(code: string, errorField: HTMLTextAreaElement): () => { left: number, right: number } {
    try {
        const fullCode = "(() => {\n" + code + "\nreturn main})"
        const compiled = eval(fullCode)()
        if (typeof compiled !== "function") {
            errorField.value = `Error while compiling code:
main is not a function
` + explainCode;
        } else {

            errorField.value = "";
            return () => {
                try {
                    let [left, right] = compiled();
                    return { left, right };
                } catch (e) {
                    errorField.value = `Error while running controller code:
${e}`;
                    return { left: 0, right: 0 };
                }
            }
        }
    } catch (e) {
        errorField.value = `Error while compiling code:
${e}
` + explainCode;
    }
    return () => ({ left: 0, right: 0 });
}

export class Field {
    dimensions: Point;
    robot: Robot;
    robotController: Controller;

    constructor(dimensions: Point, controller: Controller) {
        this.dimensions = dimensions;
        this.robot = new Robot(10, 100);
        this.robotController = controller;
    }

    tick(seconds: number) {
        const { left, right } = this.robotController.speeds();
        this.robot.tick(left, right, seconds);

        if (this.robot.position.x > this.dimensions.x / 2 * 100) {
            console.log(`collision: ${this.robot.position.x}, ${this.robot.position.y} is out of bounds (x too big)`)
            this.robot.position.x = this.dimensions.x / 2 * 100;
        }
        if (this.robot.position.y > this.dimensions.y / 2 * 100) {
            console.log(`collision: ${this.robot.position.x}, ${this.robot.position.y} is out of bounds (y too big)`)
            this.robot.position.y = this.dimensions.y / 2 * 100;
        }
        if (-this.robot.position.x > this.dimensions.x / 2 * 100) { 
            console.log(`collision: ${this.robot.position.x}, ${this.robot.position.y} is out of bounds (x too small)`)
            this.robot.position.x = -this.dimensions.x / 2 * 100;
        }
        if (-this.robot.position.y > this.dimensions.y / 2 * 100) {
            console.log(`collision: ${this.robot.position.x}, ${this.robot.position.y} is out of bounds (y too small)`)
            this.robot.position.y = -this.dimensions.y / 2 * 100;
        }
    }
}
