class Bounds {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Check whether to classes that have bounds intersect one another. This is done by using eight points
     * and comparing the corner positions' x and y values.
     * @param {bounds} other used for collision detection
     */
    intersects(other) {
        
        if (this.x < other.x + other.width && this.x + this.width > other.x &&
            this.y < other.y + other.height && this.y + this.height > other.y) 
            return true;
        return false;
    }
}
