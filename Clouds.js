export default class Clouds {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.x = 0;
        this.y = this.canvas.height - 2*this.height;

        this.cloudsImage = new Image();
        this.cloudsImage.src = "Images/Clouds.png";
    }

    update(gameSpeed, frameTimeDelta) {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
    }

    draw() {
        this.ctx.drawImage(
            this.cloudsImage,
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Draw another ground beside the first
        this.ctx.drawImage(
            this.cloudsImage,
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