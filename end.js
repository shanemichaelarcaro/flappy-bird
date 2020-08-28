class End {
    constructor(images) {
        this.images = images;
        this.x = 38;
        this.y = 220;
    }

    render(score) {
        let medal;
        if (score >= 40)
            medal = 3;
        else if (score >= 30)
            medal = 2;
        else if (score >= 20)
            medal = 1;
        else if (score >= 10)
            medal = 0;

        image(this.images[5], this.x, this.y, 226, 114);

        push();
        textFont(font);
        fill(255);
        stroke(0);
        strokeWeight(5);
        textSize(20);
        const fontWidth = textWidth(score);
        text(score, width - 85 - fontWidth / 2, 270);
        pop();

        if (medal != undefined)
            image(this.images[medal], this.x + 25, this.y + 40, 44, 44);
    }

    update() {
        if (this.x < 400)
            this.x += 1;
    }
}