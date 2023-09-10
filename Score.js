export default class Score{
    HIGH_SCORE_KEY = "highScore";

    constructor(ctx, scaleRatio, score=0) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
        this.score = score;
    }

    update(frameTimeDelta) {
        this.score+= frameTimeDelta * 0.01
    }

    reset() {
        this.score = 0;
    }

    setHighScore() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        if (this.score > highScore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
        }
    }

    draw() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        const y = 20 * this.scaleRatio;

        const fontSize = 20 * this.scaleRatio;
        this.ctx.font = `${fontSize}px verdana`;
        this.ctx.fillStyle = "#525250";
        const scoreX = this.canvas.width - 80 * this.scaleRatio;
        const highScoreX = scoreX - 125 * this.scaleRatio;
        // const scorePadded = (this.score).toString().padStart(6, 0);
        // // Stored value already rounded down for high score
        const highScorePadded = highScore.toString().padStart(6,0);

        this.ctx.fillText(this.score, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }
}