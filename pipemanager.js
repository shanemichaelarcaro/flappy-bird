class PipeManager {
    constructor(image1, image2) {
        this.image1 = image1;
        this.image2 = image2;

        this.pipes = [];
        this.previousY = 180;
    }

    addPipes() {
        const upperBounds = this.previousY - 175;
        const lowerBounds = this.previousY + 175;
        const y = parseInt(random(upperBounds > 150 ? upperBounds : 150, lowerBounds < 465 ? lowerBounds : 465), 10);

        this.pipes.push(new Pipe(400, y - 370, this.image1));
        this.pipes.push(new Pipe(400, y + 50, this.image2));
        console.log(this.pipes);
    }

    update() {
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].x -= 3;
            if (this.pipes[i].x < -50) {
                this.pipes[i].x = 500;
            }
        }
    }

    render() {
        for (let i = 0; i < this.pipes.length; i++)
            this.pipes[i].render();
    }
}