var width, height;

var Ball = function() {
    this.location = createVector(width/2, height/2);
    this.velocity = createVector(2.5, -7);
};

Ball.prototype.move = function(){ 
    this.location.add(this.velocity);
};

Ball.prototype.display = function() {
    ellipse(this.location.x, this.location.y, 40, 40);
};

Ball.prototype.bounce = function() {
    if (this.location.x > width || this.location.x < 0)
        this.velocity.x = this.velocity.x * -1;
    if (this.location.y > height || this.location.y < 0)
        this.velocity.y = this.velocity.y * -1;
};

var b;
function setup() {
  width = 640;
  height = 480;
  //createCanvas(window.innerWidth, window.innerHeight);
  createCanvas(width, height);
  b = new Ball();
}

function draw() {
    background(0);
    b.move();
    b.bounce();
    b.display();
}
