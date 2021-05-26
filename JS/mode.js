/**
 * !MODE ATTENTE
 */
let cancelled = false

function waitingBeforeStart() {
    ctx.clearRect(player.x - x / 2 / 2, player.y - y / 2, x, y);
    const image = new Image();
    image.src = 'img/right/character_stopped.png';
    image.onload = () => {
        ctx.drawImage(image, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2)
    }
    animWaitingMaze()

}
window.onload = () => {
    waitingBeforeStart()
}


/**
 * !BEGIN GAME
 */

function start() {
    light.width = 200
    state = 0;
    tempIdx = 3
    setTimeout(() => {
        player.x = startX
        player.y = startY
        player.cooX = 0
        player.cooY = 7
        light.background_big = 162
        light.background_small = 120
        const img = new Image();
        img.src = 'img/right/character_stopped.png';
        img.onload = () => {
            ctx.drawImage(img, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2)
        }
        ctx.fillStyle = "black";
        ctx.globalCompositeOperation = "source-over";
        ctx.fillRect(0, 0, 2 * x, 2 * y);
        cutCircle(ctx, player.x, player.y, light.width / 2)
        gradient = ctx.createRadialGradient(player.x, player.y, 40, player.x, player.y, light.width / 2);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "black");
        ctx.beginPath();
        ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        initializeObstacles()
        drawLightsBack()

    }, 350);
}

/**
 * !START BUTTON
 */

document.getElementById("play_button").addEventListener("click", init);

function init() {
    cancelled = true
    document.getElementById("play_button").style.display = "none"
    alive = true;
    playing = true
    start()
}


/**
 * !RESET GAME
 */

function reset() {
    light.width = 200
    state = 0;
    tempIdx = 3
    setTimeout(() => {
        ctx.clearRect(0, 0, x * 2, y * 2)
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 2 * x, 2 * y);
        cutCircle(ctx, player.x, player.y, light.width / 2)
        gradient = ctx.createRadialGradient(player.x, player.y, 60, player.x, player.y, light.width / 2);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "black");
        ctx.beginPath();
        ctx.arc(player.x, player.y, light.width / 2, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.stroke();
        const img = new Image();
        img.src = 'img/right/character_stopped.png';
        ctx.drawImage(img, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2)
        initializeObstacles()
        drawLightsBack()

    }, 50);
}


/**
 *  !END GAME
 */

function checkEnd() {
    if (player.cooX == endX && player.cooY == endY) {
        playing = false
    }
}