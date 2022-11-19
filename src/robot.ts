import { Point } from "./point.js"

export class Robot {
    // The position of the turning centre of the robot in cm.
    position: Point;
    // The angle of the robot. 
    // At 0 the robot is facing east, 
    // at pi / 2 the robot is facing north, 
    // at pi the robot is facing west, 
    // at 3 pi / 2 the robot is facing south.
    angle: number;
    // The radius of the robot's wheels in cm.
    wheelRadius: number;
    // Turning radius of the robot in cm .
    // The turning radius is the radius of the circle drawn by the robot when one wheel goes forwards and the other goes backwards.
    turningRadius: number;

    constructor(wheelRadius: number, turningRadius: number) {
        this.position = new Point(0, 0);
        this.angle = 0;
        this.wheelRadius = wheelRadius;
        this.turningRadius = turningRadius;
    }

    // Find the speed (cm/s) and angular velocity (rev/s) given the speeds of the wheels (rev/s)
    delta(left: number, right: number): {speed: number, angularVelocity: number} {
        const wheelCircumference = Math.PI * this.wheelRadius * 2;
        const speed = wheelCircumference * (left + right) / 2;

        const turningCircumference = Math.PI * this.turningRadius * 2;
        const angularVelocity = this.turningRadius * (left - right) / this.wheelRadius;

        return { speed, angularVelocity };
    }

    // simulate the robot for a number of seconds given the speeds of the wheels (rev/s)
    tick(left: number, right: number, seconds: number) {
        const delta = this.delta(left, right);
        const distance = delta.speed * seconds;
        const revolutions = delta.angularVelocity * seconds;
        this.angle += revolutions * 2 * Math.PI;
        const offset = new Point(distance, 0).rotate(this.angle);
        this.position = this.position.add(offset);
    }
}
