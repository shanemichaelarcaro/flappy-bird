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
        this.tick = 0;

        this.playing = false;
        this.bounds = new Bounds(this.x, this.y, this.width, this.height);

        console.log("Y", this.y);
        console.log();
    }

    animate() {
        if (this.tick % 10 != 0)
            return;
        this.tick = 0;
        if (this.index < this.images.length - 1) 
            this.index += 1;
        else
            this.index = 0;
    }

    rotateRender() { 
        rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
        push();
        imageMode(CENTER);
        translate(this.x + this.width / 2, this.y + this.height / 2);
        angleMode(DEGREES);
        rotate(this.angle);
        image(this.images[this.index], 0, 0, this.width, this.height);
        pop();
        
    }

    update() {
        if (this.time < 17)
            this.time += 1;
        this.velocity = this.gravity * this.time + this.initialVelocity;
        this.y += this.velocity;
        
        this.bounds.y = this.y;
        this.bounds.update();

        this.calculateAngle();
        this.animate();
        this.tick += 1;
    }

    jump() {
        this.time = -17;
    }

    calculateAngle() {
        const normalizedData = this.time / -17;
        this.angle = normalizedData * -45;
    }

    getBoundaires() {
        
    }
}