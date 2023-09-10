export default class Obstacle {
    constructor(ctx, x, y, width, height, image) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
        this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // When the objects overlap, detect collision
    collideWith(sprite) {
        // The adjustment causes the collision to be detected
        // when the objects overlap a bit, instead of 
        // right when they touch eachother
        const adjustBy = 1.2;
        if (
            sprite.x < this.x + this.width / adjustBy &&
            sprite.x + sprite.width / adjustBy > this.x &&
            sprite.y < this.y + this.height / adjustBy &&
            sprite.height + sprite.y / adjustBy > this.y
        ) {
            return true;
        } else {
            return false;
        }
    }
}