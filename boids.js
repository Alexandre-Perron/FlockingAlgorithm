class Boid{
    constructor(x,y){
        this.pos = createVector(x,y);
        this.velocity = createVector(random(-2,2),random(-2,2));
        this.accleration = createVector(0, 0);
        this.maxSteerF = 0.005;
        this.maxSpeedF = 3;
        this.viewRange = 30;
    }
    move(boids){
        this.separation(boids);
        this.conhesion(boids);
        this.alignment(boids);

        this.velocity.add(this.accleration);
        this.velocity.setMag(this.maxSpeedF);
        this.pos.add(this.velocity);
        this.accleration.mult(0);
        if(this.pos.x > width){
            this.pos.x -= width
        }else if(this.pos.x < 0){
            this.pos.x += width
        }
        if(this.pos.y > height){
            this.pos.y -= height
        }else if(this.pos.y < 0){
            this.pos.y += height
        }
    }
    distance(other){
        return Math.sqrt(Math.pow(Math.abs(this.pos.y-other.pos.y),2)+Math.pow(Math.abs(this.pos.x-other.pos.x),2));
    }
    steer(desired){
        desired.normalize();
        desired.mult(this.maxSpeedF);
        let steer = desired;
        
        steer.sub(this.velocity);
        steer.limit(this.maxSteerF);

        return steer;
    }
    //Steer away of nearby boids
    separation(boids){
        for(let b of boids){
            if(b.distance(this) <this.viewRange - 5 && b != this){
                let desiredDirection = createVector(this.pos.x - b.pos.x, this.pos.y - b.pos.y);
                let steer = this.steer(desiredDirection);
                this.accleration.add(steer.mult(1.5))
            }
        }
    }
    //Steer closer to nearby boids
    conhesion(boids){
        for(let b of boids){
            if(b.distance(this) <this.viewRange + 10 && b != this){
                let desiredDirection = createVector(b.pos.x - this.pos.x, b.pos.y - this.pos.y);
                let steer = this.steer(desiredDirection);
                this.accleration.add(steer.mult(0.5))
            }
        }
    }
    //Steer of the same direction as other boids in its view range
    alignment(boids){
        for(let b of boids){
            if(b.distance(this) <this.viewRange && b != this){
                let desiredDirection = b.velocity;
                let steer = this.steer(desiredDirection);
                this.accleration.add(steer)
            }
        }
    }
    //Draw the boid
    show(){
        fill(255)
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }
}