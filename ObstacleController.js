export default class ObstacleController {
    OBSTACLE_INTERVAL_MIN = 500;
    OBSTACLE_INTERVAL_MAX = 2000;

    nextObstacleInterval = null;
    obstacles = [];
    
    constructor(ctx, obstacleImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstacleImages = obstacleImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextObstacleTime();
    }
    
    // Randomizes the interval between obstacles
    setNextObstacleTime() {
        const num = this.getRandomNumber(
            this.OBSTACLE_INTERVAL_MIN, 
            this.OBSTACLE_INTERVAL_MAX
        );

        this.nextObstacleInterval = num;
        console.log(this.nextObstacleInterval);
    }

    // Gets a random number between min and max
    getRandomNumber(min, max) {
        // Rounds down the randomly generated number
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.nextObstacleInterval <= 0) {
            // First, reset the timer
            this.setNextObstacleTime();
            // Time to spawn an obstacle
        }
        this.nextObstacleInterval -= frameTimeDelta;
    }

    draw() {

    }
}