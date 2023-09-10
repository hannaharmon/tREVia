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
        this.sittingStillImage.src = "Images/Rev32Sit1Scale250.png";
        this.image = this.sittingStillImage;

        const runImage1 = new Image();
        runImage1.src = ''
    }

    update(gameSpeed, frameTimeDelta) {

    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}