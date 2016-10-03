
var Mover = function(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 2;
};

Mover.prototype.update = function(){     
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    ellipse(this.location.x, this.location.y, this.mass*20, this.mass*20);
};

Mover.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.edges = function() {
    if (this.location.x > width)
    {
        this.velocity.x = this.velocity.x * -1;
        this.location.x = width;
    }
    
    if (this.location.x < 0)
    {
        this.velocity.x = this.velocity.x * -1;
        this.location.x = 0;
    }
    
    if (this.location.y > height)
    {
        this.velocity.y = this.velocity.y * -1;
        this.location.y = height;
    }
    
    if (this.location.y < 0)
    {
        this.velocity.y = this.velocity.y * -1;
        this.location.y = 0;
    }
};

var width, height;
var aVel = 0;
var aAcc = 0.01;
var angle = 0;
var origin;
var restLength;

function setup() {
    width = 640;
    height = 480;
    createCanvas(width, height);
    
    restLength = 200;
    origin = createVector(width / 2, 0);
    bob = new Mover(width / 2, restLength + 40);
}

function draw() {
    background(255);
    
    line(origin.x, origin.y, bob.location.x, bob.location.y);
    ellipse(bob.location.x, bob.location.y, 32, 32);
    
    var spring = p5.Vector.sub(bob.location, origin);
    var currentLength = spring.mag();
    spring.normalize();
    var k = 0.05;
    var stretch = currentLength - restLength;
    spring.mult(-k * stretch);
    
    bob.applyForce(spring);
    
    if (mouseIsPressed)
    {
        var wind = createVector(0.01, 0);
        bob.applyForce(wind);
    }
    
    var gravity = createVector(0, 0.1);
    bob.applyForce(gravity);
    
    bob.update();
    bob.display();
    
    /*
     * anchor
     * bob (Mover class)
     * restLength
     * loc
     * vel
     * acc
     * spring constant (k)
     * connect(Bob b)
     */
}

