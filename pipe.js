class Pipe {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.width = 52;
        this.height = 320;
        this.image = image;

        this.bounds = new Bounds(this.x, this.y, this.width, this.height);
    }

    /**
     * Bounds has to be updated every time the pipe is moved so collision detection
     * can still work between objects.
     * @param {int} x the x position of bounds 
     * @param {int} y the y position of bounds
     */
    update(x, y) {
        this.bounds.x = x;
        this.bounds.y = y;
    }

    /**
     * Renders the pipe to the screen.
     */
    render() {
        image(this.image, this.x, this.y, this.width, this.height);
    }
}
