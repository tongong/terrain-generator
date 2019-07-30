const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
var CENTER_HORIZON;
var LEFT_HORIZON;
var CENTER;
const ANGLE = 300;
const RANDOM_FACTOR = 0.4;
var SIZE;
const MAX_STATE = 4;

var state = 0;
var statePercentage = 0;
var stateNumber = 0;

var currentField;
var endField;

function setup() {
    CENTER = createVector(WIDTH / 2, HEIGHT / 2);
    CENTER_HORIZON = createVector(0, 0);
    LEFT_HORIZON = createVector(-500, 0);
    SIZE = ((HEIGHT>WIDTH)?WIDTH:HEIGHT)/2-20;
    
    createCanvas(WIDTH, HEIGHT);
    stroke(255);
    strokeJoin(ROUND);
    fill(0);
    
    endField = new Terrain(2, true);
    currentField = new Terrain(2, false);
}

function draw() {
    background(0);
    
    switch (state) {
     case 0:
      statePercentage = millis()/10;
      line(0,CENTER.y,CENTER.x*statePercentage/100,CENTER.y);
      line(2*CENTER.x,CENTER.y,CENTER.x*(2-statePercentage/100),CENTER.y);
      line(CENTER.x,0,CENTER.x,CENTER.y*statePercentage/100);
      line(CENTER.x,2*CENTER.y,CENTER.x,CENTER.y*(2-statePercentage/100));
      if (statePercentage >= 100) {
       state = 1;
       statePercentage = 0;
      }
      break;
     case 1:
      statePercentage = millis()/10-100;
      line(CENTER.x,CENTER.y,CENTER.x*statePercentage/100,CENTER.y);
      line(CENTER.x,CENTER.y,CENTER.x*(2-statePercentage/100),CENTER.y);
      line(CENTER.x,CENTER.y,CENTER.x,CENTER.y*statePercentage/100);
      line(CENTER.x,CENTER.y,CENTER.x,CENTER.y*2);
      if (statePercentage >= 100) {
       state = 2;
       statePercentage = 0;
      }
      break;
     case 2:
      statePercentage = millis()/10-200;
      currentField.render(statePercentage/100*SIZE, SIZE, getRotation());
      if (statePercentage >= 100) {
       endField.bottomHeight = 0;
       state = 3;
       statePercentage = 0;
      }
      break;
     case 3:
      statePercentage = millis()/10-300;
      currentField.transform(endField,0.1);
      currentField.render(SIZE, SIZE, getRotation());
      if (statePercentage >= 100) {
       state = 4;
       statePercentage = 0;
       currentField = currentField.scaleUp();
       endField = currentField.addRandom(RANDOM_FACTOR);
      }
      break;
     case 4:
      statePercentage = millis()/10-100*(4+stateNumber);
      currentField.transform(endField,0.1);
      currentField.render(SIZE/pow(2,stateNumber+1), SIZE, getRotation());
      if (statePercentage >= 100 && stateNumber < MAX_STATE-2) {
       state = 4;
       statePercentage = 0;
       stateNumber++;
       currentField = currentField.scaleUp();
       endField = currentField.addRandom(pow(RANDOM_FACTOR,stateNumber+1));
      }
      break;
    }
}