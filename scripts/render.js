function render(points, polygons, rotation) {
 rotation *= TWO_PI;
 
 // extract points
 polygons.forEach(function(polygon, index) {
  polygons.push([]);
  polygon.forEach(corner => {
   polygons[polygons.length - 1].push(Object.assign({}, points[corner]));
  });
 });
 polygons = polygons.slice(polygons.length / 2);
 
 // sort the polygons
 let rot = createVector(round(cos(rotation) * 1000) / 1000, round(-sin(rotation) * 1000) / 1000);
 
 polygons.forEach(polygon => {
  let sum = createVector(0, 0);
  polygon.forEach(corner => {
   sum.x += corner.x;
   sum.y += corner.y;
   sum.z += corner.z;
  });
  sum.x /= polygon.length;
  sum.y /= polygon.length;
  sum.z /= polygon.length;
  polygon.average = Object.assign({}, sum);
  polygon.depth = -polygon.average.x * rot.y - polygon.average.y * rot.x;
 });
 
 polygons.sort(function(a, b) {
  /*if (abs(a.depth - b.depth) <= 5) {
   return abs(b.average.z) - abs(a.average.z);
  }*/
  return a.depth - b.depth;
 });
 
 // draw to the screen
 polygons.forEach(polygon => {
  drawPolygon(polygon, rotation);
 });
}

function drawPolygon(points, rotation) {
 points.forEach(function(item) {
  let newVec = calc3D(item.x, item.y, item.z-ANGLE, rotation);
  item.x = newVec.x;
  item.y = newVec.y;
 });
 beginShape();
 points.forEach(function(item) {
  vertex(CENTER.x + item.x, CENTER.y - item.y - ANGLE+SIZE/2);
 });
 vertex(CENTER.x + points[0].x, CENTER.y - points[0].y - ANGLE+SIZE/2);
 endShape();
}

function drawWall(side, points, rotation) {
 points.forEach(function(item) {
  let newVec = calc3D(item.x, item.y, item.z-ANGLE, rotation);
  item.x = newVec.x;
  item.y = newVec.y;
 });
 beginShape();
 switch(side) {
  case 1:
   vertex(CENTER.x + points[0].x, 0);
   break;
  case 2:
   vertex(WIDTH, CENTER.y - item.y - ANGLE+SIZE/2);
   break;
  case 3:
   vertex(CENTER.x + points[0].x, HEIGHT);
   break;
  case 4:
   vertex(0, CENTER.y - item.y - ANGLE+SIZE/2);
   break;
 }
 points.forEach(function(item) {
  vertex(CENTER.x + item.x, CENTER.y - item.y - ANGLE+SIZE/2);
 });
 vertex(CENTER.x + points[0].x, CENTER.y - points[0].y - ANGLE+SIZE/2);
 endShape();
}

function calc3D(x, y, z, rotation) {
 
 let rot = createVector(round(cos(rotation) * 1000) / 1000, round(-sin(rotation) * 1000) / 1000);
 let out3D = createVector(x * rot.x - y * rot.y, x * rot.y + y * rot.x, z);
 
 let zIsZero = false;
 let xIsZero = false;
 if (out3D.z === 0) {
  out3D.z = 1;
  zIsZero = true;
 }
 if (out3D.x === 0) {
  out3D.x = 1;
  xIsZero = true;
 }
 let start1 = CENTER_HORIZON;
 let start2 = LEFT_HORIZON;
 let end1 = createVector(out3D.x, out3D.z);
 let end2 = createVector(out3D.x + out3D.y, out3D.z);
 
 // Two lines f(x) = m * x + n
 let m1 = (end1.y - start1.y) / (end1.x - start1.x);
 let m2 = (end2.y - start2.y) / (end2.x - start2.x);
 let n1 = end1.y - end1.x * m1;
 let n2 = end2.y - end2.x * m2;
 
 let crossX = (n2 - n1) / (m1 - m2);
 let crossY = zIsZero ? 0 : crossX * m1 + n1;
 if (xIsZero) {
  crossX = 0;
 }
 return createVector(crossX, crossY);
}