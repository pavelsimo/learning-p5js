var width, height;

var Liquid = function(x1, y1, x2, y2, c) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.c = c || 0.08;
};

Liquid.prototype.display = function() {
	fill(51);
    rect(this.x1, this.y1, this.x2, this.y2);
};

Liquid.prototype.contains = function(location) {
    if(location.x < this.x1 || location.x > this.x2) return false;
    if(location.y < this.y1 || location.y > this.y2) return false;
    return true;
};

Liquid.prototype.dragForce = function(velocity) {
    var drag = createVector(velocity.x, velocity.y);
    drag.normalize();
    drag.mult(-1);
    
    var speed = velocity.mag();
    drag.mult(this.c*speed*speed);
    
    return drag;
}

var Mover = function() {
    this.location = createVector(random(0, width), 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = random(1, 3);
};

Mover.prototype.update = function(){     
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    fill(120);
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

var nmovers = 5;
var movers = [];
var liquid;
function setup() 
{
    width = 640;
    height = 480;
    
    for(var i = 0; i < nmovers; ++i)
    {
        movers.push(new Mover());
    }
    
    liquid = new Liquid(0, height/2, width, height);
    
    createCanvas(width, height);
}

function draw() 
{
    background(255);
    
    liquid.display();
    
    for(var i = 0; i < movers.length; ++i)
    {
        var m = movers[i];
        var gravity = createVector(0, 0.3);
        gravity.mult(m.mass); // scaling by mass to simulate the force of gravity
        m.applyForce(gravity);
        
        if (mouseIsPressed)
        {
            var wind = createVector(0.01, 0);
            m.applyForce(wind);            
        }
        
        if(liquid.contains(m.location))
        {
            var drag = liquid.dragForce(m.velocity);
            m.applyForce(drag);
        }
        
        m.update();
        m.edges();
        m.display();
    }
}
