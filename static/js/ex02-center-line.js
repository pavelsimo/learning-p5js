var width, height;

function setup() {
    width = 640;
    height = 480;
    createCanvas(width, height);
}
 
function draw() {
    background(255);
    var center = createVector(width/2, height/2);
    var mouse = createVector(mouseX, mouseY);
    translate(width/2, height/2);
    ellipse(0, 0, 4, 4);
    mouse.sub(center);
    
    //var m = mouse.mag();
    //fill(255, 0, 0);
    //rect(0, 0, m, 20);
    
    //mouse.normalize();
    //mouse.mult(50);
    
    //mouse.setMag(50);
    
    line(0, 0, mouse.x, mouse.y);
}
