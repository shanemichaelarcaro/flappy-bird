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
        this.terminalVelocity = 17;
        this.tick = 0;

        this.playing = false;
        this.gameOver = false;
        this.bounds = new Bounds(this.x, this.y, this.width, this.height);
    }

    /**
     * Updates the index of the bird. The next time the bird is rendered to the screen
     * the image will be different creating animation.
     */
    animate() {
        if (this.tick % 10 != 0)
            return;
        this.tick = 0;
        if (this.index < this.images.length - 1) 
            this.index += 1;
        else
            this.index = 0;
    }

    /**
     * Rotate the bird based on an angle and render it to the screen.
     * Push and pop must be used so that the rotation and translations that take
     * place are relative to this function alone and do not interfere with the outside.
     */
    rotateRender() { 
        push();
        imageMode(CENTER);
        translate(this.x + this.width / 2, this.y + this.height / 2);
        angleMode(DEGREES);
        rotate(this.angle);
        image(this.images[this.index], 0, 0, this.width, this.height);
        pop();
    }

    /**
     * Calculates the velocity of the bird using the formula V = gt + Vi where
     * v = velocity, g = gravity, t = time, vi = initialVelocity
     * 
     * The bounds and animation cycle are also updated.
     */
    update() {
        // 17 acts as terminal velocity for the bird
        if (this.time < this.terminalVelocity)
            this.time += 1;
            
        this.velocity = this.gravity * this.time + this.initialVelocity;
        this.y += this.velocity;
        this.bounds.y = this.y;

        if (!this.gameOver) {
            this.calculateAngle();
            this.animate();
        }
        this.tick += 1;

        this.checkBoundaries();
    }

    checkBoundaries() {
        if (this.y < 0 || this.y > 515 - this.height) {
            this.gameOver = true;
            this.angle = 90;
            console.log("YES", this.angle);

            this.rotateRender();
            redraw();
        }
    }

    /**
     * Changes the time into a negative value to simulate jumping as
     * velocity will become positive by a huge margin and increase until
     * it becomes positive again.
     */
    jump() {
        this.time = -this.terminalVelocity;
    }

    /**
     * Calculates the angle the bird should be pointing at by normalizing
     * the time between -1 and 1. This allows for the normalized value to be
     * multiplied by an offset (-45) and create a bounded angle rotation,
     * in this case [-45, +45].
     */
    calculateAngle() {
        const normalizedData = this.gameOver ? ((this.time / -this.terminalVelocity) / 2) + 0.5 : 
                                                 this.time / -this.terminalVelocity;
        this.angle = this.gameOver ? normalizedData * -135 + 90 : normalizedData * -45;
        console.log('Normal Data:', normalizedData);
        // this.angle = normalizedData * -135 + 90;

        console.log('Angle:', this.angle);
    }
}
