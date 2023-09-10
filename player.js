export default class Player {
    RUN_ANIMATION_TIMER = 200;
    runAnimationTimer = this.RUN_ANIMATION_TIMER;
    runImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;   // Going up (against gravity)
    GRAVITY = 0.4;

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
        this.yStandingPosition = this.y;    // Get initial height

        this.sittingStillImage = new Image();
        this.sittingStillImage.src = "Images/Rev32Sit1px64.png";
        this.image = this.sittingStillImage;

        const runImage1 = new Image();
        runImage1.src = 'Images/Rev32Run1px64.png';
        const runImage2 = new Image();
        runImage2.src = 'Images/Rev32Run2px64.png';

        this.runImages.push(runImage1);
        this.runImages.push(runImage2);

        // Keyboard event listeners

        // Resizing the window causes reconstructing of the game objects,
        // So we need to make sure we remove before adding to avoid duplicates
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);

        // Touch event listeners
        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchend', this.touchend);
        window.addEventListener('touchstart', this.touchstart);
        window.addEventListener('touchend', this.touchend);
        
    }

    keydown = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = true;
        }
    };

    keyup = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = false;
        }
    };

    touchstart = () => {
        this.jumpPressed = true;
    };

    touchend = (event) => {
        this.jumpPressed = false;
    };

    update(gameSpeed, frameTimeDelta) {

        this.run(gameSpeed, frameTimeDelta);

        // Check if a jump is in progress
        if (this.jumpInProgress) {
            this.image = this.runImages[0];
        }

        this.jump(frameTimeDelta);
    }

    // Moves the player based on whether or not jump is pressed 
    // and where the player currently is
    jump(frameTimeDelta) {
        // Check if starting a jump
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }

        // Check if jumping upwards
        if (this.jumpInProgress && !this.falling) {

            // If below minjumpheight or below maxjumpheight and pressing jump
            if (this.y > this.canvas.height - this.minJumpHeight ||
                (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
                    // Raise player (decrease y position)
                    // frameTimeDelta ensures jump at same rate regardless of framerate
                    // scaleRatio ensures jump at same rate regardless of window size
                    this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            }
            else {
                this.falling = true;
            }

        }
        else {
            // If above standing position
            if (this.y < this.yStandingPosition) {
                // Player still falling
                // frameTimeDelta ensures jump at same rate regardless of framerate
                // scaleRatio ensures jump at same rate regardless of window size
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                
                // Prevent player from falling through the ground
                // Check if bottom of player is below bottom of canvas
                if (this.y + this.height > this.canvas.height) {
                    // Reposition player to original position
                    this.y = this.yStandingPosition;
                }
            }
            else {
                // Player is no longer falling
                this.falling = false;
                // The jump has been completed
                this.jumpInProgress = false;
            }
        }
    }

    // Switches back and forth between first and second run image
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
        this.runAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}