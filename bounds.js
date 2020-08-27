class Bounds {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    intersects(other) {
        return (other.x > this.x || other.x < this.x + this.width ||
            other.y > this.y || other.y < this.y + this.height);
    }
}