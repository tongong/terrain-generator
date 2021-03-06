var startPress = 0;
var startPressTime = 0;
var startPressRotation = 0;
const NORMAL_SPIN = 0.0001;
var spin = NORMAL_SPIN;
var lastMillis = 0;
var currentRotation = 0;
var mousePressed = false;
var pmousePressed = false;

function getRotation() {
    let aktMillis = millis();
    if (mousePressed) {
        if (!pmousePressed) {
            startPress = mouseX + currentRotation * 1000;
            startPressTime = millis();
            startPressRotation = currentRotation;
            pmousePressed = true;
        }
        currentRotation = -(mouseX - startPress) / 1000;
    } else {
        if (pmousePressed) {
            spin = (currentRotation - startPressRotation) / (millis() - startPressTime);
            pmousePressed = false;
        }
        if (spin > NORMAL_SPIN) {
            spin = NORMAL_SPIN + (spin - NORMAL_SPIN) * 0.9;
        }
        if (spin < NORMAL_SPIN) {
            spin = spin + (NORMAL_SPIN - spin) * 0.1;
        }
        currentRotation += spin * (aktMillis - lastMillis);
    }
    lastMillis = aktMillis;
    return currentRotation;
}

function mousePress() {
    document.getElementById("settings").classList.remove("in");
    mousePressed = true;
}

function mouseRelease() {
    mousePressed = false;
}