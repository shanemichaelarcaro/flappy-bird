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

        console.log('X:', this.x);
        console.log('Y:', this.y);
        console.log('Width:', this.width);
        console.log('Height:', this.height);
        console.log('Center:', this.x + this.width / 2, this.y + this.height / 2);
    }

    animate() {
        if (this.index == images.length)
            this.index = 0;
        else
            this.index += 1;
    }

    rotateRender() {
        ellipse(width / 2 - 3, height / 2 - 3, 6, 6);
        imageMode(CENTER);
        translate(this.x + this.width / 2, this.y + this.height / 2);
        angleMode(DEGREES);
        rotate(this.angle);
        image(this.images[this.index], 0, 0, this.width, this.height);
    }


    update() {
        if (this.time < 17)
            this.time += 1;
        this.velocity = this.gravity * this.time + this.initialVelocity;
        this.y += this.velocity;

        this.calculateAngle();
    }

    jump() {
        this.time = -17;
    }

    calculateAngle() {
        const normalizedData = this.time / -17;
        this.angle = normalizedData * -45;
    }
}