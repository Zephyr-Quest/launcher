/**
 * !MAKER ANIM START
 */

let maker_button = document.getElementById("maker_button")
let maker_panel = document.getElementById("container_make")
let wall_button = document.getElementById("add_wall")
let door_button = document.getElementById("add_door")
let lever_button = document.getElementById("add_button")
let hole_button = document.getElementById("add_hole")
let torch_button = document.getElementById("add_torch")
let wallTest = false,
    doorTest = false,
    leverTest = false,
    holeTest = false,
    torchTest = false
maker_button.addEventListener("click", initMaker)
wall_button.addEventListener("click", addWall)
door_button.addEventListener("click", addDoor)
lever_button.addEventListener("click", addLever)
hole_button.addEventListener("click", addHole)
torch_button.addEventListener("click", addTorch)
let count = 0

function initMaker() {
    if (count == 0) {
        maker_button.innerHTML = "PLAY"
        maker_panel.style.display = "flex";
        document.getElementById("obstacles").style.zIndex = "100"
        maker_panel.style.marginLeft = "calc(50vw - 50vh)";
        playing = false
        count = 1
    } else {
        maker_button.innerHTML = "MAKE"
        maker_panel.style.display = "none";
        maker_panel.style.marginLeft = "calc(50vw)";
        playing = true
        document.getElementById("obstacles").style.zIndex = "0"
        count = 0
    }
    initMapMaker()
}

function initMapMaker() {
    cancelled = true
    clearMap()
}

function resetButtons() {
    wall_button.style.border = "2px solid transparent"
    wall_button.style.filter = "grayscale(1)"
    door_button.style.border = "2px solid transparent"
    door_button.style.filter = "grayscale(1)"
    lever_button.style.border = "2px solid transparent"
    lever_button.style.filter = "grayscale(1)"
    hole_button.style.border = "2px solid transparent"
    hole_button.style.filter = "grayscale(1)"
    torch_button.style.border = "2px solid transparent"
    torch_button.style.filter = "grayscale(1)"
}

function addWall() {
    resetButtons()
    wall_button.style.border = "2px solid black"
    wall_button.style.filter = "none"
    doorTest = false
    wallTest = true
    leverTest = false
    holeTest = false
    torchTest = false
}

function addDoor() {
    resetButtons()
    door_button.style.border = "2px solid black"
    door_button.style.filter = "none"
    doorTest = true
    wallTest = false
    leverTest = false
    holeTest = false
    torchTest = false
}

function addLever() {
    resetButtons()
    lever_button.style.border = "2px solid black"
    lever_button.style.filter = "none"
    doorTest = false
    wallTest = false
    leverTest = true
    holeTest = false
    torchTest = false
}

function addHole() {
    resetButtons()
    hole_button.style.border = "2px solid black"
    hole_button.style.filter = "none"
    doorTest = false
    wallTest = false
    leverTest = false
    holeTest = true
    torchTest = false
}

function addTorch() {
    resetButtons()
    torch_button.style.border = "2px solid black"
    torch_button.style.filter = "none"
    doorTest = false
    wallTest = false
    leverTest = false
    holeTest = false
    torchTest = true
}

function drawWallClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(3, x, y)
        }
    }
}

function drawDoorClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(2, x, y)
        }
    }
}

function drawLeverClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(1, x, y)
            makeTheLink()
        }
    }
}

function drawHoleClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(4, x, y)
        }
    }
}

function drawTorchClick(x, y) {
    document.onclick = () => {
        if (!canvaOver) { return false }
        if (obstaclesArray[y * 15 + x].id === undefined) {
            addObstacle(5, x, y)
        }
    }
}

/**
 * MOVES 
 */
let largeurCase = 30

function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    //console.log(mouseX, mouseY)
    //!Create a wall
    if (wallTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawWallClick(index, index2)
                    }
                }
            }

        }
    }
    //!Create a door
    if (doorTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawDoorClick(index, index2)
                    }
                }
            }

        }
    }
    //!Create a Lever
    if (leverTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawLeverClick(index, index2)
                    }
                }
            }

        }
    }
    //!Create a Hole
    if (holeTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawHoleClick(index, index2)
                    }
                }
            }

        }
    }
    //!Create a Torch
    if (torchTest == true) {
        for (let index = 0; index < 15; index++) {
            if (largeurCase * (index) < mouseX && mouseX < largeurCase * (index + 1)) {
                for (let index2 = 0; index2 < 15; index2++) {
                    if (largeurCase * (index2) < mouseY && mouseY < largeurCase * (index2 + 1)) {
                        drawTorchClick(index, index2)
                    }
                }
            }

        }
    }
}
let canvaOver = false
document.getElementById("obstacles").addEventListener("mouseover", function() {
    canvaOver = true
})
document.getElementById("obstacles").addEventListener("mouseout", function() {
    canvaOver = false
})

$("#obstacles").mousemove(function(e) {
    handleMouseMove(e);
});

var canvasOffset = $("#obstacles").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;