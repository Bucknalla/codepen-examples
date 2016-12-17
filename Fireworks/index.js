var fireworks = [];
var gravity;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB, 255);
    gravity = createVector(0, 0.25);
    stroke(0, 0, 0, 255);
    strokeWeight(4);
    background(0);
}

function windowResized () {
    resizeCanvas (windowWidth, windowHeight);
}


function draw() {
    if (random(1) < 0.05) {
        fireworks.push(new Firework());
    }
    background(0, 0, 0, 25);
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }
}
