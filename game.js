import Player from "./player.js";
import Background from "./background.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = .75;
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const PLAYER_WIDTH = 80;
const PLAYER_HEIGHT = 80;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const BACKGROUND_WIDTH = 1280;
const BACKGROUND_HEIGHT = 128;
const BACKGROUND_SPEED = 0.3;

// Game Objects
let player = null;
let background = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;

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

function clearScreen() {
    ctx.fillStyle = "#Ffffea";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function gameLoop(currentTime) {
    if (previousTime === null) {
        // Will be entered on first call of gameLoop
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    // Calculate the change in frameTime
    // This will be used later to ensure evreything moves at the same speed
    // regardless of hardware differences
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;

    clearScreen();

    // Update game objects
    background.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);

    // Draw game objects
    background.draw();
    player.draw();

    // Speed at which gameLoop is called is dependent on monitor refresh rate
    // and hardware of computer
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);    // Calls a method when ready to repaint screen