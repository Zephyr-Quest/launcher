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
        setTimeout(() => {
            torchLight()
        }, 500);
    }
}

let idx = 0

function torchLight() {
    for (let index = 0; index < obstaclesArray.length; index++) {
        if (obstaclesArray[index] == 5) {

            xlight = (index % 15) * 100 - 10 + player.moveSize / 2
            ylight = ((index - index % 15) / 15) * 100 + player.moveSize / 2
            cutCircle(ctx, xlight, ylight, light.torch / 2)
            setGradientLight();
        }
    }
}

function JoinHalo() {
    for (let index = 0; index < obstaclesArray.length; index++) {
        if (obstaclesArray[index] == 5) {

            xlight = (index % 15) * 100 - 10 + player.moveSize / 2
            ylight = ((index - index % 15) / 15) * 100 + player.moveSize / 2
                //setJoiningLights(player.x, player.y, xlight, ylight);
        }
    }
}

function setGradientLight() {
    gradient = ctx.createRadialGradient(xlight, ylight, light.torch / 4, xlight, ylight, light.torch / 2);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "black");
    ctx.beginPath();
    ctx.arc(xlight, ylight, light.torch / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "transparent";
    ctx.globalCompositeOperation = "source-over";
    ctx.fill();
    ctx.closePath()
}

function setJoiningLights(xpos1, ypos1, xpos2, ypos2) {
    //Équation de cercle : (x−a)²+(y−b)²=r²
    // Distance entre les deux centres
    let d = Math.sqrt(Math.pow((xpos1 - xpos2), 2) + Math.pow((ypos1 - ypos2), 2))
        // Rayon cercle 1
    let r1 = light.width / 2
        // Rayon cercle 2
    let r2 = light.torch / 2
        // Si les deux cercle ont au moins une intersection 
    if (d <= r1 + r2 && d >= Math.abs(r1 - r2)) {
        let a = (Math.pow(r1, 2) - Math.pow(r2, 2) + Math.pow(d, 2)) / (2 * d)
        let h = Math.sqrt(Math.pow(r1, 2) - Math.pow(a, 2))
        let posXP3 = xpos1 + (a / d) * (xpos2 - xpos1)
        let posYP3 = ypos1 + (a / d) * (ypos2 - ypos1)
            // Premier point intersection
        let x4 = posXP3 + (h / d) * (ypos2 - ypos1)
        let y4 = posYP3 - (h / d) * (xpos2 - xpos1)
            // Deuxième point intersection
        let x5 = posXP3 - (h / d) * (ypos2 - ypos1)
        let y5 = posYP3 + (h / d) * (xpos2 - xpos1)
            // Cercle joueur 
        let startVector = {
            x: light.width / 2,
            y: 0
        }
        let vector4 = {
            x: x4 - xpos1,
            y: y4 - ypos1
        }
        let vector5 = {
            x: x5 - xpos1,
            y: y5 - ypos1
        }
        let teta1 = Math.acos((vector4.x * vector5.x + vector4.y * vector5.y) / (Math.sqrt(Math.pow(vector4.x, 2) + Math.pow(vector4.y, 2)) * Math.sqrt(Math.pow(vector5.x, 2) + Math.pow(vector5.y, 2))))
        let tetaDecal = Math.acos((vector4.x * startVector.x + vector4.y * startVector.y) / (Math.sqrt(Math.pow(vector4.x, 2) + Math.pow(vector4.y, 2)) * Math.sqrt(Math.pow(startVector.x, 2) + Math.pow(startVector.y, 2))))
        tetaDecal = tetaDecal % (4 * Math.PI)
        console.log(vector4, vector5, teta1, tetaDecal)
        gradient = ctx.createRadialGradient(player.x, player.y, 60, player.x, player.y, light.width / 2);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        if (vector4.y < 0) {
            arcCircle(player.x, player.y, x4, y4, x5, y5, -tetaDecal, -tetaDecal + teta1, light.width / 2, gradient)
        } else {
            arcCircle(player.x, player.y, x4, y4, x5, y5, tetaDecal, tetaDecal + teta1, light.width / 2, gradient)
        }

        // Cercle Torche

        let startVector2 = {
            x: light.torch / 2,
            y: 0
        }
        let vector7 = {
            x: x4 - xpos2,
            y: y4 - ypos2
        }
        let vector6 = {
            x: x5 - xpos2,
            y: y5 - ypos2
        }
        let teta2 = Math.acos((vector6.x * vector7.x + vector6.y * vector7.y) / (Math.sqrt(Math.pow(vector6.x, 2) + Math.pow(vector6.y, 2)) * Math.sqrt(Math.pow(vector7.x, 2) + Math.pow(vector7.y, 2))))
        let tetaDecal2 = Math.acos((vector6.x * startVector2.x + vector6.y * startVector2.y) / (Math.sqrt(Math.pow(vector6.x, 2) + Math.pow(vector6.y, 2)) * Math.sqrt(Math.pow(startVector2.x, 2) + Math.pow(startVector2.y, 2))))
        tetaDecal2 = tetaDecal2 % (2 * Math.PI)
        console.log(vector6, vector7, teta2, tetaDecal2)
        gradient = ctx.createRadialGradient(xlight, ylight, light.torch / 4, xlight, ylight, light.torch / 2);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        if (vector6.y < 0) {
            clearArc(xlight, ylight, -tetaDecal2, -tetaDecal2 + teta2, light.torch / 2)
            arcCircle(xlight, ylight, x4, y4, x5, y5, -tetaDecal2, -tetaDecal2 + teta2, light.torch / 2, gradient)

        } else {
            clearArc(xlight, ylight, tetaDecal2, tetaDecal2 + teta2, light.torch / 2)
            arcCircle(xlight, ylight, x4, y4, x5, y5, tetaDecal2, tetaDecal2 + teta2, light.torch / 2, gradient)
        }

        // Intersecttion gradient 
        ctx.beginPath();
        ctx.globalCompositeOperation = 'source-over';
        ctx.moveTo(xpos1, ypos1);
        ctx.lineTo(x4, y4);
        ctx.lineTo(xpos2, ypos2);
        ctx.lineTo(x5, y5);
        ctx.lineTo(xpos1, ypos1);
        ctx.closePath();
        let middleX = (x4 + x5) / 2
        let middleY = (y4 + y5) / 2
        let distX45 = Math.sqrt(Math.pow(x5 - x4, 2) + Math.pow(y5 - y4, 2))
        if (d >= distX45) {
            gradient = ctx.createLinearGradient(middleX, middleY, distX45 / 4);
        } else { gradient = ctx.createRadialGradient(middleX, middleY, d / 4, middleX, middleY, d / 2); }
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(0,0,0,0.5)");
        ctx.fillStyle = gradient
        ctx.fill();

    }
}

