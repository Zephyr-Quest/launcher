/**
 *  !Global Var
 */

let canvasObstacles = document.getElementById('obstacles')
let obstaclesArray = []
var context = canvasObstacles.getContext("2d");

/**
 * !Game settings
 */

var obstacle = {
    size: 100
}

/**
 * !OBSTACLES CREATION 
 */


function createArrayVoid() {
    console.log(obstaclesArray)
}

function addObstacle(id, xpos, ypos) { //ID en fonction de l'obstacle
    obstaclesArray[ypos * 15 + xpos] = id

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
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
}

function createDoor(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Wall.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
}

function createWall(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Wall.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }

}

function createHole(xpos, ypos) {
    const image = new Image();
    image.src = 'img/obstacles/Hole.png';
    image.onload = () => {
        context.drawImage(image, xpos * 100 - 10, ypos * 100, obstacle.size, obstacle.size)
    }
}