var width, height;

var Mover = function() {
    this.location = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = random(0.5, 4);
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

var movers = [];
function setup() 
{
    width = 640;
    height = 480;
    
    for(var i = 0; i < 5; ++i)
    {
        movers.push(new Mover());
    }
    
    createCanvas(width, height);
}

function draw() 
{
    background(0);
    
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
        
        m.update();
        m.edges();
        m.display();
    }
}
