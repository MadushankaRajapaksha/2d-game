var runStart = 0;


function KeyCheck(event) {
    // Enter key press
    if (event.which == 13) {
        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runStart = 1;
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockWorkerId = setInterval(createBlock, 100);
            moveBackgroundId = setInterval(moveBlocks, 100);

        }

    }
    if (event.which == 32) {
        if (runStart == 1) {
            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                runWorkerId = -1;
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();

            }

        }


    }
}



var player = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId = 0;
var runSound = new Audio("run.mp3");
runSound.loop = true;
function run() {
    runImageNumber++;

    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    player.src = "Run (" + runImageNumber + ").png";
}

var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 330;
var jumpSound = new Audio("jump.mp3");

function jump() {
    jumpImageNumber++;

    if (jumpImageNumber <= 7) {
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";

    }
    if (jumpImageNumber >= 8) {
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";

    }

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    player.src = "Jump (" + jumpImageNumber + ").png";

}
var background = document.getElementById("background");
var backgroundX = 0;
var moveBackgroundId = 0;
function moveBackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";


}


var scoreWorkerId = 0;
var score = document.getElementById("score");

var newScore = 0;
function updateScore() {
    newScore = newScore + 5;
    score.innerHTML = newScore;
}

var createBlockWorkerId = 0;
var playerMarginLeft = 600;
var blockId = 1;
function createBlock() {

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;

    block.style.marginLeft = playerMarginLeft + "px";
    playerMarginLeft = playerMarginLeft + gap;
    background.appendChild(block);

}

var moveBlockWorkerId = 0;
function moveBlocks() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft <= 169) {
            if (newMarginLeft >= 89) {
                if (playerMarginTop >= 260) {
                    if (playerMarginTop <= 330) {
                        clearInterval(runWorkerId);

                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);

                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockWorkerId);

                        clearInterval(moveBlockWorkerId);
                        clearInterval(moveBackgroundId);
                        
                        deadWorkerId = setInterval(dead, 100);
                        deadSound.play();

                    }
                }

            }
        }

    }
}

var deadSound = new Audio("dead.mp3");
var deadImageNumber = 1;
var deadWorkerId = 0;
function dead() {
    deadImageNumber++;
    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        player.style.marginTop = "330px";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;

    }

    player.src = "Dead (" + deadImageNumber + ").png";
}

function restart() {
    location.reload();

}
