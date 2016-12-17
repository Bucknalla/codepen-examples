var fireworks = [];
var gravity;

function setup() {
  createCanvas(400, 300);
  colorMode(RGB);
  gravity = createVector(0,0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  if (random(1) < 0.05){
      fireworks.push(new Firework());
  }
  background(0, 0, 0, 25);
  for(var i = fireworks.length-1; i >= 0; i--){
    fireworks[i].update();
    fireworks[i].show();
    if(fireworks[i].done()){
      fireworks.splice(i, 1);
    }
  }
}

function Firework() {
    this.hu = random(255);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
 
    this.done = function(){
      if(this.exploded && this.particles.length === 0){
        return true;
      }
      else{
        return false;
      }
    }

    this.update = function() {
        if (!this.exploded){
              this.firework.applyForce(gravity);
              this.firework.update();
              if(this.firework.vel.y >= 0) {
                 this.exploded = true;
                
                 this.explode(); 
                
              }
        }
       for(var i = this.particles.length-1; i >= 0; i--){
         this.particles[i].applyForce(gravity);
         this.particles[i].update();
         if(this.particles[i].done()){
           this.particles.splice(i,1);
         }
       }
    }
    
    this.explode = function(){
      for(var i =0; i < 100; i++){
        var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
        this.particles.push(p);
      }
    }
    
    this.show = function(){
       if (!this.exploded){
          this.firework.show();
       }
       for(var i =0; i < this.particles.length; i++){
         this.particles[i].show();
       }
    }
}

function Particle(x,y, hu, firework ){
  this.pos = createVector(x,y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;
  
  this.done = function(){
    if(this.lifespan < 0){
      return true;
    }
    else{
      return false;
    }
  }
  
  if(firework){
      this.vel = createVector(0,random(-12,-8));
  }
  else{
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(1,6));
  }
  this.acc = createVector(0,0);
  
  this.applyForce = function(force) {
   this.acc.add(force);
  }
  
  this.update = function() {
    if(!this.firework){
      this.vel.mult(0.85);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.show = function() {
    if(!this.firework){
      strokeWeight(2);
          stroke(hu, 255, 255, this.lifespan);
    }
    else{
          stroke(hu, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  }
}
