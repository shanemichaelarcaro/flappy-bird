class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setPoints(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Bounds {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.points = [new Point(this.x, this.y), new Point(this.x + this.width, this.y),
             new Point(this.x, this.y + this.height), new Point(this.x + this.width, this.y + this.height)];
    }

    /**
     * Updates all the points of bounds for collision detection.
     */
    update() {
        this.points[0].setPoints(this.x, this.y);
        this.points[1].setPoints(this.x + this.width, this.y);
        this.points[2].setPoints(this.x, this.y + this.height);
        this.points[3].setPoints(this.x + this.width, this.y + this.height);
        
    }

    /**
     * Check whether to classes that have bounds intersect one another. This is done by using eight points
     * and comparing the corner positions' x and y values.
     * @param {bounds} other used for collision detection
     */
    intersects(other) {
        const p1 = this.points[0];
        const p2 = this.points[1];
        const p3 = this.points[2];
        const p4 = this.points[3];

        const p5 = other.points[0];
        const p6 = other.points[1];
        const p7 = other.points[2];
        const p8 = other.points[3];

        if (p1.x > p5.x && p1.x < p6.x && p1.y > p5.y && p1.y < p8.y)
            return true;
        if (p2.x > p5.x && p2.x < p6.x && p2.y > p5.y && p2.y < p8.y)
            return true;
        if (p3.x > p5.x && p3.x < p6.x && p3.y > p5.y && p3.y < p8.y)
            return true;
        if (p4.x > p5.x && p4.x < p6.x && p4.y > p5.y && p4.y < p8.y)
            return true;

        return false;
    }
}
