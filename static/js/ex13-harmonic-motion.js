var width, height;

function setup() {
    width = 640;
    height = 480;
    createCanvas(width, height);
}

var aVel = 0;
var aAcc = 0.001;
var angle = 0;
var amplitude = 200;
var period = 30;

function draw() {
    
    angle += aVel;
    aVel += aAcc;
    
    background(255);
    translate(width/2, height/2);
    var x = amplitude * Math.sin(angle);
    var y = noise(-50, 50);
    fill(127);
    line(0, 0, x, 0);
    ellipse(x, 0, 36, 36);
    
    aVel = constrain(aVel, 0, 0.1);
}
