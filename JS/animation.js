/**
 * !GAME LOST
 */

function gameLostAnimation() {
    message = document.getElementById("gamelost").style
    message.visibility = "visible"
    message.opacity = 1;
    message.marginTop = "45%"
    setTimeout(() => {
        message.visibility = "hidden"
        message.opacity = 0;
    }, 1000);
}
/**
 * !POINTS
 */
/**
 * !TIMER
 */
/**
 * !NUMBER OF TORCHES 
 */
/**
 * !NEXT LEVEL
 */