const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

let scaleRatio = null;

function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH*scaleRatio;
    canvas.height = GAME_HEIGHT*scaleRatio;
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