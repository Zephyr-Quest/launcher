/**
 *  !Global Var
 */

let canvas = document.getElementById('myCanvas')
let x = canvas.getAttribute('width') / 2;
let y = canvas.getAttribute('height') / 2;
let alive = true;
let playing = false
let state
    /*! ODD NUMBER FOR THE MAP LENGHT !*/
let mapLenght = 15;
let sizeOfCircle = (x / mapLenght) - 2;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let wait = 0
let wall

let obstacles = []


/**
 * !Game settings
 */

var light = {
    width: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 4,
}
var obstacle = {
    size: 100
}
var game = {
    lenght: mapLenght,
    bcc: "white",
}

var player = {
    cooX: (mapLenght - 1) / 2 + 1,
    cooY: (mapLenght - 1) / 2 + 1,
    x: x - 10,
    y: y,
    radius: 45,
    moveSize: 100,
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
    if (alive == false || playing == false) { return false }
    if (this.className === 'hold') { return false; }
    this.className = 'hold';
    var keyCode = e.keyCode;
    if (keyCode == leftKey) {
        player.left = true;
        player.right = false;
        player.backward = false;
        player.forward = false;
    } else if (keyCode == upKey) {
        player.left = false;
        player.right = false;
        player.backward = false;
        player.forward = true;
    } else if (keyCode == rightKey) {
        player.left = false;
        player.right = true;
        player.backward = false;
        player.forward = false;
    } else if (keyCode == downKey) {
        player.left = false;
        player.right = false;
        player.backward = true;
        player.forward = false;
    } else { return false }

    updateStageObject()
});

$(window).keyup(function(e) { // Key stop push
    if (alive == false || playing == false) { return false }
    this.className = '';
    var keyCode = e.keyCode;
    if (keyCode == leftKey) {
        player.left = false;
        drawPlayerWait('left', player.x, player.y)
    } else if (keyCode == upKey) {
        player.forward = false;
        drawPlayerWait('forward', player.x, player.y)
    } else if (keyCode == rightKey) {
        player.right = false;
        drawPlayerWait('right', player.x, player.y)
    } else if (keyCode == downKey) {
        player.backward = false;
        drawPlayerWait('backward', player.x, player.y)
    }

})


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
        lightsOnPlayer()
        ctx.drawImage(image, x - player.radius, y - player.radius, player.radius * 2, player.radius * 2)
    }
}

function drawPlayerWait(goTo, x, y) {
    ctx.clearRect(player.x - player.radius - 2, player.y - player.radius - 2, player.radius * 2, player.radius * 2);
    const image = new Image();
    image.src = 'img/' + goTo + '/character_stopped.png';
    image.onload = () => {
        ctx.drawImage(image, x - player.radius, y - player.radius, player.radius * 2, player.radius * 2)
    }
}

function clearPreviousPosition() {
    ctx.clearRect(player.x - player.radius - 2, player.y - player.radius - 2, player.radius * 2, player.radius * 2);
}

function drawPlayerInDaGame(goTo) {
    switch (state) {
        case 1:
            drawPlayer('img/' + goTo + '/character_moving_left.png', player.x, player.y)
            break;

        case 2:
            drawPlayer('img/' + goTo + '/character_moving_right.png', player.x, player.y)
            break;
    }
}

/**
 * !UPDATE OF THE MOVEMENT
 */

