var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var CENTER_HORIZON;
var LEFT_HORIZON;
var CENTER;
var ANGLE;
var SIZE;

var RANDOM_FACTOR = 0.5;
var MAX_STATE = 4;
var ANGLE_FACTOR = 1.5;

var state;
var statePercentage = 0;
var stateNumber;

var currentField;
var endField;

var addHeight;

var startMillis;
const time = () => (typeof(startMillis) == "undefined") ? 0 : millis() - startMillis;

function setup() {
    var canvas = createCanvas(WIDTH, HEIGHT);
    canvas.mousePressed(mousePress);
    canvas.mouseReleased(mouseRelease);
    canvas.touchStarted(mousePress);
    canvas.touchEnded(mouseRelease);

    initIconAnimation();
    initVars();

    stroke(255);
    strokeJoin(ROUND);
    fill(0);
}

function initVars() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    SIZE = min([HEIGHT / 3, WIDTH / 2 - 70, 500]);
    ANGLE = SIZE * ANGLE_FACTOR;

    CENTER = createVector(WIDTH / 2, HEIGHT / 2);
    CENTER_HORIZON = createVector(0, 0);
    LEFT_HORIZON = createVector(-2 * SIZE, 0);

    endField = new Terrain(2, true);
    currentField = new Terrain(2, false);

    state = 0;
    addHeight = 0;
    stateNumber = 0;
    refreshTime = 0;
    startMillis = millis();
}

function draw() {
    background(80);
    
    if (refreshTime != 0) {
        addHeight = (millis() - refreshTime) / 1000 * HEIGHT;
        if ((millis() - refreshTime) >= 1000) {
            statePercentage = 0;
            initVars();
        }
    }
    
    switch (state) {
        case 0:
            statePercentage = time() / 20;
            line(CENTER.x, HEIGHT + addHeight, CENTER.x, CENTER.y * (2 - statePercentage / 100) + addHeight);
            if (statePercentage >= 100) {
                state = 1;
                statePercentage = 0;
            }
            break;
        case 1:
            statePercentage = time() / 10 - 200;
            currentField.render(statePercentage / 100 * SIZE, SIZE, getRotation());
            if (statePercentage >= 100) {
                state = 2;
                statePercentage = 0;
            }
            break;
        case 2:
            statePercentage = time() / 10 - 300;
            currentField.transform(endField, 0.1);
            currentField.render(SIZE, SIZE, getRotation());
            if (statePercentage >= 100) {
                state = 3;
                statePercentage = 0;
                currentField = currentField.scaleUp();
                endField = currentField.addRandom(RANDOM_FACTOR);
            }
            break;
        case 3:
            statePercentage = time() / 10 - 100 * (4 + stateNumber);
            currentField.transform(endField, 0.1);
            currentField.render(SIZE / pow(2, stateNumber + 1), SIZE, getRotation());
            if (statePercentage >= 100 && stateNumber < MAX_STATE - 2) {
                statePercentage = 0;
                stateNumber++;
                currentField = currentField.scaleUp();
                endField = currentField.addRandom(pow(RANDOM_FACTOR, stateNumber + 1));
            }
            break;
    }
}