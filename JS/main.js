/**
 *  !Global Var
 */

let canvas = document.getElementById('myCanvas')
let x = canvas.getAttribute('width') / 2;
let y = canvas.getAttribute('height') / 2;
let alive = true;
let state = 0;

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
    state = 0;
    //clearPreviousPosition()
    //drawPlayer(image d'attente, player.x, player.y)
});

function init() {
    drawCircle(x, y)
}

/**
 * !Test with circle
 */

function drawCircle(xpos, ypos) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(xpos, ypos, player.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

function erasePreviousCircle() {
    ctx.fillStyle = game.bcc;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

/**
 * !ANIMATION PLAYER
 */

function animationChoose(state) {
    if (state == 0) {
        state = 1;
    } else { state = 2 }
    return state;
}

/**
 * !DRAW PLAYER AND ERASE PLAYER
 */

function drawPlayer(url, x, y) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        ctx.drawImage(image, x, y)
    }
}

function clearPreviousPosition() {
    ctx.clearRect(player.x - player.radius, player.y + player.radius, player.radius * 2, player.radius * 2);
}

/**
 * !UPDATE OF THE MOVEMENT
 */
function updateStageObject() {
    if (player.left && player.x - player.moveSize > 0) {
        erasePreviousCircle()
        drawCircle(player.x - player.moveSize, player.y)
            // For image 
        clearPreviousPosition()
        let i = animationChoose()
        switch (i) {
            case 1:
                //drawPlayer(ImageVersGaucheState1,player.x - player.moveSize, player.y)
                break;

            case 2:
                //drawPlayer(ImageVersGaucheState2,player.x - player.moveSize, player.y)
                break;
        }

        player.x -= player.moveSize;
        player.cooX -= 1;
    }
    if (player.right && player.x + player.moveSize < canvas.getAttribute('width')) {
        erasePreviousCircle()
        drawCircle(player.x + player.moveSize, player.y)
        player.x += player.moveSize;
        player.cooX += 1;
    }
    if (player.forward && player.y - player.moveSize > 0) {
        erasePreviousCircle()
        drawCircle(player.x, player.y - player.moveSize)
        player.y -= player.moveSize;
        player.cooY -= 1;
    }
    if (player.backward && player.y + player.moveSize < canvas.getAttribute('height')) {
        erasePreviousCircle()
        drawCircle(player.x, player.y + player.moveSize)
        player.y += player.moveSize;
        player.cooY += 1;
    }
}

window.onload = () => {
    init()
}