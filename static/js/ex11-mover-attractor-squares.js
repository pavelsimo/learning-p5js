var width, height;

var Mover = function() {
    this.location = createVector(random(0, width), 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
    this.radius = 10;
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0.001;
};

Mover.prototype.update = function(){     
    // used the acceleration in the x-axis to determine the angular acceleration
    this.aAcceleration = this.acceleration.x / 10.0;
    this.angle += this.aVelocity;
    this.aVelocity += this.aAcceleration;
    
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    fill(175,200);
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    //ellipse(0, 0, this.radius, this.radius);
    rectMode(CENTER);
    rect(0, 0, this.radius, this.radius);
    pop();
};

Mover.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.attract = function(other) {
    var G = 0.4;
    var force = p5.Vector.sub(this.location, other.location);
    
    var d = force.mag();
    d = constrain(d, 5, 25);
    
    var strength = (G * this.mass * other.mass) / (d*d);
    force.normalize();
    force.mult(strength);
    return force;
};

var nmovers = 5;
var movers = [];
var a;
function setup() 
{
    width = 800;
    height = 600;
    for(var i = 0; i < nmovers; ++i)
    {
        m = new Mover();
        m.mass = 50;
        m.location.x = random(100, 500);
        m.location.y = random(100, 500);
        m.velocity.x = 1;
        m.radius = 20;        
        movers.push(m);
    }
    
    a = new Mover();
    a.mass = 80;
    a.location.x = width/2;
    a.location.y = height/2;
    a.radius = 40;
    
    createCanvas(width, height);
}

function draw() 
{
    background(255);
    for(var i = 0; i < nmovers; ++i)
    {
        var m = movers[i];
        var force = a.attract(m);
        m.applyForce(force);        
        m.update();
        m.display();
    }
    
    a.update();
    a.display();
}
