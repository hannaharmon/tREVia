export default class Background {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.x = 0;
        this.y = this.canvas.height - this.height;

        this.backgroundImage = new Image();
        this.backgroundImage.src = "Images/Background200.png";
    }

    update(gameSpeed, frameTimeDelta) {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
    }

    draw() {
        this.ctx.drawImage(
            this.backgroundImage,
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Draw another ground beside the first
        this.ctx.drawImage(
            this.backgroundImage,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        );

        // Reposition the ground, creating a continuous loop
        if(this.x < -this.width) {
            this.x = 0;
        }
    }

    reset() {
        this.x = 0;
    }
}