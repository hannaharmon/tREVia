export default class Player {
    RUN_ANIMATION_TIMER = 200;
    runAnimationTimer = this.RUN_ANIMATION_TIMER;
    runImages = [];

    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;   // 10 away from edge of screen
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;  // stand on bottom of screen
    
        this.sittingStillImage = new Image();
        this.sittingStillImage.src = "Images/Rev32Sit1px64.png";
        this.image = this.sittingStillImage;

        const runImage1 = new Image();
        runImage1.src = 'Images/Rev32Run1px64.png';
        const runImage2 = new Image();
        runImage2.src = 'Images/Rev32Run2px64.png';

        this.runImages.push(runImage1);
        this.runImages.push(runImage2);
    }

    update(gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta);
    }

    run(gameSpeed, frameTimeDelta) {
        if (this.runAnimationTimer <= 0) {
            // Time to switch images
            if (this.image == this.runImages[0]) {
                this.image = this.runImages[1];
            }
            else {
                this.image = this.runImages[0];
            }
            this.runAnimationTimer = this.RUN_ANIMATION_TIMER;
        }

        // Ensures that player moves at same rate regardless of refresh rate
        this.runAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}