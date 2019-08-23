let boids = [];

function setup() {
    createCanvas(600,600);
    for(let i = 0; i <50; i++){
        boids.push(new Boid(random(width),random(height)));
        
    }
}

function draw() {
    background(0)
    for(let b of boids){
        b.move(boids)
    }
    for(let b of boids){
        b.show();
    }
}