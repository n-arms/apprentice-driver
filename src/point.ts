

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Calculate the vector sum V + other
    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    // Calculate the vector product V * s 
    scale(scale: number): Point {
        return new Point(this.x * scale, this.y * scale);
    }

    // Rotate the point `angle` radians counterclockwise
    rotate(angle: number): Point {
        return new Point(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) - this.y * Math.cos(angle)
        );
    }
}
