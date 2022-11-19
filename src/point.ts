

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

    // Calculate the vector difference V - other
    sub(other: Point): Point {
        return this.add(other.scale(-1));
    }

    // Calculate the vector product [x, y] * [z, w] = [xz, yw]
    pairwiseProduct(other: Point): Point {
        return new Point(this.x * other.x, this.y * other.y);
    }

    // Calculate the vector product V * s 
    scale(scale: number): Point {
        return new Point(this.x * scale, this.y * scale);
    }

    // Rotate the point `angle` radians counterclockwise
    rotate(angle: number): Point {
        return new Point(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }
}

export function transform(minOld: Point, maxOld: Point, minNew: Point, maxNew: Point, old: Point): Point {
    const diffOld = maxOld.sub(minOld);
    const diffNew = maxNew.sub(minNew);

    const scaleX = diffNew.x / diffOld.x;
    const scaleY = diffNew.y / diffOld.y;

    return old.sub(minOld).pairwiseProduct(new Point(scaleX, scaleY)).add(minNew);
}
