class PipeManager {
    constructor(image1, image2) {
        this.image1 = image1;
        this.image2 = image2;

        this.pipes = [];
        this.previousY = 180;

        this.upperPush = -370;
        this.lowerPush = 50;
        this.score = 0;
        this.highscore = 0;
        this.newHighscore = false;

        this.randomValues = [];
        for (let i = 0; i < 200; i++)
            this.randomValues.push(this.calculatePositions());
    }

    /**
     * Generates a random Y values within specific bounds of the canvas. The point that is generated is used as
     * a base point for the pipes. An offset is applied to both pipes, upperPush and lowerPush, to put them in
     * the proper positions.
     */
    randomY() {
        const upperBounds = this.previousY - 175;
        const lowerBounds = this.previousY + 175;
        return parseInt(random(upperBounds > 150 ? upperBounds : 150, lowerBounds < 375 ? lowerBounds : 375), 10);
    }

    /**
     * Uses randomY() to generate a random location on the board and updates previousY so that the next value generated
     * cannot be too far from the current value. An array of the upper and lower value are returned for the upper and lower pipes.
     */
    calculatePositions() {
        let y = this.randomY();
        this.previousY = y;
        return [y + this.upperPush, y + this.lowerPush];
    }

    /**
     * Adds two pipes to the canvas with randomY values but a static x value. The x value is off the screen to the right
     * which allows the game to push the pipes on to the player. This is more efficent then trying to push the player itself.
     */
    addPipes() {
        const values = this.calculatePositions();

        this.pipes.push(new Pipe(400, values[0], this.image1));
        this.pipes.push(new Pipe(400, values[1], this.image2));
    }

    /**
     * Updates the position of the pipes when they go off screen and checks for collisions
     * with the bird (player).
     * @param {Bird} bird used for bounds detection against the pipes 
     */
    update(bird) {
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].x -= 3;
            if (this.pipes[i].x >= 155 && this.pipes[i].x < 158) {
                this.score += 1;
                if (this.score > this.highscore) {
                    this.highscore = this.score;
                    this.newHighscore = true;
                }
            }
            
            if (this.pipes[i].x < -50) {
                this.pipes[i].x = 500;
                if (i % 2 == 0) {
                    const value = parseInt(random(this.randomValues.length), 10);
                    this.pipes[i].y = this.randomValues[value][0];
                    this.pipes[i + 1].y = this.randomValues[value][1];
                }
            }
            this.pipes[i].update(this.pipes[i].x, this.pipes[i].y);

            // Pipe Collision detection
            if (this.pipes[i].bounds.intersects(bird.bounds))
                bird.gameOver = true;

            // console.log(this.pipes[i].bounds.intersects(bounds));
        }
    }

    /**
     * Renders all the pipes to the screen.
     */
    render() {
        for (let i = 0; i < this.pipes.length; i++)
            this.pipes[i].render();
    }
}
