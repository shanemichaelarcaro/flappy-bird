class Pipe {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.width = 52;
        this.height = 320;
        this.image = image;

        this.bounds = new Bounds(this.x, this.y, this.width, this.height);
    }

    render() {

    }
}