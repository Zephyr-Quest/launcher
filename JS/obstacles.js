/**
 *  !Global Var
 */

let canvasObstacles = document.getElementById('obstacles')
let obstaclesArray = []
var context = canvasObstacles.getContext("2d");
let doorIndex = 0
let leverIndex = 0
let saveArray = []

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
    clearMap()
    obstaclesArray.splice(0, 225)
    for (let index = 0; index < map.length; index++) {
        if (map[index].id == 3) {
            addObstacle(map[index].id, map[index].x, map[index].y)
        }
    }
    for (let index = 0; index < map.length; index++) {
        if (map[index].id != 3) {
            addObstacle(map[index].id, map[index].x, map[index].y)
        }
    }
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
    if ((obstaclesArray[ypos * 15 + xpos - 1] == 3 && obstaclesArray[ypos * 15 + xpos + 1] == 3) || (xpos == 0 && obstaclesArray[ypos * 15 + xpos + 1] == 3) || (xpos == 14 && obstaclesArray[ypos * 15 + xpos - 1] == 3)) { // Door on x axis
        const image = new Image();
        image.src = 'img/obstacles/Door_closedX.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        obstaclesArray[ypos * 15 + xpos] = id

    } else if ((obstaclesArray[(ypos - 1) * 15 + xpos] == 3 && obstaclesArray[(ypos + 1) * 15 + xpos] == 3) || (obstaclesArray[(ypos - 1) * 15 + xpos] == 3 && ypos == 14) || (obstaclesArray[(ypos + 1) * 15 + xpos] == 3 && ypos == 0)) { // Door on y axis
        const image = new Image();
        image.src = 'img/obstacles/Door_closedY.png';
        image.onload = () => {
            context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
        }
        obstaclesArray[ypos * 15 + xpos] = id

    }
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
 * !MANAGE AND CREATE LIGHTS
 */

function lightsOnPlayer() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, x * 2, y * 2);
    cutCircle(ctx, player.x, player.y, light.width / 2)
    ctx.beginPath();
    ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
    gradient = ctx.createRadialGradient(player.x, player.y, 40, player.x, player.y, light.width / 2);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;
    ctx.fill();
    drawLightsBack()
}

/**
 * !TORCH DETECTION AND CHANGE LIGHT
 */

function checkTorch() {
    if (obstaclesArray[player.cooY * 15 + player.cooX] == 5) { //If torch on our way
        player.torch += 1
            //saveArray = obstaclesArray
        obstaclesArray[player.cooY * 15 + player.cooX] = undefined
        context.clearRect(player.cooX * 100, player.cooY * 100, player.moveSize * 2, player.moveSize * 2);
        light.width += 100;
    }
}

/**
 * !DOOR SYSTEM (OPENING AND CLOSING)
 */

function openDoor(xpos, ypos) {
    obstaclesArray[ypos * 15 + xpos] = undefined
    context.clearRect(xpos * 100, ypos * 100, player.moveSize * 2 - 20, player.moveSize * 2 - 20)
}

function closeDoor(xpos, ypos) {
    createDoor(xpos, ypos, 2)
}

/**
 * !DOOR SYSTEM ACTIVATION
 */
let doorState = undefined

function isOpen(xpos, ypos) {
    if (obstaclesArray[ypos * 15 + xpos] === undefined) {
        return true
    } else {
        return false
    }
}

function activateLever(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Button_open.png';
    image.onload = () => {
        context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize * 2 - 20, player.moveSize * 2 - 20);
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = 0
    for (let index = 0; index < map.length; index++) {
        if (map[index].x == xpos && map[index].y == ypos) {
            for (let i = 0; i < map[index].usages.length; i++) {
                doorState = isOpen(map[index].usages[i].x, map[index].usages[i].y)
                if (doorState) {
                    closeDoor(map[index].usages[i].x, map[index].usages[i].y)
                } else {
                    openDoor(map[index].usages[i].x, map[index].usages[i].y)
                }

            }
        }

    }
}

function desactivateLever(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Button_close.png';
    image.onload = () => {
        context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize * 2 - 20, player.moveSize * 2 - 20);
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
    obstaclesArray[ypos * 15 + xpos] = 1
    for (let index = 0; index < map.length; index++) {
        if (map[index].x == xpos && map[index].y == ypos) {
            for (let i = 0; i < map[index].usages.length; i++) {
                doorState = isOpen(map[index].usages[i].x, map[index].usages[i].y)
                if (doorState) {
                    closeDoor(map[index].usages[i].x, map[index].usages[i].y)
                } else {
                    openDoor(map[index].usages[i].x, map[index].usages[i].y)
                }

            }
        }

    }
}

/**
 * !DISABLE NO LIGHT
 */

function sun() {
    light.width = 200000
}