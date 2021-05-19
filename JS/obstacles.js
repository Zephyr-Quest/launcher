/**
 *  !Global Var
 */

let canvasObstacles = document.getElementById('obstacles')
let obstaclesArray = []
var context = canvasObstacles.getContext("2d");
let doorIndex = 0
let leverIndex = 0

/**
 * !Game settings
 */

var obstacle = {
    size: 100
}

/**
 * !OBSTACLES CREATION 
 */
function initializeObstacles() {
    obstaclesArray.splice(0, 225)
    addObstacle(3, 1, 1)
    addObstacle(3, 3, 1)
    addObstacle(3, 3, 3)
    addObstacle(2, 2, 1)
    addObstacle(2, 3, 2)
    addObstacle(5, 3, 5)
    addObstacle(4, 4, 5)
    addObstacle(4, 2, 5)
    addObstacle(1, 3, 6)
    addObstacle(3, 14, 14)
}

function addObstacle(id, xpos, ypos) { //ID en fonction de l'obstacle

    switch (id) {
        case 1:
            createLever(xpos, ypos, id)
            break;
        case 2:
            createDoor(xpos, ypos, id)
            break;
        case 3:
            createWall(xpos, ypos, id)
            break;
        case 4:
            createHole(xpos, ypos, id)
            break;
        case 5:
            createTorch(xpos, ypos, id)
            break;
    }
}

function checkObstacles() {
    id = obstaclesArray[player.cooY * 15 + player.cooX]
    switch (id) {
        case 4:
            reset()
            player.x = startX
            player.y = startY
            player.cooX = 0
            player.cooY = 7
            break;
    }
}

function createLever(xpos, ypos, id) {
    const image = new Image();
    image.src = 'img/obstacles/Button_close.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = id
}

function createDoor(xpos, ypos, id) {
    if (obstaclesArray[ypos * 15 + xpos - 1] == 3 && obstaclesArray[ypos * 15 + xpos + 1] == 3) { // Door on x axis
        const image = new Image();
        image.src = 'img/obstacles/Door_closedX.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        obstaclesArray[ypos * 15 + xpos] = id

    } else if (obstaclesArray[(ypos - 1) * 15 + xpos] == 3 && obstaclesArray[(ypos + 1) * 15 + xpos] == 3) { // Door on y axis
        const image = new Image();
        image.src = 'img/obstacles/Door_closedY.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        obstaclesArray[ypos * 15 + xpos] = id

    }
    doorIndex += 1
}

function createWall(xpos, ypos, id) {
    const image = new Image();
    image.src = 'img/obstacles/Wall.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = id


}

function createHole(xpos, ypos, id) {
    const image = new Image();
    image.src = 'img/obstacles/Hole.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = id

}

function createTorch(xpos, ypos, id) {
    if (obstaclesArray[ypos * 15 + xpos] === undefined) {
        const image = new Image();
        image.src = 'img/obstacles/Torche.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        obstaclesArray[ypos * 15 + xpos] = id

    }
}

/**
 * !TORCH DETECTION AND CHANGE LIGHT
 */

function checkTorch() {
    if (obstaclesArray[player.cooY * 15 + player.cooX] == 5) { //If torch on our way
        player.torch += 1
            //obstaclesArray[player.cooY * 15 + player.cooX] = undefined
        context.clearRect(player.x - player.moveSize / 2, player.y - player.moveSize / 2, player.moveSize, player.moveSize);
        light.width += 200;
    }
}

/**
 * !DOOR SYSTEM ACTIVATION
 */

function activateLever(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Button_open.png';
    image.onload = () => {
        context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize, player.moveSize);
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = 0
    console.log(obstaclesArray[ypos * 15 + xpos])
}

function desactivateLever(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Button_close.png';
    image.onload = () => {
        context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize, player.moveSize);
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = 1
    console.log(obstaclesArray[ypos * 15 + xpos])

}