const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
var CENTER_HORIZON;
var LEFT_HORIZON;
var CENTER;
var ANGLE;
var RANDOM_FACTOR = 0.5;
var SIZE;
var MAX_STATE = 4;

var state = 0;
var statePercentage = 0;
var stateNumber = 0;

var currentField;
var endField;

var startMillis;
const time = () => (typeof(startMillis) == "undefined") ? 0 : millis() - startMillis;

function setup() {
    CENTER = createVector(WIDTH / 2, HEIGHT / 2);
    CENTER_HORIZON = createVector(0, 0);
    LEFT_HORIZON = createVector(-CENTER.x, 0);
    SIZE = min([HEIGHT / 3, WIDTH / 2 - 70, 500]);
    ANGLE = SIZE * 1.5;
    console.log(SIZE);
    createCanvas(WIDTH, HEIGHT);
    stroke(255);
    strokeJoin(ROUND);
    fill(0);

    endField = new Terrain(2, true);
    currentField = new Terrain(2, false);

    startMillis = 0;
}

function draw() {
    background(0);

    switch (state) {
        case 0:
            statePercentage = time() / 20;
            line(CENTER.x, HEIGHT, CENTER.x, CENTER.y * (2 - statePercentage / 100));
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