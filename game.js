import Player from "./Player.js";
import Background from "./Background.js";
import ObstacleController from "./ObstaclesController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = 1;
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 300;
const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 64;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const BACKGROUND_WIDTH = 1280;
const BACKGROUND_HEIGHT = 128;
const BACKGROUND_SPEED = 0.3;
const GROUND_WIDTH = 2560;
const GROUND_HEIGHT = 256;
const GROUND_AND_OBSTACLES_SPEED = 0.3;
const TRIVIA_TIME = 10;

const OBSTACLES_CONFIG = [
    {width:64, height:64, image: 'Images/Longhorn.png'},
    {width:64, height:128, image: 'Images/VeoInTree.png'},
    {width:106, height:64, image: 'Images/ElephantWalk.png'},
];

let groundImage = new Image();
groundImage.src = "Images/Ground.png";

let canDoTrivia = true;
var refreshIntervalId;

// Game Objects
let player = null;
let background = null;
let obstaclesController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function createSprites() {
    // Figure out width and height of player based on scale ratio
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = BACKGROUND_WIDTH * scaleRatio;
    const groundHeightInGame = BACKGROUND_HEIGHT * scaleRatio;

    player = new Player(
        ctx, 
        playerWidthInGame, 
        playerHeightInGame, 
        minJumpHeightInGame, 
        maxJumpHeightInGame, 
        scaleRatio
    );

    background = new Background(
        ctx,
        groundWidthInGame,
        groundHeightInGame,
        BACKGROUND_SPEED,
        scaleRatio
    );

    const obstaclesImages = OBSTACLES_CONFIG.map(obstacle => {
        const image = new Image();
        image.src = obstacle.image;
        return {
            image: image,
            width: obstacle.width * scaleRatio,
            height: obstacle.height * scaleRatio,
        };
    });

    obstaclesController = new ObstacleController(ctx, 
        obstaclesImages, 
        scaleRatio, 
        GROUND_AND_OBSTACLES_SPEED
    );
    
    const searchParams = new URLSearchParams(window.location.search);
    score = new Score(ctx, scaleRatio, parseInt(searchParams.get("score")||"0"));

}

function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH*scaleRatio;
    canvas.height = GAME_HEIGHT*scaleRatio;
    createSprites();
}

setScreen();

// Works fine on desktop, may need to use setTimeout for Safari mobile rotation
window.addEventListener("resize", setScreen);

// For chrome and other browsers that support mobile screen oreintation
if (screen.orientation) {   // check for existence of screen.orientation variable
    screen.orientation.addEventListener("change", setScreen);
}

// Figure out dimensions of screen in order to resize game
function getScaleRatio() {
    const screenHeight = Math.min(
        window.innerHeight, 
        document.documentElement.clientHeight
    );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

    // Window is wider than the game width
    if (screenWidth/screenHeight < GAME_WIDTH/GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    } else {
        // Window is taller
        return screenHeight / GAME_HEIGHT;
    }
}

function triggerTrivia() {
    window.open(`http://127.0.0.1:5500/triviatest.html?score=${score.score}`,"_self");
}

function showGameOver() {
    // Player vertical scaling reset
    player.JUMP_SPEED = 0.6;
    player.GRAVITY = 0.4;
    const fontSize = 70 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "grey";
    // Center game over on screen
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;
    // Actually show the text
    ctx.fillText("GAME OVER", x, y);
    ctx.font = '40px Verdana';
    ctx.fillText("Press SPACE to play again!",canvas.width / 4.5+150,y+60);

    canDoTrivia = true;
}

function setupGameReset() {
    if(!hasAddedEventListenersForRestart) {
        hasAddedEventListenersForRestart = true;

        setTimeout(()=>{
            window.addEventListener("keyup", reset, {once:true});
            window.addEventListener("touchstart", reset, {once:true});
        }, 1000);
    }
}

function reset() {
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    waitingToStart = false;
    // Tell game objects to reset
    background.reset();
    obstaclesController.reset();
    let searchParams = new URLSearchParams(window.location.search);
    let paramScore = searchParams.get("score");
    if (!paramScore) {
        score.reset();
    }
    gameSpeed = GAME_SPEED_START + score.score/1000;
}

function showStartGameText() {
    const fontSize = 40 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "grey";
    // Center game over on screen
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    // Actually show the text
    ctx.fillText("Press Space or Tap Screen To Start", x, y);
}

function updateGameSpeed(frameTimeDelta) {
    gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

function clearScreen() {
    ctx.fillStyle = "#Ffffea";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function gameLoop(currentTime) {
    
    // Calculate the change in frameTime
    // This will be used later to ensure evreything moves at the same speed
    // regardless of hardware differences
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;

    clearScreen();

    if (!gameOver && !waitingToStart) {
        // Update game objects
        if (canDoTrivia) {
            refreshIntervalId = setInterval(function () {triggerTrivia()}, 10000);
            canDoTrivia = false;
        }
        background.update(gameSpeed, frameTimeDelta);
        obstaclesController.update(gameSpeed, frameTimeDelta);
        player.update(gameSpeed, frameTimeDelta);
        score.update(frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
    }

    // Set game over if obstacle collision detected
    if (!gameOver && obstaclesController.collideWith(player)){
          gameOver = true;
          setupGameReset();
          score.setHighScore();
    }

    // Draw game objects
    background.draw();
    ctx.drawImage(groundImage, 0, canvas.height - GROUND_HEIGHT, GROUND_WIDTH, GROUND_HEIGHT);
    obstaclesController.draw();
    player.draw();
    score.draw();

    // Game over screen
    if (gameOver) {
        clearInterval(refreshIntervalId);
        score.score = 0;
        showGameOver();
    }

    if (waitingToStart) {
        showStartGameText();
    }

    // Speed at which gameLoop is called is dependent on monitor refresh rate
    // and hardware of computer
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);    // Calls a method when ready to repaint screen

window.addEventListener("keyup", reset, {once:true});
window.addEventListener("touchstart", reset, {once:true});