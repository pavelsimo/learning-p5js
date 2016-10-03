var width, height;


function setup() {
    width = 640;
    height = 480;
    createCanvas(width, height);
}

var aVelocity = 0.0;
var aAcceleration = 0.01;
var angle = 0;
function draw() {
    background(255);
    
    aAcceleration = map(mouseX, 0, width, -0.001, 0.001);
    
    angle += aVelocity;
    aVelocity += aAcceleration;
    
    rectMode(CENTER);
    stroke(0);
    fill(127);
    translate(width/2, height/2);
    rotate(angle);
    rect(0, 0, 64, 36);
}
