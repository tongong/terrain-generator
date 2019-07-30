class Terrain {
 
 constructor(dimension, filled) {
  this.dimension = dimension;
  this.field = [];
  this.bottomHeight = 0.5;
  
  let length = dimension*2-1;
  for (let i = 0; i < length; i++) {
   this.field.push([]);
   for (let j = 0; j < length; j++) {
    this.field[i].push(filled?Math.random():0.5);
   }
  }
 }
 
 transform(destination, speed) {
  let length = this.dimension * 2 - 1;
  for (let i = 0; i < length; i++) {
   for (let j = 0; j < length; j++) {
     this.field[i][j] += (destination.field[i][j] - this.field[i][j])*speed;
   }
  }
  if (this.bottomHeight != destination.bottomHeight) {
  this.bottomHeight += (destination.bottomHeight - this.bottomHeight)*speed;
  }
 }
 
 scaleUp() {
  let ret = new Terrain(this.dimension*2-1, false);
  
  let length = this.dimension*2-1;
  for (let i = 0; i < length; i++) {
   for (let j = 0; j < length; j++) {
    ret.field[2*i][2*j] = this.field[i][j];
    if (i<length-1){
     ret.field[2*i+1][2*j] = (this.field[i][j]+this.field[i+1][j])/2;
    }
    if (j<length-1){
     ret.field[2*i][2*j+1] = (this.field[i][j]+this.field[i][j+1])/2;
    }
    if (i<length-1 && j<length-1){
     ret.field[2*i+1][2*j+1] = (this.field[i][j]+this.field[i+1][j+1])/2;
    }
   }
  }
 
  return ret;
 }
 
 addRandom(factor) {
  let ret = new Terrain(this.dimension, false);
  
  length = this.dimension*2-1;
  for (let i = 0; i < length; i++) {
   for (let j = 0; j < length; j++) {
    ret.field[i][j] = this.field[i][j]*(1-factor) + Math.random()*factor;
   }
  }
  return ret;
 }
 
 render(scaleXY, scaleZ, rotation) {
  let points = [];
  let length = this.dimension*2-1;
  
  //Terrain points
  for (let i = 0; i < length; i++) {
   for (let j = 0; j < length; j++) {
    points.push(tri(createVector(
     (j-this.dimension+1)*scaleXY,
     (i-this.dimension+1)*scaleXY,
     this.field[i][j]*scaleZ
     )));
   }
  }
  
  //Border points
  points.push(tri(createVector(
   this.dimension*scaleXY,
   0,
   this.bottomHeight*scaleZ
   )));
  points.push(tri(createVector(
   0,
   this.dimension*scaleXY,
   this.bottomHeight*scaleZ
  )));
  
  //Terrain triangles
  let polygons = [];
  for (let i = 0; i < length-1; i++) {
   for (let j = 0; j < length-1; j++) {
    if (j-i+1<this.dimension && i-j<this.dimension) {
     polygons.push([i*length+j, i*length+j+1,(i+1)*length+j+1]);
     polygons.push([j*length+i, (j+1)*length+i,(j+1)*length+i+1]);
    }
   }
  }
  
  //Borders
  //polygons.push([0,1,2,length*length,length*length+1]);
  
  render(points,polygons,rotation);
 }
}

function tri(input) {
 return createVector(
  input.x - input.y/2,
  input.y * sqrt(3/4),
  input.z
 );
}