function updateStageObject() {
    if (player.left && player.x - player.moveSize > 0) {
        if (player.cooX % 15 != 1 && obstacles[player.cooY * 14 + player.cooX - 1] == 0) {
            animationChoose()
            clearPreviousPosition()
            player.x -= player.moveSize;
            player.cooX -= 1;
            drawPlayerInDaGame('left');
        }
    }
    if (player.right && player.x + player.moveSize + player.radius < canvas.getAttribute('width')) {
        if (player.cooX % 15 != 0 && obstacles[player.cooY * 14 + player.cooX + 1] == 0) {
            animationChoose()
            clearPreviousPosition()
            player.x += player.moveSize;
            player.cooX += 1;
            drawPlayerInDaGame('right');
            console.log(player.cooX % 15)
        }
    }
    if (player.forward && player.y - player.moveSize > 0) {
        if (player.cooY % 15 != 1 && obstacles[(player.cooY - 1) * 14 + player.cooX] == 0) {
            animationChoose()
            clearPreviousPosition()
            player.y -= player.moveSize;
            player.cooY -= 1;
            drawPlayerInDaGame('forward');
        }
    }
    if (player.backward && player.y + player.moveSize < canvas.getAttribute('height')) {
        if (player.cooY % 15 != 0 && obstacles[(player.cooY + 1) * 14 + player.cooX] == 0) {
            clearPreviousPosition()
            animationChoose()
            player.y += player.moveSize;
            player.cooY += 1;
            drawPlayerInDaGame('backward');
        }
    }

}

/**
 * !MODE ATTENTE
 */

function waitingBeforeStart() {
    ctx.clearRect(player.x - x / 2 / 2, player.y - y / 2, x, y);
    const image = new Image();
    image.src = 'img/forward/character_stopped.png';
    image.onload = () => {
        ctx.drawImage(image, x - player.radius, y - player.radius, player.radius * 2, player.radius * 2)
    }
    addObstacle(3, 2, 5)
}
waitingBeforeStart()


/**
 * !BEGIN GAME
 */

function start() {
    for (let index = light.width; index >= 400; index -= 40) {
        setTimeout(() => {
            light.width = index
            state = 0;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 2 * x, 2 * y);
            const image = new Image();
            image.src = 'img/Cercle.png';
            ctx.clearRect(player.x - light.width / 2, player.y - light.width / 2, light.width, light.width);
            ctx.drawImage(image, player.x - light.width / 2, player.y - light.width / 2, light.width, light.width)
            ctx.stroke();
            gradient = ctx.createRadialGradient(player.x, player.y, 60, player.x, player.y, light.width / 2);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "black");
            ctx.beginPath();
            ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.stroke();
            const img = new Image();
            img.src = 'img/forward/character_stopped.png';
            ctx.drawImage(img, x - player.radius, y - player.radius, player.radius * 2, player.radius * 2)
        }, 200);
    }

}
document.getElementById("play_button").addEventListener("click", init);

function init() {
    createArrayVoid();
    document.getElementById("play_button").style.display = "none"
    alive = true;
    playing = true
    start()
}

/**
 * !MANAGE AND CREATE LIGHTS
 */

function lightsOnPlayer() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 2 * x, 2 * y);
    const image = new Image();
    image.src = 'img/Cercle.png';
    ctx.clearRect(player.x - light.width / 2, player.y - light.width / 2, light.width, light.width);
    ctx.drawImage(image, player.x - light.width / 2, player.y - light.width / 2, light.width, light.width)
    gradient = ctx.createRadialGradient(player.x, player.y, 60, player.x, player.y, light.width / 2);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "black");
    ctx.beginPath();
    ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();
}


/**
 * !OBSTACLES CREATION 
 */


function createArrayVoid() {
    for (let index = 0; index < 15 * 15; index++) {
        obstacles.push(0)
    }
}

function addObstacle(id, xpos, ypos) { //ID en fonction de l'obstacle
    obstacle[ypos * 14 + xpos] = id
    switch (id) {
        case 1:
            createLever(xpos, ypos)
            break;
        case 2:
            createDoor(xpos, ypos)
            break;
        case 3:
            createWall(xpos, ypos)
            break;
        case 4:
            createHole(xpos, ypos)
            break;
    }
}

function createLever(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Wall.png';
    image.onload = () => {
        ctx.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
}

function createDoor(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Wall.png';
    image.onload = () => {
        ctx.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
}

function createWall(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Wall.png';
    image.onload = () => {
        ctx.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }

}

function createHole(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Hole.png';
    image.onload = () => {
        ctx.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
}