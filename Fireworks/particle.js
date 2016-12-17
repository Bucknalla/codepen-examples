function Particle(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;

    this.done = function() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }

    if (firework) {
        this.vel = createVector(0, random(-18, -8));
    } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(1, 15));
    }
    this.acc = createVector(0, 0);

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.update = function() {
        if (!this.firework) {
            this.vel.mult(0.85);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function() {
        colorMode(HSB, 255)
        if (!this.firework) {
            strokeWeight(2);
            stroke(hu, 255, 255, this.lifespan);
        } else {
            stroke(hu, 255, 255);
        }
        point(this.pos.x, this.pos.y);
    }
}
