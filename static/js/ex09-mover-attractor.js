var width, height;

var Mover = function() {
    this.location = createVector(random(0, width), 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
    this.radius = 10;
};

Mover.prototype.update = function(){     
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    fill(175,200);
    ellipse(this.location.x, this.location.y, this.radius, this.radius);
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

Mover.prototype.edges = function() {
    /*
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
    */
};

var m, a;
function setup() 
{
    width = 800;
    height = 600;
    
    m = new Mover();
    m.mass = 50;
    m.location.x = 400;
    m.location.y = 200;
    m.velocity.x = 1;
    m.radius = 20;
    
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

    var force = a.attract(m);
    m.applyForce(force);
    
    a.update();
    m.update();
    
    a.display();    
    m.display();
}
