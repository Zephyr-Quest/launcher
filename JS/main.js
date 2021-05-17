/**
 * Global Var
 */
let canvas = document.getElementById('myCanvas')
let x = canvas.getAttribute('width') / 2;
let y = canvas.getAttribute('height') / 2;
let alive = true;

/**
 * Player settings
 */
var player = {
    x: x,
    y: y,
    radius: 10,
    moveSize: 25,
    speed: 5,
    left: false,
    forward: false,
    right: false,
    backward: false
}

var game = {
    bcc: "white",
}

/**
 * DETECTION OF KEYS FOR MOVEMENT
 */

var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;

/**
 * MOVING THE CHARACTER
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

});

function init() {
    drawCircle(x, y)
}

/**
 * ! Test with circle
 */
function drawCircle(xpos, ypos) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(xpos, ypos, player.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

function erasePreviousCircle() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = game.bcc;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function updateStageObject() {
    if (player.left && player.x - player.moveSize > 0) {
        erasePreviousCircle()
        drawCircle(player.x - player.moveSize, player.y)
        player.x -= player.moveSize;
    }
    if (player.right && player.x + player.moveSize < canvas.getAttribute('width')) {
        erasePreviousCircle()
        drawCircle(player.x + player.moveSize, player.y)
        player.x += player.moveSize;
    }
    if (player.forward && player.y - player.moveSize > 0) {
        erasePreviousCircle()
        drawCircle(player.x, player.y - player.moveSize)
        player.y -= player.moveSize;
    }
    if (player.backward && player.y + player.moveSize < canvas.getAttribute('height')) {
        erasePreviousCircle()
        drawCircle(player.x, player.y + player.moveSize)
        player.y += player.moveSize;
    }
}

init();