window.onload = () => {
    init()
}

/**
 *  !Global Var
 */


let canvas = document.getElementById('myCanvas')
let x = canvas.getAttribute('width') / 2;
let y = canvas.getAttribute('height') / 2;
let alive = true;
let state
    /*! ODD NUMBER FOR THE MAP LENGHT !*/
let mapLenght = 25;
let sizeOfCircle = (x / mapLenght) - 2;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

/**
 * !Game settings
 */

var game = {
    lenght: mapLenght,
    bcc: "white",
}

var player = {
    cooX: (mapLenght - 1) / 2 + 1,
    cooY: (mapLenght - 1) / 2 + 1,
    x: x,
    y: y,
    radius: sizeOfCircle,
    moveSize: sizeOfCircle * 2 + 4,
    left: false,
    forward: false,
    right: false,
    backward: false
}

/**
 * !DETECTION OF KEYS FOR MOVEMENT
 */

var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;

/**
 * !MOVING THE CHARACTER
 */

$(window).keydown(function(e) { // Key pushed
    var keyCode = e.keyCode;

    if (keyCode == leftKey) {
        player.left = true;
    } else if (keyCode == upKey) {
        player.forward = true;
    } else if (keyCode == rightKey) {
        player.right = true;
    } else if (keyCode == downKey) {
        player.backward = true;
    }
    updateStageObject()
});


$(window).keyup(function(e) { // Key stop push
    var keyCode = e.keyCode;
    if (keyCode == leftKey) {
        player.left = false;
    } else if (keyCode == upKey) {
        player.forward = false;
    } else if (keyCode == rightKey) {
        player.right = false;
    } else if (keyCode == downKey) {
        player.backward = false;
    }
})

function init() {
    state = 0;
    drawPlayer('img/character_stopped.png', player.x, player.y)
}

/**
 * !ANIMATION PLAYER
 */

function animationChoose() {
    if (state == 0) {
        state = 1;
    } else if (state == 1) {
        state = 2
    } else { state = 1 }
}

/**
 * !DRAW PLAYER AND ERASE PLAYER
 */

function drawPlayer(url, x, y) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        ctx.drawImage(image, x - player.radius, y - player.radius, player.radius * 2, player.radius * 2)
    }
}

function clearPreviousPosition() {
    ctx.clearRect(player.x - player.radius - 2, player.y - player.radius - 2, player.radius * 2, player.radius * 2);
}

function drawPlayerInDaGame() {
    switch (state) {
        case 1:
            drawPlayer('img/character_moving_left.png', player.x, player.y)
            break;

        case 2:
            drawPlayer('img/character_moving_right.png', player.x, player.y)
            break;
    }
}


/**
 * !UPDATE OF THE MOVEMENT
 */


function updateStageObject() {
    if (player.left && player.x - player.moveSize > 0) {
        clearPreviousPosition()
        animationChoose()
        player.x -= player.moveSize;
        player.cooX -= 1;
        drawPlayerInDaGame();

    }
    if (player.right && player.x + player.moveSize + player.radius < canvas.getAttribute('width')) {
        clearPreviousPosition()
        animationChoose()
        player.x += player.moveSize;
        player.cooX += 1;
        drawPlayerInDaGame();
    }
    if (player.forward && player.y - player.moveSize > 0) {
        clearPreviousPosition()
        animationChoose()
        player.y -= player.moveSize;
        player.cooY -= 1;
        drawPlayerInDaGame();
    }
    if (player.backward && player.y + player.moveSize < canvas.getAttribute('height')) {
        clearPreviousPosition()
        animationChoose()
        player.y += player.moveSize;
        player.cooY += 1;
        drawPlayerInDaGame();
    }
}