var width, height;

var ParticleSystem = function(x, y) {
    var _x = x || 0;
    var _y = y || 0;
    this.origin = createVector(x, y);
    this.particles = [];
};

ParticleSystem.prototype.add = function(p) {
    this.particles.push(p);
};

ParticleSystem.prototype.applyForce = function(force) {
    for(var i = 0; i < this.particles.length; ++i) {
        var p = this.particles[i];
        p.applyForce(force);
    }
};

ParticleSystem.prototype.update = function() {
    for(var i = this.particles.length - 1; i >= 0; --i) {
        var p = this.particles[i];;
        p.update();
        if(p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
    if(this.particles.length > 500) {
        this.particles.shift();
    }
};

ParticleSystem.prototype.display = function() {
    for(var i = 0; i < this.particles.length; ++i) {
        var p = this.particles[i];
        p.display();
    }
};

var Particle = function(x, y, img) {
    var _x = x || 0;
    var _y = y || 0;
    this.location = createVector(_x, _y);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0.5);
    this.mass = 2;
    this.lifespan = 255;
    this.img = img;
};

Particle.prototype.update = function() {     
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
};                                                                                                                                                                                                                  

Particle.prototype.display = function() {
    if (this.img)
    {
        //blendMode(ADD);
        imageMode(CENTER);
        tint(255, this.lifespan);
        //tint(206, 32, 41, this.lifespan);
        image(this.img, this.location.x, this.location.y, 32, 32);        
    }
    else
    {
        stroke(0, this.lifespan);
        strokeWeight(2);
        fill(127, this.lifespan);
        ellipse(this.location.x, this.location.y, this.mass*5, this.mass*5);
    }
};

Particle.prototype.applyForce = function(force) {   
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Particle.prototype.isDead = function() {
    return this.lifespan <= 0;
};

Particle.prototype.edges = function() {
    if (this.location.x > width) {
        this.velocity.x = this.velocity.x * -1;
        this.location.x = width;
    }
    
    if (this.location.x < 0) {
        this.velocity.x = this.velocity.x * -1;
        this.location.x = 0;
    }
    
    if (this.location.y > height) {
        this.velocity.y = this.velocity.y * -1;
        this.location.y = height;
    }
    
    if (this.location.y < 0) {
        this.velocity.y = this.velocity.y * -1;
        this.location.y = 0;
    }
};

var ps;
var img;
function preload() {
    width = 640;
    height = 480;
    img = loadImage("static/images/texture.png");
    ps = new ParticleSystem(width / 2, height / 2, img);
}

function setup() {
    createCanvas(width, height);    
}

function draw() {
    background(0);
    
    var p = new Particle(ps.origin.x, ps.origin.y, img);
    ps.add(p);

    var gravity = createVector(0, 0.05);
    ps.applyForce(gravity);

    if (mouseIsPressed)
    {
        var wind = createVector(0.5, 0);
        ps.applyForce(wind);
    }
    
    ps.update();
    ps.display();
}

