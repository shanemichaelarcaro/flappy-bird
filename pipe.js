class Pipe {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.width = 52;
        this.height = 320;
        this.image = image;

        this.bounds = new Bounds(this.x, this.y, this.width, this.height);
        console.log("X", this.x);
        console.log("Y", this.y);
        console.log("Width", this.width);
        console.log("Height", this.height);
        console.log(this.bounds.points);
        console.log();
    }

    render() {
        rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
        image(this.image, this.x, this.y, this.width, this.height);
    }
}