function arcCircle(xpos, ypos, x4, y4, x5, y5, from, to, r, style) {
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(xpos, ypos, r, from, to);
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.lineTo(xpos, ypos);
    ctx.closePath();
    ctx.fill();
    ctx.restore()
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(xpos, ypos, r, from, to);
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.lineTo(xpos, ypos);
    ctx.closePath();
    ctx.globalCompositeOperation = "xor";
    ctx.fillStyle = style
    ctx.fill();
}

function clearArc(xpos, ypos, from, to, r) {
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(xpos, ypos, r, from, to);
    ctx.moveTo(xpos, ypos);
    ctx.closePath();
    ctx.fill();
    ctx.restore()
    ctx.globalCompositeOperation = "source-over";
}




/**
 * !TORCH DETECTION AND CHANGE LIGHT
 */

function checkTorch() {
    if (obstaclesArray[player.cooY * 15 + player.cooX] == 5) { //If torch on our way
        player.torch += 1
            //saveArray = obstaclesArray
        obstaclesArray[player.cooY * 15 + player.cooX] = undefined
        context.clearRect(player.x - player.moveSize / 2, player.y - player.moveSize / 2, player.moveSize, player.moveSize);
        light.width += 200;
    }
}

/**
 * !DOOR SYSTEM (OPENING AND CLOSING)
 */

function openDoor(xpos, ypos) {
    obstaclesArray[ypos * 15 + xpos] = undefined
    context.clearRect(xpos * 100 - 10, ypos * 100, player.moveSize, player.moveSize)
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

/**
 * !DISABLE NO LIGHT
 */

function sun() {
    light.width = 200000
}