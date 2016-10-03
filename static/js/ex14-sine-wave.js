var width, height;

function setup() {
    width = 640;
    height = 480;
    createCanvas(width, height);
}

var startAngle = 0;
var aVel = 0.23;

function draw() {
    background(255);
    
    startAngle += 0.015;
    var angle = startAngle;
    
    for(var x = 0; x <= width; x+=24)
    {
        var y = map(Math.sin(angle), -1, 1, 0, height);
        stroke(0);
        fill(0,50);
        strokeWeight(2);
        ellipse(x, y, 36, 36);
        angle += aVel;
    }
}
