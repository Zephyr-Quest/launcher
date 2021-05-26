/**
 * !BACKGROUND LIGHTS
 */

var bccCanva = document.getElementById("bcc")
var ctxBCC = bccCanva.getContext("2d")
var bccx = bccCanva.getAttribute('width') / 2;
var bccy = bccCanva.getAttribute('height') / 2;
var tempIdx = 0

function setLightsBackgroundSmall(x, y) {
    ctxBCC.save()
    cutCircle(ctxBCC, x, y, light.background_small)
    ctxBCC.beginPath();
    ctxBCC.arc(x, y, light.background_small, 0, 2 * Math.PI);
    gradient = ctxBCC.createRadialGradient(x, y, 0, x, y, light.background_small);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctxBCC.fillStyle = gradient;
    ctxBCC.fill();
    ctxBCC.restore()
}

function setLightsBackgroundBig(x, y) {
    ctxBCC.save()
    cutCircle(ctxBCC, x, y, light.background_big)
    ctxBCC.beginPath();
    ctxBCC.arc(x, y, light.background_big, 0, 2 * Math.PI);
    gradient = ctxBCC.createRadialGradient(x, y, 50, x, y, light.background_big);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctxBCC.fillStyle = gradient;
    ctxBCC.fill();
    ctxBCC.restore()
}

function drawLightsBack() {
    ctxBCC.clearRect(0, 0, bccx * 2, bccy * 2)
    ctxBCC.fillStyle = "rgba(0,0,0,1)"
    ctxBCC.fillRect(0, 0, 2 * bccx, 2 * bccy)
    setLightsBackgroundSmall(330, 170)
    setLightsBackgroundSmall(330, bccy * 2 - 170)
    setLightsBackgroundSmall(bccx * 2 - 330, bccy * 2 - 170)
    setLightsBackgroundSmall(bccx * 2 - 330, 170)
    setLightsBackgroundSmall(bccx * 2 - 170, 330)
    setLightsBackgroundSmall(170, 330)
    setLightsBackgroundSmall(170, bccy * 2 - 330)
    setLightsBackgroundSmall(bccx * 2 - 170, bccy * 2 - 330)

    setLightsBackgroundBig(bccx, 200)
    setLightsBackgroundBig(bccx, bccy * 2 - 200)
    setLightsBackgroundBig(220, bccy + 150)
    setLightsBackgroundBig(bccx * 2 - 220, bccy + 150)
    setLightsBackgroundBig(220, bccy - 150)
    setLightsBackgroundBig(bccx * 2 - 220, bccy - 150)

    ctxBCC.clearRect(300, 300, bccx * 2 - 600, bccy * 2 - 600)

    ctxBCC.clearRect(0, bccy - 1.5 * player.moveSize, 3 * player.moveSize, 3 * player.moveSize)
    gradient = ctxBCC.createLinearGradient(0, 0, tempIdx * player.moveSize, 0);
    gradient.addColorStop(0, "rgba(0,0,0,1)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctxBCC.fillStyle = gradient;
    ctxBCC.fillRect(0, bccy - 1.5 * player.moveSize, 3 * player.moveSize, 3 * player.moveSize);

    ctxBCC.clearRect(bccx * 2 - 3 * player.moveSize, bccy - 1.5 * player.moveSize, 3 * player.moveSize, 3 * player.moveSize)
    gradient = ctxBCC.createLinearGradient(bccx * 2 - tempIdx * player.moveSize, 0, bccx * 2, 0);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctxBCC.fillStyle = gradient;
    ctxBCC.fillRect(bccx * 2 - 3 * player.moveSize, bccy - 1.5 * player.moveSize, 3 * player.moveSize, 3 * player.moveSize);


}