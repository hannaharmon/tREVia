import Obstacle from "./Obstacle.js";

export default class ObstacleController {
    OBSTACLE_INTERVAL_MIN = 1000;
    OBSTACLE_INTERVAL_MAX = 3000;

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
        //console.log(this.nextObstacleInterval);
    }

    // Gets a random number between min and max
    getRandomNumber(min, max) {
        // Rounds down the randomly generated number
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Spawn a randomly selected obstacle
    createObstacle() {
        const index =  this.getRandomNumber(0, this.obstacleImages.length - 1);
        const obstacleImage = this.obstacleImages[index];
        const x = this.canvas.width*1.5;  // Draw off-screen
        const y = this.canvas.height - obstacleImage.height;
        const obstacle = new Obstacle(
            this.ctx, 
            x, 
            y, 
            obstacleImage.width, 
            obstacleImage.height,
            obstacleImage.image
        );

        this.obstacles.push(obstacle);
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.nextObstacleInterval <= 0) {
            // Time to spawn an obstacle
            this.createObstacle();
            // Reset the timer
            this.setNextObstacleTime();
        }
        this.nextObstacleInterval -= frameTimeDelta;

        this.obstacles.forEach((obstacle) => {
            obstacle.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        // Filter off screen obstacles
        this.obstacles = this.obstacles.filter(obstacle=>obstacle.x > -obstacle.width);
        //console.log(this.obstacles.length);
    }

    draw() {
        this.obstacles.forEach((obstacle) => obstacle.draw());
    }

    collideWith(sprite) {
        // Using some will let us know if there is at least
        // one obstacle colliding with the player
        return this.obstacles.some((obstacle) => obstacle.collideWith(sprite));
    }

    reset() {
        this.obstacles = [];
    }
}