class Bird {
    constructor(x, y, images) {
        this.x = x;
        this.y = y;
        this.images = images;
        this.index = 0;

        this.angle = 0;
        this.width = 34;
        this.height = 24;

        this.velocity = 0;
        this.gravity = 0.4;
        this.time = 0;
        this.initialVelocity = 0.3;

        this.playing = false;
    }

    animate() {
        if (this.index == images.length)
            this.index = 0;
        else
            this.index += 1;
    }

    rotateRender() {
        radians = PI * 180 / this.angle;

        imageMode(CENTER);
        translate(this.width / 2, this.height / 2);
        image(this.images[this.index], this.x, this.y, this.width, this.height);

    }

    addGravity() {
        this.time += 1;
        this.velocity = this.gravity * this.time + this.initialVelocity;
    }

    update() {
        this.addGravity();
        this.y += this.velocity;
    }

    jump() {
        this.time = -15;
    }
}