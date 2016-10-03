var width, height;

var Mover = function() {
    this.location = createVector(width/2, height/2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
};

Mover.prototype.update = function(){ 
    var mouse = createVector(mouseX, mouseY);
    mouse.sub(this.location);
    //mouse.setMag(0.1);
    mouse.normalize();
    mouse.mult(0.1);
    this.acceleration = mouse;
    
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    // the velocity cannot have a magnitude greater than 5
    this.velocity.limit(5);
};

Mover.prototype.display = function() {
    ellipse(this.location.x, this.location.y, 40, 40);
};

Mover.prototype.edges = function() {
    if (this.location.x > width)  this.location.x = 0;
    if (this.location.x < 0)      this.location.x = width;
    if (this.location.y > height) this.location.y = 0;
    if (this.location.y < 0)      this.location.y = height;
};

var m;
function setup() {
  width = 640;
  height = 480;
  createCanvas(width, height);
  m = new Mover();
}

function draw() {
    background(0);
    m.update();
    m.edges();
    m.display();
}
