class PipeManager {
    constructor(image1, image2) {
        this.image1 = image1;
        this.image2 = image2;

        this.pipes = [];
        this.previousY = 180;

        this.upperPush = -370;
        this.lowerPush = 50;
    }

    randomY() {
        const upperBounds = this.previousY - 175;
        const lowerBounds = this.previousY + 175;
        return parseInt(random(upperBounds > 150 ? upperBounds : 150, lowerBounds < 375 ? lowerBounds : 375), 10);
    }

    calculatePositions() {
        let y = this.randomY();
        this.previousY = y;
        return [y + this.upperPush, y + this.lowerPush];
    }

    addPipes() {
        const values = this.calculatePositions();

        this.pipes.push(new Pipe(400, values[0], this.image1));
        this.pipes.push(new Pipe(400, values[1], this.image2));
    }

    update(bird) {
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].x -= 3;
            if (this.pipes[i].x < -50) {
                this.pipes[i].x = 500;
                if (i % 2 == 0) {
                    const values = this.calculatePositions();
                    this.pipes[i].y = values[0];
                    this.pipes[i + 1].y = values[1];
                }
            }
            this.pipes[i].update();
            if (bird.bounds.intersects(this.pipes[i].bounds))
                console.log("HIT!!! HIT!! HIT!!!!!!");
        }
    }

    render() {
        for (let i = 0; i < this.pipes.length; i++)
            this.pipes[i].render();
    }
}