var width, height;

function setup() {
    width = 640;
    height = 480;
    createCanvas(width, height);
}

var aVel = 0.0;
var aAcc = 0.001;
var r = 100;
var angle = 0;

function draw() {
    background(255);
    
    angle += aVel;
    aVel += aAcc;
    
    translate(width/2, height/2);
    var x = r * Math.cos(angle);
    var y = r * Math.sin(angle);
    fill(127);
    line(0, 0, x, y);
    ellipse(x, y, 50, 50);
    
    aVel = constrain(aVel, 0, 0.1);
}
