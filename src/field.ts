import { Point } from "./point.js"

interface Controller {
    left: () => number;
    right: () => number;
}

class FixedController {
    leftConstant: number;
    rightConstant: number;

    constructor(left, right) {
        this.leftConstant = left;
        this.rightConstant = right;
    }

    left(): number {
        return this.leftConstant
    }

    right(): number {
        return this.rightConstant
    }
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
        this.robot.tick(this.robotController.left(), this.robotController.right(), seconds);
    }
}
