var width, height;
var aVel = 0;
var aAcc = 0.01;
var angle = Math.PI/4;
var len = 180;

function setup() {
    width = 640;
    height = 480;
    createCanvas(width, height);
    
    origin = createVector(width / 2, 0);
    bob = createVector(width / 2, len);
}

function draw() {
    background(255);
    
    // position of the bob of the pendulum
    bob.x = origin.x + len * Math.sin(angle);
    bob.y = origin.y + len * Math.cos(angle);
    
    line(origin.x, origin.y, bob.x, bob.y);
    ellipse(bob.x, bob.y, 32, 32);
    
    // angular acceleration of the pendulum
    aAcc = -0.01 * Math.sin(angle);
    angle += aVel;
    aVel += aAcc;
    aVel *= 0.99;
}
